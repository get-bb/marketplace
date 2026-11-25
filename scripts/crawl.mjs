#!/usr/bin/env node
// Discover self-published bb plugins on GitHub (topic `bb-plugin`) and npm
// (keyword `bb-plugin`) and turn them into v2 marketplace entries.
//
//   node scripts/crawl.mjs --out dist/crawl [--state previous-state.json]
//                          [--budget-seconds 900]
//
// The crawler never uploads anything. It writes, under --out:
//   entries.json   { plugins, replacesLegacy } for scripts/build.mjs --crawled
//   report.json    per-source verdicts (format in README.md)
//   state.json     the next run's --state: ETags, releases, claims
//   assets/        new icons and screenshots, named by content hash; upload
//                  each to the bucket key assets/<name>
//   summary.json   counts for people
//
// Environment: GITHUB_TOKEN (needed for a useful API budget).
//
// The crawl is incremental. A GitHub repository is processed again only when
// its tag list changes, an npm package only when `latest` changes. A source
// that fails for a reason that says nothing about it (network, rate limit,
// 5xx) keeps its last good state, so its listing stays.
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  CONTENT_TYPES,
  Skip,
  assembleEntry,
  contentHash,
  derivePluginId,
  githubAuthor,
  hasOptInKeyword,
  mapManifest,
  npmAuthor,
  npmVersionFacts,
  parseCollectionManifest,
  parseGithubRepository,
  readTarball,
  resolveListings,
  selectRelease,
  tagPrefixesFor,
} from "./crawl-lib.mjs";
import { RateLimitError, TransientError, createHttp } from "./crawl-http.mjs";
import {
  ICON_MAX_BYTES,
  SCREENSHOT_MAX_BYTES,
  iconBufferProblems,
  screenshotBufferProblems,
  validateOverviewBytes,
  validateOverviewReference,
  validateScreenshotReference,
} from "./marketplace-lib.mjs";

/** Bump to make the next run process every source again. */
export const CRAWLER_VERSION = 2;
export const TOPIC = "bb-plugin";
export const ASSET_URL_BASE = "https://getbb.app/marketplace/v1/assets";
const OVERVIEW_FILE = "PLUGIN_OVERVIEW.md";
const OVERVIEW_MAX_FETCH = 16_000;
const NPM_REGISTRY = "https://registry.npmjs.org";
const NPM_TARBALL_MAX_BYTES = 64 * 1024 * 1024;
const SEARCH_START = "2008-01-01";
const DAY_MS = 86_400_000;

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));

export function readRepositoryInputs(root) {
  const base = readJson(join(root, "marketplace.base.json"));
  const legacyEntries = readdirSync(join(root, "entries"))
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => readJson(join(root, "entries", name)));
  let blocked = {};
  try {
    blocked = readJson(join(root, "blocked.json"));
  } catch {}
  return {
    categoryIds: new Set((base.categories ?? []).map((category) => category.id)),
    reserved: readJson(join(root, "reserved-plugin-ids.json")),
    blocked,
    legacyEntries,
    legacyListings: readLegacyListings(root, legacyEntries),
  };
}

/**
 * The screenshots and overview of each legacy entry as scripts/build.mjs
 * publishes them, for a crawled entry that replaces it and has none of its
 * own. A field with any problem is left out; the build reports it.
 */
export function readLegacyListings(root, legacyEntries) {
  const listings = new Map();
  for (const entry of legacyEntries) {
    const listing = {};
    if (Array.isArray(entry.screenshots) && entry.screenshots.length > 0) {
      const results = entry.screenshots.map((reference) =>
        validateScreenshotReference(root, entry.id, reference),
      );
      if (results.every((result) => result.problems.length === 0)) {
        listing.screenshots = results.map((result) => result.outputUrl);
      }
    }
    if (entry.overview !== undefined) {
      const result = validateOverviewReference(root, entry.id, entry.overview);
      if (result.problems.length === 0 && result.text !== undefined) listing.overview = result.text;
    }
    listings.set(entry.id, listing);
  }
  return listings;
}

async function mapLimit(items, limit, task) {
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      await task(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

const isoDay = (time) => new Date(time).toISOString().slice(0, 10);

function repoMeta(item) {
  return {
    id: item.id,
    fullName: item.full_name,
    owner: item.owner?.login ?? item.full_name.split("/")[0],
    fork: item.fork === true,
    archived: item.archived === true,
    private: item.private === true,
    defaultBranch: item.default_branch,
    topics: item.topics ?? [],
  };
}

/**
 * All repositories with the topic, through `created:` ranges so that no
 * single search query passes the 1000-result cap.
 */
export async function discoverGithub(http, now, log = () => {}) {
  const repos = new Map();
  let complete = true;
  async function searchRange(from, to) {
    const query = `topic:${TOPIC} fork:true created:${from}..${to}`;
    for (let page = 1; page <= 10; page += 1) {
      const result = await http.api(
        `/search/repositories?q=${encodeURIComponent(query)}&sort=updated&per_page=100&page=${page}`,
      );
      if (result.status !== 200) throw new TransientError(`search returned HTTP ${result.status}`);
      const { total_count: total, items = [], incomplete_results: incomplete } = result.json;
      if (page === 1 && total > 1000) {
        const start = Date.parse(from);
        const end = Date.parse(to);
        if (end > start) {
          const middle = start + Math.floor((end - start) / DAY_MS / 2) * DAY_MS;
          await searchRange(from, isoDay(middle));
          await searchRange(isoDay(middle + DAY_MS), to);
          return;
        }
        log(`warning: ${total} repositories were created on ${from}; only 1000 are visible`);
        complete = false;
      }
      if (incomplete) complete = false;
      for (const item of items) repos.set(String(item.id), repoMeta(item));
      if (items.length < 100 || page * 100 >= Math.min(total, 1000)) return;
    }
  }
  try {
    await searchRange(SEARCH_START, isoDay(now));
  } catch (error) {
    if (!(error instanceof TransientError)) throw error;
    log(`warning: GitHub search failed (${error.message}); rechecking known repositories only`);
    complete = false;
  }
  return { repos, complete };
}

export async function discoverNpm(http, log = () => {}) {
  const names = new Set();
  let complete = true;
  try {
    for (let from = 0; ; ) {
      const result = await http.npm(
        `${NPM_REGISTRY}/-/v1/search?text=keywords:${TOPIC}&size=250&from=${from}`,
      );
      if (result.status !== 200) throw new TransientError(`npm search returned HTTP ${result.status}`);
      const objects = result.json.objects ?? [];
      for (const object of objects) {
        if (typeof object?.package?.name === "string") names.add(object.package.name);
      }
      from += objects.length;
      if (objects.length === 0 || from >= (result.json.total ?? 0)) break;
    }
  } catch (error) {
    if (!(error instanceof TransientError)) throw error;
    log(`warning: npm search failed (${error.message}); rechecking known packages only`);
    complete = false;
  }
  return { names, complete };
}

function addAsset(assets, bytes, extension) {
  const ext = extension.toLowerCase();
  const name = `${contentHash(bytes)}.${ext}`;
  assets.set(name, { bytes, contentType: CONTENT_TYPES[ext] });
  return `${ASSET_URL_BASE}/${name}`;
}

/**
 * The listing fields read from a plugin's files at its release. `read(path,
 * maxBytes)` returns the bytes of a plugin-relative file, undefined when it
 * does not exist, or `{ tooLarge: true }`. Throws a Skip.
 */
async function buildFromFiles(pkgBytes, read, inputs, assets) {
  if (pkgBytes === undefined) {
    throw new Skip("no-manifest", "The release has no package.json in the plugin directory.");
  }
  let pkg;
  try {
    pkg = JSON.parse(pkgBytes.toString("utf8"));
  } catch (error) {
    throw new Skip("invalid-manifest", `package.json is not valid JSON: ${error.message}`);
  }
  const mapped = mapManifest(pkg, inputs);
  const warnings = [...mapped.warnings];
  const pending = new Map();

  let iconUrl;
  if (mapped.icon.path !== undefined) {
    const bytes = await read(mapped.icon.path, ICON_MAX_BYTES);
    if (bytes === undefined) {
      throw new Skip("invalid-icon", `The icon ${mapped.icon.path} is not in the release.`);
    }
    if (bytes.tooLarge) {
      throw new Skip("invalid-icon", `The icon ${mapped.icon.path} is larger than 256 KiB.`);
    }
    const problems = iconBufferProblems(bytes, mapped.icon.path);
    if (problems.length > 0) throw new Skip("invalid-icon", problems.join(" "));
    pending.set("icon", { bytes, extension: mapped.icon.path.split(".").at(-1) });
  }

  const screenshots = [];
  for (const path of mapped.screenshots) {
    const bytes = await read(path, SCREENSHOT_MAX_BYTES);
    if (bytes === undefined) {
      throw new Skip("invalid-screenshot", `The screenshot ${path} is not in the release.`);
    }
    if (bytes.tooLarge) {
      throw new Skip("invalid-screenshot", `The screenshot file is larger than 2 MiB: ${path}`);
    }
    const problems = screenshotBufferProblems(bytes, path.toLowerCase(), { label: path });
    if (problems.length > 0) throw new Skip("invalid-screenshot", problems.join(" "));
    screenshots.push({ bytes, extension: path.split(".").at(-1) });
  }

  // A bad overview drops only the overview (a replacing entry then keeps the
  // legacy one); the listing stays, with a warning.
  let overview;
  const overviewBytes = await read(OVERVIEW_FILE, OVERVIEW_MAX_FETCH);
  if (overviewBytes !== undefined) {
    const result = overviewBytes.tooLarge
      ? { problems: [`${OVERVIEW_FILE} is larger than ${OVERVIEW_MAX_FETCH} bytes.`] }
      : validateOverviewBytes(overviewBytes, { label: OVERVIEW_FILE });
    if (result.problems.length > 0) {
      warnings.push({
        reason: "invalid-overview",
        detail: `${result.problems.join(" ")} The overview is left out.`,
      });
    } else {
      overview = result.text;
    }
  }

  // Only a source that passes every rule adds assets.
  if (pending.has("icon")) {
    const { bytes, extension } = pending.get("icon");
    iconUrl = addAsset(assets, bytes, extension);
  }
  const screenshotUrls = screenshots.map(({ bytes, extension }) =>
    addAsset(assets, bytes, extension),
  );
  return { mapped, iconUrl, screenshotUrls, overview, warnings };
}

function withWarnings(candidate, warnings) {
  return warnings === undefined || warnings.length === 0 ? candidate : { ...candidate, warnings };
}

function skipped(base, error) {
  if (!(error instanceof Skip)) throw error;
  return { ...base, reason: error.reason, detail: error.detail };
}

async function tagCommitDate(http, fullName, tag) {
  const result = await http.api(`/repos/${fullName}/commits/${encodeURIComponent(tag)}`);
  if (result.status !== 200) {
    throw new TransientError(`${fullName}: no commit for tag ${tag} (HTTP ${result.status})`);
  }
  const date = result.json?.commit?.committer?.date ?? result.json?.commit?.author?.date;
  return date === undefined ? undefined : new Date(date).toISOString();
}

async function processGithubPlugin({ http, meta, subdir, tagNames, previous, inputs, assets, checkedAt }) {
  const suffix = subdir === "" ? "" : `/${subdir}`;
  const base = {
    key: `github:${meta.id}${suffix}`,
    label: `github:${meta.fullName}${suffix}`,
    repoId: meta.id,
    owner: meta.owner,
    github: { fullName: meta.fullName, subdir },
    checkedAt,
  };
  const pluginPath = (path) => (subdir === "" ? path : `${subdir}/${path}`);

  let release = selectRelease(tagNames, tagPrefixesFor(subdir));
  if (release === undefined && subdir !== "") {
    // The contract's fallback prefix is `<plugin id>/`; the id comes from
    // the default branch because no release exists yet to read it from.
    const headBytes = await http.raw(meta.fullName, `refs/heads/${meta.defaultBranch}`, pluginPath("package.json"));
    try {
      const id = derivePluginId(JSON.parse(headBytes?.toString("utf8") ?? "null")?.name, inputs.reserved);
      release = selectRelease(tagNames, [`${id}/`]);
    } catch {}
  }
  if (release === undefined) {
    const expected = tagPrefixesFor(subdir).map((prefix) => `${prefix}vX.Y.Z`).join(" or ");
    return {
      candidate: { ...base, reason: "no-release-tag", detail: `No stable ${expected} tag.` },
    };
  }

  const record = {
    prefix: release.prefix,
    latestTag: release.latest.name,
    earliestTag: release.earliest.name,
  };
  const reusable =
    previous !== undefined &&
    previous.latestTag === record.latestTag &&
    previous.earliestTag === record.earliestTag &&
    previous.prefix === record.prefix &&
    previous.candidate?.label === base.label;
  if (reusable) return { ...previous, candidate: { ...previous.candidate, checkedAt } };

  record.publishedAt =
    previous?.earliestTag === record.earliestTag && previous.publishedAt !== undefined
      ? previous.publishedAt
      : await tagCommitDate(http, meta.fullName, release.earliest.name);

  const ref = `refs/tags/${release.latest.name}`;
  const read = async (path, maxBytes) => http.raw(meta.fullName, ref, pluginPath(path), { maxBytes });
  const version = release.latest.version;
  try {
    const built = await buildFromFiles(await read("package.json", 1024 * 1024), read, inputs, assets);
    const git = { url: `https://github.com/${meta.fullName}.git` };
    if (subdir !== "") git.subdir = subdir;
    git.range = `>=${release.earliest.version}`;
    if (release.prefix !== "") git.tagPrefix = release.prefix;
    const entry = assembleEntry(built.mapped, {
      ...built,
      author: githubAuthor(meta.owner),
      source: { git },
      publishedAt: record.publishedAt,
    });
    return { ...record, candidate: withWarnings({ ...base, version, entry }, built.warnings) };
  } catch (error) {
    return { ...record, candidate: skipped({ ...base, version }, error) };
  }
}

async function processRepo({ http, meta, previous, inputs, assets, checkedAt }) {
  const record = {
    meta,
    crawlerVersion: CRAWLER_VERSION,
    checkedAt,
    plugins: {},
  };
  const repoCandidate = {
    key: `github:${meta.id}`,
    label: `github:${meta.fullName}`,
    repoId: meta.id,
    owner: meta.owner,
    checkedAt,
  };
  if (meta.fork) return { ...record, verdict: { ...repoCandidate, reason: "fork", detail: "Forks are not listed." } };
  if (meta.archived) {
    return { ...record, verdict: { ...repoCandidate, reason: "archived", detail: "Archived repositories are not listed." } };
  }

  const comparable =
    previous?.crawlerVersion === CRAWLER_VERSION && previous.meta?.fullName === meta.fullName;
  const tags = await http.api(`/repos/${meta.fullName}/git/matching-refs/tags`, {
    etag: comparable ? previous.tagsEtag : undefined,
  });
  if (tags.status === 304 && comparable) {
    return {
      ...previous,
      meta,
      checkedAt,
      verdict: previous.verdict === undefined ? undefined : { ...previous.verdict, checkedAt },
      plugins: Object.fromEntries(
        Object.entries(previous.plugins ?? {}).map(([subdir, plugin]) => [
          subdir,
          { ...plugin, candidate: { ...plugin.candidate, checkedAt } },
        ]),
      ),
    };
  }
  if (tags.status === 304) {
    // An ETag we cannot use for this record; ask again without it.
    return processRepo({ http, meta, previous: undefined, inputs, assets, checkedAt });
  }
  if (tags.status === 409 || tags.status === 404) {
    // An empty repository has no tags.
    tags.json = [];
  } else if (tags.status !== 200) {
    throw new TransientError(`${meta.fullName}: tags returned HTTP ${tags.status}`);
  }
  record.tagsEtag = tags.etag;
  const tagNames = (Array.isArray(tags.json) ? tags.json : [])
    .map((ref) => (typeof ref?.ref === "string" ? ref.ref.replace(/^refs\/tags\//, "") : undefined))
    .filter(Boolean);

  let subdirs = [""];
  const collection = await http.raw(meta.fullName, `refs/heads/${meta.defaultBranch}`, ".bb/plugins.json");
  if (collection !== undefined) {
    try {
      subdirs = parseCollectionManifest(collection.toString("utf8"));
    } catch (error) {
      // No tagsEtag: the next run reads .bb/plugins.json again, so a fix on
      // the default branch shows up without a new tag.
      delete record.tagsEtag;
      return { ...record, verdict: skipped(repoCandidate, error) };
    }
  }

  for (const subdir of subdirs) {
    record.plugins[subdir] = await processGithubPlugin({
      http,
      meta,
      subdir,
      tagNames,
      previous: comparable ? previous.plugins?.[subdir] : undefined,
      inputs,
      assets,
      checkedAt,
    });
  }
  return record;
}

function npmPackumentUrl(name) {
  return `${NPM_REGISTRY}/${name.replace("/", "%2f")}`;
}

async function processNpm({ http, name, previous, inputs, assets, checkedAt }) {
  const comparable = previous?.crawlerVersion === CRAWLER_VERSION;
  const result = await http.npm(npmPackumentUrl(name), {
    etag: comparable ? previous.etag : undefined,
  });
  if (result.status === 304 && comparable) {
    return { ...previous, checkedAt, candidate: { ...previous.candidate, checkedAt } };
  }
  if (result.status === 304) return processNpm({ http, name, previous: undefined, inputs, assets, checkedAt });
  if (result.status === 404) return null;
  const packument = result.json;
  const facts = npmVersionFacts(packument);
  const manifest = packument?.versions?.[facts.latest];
  if (manifest === undefined || packument.time?.unpublished !== undefined) return null;
  if (!hasOptInKeyword(manifest.keywords)) return null;

  const githubRepository = parseGithubRepository(manifest.repository ?? packument.repository);
  const base = {
    key: `npm:${name}`,
    label: `npm:${name}`,
    npmPackage: name,
    owner: githubRepository?.owner,
    ...(githubRepository === undefined ? {} : { npmRepository: githubRepository }),
    version: facts.latest,
    checkedAt,
  };
  const record = {
    etag: result.etag,
    latest: facts.latest,
    crawlerVersion: CRAWLER_VERSION,
    checkedAt,
  };
  if (manifest.deprecated) {
    return { ...record, candidate: { ...base, reason: "deprecated", detail: `${name}@${facts.latest} is deprecated.` } };
  }

  // The tarball only changes with `latest`; range, date, and author come
  // from the packument and are refreshed on every change.
  let built = comparable && previous.latest === facts.latest ? previous.built : undefined;
  if (built === undefined) {
    try {
      const tarballUrl = manifest.dist?.tarball;
      if (typeof tarballUrl !== "string") throw new Skip("no-manifest", "The latest version has no tarball.");
      const tarball = await http.npm(tarballUrl, { bytes: true });
      if (tarball.status !== 200) throw new TransientError(`${tarballUrl}: HTTP ${tarball.status}`);
      let files;
      try {
        files = readTarball(tarball.bytes, { maxBytes: NPM_TARBALL_MAX_BYTES });
      } catch (error) {
        throw new Skip("invalid-manifest", `The tarball cannot be read: ${error.message}`);
      }
      const read = async (path, maxBytes) => {
        const bytes = files.get(path);
        if (bytes === undefined) return undefined;
        return maxBytes !== undefined && bytes.length > maxBytes ? { tooLarge: true } : bytes;
      };
      built = await buildFromFiles(files.get("package.json"), read, inputs, assets);
    } catch (error) {
      built = { skip: skipped({}, error) };
    }
  }
  record.built = built;
  if (built.skip !== undefined) {
    return { ...record, candidate: { ...base, reason: built.skip.reason, detail: built.skip.detail } };
  }
  const entry = assembleEntry(built.mapped, {
    ...built,
    author: npmAuthor(packument, githubRepository),
    source: { npm: { package: name, range: `>=${facts.earliest}` } },
    publishedAt: facts.publishedAt,
  });
  return { ...record, candidate: withWarnings({ ...base, entry }, built.warnings) };
}

function emptyState() {
  return { version: 1, github: {}, npm: {}, claims: {} };
}

export function candidatesFromState(state) {
  const candidates = [];
  for (const record of Object.values(state.github)) {
    if (record.verdict !== undefined) {
      candidates.push(record.verdict);
      continue;
    }
    for (const plugin of Object.values(record.plugins ?? {})) {
      if (plugin.candidate !== undefined) candidates.push(plugin.candidate);
    }
  }
  for (const record of Object.values(state.npm)) {
    if (record.candidate !== undefined) candidates.push(record.candidate);
  }
  return candidates;
}

/**
 * One crawl. Returns the next state, the listings, the report, and the new
 * assets. Mutates nothing it is given.
 */
export async function crawl({
  root,
  state: previousState,
  http,
  now = new Date(),
  deadline = Number.POSITIVE_INFINITY,
  log = () => {},
  inputs = readRepositoryInputs(root),
}) {
  const state = structuredClone(previousState ?? emptyState());
  state.github ??= {};
  state.npm ??= {};
  state.claims ??= {};
  const checkedAt = now.toISOString();
  const assets = new Map();
  const problems = [];
  const keepPrevious = (what, error) => {
    problems.push(`${what}: ${error.message}`);
  };
  const timeLeft = () => Date.now() < deadline;

  // GitHub
  const github = await discoverGithub(http, now, log);
  const repoIds = [...new Set([...github.repos.keys(), ...Object.keys(state.github)])];
  await mapLimit(repoIds, 6, async (id) => {
    const previous = state.github[id];
    if (!timeLeft()) {
      if (previous === undefined) problems.push(`github ${id}: not reached before the time budget`);
      return;
    }
    try {
      let meta = github.repos.get(id);
      if (meta === undefined && !github.complete && previous !== undefined) {
        // Search failed: keep what we knew about the repository.
        meta = previous.meta;
      }
      if (meta === undefined) {
        // Search lags and misses removals; ask for the repository itself.
        const result = await http.api(`/repositories/${id}`, { etag: previous?.repoEtag });
        if (result.status === 404 || result.status === 410 || result.status === 451) {
          delete state.github[id];
          return;
        }
        if (result.status === 304) {
          meta = previous.meta;
        } else {
          meta = repoMeta(result.json);
          if (previous !== undefined) previous.repoEtag = result.etag;
        }
        if (meta.private || !meta.topics.includes(TOPIC)) {
          delete state.github[id];
          return;
        }
      }
      const record = await processRepo({ http, meta, previous, inputs, assets, checkedAt });
      if (previous?.repoEtag !== undefined && !github.repos.has(id)) record.repoEtag = previous.repoEtag;
      state.github[id] = record;
    } catch (error) {
      if (!(error instanceof TransientError)) throw error;
      keepPrevious(`github ${previous?.meta?.fullName ?? github.repos.get(id)?.fullName ?? id}`, error);
    }
  });

  // npm
  const npm = await discoverNpm(http, log);
  const names = [...new Set([...npm.names, ...Object.keys(state.npm)])];
  await mapLimit(names, 8, async (name) => {
    const previous = state.npm[name];
    if (!timeLeft()) return;
    try {
      const record = await processNpm({ http, name, previous, inputs, assets, checkedAt });
      if (record === null) delete state.npm[name];
      else state.npm[name] = record;
    } catch (error) {
      if (!(error instanceof TransientError)) throw error;
      keepPrevious(`npm ${name}`, error);
    }
  });

  const resolved = resolveListings({
    candidates: candidatesFromState(state),
    legacyEntries: inputs.legacyEntries,
    legacyListings: inputs.legacyListings,
    claims: state.claims,
    blocked: inputs.blocked,
    categoryIds: inputs.categoryIds,
    reserved: inputs.reserved,
    now: checkedAt,
  });
  state.version = 1;
  state.updatedAt = checkedAt;

  return {
    state,
    entries: { generatedAt: checkedAt, plugins: resolved.plugins, replacesLegacy: resolved.replacesLegacy },
    report: { generatedAt: checkedAt, sources: resolved.sources },
    assets,
    problems,
    discovery: {
      githubRepositories: github.repos.size,
      githubSearchComplete: github.complete,
      npmPackages: npm.names.size,
      npmSearchComplete: npm.complete,
    },
  };
}

export function summarize(result, legacyEntries) {
  const reasons = {};
  const warnings = {};
  const fromLegacy = {};
  let listed = 0;
  let github = 0;
  let npm = 0;
  const count = (table, key) => {
    table[key] = (table[key] ?? 0) + 1;
  };
  for (const [label, verdict] of Object.entries(result.report.sources)) {
    if (label.startsWith("github:")) github += 1;
    else npm += 1;
    if (verdict.status === "listed") listed += 1;
    else count(reasons, verdict.reason);
    for (const warning of verdict.warnings ?? []) count(warnings, warning.reason);
    for (const field of verdict.fromLegacy ?? []) count(fromLegacy, field);
  }
  const legacyIds = new Set(legacyEntries.map((entry) => entry.id));
  const legacyVerdicts = {};
  for (const verdict of Object.values(result.report.sources)) {
    if (verdict.id === undefined || !legacyIds.has(verdict.id)) continue;
    const key = verdict.status === "listed" ? (verdict.replaces ? "replaces" : "listed") : verdict.reason;
    legacyVerdicts[key] = (legacyVerdicts[key] ?? 0) + 1;
  }
  return {
    ...result.discovery,
    sources: { github, npm, total: github + npm },
    listed,
    listedNew: result.entries.plugins.filter((entry) => !legacyIds.has(entry.id)).length,
    replacesLegacy: result.entries.replacesLegacy.length,
    sourcesWithALegacyId: Object.fromEntries(Object.entries(legacyVerdicts).sort()),
    listedWithoutCategory: result.entries.plugins.filter((entry) => entry.category === undefined).length,
    skippedByReason: Object.fromEntries(Object.entries(reasons).sort()),
    warningsByReason: Object.fromEntries(Object.entries(warnings).sort()),
    keptFromLegacy: Object.fromEntries(Object.entries(fromLegacy).sort()),
    newAssets: result.assets.size,
    transientProblems: result.problems.length,
  };
}

function parseArgs(argv) {
  const args = { out: "dist/crawl", state: undefined, budgetSeconds: 900 };
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (flag === "--out") args.out = argv[++index];
    else if (flag === "--state") args.state = argv[++index];
    else if (flag === "--budget-seconds") args.budgetSeconds = Number(argv[++index]);
    else if (flag === "--dry-run") args.dryRun = true;
    else throw new Error(`unknown argument ${flag}`);
  }
  return args;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const args = parseArgs(process.argv.slice(2));
  const log = (message) => console.error(message);
  let previous;
  if (args.state !== undefined) {
    try {
      previous = readJson(args.state);
    } catch (error) {
      log(`warning: no usable state at ${args.state} (${error.message}); starting fresh`);
    }
  }
  const token = process.env.GITHUB_TOKEN || undefined;
  if (token === undefined) log("warning: GITHUB_TOKEN is not set; the API budget is 60 requests an hour");
  const http = createHttp({ token, log });
  const inputs = readRepositoryInputs(root);
  const result = await crawl({
    root,
    state: previous,
    http,
    log,
    inputs,
    deadline: Date.now() + args.budgetSeconds * 1000,
  });

  rmSync(join(args.out, "assets"), { recursive: true, force: true });
  mkdirSync(join(args.out, "assets"), { recursive: true });
  for (const [name, { bytes }] of result.assets) {
    writeFileSync(join(args.out, "assets", name), bytes);
  }
  const write = (name, value, pretty = false) =>
    writeFileSync(join(args.out, name), `${JSON.stringify(value, null, pretty ? 2 : undefined)}\n`);
  write("entries.json", result.entries);
  write("report.json", result.report, true);
  write("state.json", result.state);
  const summary = { ...summarize(result, inputs.legacyEntries), http: http.stats };
  write("summary.json", summary, true);
  for (const problem of result.problems) log(`warning: kept the last state for ${problem}`);
  console.log(JSON.stringify(summary, null, 2));
}

export { RateLimitError };
