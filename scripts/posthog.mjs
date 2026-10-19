// PostHog HogQL access shared by the stats and ranking builds.
//
// Environment:
//   POSTHOG_API_KEY     personal API key with project read access (secret)
//   POSTHOG_PROJECT_ID  numeric project id
//   POSTHOG_HOST        defaults to https://us.posthog.com

function required(name) {
  const value = process.env[name];
  if (value === undefined || value.trim().length === 0) {
    console.error(`error: ${name} is not set`);
    process.exit(1);
  }
  return value.trim();
}

/**
 * PostHog answers 504 with this detail when ClickHouse hits its execution
 * limit. Load on the shared cluster makes that intermittent, and the query is
 * a read, so running it again is safe. Every other failure (bad key, HogQL
 * error, other 5xx) still fails at once.
 */
const EXECUTION_TIMEOUT = /max execution time/i;
const TIMEOUT_ATTEMPTS = 3;
const TIMEOUT_BACKOFF_MS = 15_000;

export async function queryHogQL(query, { backoffMs = TIMEOUT_BACKOFF_MS } = {}) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await queryHogQLOnce(query);
    } catch (error) {
      if (!error?.executionTimeout || attempt >= TIMEOUT_ATTEMPTS) throw error;
      console.error(
        `warning: PostHog query hit its execution limit (attempt ${attempt}/${TIMEOUT_ATTEMPTS}); retrying`,
      );
      await new Promise((resolve) => setTimeout(resolve, backoffMs * attempt));
    }
  }
}

async function queryHogQLOnce(query) {
  const host = (process.env.POSTHOG_HOST ?? "https://us.posthog.com").replace(
    /\/+$/,
    "",
  );
  const projectId = required("POSTHOG_PROJECT_ID");
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${required("POSTHOG_API_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query },
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    // The body names the real problem (bad key, wrong project, HogQL error).
    const detail = await response.text().catch(() => "");
    const error = new Error(
      `PostHog query failed with HTTP ${response.status}: ${detail.slice(0, 500)}`,
    );
    error.executionTimeout =
      response.status === 504 && EXECUTION_TIMEOUT.test(detail);
    throw error;
  }
  const body = await response.json();
  if (!Array.isArray(body?.results)) {
    throw new Error("PostHog answer has no results array");
  }
  return body.results;
}
