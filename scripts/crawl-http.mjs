// HTTP for the crawler: per-host concurrency caps, conditional requests,
// GitHub rate limits, and retries for transient failures.

/** A failure that says nothing about the source: keep its last good state. */
export class TransientError extends Error {}

/** GitHub's API budget is spent until `resetAt`; stop calling it this run. */
export class RateLimitError extends TransientError {}

const MAX_WAIT_MS = 90_000;
const RETRIES = 3;

function semaphore(limit) {
  let active = 0;
  const queue = [];
  return async (task) => {
    if (active >= limit) await new Promise((resolve) => queue.push(resolve));
    active += 1;
    try {
      return await task();
    } finally {
      active -= 1;
      queue.shift()?.();
    }
  };
}

export function createHttp({
  fetchImpl = globalThis.fetch,
  token,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  now = () => Date.now(),
  log = () => {},
  concurrency = { api: 4, raw: 8, npm: 8 },
  timeoutMs = 30_000,
} = {}) {
  const lanes = {
    api: semaphore(concurrency.api),
    raw: semaphore(concurrency.raw),
    npm: semaphore(concurrency.npm),
  };
  const stats = { api: 0, apiNotModified: 0, raw: 0, npm: 0, npmNotModified: 0, retries: 0 };
  let apiBlockedUntil = 0;

  async function request(lane, url, { headers = {}, etag, accept } = {}) {
    if (lane === "api" && apiBlockedUntil > now()) {
      throw new RateLimitError(`GitHub API rate limit until ${new Date(apiBlockedUntil).toISOString()}`);
    }
    const requestHeaders = {
      "user-agent": "get-bb-marketplace-crawler",
      ...headers,
    };
    if (accept !== undefined) requestHeaders.accept = accept;
    if (etag !== undefined) requestHeaders["if-none-match"] = etag;
    if (token !== undefined && (lane === "api" || lane === "raw")) {
      requestHeaders.authorization = `Bearer ${token}`;
    }
    for (let attempt = 0; ; attempt += 1) {
      let response;
      try {
        response = await lanes[lane](() =>
          fetchImpl(url, {
            headers: requestHeaders,
            signal: AbortSignal.timeout(timeoutMs),
          }),
        );
      } catch (error) {
        if (attempt >= RETRIES) {
          throw new TransientError(`${url}: ${error.message}`);
        }
        stats.retries += 1;
        await sleep(1000 * 2 ** attempt);
        continue;
      }
      stats[lane] += 1;
      if (response.status === 304 && lane === "api") stats.apiNotModified += 1;
      if (response.status === 304 && lane === "npm") stats.npmNotModified += 1;

      const limited =
        response.status === 429 ||
        (response.status === 403 &&
          (response.headers.get("retry-after") !== null ||
            response.headers.get("x-ratelimit-remaining") === "0"));
      if (limited) {
        const retryAfter = Number(response.headers.get("retry-after"));
        const reset = Number(response.headers.get("x-ratelimit-reset"));
        let waitMs = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : undefined;
        if (waitMs === undefined && Number.isFinite(reset) && reset > 0) {
          waitMs = Math.max(0, reset * 1000 - now()) + 1000;
        }
        waitMs ??= 60_000;
        await response.body?.cancel?.().catch(() => {});
        if (waitMs > MAX_WAIT_MS || attempt >= RETRIES) {
          if (lane === "api") apiBlockedUntil = now() + waitMs;
          throw new RateLimitError(`${url}: rate limited for ${Math.round(waitMs / 1000)} s`);
        }
        log(`rate limited by ${new URL(url).host}; waiting ${Math.round(waitMs / 1000)} s`);
        stats.retries += 1;
        await sleep(waitMs);
        continue;
      }
      if (response.status >= 500) {
        await response.body?.cancel?.().catch(() => {});
        if (attempt >= RETRIES) {
          throw new TransientError(`${url}: HTTP ${response.status}`);
        }
        stats.retries += 1;
        await sleep(1000 * 2 ** attempt);
        continue;
      }
      return response;
    }
  }

  async function readJson(response, url) {
    try {
      return await response.json();
    } catch (error) {
      throw new TransientError(`${url}: invalid JSON (${error.message})`);
    }
  }

  async function readBytes(response, url) {
    try {
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      throw new TransientError(`${url}: ${error.message}`);
    }
  }

  return {
    stats,
    /** GitHub REST call. Returns `{ status, etag, json, headers }`. */
    async api(path, { etag } = {}) {
      const url = path.startsWith("https://") ? path : `https://api.github.com${path}`;
      const response = await request("api", url, {
        etag,
        accept: "application/vnd.github+json",
        headers: { "x-github-api-version": "2022-11-28" },
      });
      if (response.status === 304) return { status: 304, etag, headers: response.headers };
      // 409 is an empty repository.
      if ([404, 409, 410, 451].includes(response.status)) {
        await response.body?.cancel?.().catch(() => {});
        return { status: response.status, headers: response.headers };
      }
      if (!response.ok) {
        await response.body?.cancel?.().catch(() => {});
        throw new TransientError(`${url}: HTTP ${response.status}`);
      }
      return {
        status: response.status,
        etag: response.headers.get("etag") ?? undefined,
        json: await readJson(response, url),
        headers: response.headers,
      };
    },
    /**
     * A file from raw.githubusercontent.com. Returns the bytes, or undefined
     * when the file does not exist at that ref.
     */
    async raw(fullName, ref, path, { maxBytes } = {}) {
      const encoded = path.split("/").map(encodeURIComponent).join("/");
      const url = `https://raw.githubusercontent.com/${fullName}/${ref
        .split("/")
        .map(encodeURIComponent)
        .join("/")}/${encoded}`;
      const response = await request("raw", url);
      if (response.status === 404) {
        await response.body?.cancel?.().catch(() => {});
        return undefined;
      }
      if (!response.ok) {
        await response.body?.cancel?.().catch(() => {});
        throw new TransientError(`${url}: HTTP ${response.status}`);
      }
      const length = Number(response.headers.get("content-length"));
      if (maxBytes !== undefined && Number.isFinite(length) && length > maxBytes) {
        await response.body?.cancel?.().catch(() => {});
        return { tooLarge: true, length };
      }
      return readBytes(response, url);
    },
    /** npm registry call. JSON unless `bytes`. */
    async npm(url, { etag, bytes = false } = {}) {
      const response = await request("npm", url, { etag, accept: bytes ? undefined : "application/json" });
      if (response.status === 304) return { status: 304, etag };
      if (response.status === 404) {
        await response.body?.cancel?.().catch(() => {});
        return { status: 404 };
      }
      if (!response.ok) {
        await response.body?.cancel?.().catch(() => {});
        throw new TransientError(`${url}: HTTP ${response.status}`);
      }
      return {
        status: response.status,
        etag: response.headers.get("etag") ?? undefined,
        ...(bytes
          ? { bytes: await readBytes(response, url) }
          : { json: await readJson(response, url) }),
      };
    },
  };
}
