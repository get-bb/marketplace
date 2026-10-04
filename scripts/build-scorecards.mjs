#!/usr/bin/env node
// Compose dist/v2/scorecards.json: the plugin scorecard sidecar the store
// renders beside a marketplace entry.
//
// Two scores per plugin, from two sources:
//
//   health  repository signals read from the GitHub API — hygiene,
//           maintenance, responsiveness, adoption.
//   review  automated scans of the release the entry actually resolves to —
//           obfuscation, network patterns, dependency vulnerabilities,
//           license, provenance, plus the capabilities the code reaches for.
//
// Every published version is scanned, not just the first submission: an entry
// tracking a semver range picks up new tags without a marketplace pull
// request, so a first-submission-only check would scan code nobody installs.
//
// The document is a sidecar for the same reasons stats.json is one — the
// marketplace schemas are strict, and these numbers move on their own cadence.
//
// Environment:
//   GITHUB_TOKEN  a token with public repository read access; without it the
//                 GitHub API allows 60 requests an hour and the run fails.
//   GENERATED_AT  ISO timestamp to stamp; defaults to now.
//
// Options:
//   --entry <id>       scan one entry; repeatable
//   --changed          scan only entries changed by the pull request
//   --concurrency <n>  plugins scanned in parallel (default 4)
//   --print            write the document to stdout instead of dist/
//   --fail-on-review   exit non-zero when a scanned entry fails its review
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  dependencyFinding,
  licenseFinding,
  provenanceFinding,
  scanRelease,
  scoreHealth,
  scoreReview,
  scorecardDocument,
} from "./scorecard-lib.mjs";
import { pullRequestEntryFiles } from "./marketplace-lib.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const args = process.argv.slice(2);
const printOnly = args.includes("--print");
const changedOnly = args.includes("--changed");
const failOnReview = args.includes("--fail-on-review");
const concurrency = Number(readOption("--concurrency") ?? 4);
const requestedIds = args.flatMap((value, index) =>
  value === "--entry" ? [args[index + 1]] : [],
);

/** Source files worth scanning. Anything else is noise or not text. */
const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json"]);
const SKIPPED_DIRECTORIES = new Set([
  ".git",
  "test",
  "tests",
  "__tests__",
  "e2e",
  "node_modules",
  "dist",
  "build",
  "out",
  "coverage",
  ".next",
  "vendor",
]);
const TEST_FILE_PATTERN = /\.(?:test|spec)\.[cm]?[jt]sx?$/;
/** One pathological file must not turn a scan into a memory incident. */
const MAX_FILE_BYTES = 2 * 1024 * 1024;
const MAX_SCANNED_FILES = 2000;

function readOption(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function entryIds() {
  const all = readdirSync(join(root, "entries"))
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.replace(/\.json$/, ""))
    .sort();
  if (requestedIds.length > 0) {
    const known = new Set(all);
    for (const id of requestedIds) {
      if (!known.has(id)) {
        console.error(`error: no entry file for "${id}"`);
        process.exit(1);
      }
    }
    return requestedIds;
  }
  if (!changedOnly) return all;

  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath === undefined) {
    console.error("error: --changed needs GITHUB_EVENT_PATH");
    process.exit(1);
  }
  return pullRequestEntryFiles(root, readJson(eventPath))
    .map((file) => file.replace(/^entries\//, "").replace(/\.json$/, ""))
    .filter((id) => all.includes(id));
}

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

const githubToken = process.env.GITHUB_TOKEN?.trim();

async function github(path, { accept = "application/vnd.github+json" } = {}) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      accept,
      "user-agent": "bb-marketplace-scorecards",
      ...(githubToken ? { authorization: `Bearer ${githubToken}` } : {}),
    },
    signal: AbortSignal.timeout(30_000),
  });
  if (response.status === 404) return null;
  if (response.status === 202) return { retryLater: true }; // statistics are being computed
  if (response.status === 403 || response.status === 429) {
    throw new Error(`GitHub rate limit reached on ${path}`);
  }
  if (!response.ok) throw new Error(`GitHub ${response.status} on ${path}`);
  if (response.status === 204) return null;
  return response.json();
}

/**
 * GitHub allows 30 search requests a minute against a far higher REST budget,
 * and a scan of every entry makes two search calls each. One shared queue
 * paces them so a wide run does not lose its issue counts to a 403.
 */
let searchChain = Promise.resolve();
function throttledSearch(path) {
  const result = searchChain.then(async () => {
    const answer = await githubWithRetry(path, 3, { rateLimitIsRetryable: true });
    await new Promise((resolve) => setTimeout(resolve, 2100));
    return answer;
  });
  searchChain = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function githubWithRetry(path, attempts = 4, { rateLimitIsRetryable = false } = {}) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const result = await github(path);
      if (result?.retryLater !== true) return result;
    } catch (error) {
      const isRateLimit = error instanceof Error && error.message.includes("rate limit");
      if (!isRateLimit || !rateLimitIsRetryable || attempt === attempts - 1) throw error;
      // The window is a minute wide; waiting it out beats losing the signal.
      await new Promise((resolve) => setTimeout(resolve, 20_000));
      continue;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
  }
  return null;
}

/** github.com/<owner>/<repo>[.git] — the only Git host entries use today. */
function parseGitHubRepo(url) {
  const match = /^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/.exec(url ?? "");
  return match === null ? null : { owner: match[1], repo: match[2] };
}

async function repositorySignals(owner, repo, installs) {
  const [repository, community, participation, latestRelease, contributors] = await Promise.all([
    github(`/repos/${owner}/${repo}`),
    github(`/repos/${owner}/${repo}/community/profile`),
    // GitHub computes commit statistics on demand and answers 202 while it
    // works. Taking that as zero would score an active repository as dormant.
    githubWithRetry(`/repos/${owner}/${repo}/stats/participation`),
    github(`/repos/${owner}/${repo}/releases/latest`),
    github(`/repos/${owner}/${repo}/contributors?per_page=100`),
  ]);
  if (repository === null) throw new Error(`repository ${owner}/${repo} is not reachable`);

  const files = community?.files ?? {};
  const openIssues = await issueCount(owner, repo, "open");
  const closedIssues = await issueCount(owner, repo, "closed");

  return {
    hasReadme: files.readme !== null && files.readme !== undefined,
    hasLicense: files.license !== null && files.license !== undefined,
    hasContributing: files.contributing !== null && files.contributing !== undefined,
    hasDescription: typeof repository.description === "string" && repository.description.length > 0,
    lastCommitAt: repository.pushed_at ?? null,
    lastReleaseAt:
      latestRelease?.published_at ?? (await newestTagDate(owner, repo)),
    commitsPastYear: (participation?.all ?? []).reduce((total, week) => total + week, 0),
    contributors: Array.isArray(contributors) ? contributors.length : 0,
    openIssues,
    closedIssues,
    installs,
    stars: repository.stargazers_count ?? 0,
    license: repository.license?.spdx_id === "NOASSERTION" ? null : repository.license?.spdx_id ?? null,
  };
}

/**
 * A repository can tag releases without ever creating a GitHub Release, and
 * BB installs from tags. Fall back to the newest tag's commit date so those
 * repositories are not scored as if they never shipped.
 */
async function newestTagDate(owner, repo) {
  const tags = await github(`/repos/${owner}/${repo}/tags?per_page=1`);
  const sha = Array.isArray(tags) ? tags[0]?.commit?.sha : undefined;
  if (sha === undefined) return null;
  const commit = await github(`/repos/${owner}/${repo}/commits/${sha}`);
  return commit?.commit?.committer?.date ?? null;
}

/**
 * Issue counts come from search because /repos gives open only, and counts
 * pull requests in with them. `is:issue` keeps pull requests out of a number
 * the store presents as issue responsiveness.
 */
async function issueCount(owner, repo, state) {
  const query = encodeURIComponent(`repo:${owner}/${repo} is:issue is:${state}`);
  const result = await throttledSearch(`/search/issues?q=${query}&per_page=1`);
  return result?.total_count ?? 0;
}

// ---------------------------------------------------------------------------
// Release sources
// ---------------------------------------------------------------------------

/**
 * Resolve the entry's source to the exact release a user installs today, and
 * unpack it. A range source resolves to its highest matching tag, which is
 * what BB itself installs.
 */
function resolveGitRelease({ url, ref, range, tagPrefix }) {
  if (range === undefined) return { ref, label: ref, isTag: false };
  const prefix = tagPrefix ?? "";
  const output = execFileSync("git", ["ls-remote", "--tags", url, `refs/tags/${prefix}v*`], {
    encoding: "utf8",
    timeout: 60_000,
  });
  const pattern = new RegExp(
    `refs/tags/${prefix.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&")}(v\\d+\\.\\d+\\.\\d+)$`,
  );
  const versions = output
    .split("\n")
    .map((line) => pattern.exec(line.trim())?.[1])
    .filter((value) => value !== undefined)
    .sort(compareVersions);
  const highest = versions.at(-1);
  if (highest === undefined) throw new Error(`no ${prefix}vX.Y.Z tag matches "${range}"`);
  return { ref: `${prefix}${highest}`, label: highest, isTag: true };
}

function compareVersions(left, right) {
  const parse = (value) => value.replace(/^v/, "").split(".").map(Number);
  const [a, b] = [parse(left), parse(right)];
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index];
  }
  return 0;
}

function downloadArchive(url, directory) {
  // curl and tar, rather than a dependency: the repository has no runtime
  // dependencies and this file should not add one.
  const archive = join(directory, "release.tar.gz");
  execFileSync("curl", ["-sSL", "--max-time", "120", "-o", archive, url], { timeout: 180_000 });
  const extracted = join(directory, "source");
  mkdirSync(extracted, { recursive: true });
  execFileSync("tar", ["-xzf", archive, "-C", extracted, "--strip-components", "1"], {
    timeout: 180_000,
  });
  return extracted;
}

function collectSourceFiles(directory) {
  const files = [];
  const walk = (current) => {
    if (files.length >= MAX_SCANNED_FILES) return;
    for (const item of readdirSync(current, { withFileTypes: true })) {
      if (files.length >= MAX_SCANNED_FILES) return;
      if (item.isSymbolicLink()) continue;
      const path = join(current, item.name);
      if (item.isDirectory()) {
        if (!SKIPPED_DIRECTORIES.has(item.name)) walk(path);
        continue;
      }
      if (!item.isFile()) continue;
      const extension = item.name.slice(item.name.lastIndexOf("."));
      if (!SOURCE_EXTENSIONS.has(extension)) continue;
      // A test file is not installed, so what it reaches for is not a
      // capability of the plugin.
      if (TEST_FILE_PATTERN.test(item.name)) continue;
      if (statSync(path).size > MAX_FILE_BYTES) continue;
      files.push({ path: relative(directory, path), text: readFileSync(path, "utf8") });
    }
  };
  walk(directory);
  return files;
}

// ---------------------------------------------------------------------------
// Dependencies
// ---------------------------------------------------------------------------

/**
 * The production closure, at the exact versions the lockfile pins.
 *
 * Walking from the root's runtime dependencies matters more than it looks:
 * a `dev: true` flag is not on every lockfile entry, and counting a test
 * runner's advisory against a plugin that never ships it is the fastest way
 * to make every scorecard noise.
 */
function lockedDependencies(directory) {
  let lock;
  try {
    lock = readJson(join(directory, "package-lock.json"));
  } catch {
    return null;
  }
  const packages = lock.packages ?? {};
  const root = packages[""];
  if (root === undefined) return null;

  /** Node resolution: nearest node_modules wins, walking up from the importer. */
  const resolve = (importerPath, name) => {
    let prefix = importerPath;
    for (;;) {
      const candidate = prefix === "" ? `node_modules/${name}` : `${prefix}/node_modules/${name}`;
      if (packages[candidate] !== undefined) return candidate;
      const cut = prefix.lastIndexOf("/node_modules/");
      if (cut === -1) return undefined;
      prefix = prefix.slice(0, cut);
    }
  };

  const found = new Map();
  const queue = [["", { ...root.dependencies, ...root.optionalDependencies }]];
  const visited = new Set([""]);
  while (queue.length > 0) {
    const [importerPath, dependencies] = queue.shift();
    for (const name of Object.keys(dependencies ?? {})) {
      const path = resolve(importerPath, name);
      if (path === undefined || visited.has(path)) continue;
      visited.add(path);
      const entry = packages[path];
      if (typeof entry?.version !== "string") continue;
      found.set(`${name}@${entry.version}`, { name, version: entry.version });
      queue.push([path, { ...entry.dependencies, ...entry.optionalDependencies }]);
    }
  }
  return [...found.values()];
}

/** OSV.dev takes a batch query and needs no key. */
async function queryVulnerabilities(dependencies) {
  if (dependencies === null) return null;
  if (dependencies.length === 0) return [];
  const found = [];
  for (let index = 0; index < dependencies.length; index += 500) {
    const batch = dependencies.slice(index, index + 500);
    const response = await fetch("https://api.osv.dev/v1/querybatch", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        queries: batch.map(({ name, version }) => ({
          package: { name, ecosystem: "npm" },
          version,
        })),
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!response.ok) throw new Error(`OSV query failed with HTTP ${response.status}`);
    const body = await response.json();
    (body.results ?? []).forEach((result, position) => {
      for (const vulnerability of result.vulns ?? []) {
        const dependency = batch[position];
        found.push({
          package: dependency.name,
          version: dependency.version,
          id: vulnerability.id,
          critical: isCritical(vulnerability),
        });
      }
    });
  }
  return found;
}

function isCritical(vulnerability) {
  const severities = [
    ...(vulnerability.severity ?? []).map((item) => item.score ?? ""),
    vulnerability.database_specific?.severity ?? "",
  ];
  return severities.some((value) => /CRITICAL/i.test(value) || /\/AV:N\/.*\/C:H\/I:H\/A:H/.test(value));
}

const npmManifests = new Map();

async function npmManifest(packageName, version) {
  const key = `${packageName}@${version ?? "latest"}`;
  if (!npmManifests.has(key)) {
    npmManifests.set(
      key,
      fetch(`https://registry.npmjs.org/${packageName.replace("/", "%2F")}/${version ?? "latest"}`, {
        headers: { accept: "application/json" },
        signal: AbortSignal.timeout(30_000),
      })
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null),
    );
  }
  return npmManifests.get(key);
}

/** package.json `repository` takes several shapes; only a GitHub URL is useful here. */
function normalizeRepositoryUrl(repository) {
  const raw = typeof repository === "string" ? repository : repository?.url;
  if (typeof raw !== "string") return undefined;
  return raw
    .replace(/^git\+/, "")
    .replace(/^git:\/\//, "https://")
    .replace(/^github:/, "https://github.com/")
    .replace(/^git@github\.com:/, "https://github.com/");
}

async function npmProvenance(packageName, version) {
  const manifest = await npmManifest(packageName, version);
  return manifest?.dist?.attestations !== undefined;
}

// ---------------------------------------------------------------------------
// One plugin
// ---------------------------------------------------------------------------

async function buildScorecard(id, installCounts) {
  const entry = readJson(join(root, "entries", `${id}.json`));
  // An npm entry names no repository, but its published manifest usually
  // does, and health without it would leave most npm plugins unrated.
  const repository =
    parseGitHubRepo(entry.source?.git?.url) ??
    (entry.source?.npm === undefined
      ? null
      : parseGitHubRepo(
          normalizeRepositoryUrl(
            (await npmManifest(entry.source.npm.package, entry.source.npm.version))?.repository,
          ),
        ));
  const scorecard = { id };

  // An entry without a readable repository still gets a review; health stays
  // null rather than being guessed, and a GitHub failure degrades the same way
  // instead of costing the plugin its whole scorecard.
  scorecard.health = null;
  if (repository !== null) {
    scorecard.repository = `${repository.owner}/${repository.repo}`;
    try {
      const signals = await repositorySignals(repository.owner, repository.repo, installCounts[id] ?? 0);
      scorecard.health = scoreHealth(signals);
      scorecard.license = signals.license;
    } catch (error) {
      console.error(`warning: ${id}: health unavailable. ${error instanceof Error ? error.message : error}`);
    }
  }

  const workspace = mkdtempSync(join(tmpdir(), `scorecard-${id}-`));
  try {
    let sourceDirectory;
    let releaseLabel;
    if (entry.source?.git !== undefined && repository !== null) {
      const release = resolveGitRelease(entry.source.git);
      releaseLabel = release.label;
      sourceDirectory = downloadArchive(
        // refs/tags/ explicitly: a tag prefixed with a plugin name contains a
        // slash, which the shorthand form resolves as a branch path.
        `https://codeload.github.com/${repository.owner}/${repository.repo}/tar.gz/${
          release.isTag ? `refs/tags/${release.ref}` : release.ref
        }`,
        workspace,
      );
      // A monorepo entry names the one directory BB installs from. Scanning
      // the whole repository would score a plugin on its siblings' code.
      const subdirectory = entry.source.git.subdir;
      if (subdirectory !== undefined) {
        const scoped = join(sourceDirectory, subdirectory);
        if (!existsSync(scoped)) throw new Error(`subdir "${subdirectory}" is missing from the release`);
        sourceDirectory = scoped;
      }
    } else if (entry.source?.npm !== undefined) {
      const { package: packageName, version } = entry.source.npm;
      const metadata = await npmManifest(packageName, version);
      if (metadata?.dist?.tarball === undefined) throw new Error("npm package has no tarball");
      releaseLabel = metadata.version;
      sourceDirectory = downloadArchive(metadata.dist.tarball, workspace);
    } else {
      throw new Error("entry has no git or npm source");
    }

    let manifest = {};
    try {
      manifest = readJson(join(sourceDirectory, "package.json"));
    } catch {
      // A release without a package.json is odd but not a scan failure; the
      // capability probes still read the sources.
    }

    const files = collectSourceFiles(sourceDirectory);
    const scan = scanRelease(files, manifest);
    const vulnerabilities = await queryVulnerabilities(lockedDependencies(sourceDirectory));
    const attested =
      entry.source?.npm === undefined
        ? false
        : await npmProvenance(entry.source.npm.package, entry.source.npm.version);

    const findings = [
      ...scan.findings,
      dependencyFinding(vulnerabilities),
      licenseFinding(manifest.license ?? scorecard.license),
      provenanceFinding(entry.source, attested),
    ];
    scorecard.review = {
      ...scoreReview(findings),
      release: releaseLabel,
      scannedFiles: files.length,
      capabilities: scan.capabilities,
    };
  } catch (error) {
    scorecard.review = {
      ...scoreReview([]),
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }

  return scorecard;
}

/** Fixed-size worker pool: 153 entries at once would trip every rate limit. */
async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.max(1, Math.min(limit, items.length)) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

if (!githubToken) {
  console.error("error: GITHUB_TOKEN is not set; the unauthenticated API allows 60 requests an hour");
  process.exit(1);
}

let installCounts = {};
try {
  const response = await fetch("https://getbb.app/marketplace/v1/stats.json", {
    signal: AbortSignal.timeout(30_000),
  });
  if (response.ok) {
    const body = await response.json();
    installCounts = Object.fromEntries(
      Object.entries(body.plugins ?? {}).map(([id, value]) => [id, value.installs ?? 0]),
    );
  }
} catch {
  // Adoption falls back to stars alone; a missing sidecar must not fail a scan.
  console.error("warning: install counts are unavailable; adoption uses stars only");
}

const ids = entryIds();
const scorecards = {};
const failures = [];
const results = await mapWithConcurrency(ids, concurrency, async (id) => {
  try {
    return await buildScorecard(id, installCounts);
  } catch (error) {
    failures.push(`${id}: ${error instanceof Error ? error.message : error}`);
    return null;
  }
});
for (const scorecard of results) {
  if (scorecard === null) continue;
  const { id, ...rest } = scorecard;
  scorecards[id] = rest;
}

for (const failure of failures) console.error(`warning: ${failure}`);

if (Object.keys(scorecards).length === 0) {
  // Publishing an empty document would blank every scorecard in the store.
  console.error("error: no scorecard could be built");
  process.exit(1);
}

const document = scorecardDocument(scorecards, process.env.GENERATED_AT);
const bytes = `${JSON.stringify(document, null, 2)}\n`;

if (printOnly) {
  process.stdout.write(bytes);
} else {
  mkdirSync(join(root, "dist", "v2"), { recursive: true });
  writeFileSync(join(root, "dist", "v2", "scorecards.json"), bytes);
  console.log(`built dist/v2/scorecards.json with ${Object.keys(scorecards).length} scorecards`);
}

// The per-plugin log goes to stderr: with --print, stdout is the document
// and a caller pipes it straight into a file.
for (const [id, scorecard] of Object.entries(scorecards)) {
  const health = scorecard.health?.grade ?? "unrated";
  console.error(`${id}: health ${health}, review ${scorecard.review.verdict}`);
}

if (failOnReview) {
  const failed = Object.entries(scorecards).filter(([, value]) => value.review.verdict === "failed");
  for (const [id, value] of failed) {
    for (const item of value.review.findings.filter((finding) => finding.severity === "fail")) {
      console.error(`error: ${id}: ${item.message}`);
    }
  }
  if (failed.length > 0) process.exit(1);
}
