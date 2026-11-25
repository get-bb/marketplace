import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import {
  REASONS,
  Skip,
  WARNINGS,
  carryOverLegacy,
  derivePluginId,
  keywordsToTags,
  mapManifest,
  normalizeSubdir,
  npmVersionFacts,
  parseGithubRepository,
  qualifyingTags,
  readTarball,
  resolveListings,
  sameSource,
  selectRelease,
  tagPrefixesFor,
} from "../scripts/crawl-lib.mjs";
import { RateLimitError, createHttp } from "../scripts/crawl-http.mjs";
import { ASSET_URL_BASE, crawl, readLegacyListings } from "../scripts/crawl.mjs";
import { getIndexFile, rankingDue } from "../scripts/index-cache.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const categoryIds = new Set(["utilities", "security", "thread-content"]);
const reserved = { reservedPrefix: "bb--", bundledPluginIds: ["github", "memory"] };
const NOW = new Date("2026-11-25T12:00:00Z");

// ---------------------------------------------------------------- helpers

function png(width) {
  const bytes = Buffer.alloc(33);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(bytes, 0);
  bytes.writeUInt32BE(13, 8);
  bytes.write("IHDR", 12, "ascii");
  bytes.writeUInt32BE(width, 16);
  bytes.writeUInt32BE(800, 20);
  return bytes;
}

const SVG = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z"/></svg>');

function tarball(files) {
  const blocks = [];
  for (const [name, content] of Object.entries(files)) {
    const body = Buffer.isBuffer(content) ? content : Buffer.from(content);
    const header = Buffer.alloc(512);
    header.write(`package/${name}`, 0, "utf8");
    header.write("0000644\0", 100);
    header.write("0000000\0", 108);
    header.write("0000000\0", 116);
    header.write(`${body.length.toString(8).padStart(11, "0")}\0`, 124);
    header.write("00000000000\0", 136);
    header.write("        ", 148);
    header.write("0", 156);
    header.write("ustar\0", 257);
    header.write("00", 263);
    let sum = 0;
    for (const byte of header) sum += byte;
    header.write(`${sum.toString(8).padStart(6, "0")}\0 `, 148);
    blocks.push(header, body, Buffer.alloc((512 - (body.length % 512)) % 512));
  }
  blocks.push(Buffer.alloc(1024));
  return gzipSync(Buffer.concat(blocks));
}

function manifest(overrides = {}) {
  return {
    name: "bb-plugin-notes",
    keywords: ["bb-plugin", "Notes", "markdown"],
    bb: { name: "Notes", description: "Take notes." },
    bbMarketplace: { category: "utilities" },
    ...overrides,
  };
}

/**
 * A fetch that answers from a route table. A route value is a function of
 * the request (url, headers) or a static `{ status, json, body, headers }`.
 */
function mockFetch(routes) {
  const calls = [];
  const fetchImpl = async (url, init = {}) => {
    calls.push({ url, headers: init.headers ?? {} });
    const route = routes[url] ?? routes[url.replace(/\?.*$/, "?*")];
    if (route === undefined) return new Response("not found", { status: 404 });
    const value = typeof route === "function" ? route(url, init.headers ?? {}) : route;
    const headers = new Headers(value.headers ?? {});
    let body = value.body ?? null;
    if (value.json !== undefined) {
      body = JSON.stringify(value.json);
      headers.set("content-type", "application/json");
    }
    return new Response(value.status === 304 ? null : body, { status: value.status ?? 200, headers });
  };
  return { fetchImpl, calls };
}

const repoItem = (id, fullName, extra = {}) => ({
  id,
  full_name: fullName,
  owner: { login: fullName.split("/")[0] },
  fork: false,
  archived: false,
  private: false,
  default_branch: "main",
  topics: ["bb-plugin"],
  ...extra,
});

const tagRefs = (names) => names.map((name) => ({ ref: `refs/tags/${name}`, object: { sha: "a".repeat(40), type: "commit" } }));
const raw = (fullName, ref, path) => `https://raw.githubusercontent.com/${fullName}/${ref}/${path}`;
const commit = (date) => ({ json: { sha: "b".repeat(40), commit: { committer: { date } } } });

function etagged(etag, value) {
  return (_url, headers) =>
    headers["if-none-match"] === etag ? { status: 304, headers: { etag } } : { ...value, headers: { etag } };
}

const legacyEntries = [
  {
    id: "monorepo-tool",
    displayName: "Old name",
    description: "Old.",
    icon: "Wrench",
    author: { name: "Someone", github: "acme" },
    category: "security",
    secondaryCategories: ["thread-content"],
    source: { git: { url: "https://github.com/acme/old-place.git", range: "^0.1.0" } },
  },
  {
    id: "taken",
    displayName: "Taken",
    description: "Legacy.",
    icon: "Wrench",
    author: { name: "Owner", github: "rightful" },
    source: { git: { url: "https://github.com/rightful/bb-plugin-taken.git", range: "^1.0.0" } },
  },
];

function world({ notesTags = ["v0.1.0", "v0.2.0", "v0.3.0-beta.1", "0.9.0"] } = {}) {
  const search = {
    total_count: 5,
    incomplete_results: false,
    items: [
      repoItem(1, "alice/bb-plugin-notes"),
      repoItem(2, "acme/tools"),
      repoItem(3, "bob/bb-plugin-notes-fork", { fork: true }),
      repoItem(4, "mallory/bb-plugin-taken"),
      repoItem(5, "carol/bb-plugin-npm-twin"),
    ],
  };
  const routes = {
    "https://api.github.com/search/repositories?*": { json: search },
    // alice/bb-plugin-notes: a root plugin with icon, screenshot, overview.
    "https://api.github.com/repos/alice/bb-plugin-notes/git/matching-refs/tags": etagged('"t1"', { json: tagRefs(notesTags) }),
    "https://api.github.com/repos/alice/bb-plugin-notes/commits/v0.1.0": commit("2026-10-01T10:00:00Z"),
    [raw("alice/bb-plugin-notes", "refs/tags/v0.2.0", "package.json")]: {
      body: JSON.stringify(
        manifest({
          bb: { name: "Notes", description: "Take notes.", branding: { icon: "./icon.svg" } },
          bbMarketplace: { category: "utilities", secondaryCategories: ["security"], screenshots: ["./shots/a.png"] },
        }),
      ),
    },
    [raw("alice/bb-plugin-notes", "refs/tags/v0.2.0", "icon.svg")]: { body: SVG },
    [raw("alice/bb-plugin-notes", "refs/tags/v0.2.0", "shots/a.png")]: { body: png(1400) },
    [raw("alice/bb-plugin-notes", "refs/tags/v0.2.0", "PLUGIN_OVERVIEW.md")]: { body: "# Notes\n\nWrite things down.\n" },
    // acme/tools: two plugins from .bb/plugins.json; one tags by basename,
    // one by plugin id; a third has no tags.
    "https://api.github.com/repos/acme/tools/git/matching-refs/tags": etagged('"t2"', {
      json: tagRefs(["alpha/v1.0.0", "alpha/v1.1.0", "monorepo-tool/v2.0.0", "v9.9.9"]),
    }),
    [raw("acme/tools", "refs/heads/main", ".bb/plugins.json")]: {
      body: JSON.stringify({
        schemaVersion: 1,
        name: "tools",
        plugins: [
          { name: "alpha", source: "./plugins/alpha" },
          { name: "beta", source: "./plugins/beta-dir" },
          { name: "gamma", source: "./plugins/gamma" },
        ],
      }),
    },
    "https://api.github.com/repos/acme/tools/commits/alpha%2Fv1.0.0": commit("2026-09-01T00:00:00Z"),
    // alpha has no category and an overview over 4000 characters.
    [raw("acme/tools", "refs/tags/alpha/v1.1.0", "plugins/alpha/package.json")]: {
      body: JSON.stringify(manifest({ name: "@acme/bb-plugin-alpha", bb: { name: "Alpha", description: "A." }, bbMarketplace: undefined })),
    },
    [raw("acme/tools", "refs/tags/alpha/v1.1.0", "plugins/alpha/PLUGIN_OVERVIEW.md")]: { body: "a".repeat(4100) },
    [raw("acme/tools", "refs/heads/main", "plugins/beta-dir/package.json")]: {
      body: JSON.stringify(manifest({ name: "monorepo-tool" })),
    },
    "https://api.github.com/repos/acme/tools/commits/monorepo-tool%2Fv2.0.0": commit("2026-08-01T00:00:00Z"),
    // monorepo-tool replaces a legacy entry and has no category, screenshots,
    // or overview of its own.
    [raw("acme/tools", "refs/tags/monorepo-tool/v2.0.0", "plugins/beta-dir/package.json")]: {
      body: JSON.stringify(manifest({ name: "monorepo-tool", bb: { name: "Monorepo tool", description: "M." }, bbMarketplace: undefined })),
    },
    // mallory squats the legacy id "taken" from another owner.
    "https://api.github.com/repos/mallory/bb-plugin-taken/git/matching-refs/tags": { json: tagRefs(["v1.0.0"]) },
    "https://api.github.com/repos/mallory/bb-plugin-taken/commits/v1.0.0": commit("2026-11-01T00:00:00Z"),
    [raw("mallory/bb-plugin-taken", "refs/tags/v1.0.0", "package.json")]: {
      body: JSON.stringify(manifest({ name: "bb-plugin-taken" })),
    },
    // carol publishes the same plugin on GitHub and npm.
    "https://api.github.com/repos/carol/bb-plugin-npm-twin/git/matching-refs/tags": { json: tagRefs(["v1.0.0"]) },
    "https://api.github.com/repos/carol/bb-plugin-npm-twin/commits/v1.0.0": commit("2026-11-02T00:00:00Z"),
    [raw("carol/bb-plugin-npm-twin", "refs/tags/v1.0.0", "package.json")]: {
      body: JSON.stringify(manifest({ name: "bb-plugin-npm-twin" })),
    },
    // npm
    "https://registry.npmjs.org/-/v1/search?*": {
      json: { total: 3, objects: [{ package: { name: "bb-plugin-npm-twin" } }, { package: { name: "@dave/bb-plugin-old" } }, { package: { name: "not-opted-in" } }] },
    },
    "https://registry.npmjs.org/bb-plugin-npm-twin": etagged('"p1"', {
      json: {
        name: "bb-plugin-npm-twin",
        "dist-tags": { latest: "1.2.0" },
        maintainers: [{ name: "carol-npm", email: "c@example.com" }],
        time: { created: "2026-07-01T00:00:00.000Z", "1.0.0": "2026-07-01T00:00:00.000Z", "1.1.0": "2026-08-01T00:00:00.000Z", "1.2.0": "2026-09-01T00:00:00.000Z" },
        versions: {
          "1.0.0": { deprecated: "broken" },
          "1.1.0": {},
          "1.2.0": {
            keywords: ["bb-plugin"],
            repository: { type: "git", url: "git+https://github.com/carol/bb-plugin-npm-twin.git" },
            dist: { tarball: "https://registry.npmjs.org/bb-plugin-npm-twin/-/bb-plugin-npm-twin-1.2.0.tgz" },
          },
        },
      },
    }),
    "https://registry.npmjs.org/bb-plugin-npm-twin/-/bb-plugin-npm-twin-1.2.0.tgz": {
      body: tarball({
        "package.json": JSON.stringify(manifest({ name: "bb-plugin-npm-twin", bb: { name: "Twin", description: "From npm.", branding: { icon: "Sparkles" } } })),
        "PLUGIN_OVERVIEW.md": "Twin overview.\n",
      }),
    },
    "https://registry.npmjs.org/@dave%2fbb-plugin-old": {
      json: {
        name: "@dave/bb-plugin-old",
        "dist-tags": { latest: "2.0.0" },
        time: { "2.0.0": "2026-01-01T00:00:00.000Z" },
        versions: { "2.0.0": { keywords: ["bb-plugin"], deprecated: "use something else", dist: { tarball: "x" } } },
      },
    },
    "https://registry.npmjs.org/not-opted-in": {
      json: { name: "not-opted-in", "dist-tags": { latest: "1.0.0" }, versions: { "1.0.0": { keywords: ["other"] } } },
    },
  };
  return routes;
}

const LEGACY_SHOT = "https://getbb.app/marketplace/v1/screenshots/monorepo-tool/a.png";
const inputs = (extra = {}) => ({
  categoryIds,
  reserved,
  blocked: {},
  legacyEntries,
  legacyListings: new Map([["monorepo-tool", { screenshots: [LEGACY_SHOT], overview: "Legacy overview.\n" }]]),
  ...extra,
});

async function runCrawl(routes, { state, extra } = {}) {
  const { fetchImpl, calls } = mockFetch(routes);
  const http = createHttp({ fetchImpl, token: "test-token", sleep: async () => {} });
  const result = await crawl({ root, state, http, now: NOW, inputs: inputs(extra) });
  return { result, calls, http };
}

// ---------------------------------------------------------------- tag rules

test("qualifying tags are stable <prefix>vX.Y.Z tags, lowest first", () => {
  const tags = ["v1.0.0", "v1.10.0", "v1.2.0", "v2.0.0-rc.1", "1.5.0", "v01.0.0", "v1.0.0+build", "notes/v3.0.0"];
  assert.deepEqual(
    qualifyingTags(tags, "").map((tag) => tag.name),
    ["v1.0.0", "v1.2.0", "v1.10.0"],
  );
  assert.deepEqual(qualifyingTags(tags, "notes/").map((tag) => tag.name), ["notes/v3.0.0"]);
});

test("release selection uses the first prefix with tags", () => {
  const tags = ["alpha/v1.0.0", "alpha/v1.4.2", "my-alpha/v9.0.0", "v5.0.0"];
  const release = selectRelease(tags, tagPrefixesFor("plugins/alpha", "my-alpha"));
  assert.equal(release.prefix, "alpha/");
  assert.equal(release.latest.name, "alpha/v1.4.2");
  assert.equal(release.earliest.version, "1.0.0");
  assert.equal(selectRelease(["my-alpha/v9.0.0"], tagPrefixesFor("plugins/alpha", "my-alpha")).prefix, "my-alpha/");
  assert.deepEqual(tagPrefixesFor("", "x"), [""]);
  assert.equal(selectRelease(["v1.0.0-beta.1"], [""]), undefined);
});

test("collection sources normalize to subdirs", () => {
  assert.equal(normalizeSubdir("./plugins/x"), "plugins/x");
  assert.equal(normalizeSubdir("./"), "");
  assert.equal(normalizeSubdir("plugins/x"), undefined);
  assert.equal(normalizeSubdir("./../x"), undefined);
});

// ---------------------------------------------------------------- metadata

test("plugin ids follow derivePluginId and the reserved list", () => {
  assert.equal(derivePluginId("@scope/bb-plugin-My_Tool", reserved), "my-tool");
  for (const [name, reason] of [
    ["github", "id-reserved"],
    ["bb--secret", "id-reserved"],
    ["npm", "id-reserved"],
    ["@x/---", "invalid-manifest"],
  ]) {
    assert.throws(() => derivePluginId(name, reserved), (error) => error instanceof Skip && error.reason === reason);
  }
});

test("keywords become at most 10 kebab tags without the opt-in words", () => {
  assert.deepEqual(
    keywordsToTags(["bb-plugin", "BB", "bb-plugins", "Git", "git", "two words", "ok-tag", "a".repeat(33), 7, "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"]),
    ["git", "ok-tag", "x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8"],
  );
});

test("manifest mapping enforces bbMarketplace", () => {
  const map = (pkg) => mapManifest(pkg, { categoryIds, reserved });
  const reason = (pkg) => {
    try {
      map(pkg);
      return "ok";
    } catch (error) {
      return error.reason;
    }
  };
  const mapped = map(manifest({ bbMarketplace: { category: "utilities", secondaryCategories: ["security"], screenshots: ["./a.png", "b/c.webp"] } }));
  assert.equal(mapped.id, "notes");
  assert.deepEqual(mapped.tags, ["notes", "markdown"]);
  assert.deepEqual(mapped.screenshots, ["a.png", "b/c.webp"]);
  assert.deepEqual(mapped.icon, { name: "Puzzle" });
  assert.deepEqual(map(manifest({ bb: { name: "N", description: "D", branding: { icon: "./i.svg" } } })).icon, { path: "i.svg" });
  assert.deepEqual(map(manifest({ bb: { name: "N", description: "D", branding: { icon: "Rocket" } } })).icon, { name: "Rocket" });

  // The category is optional; its absence is a warning.
  for (const bbMarketplace of [undefined, {}, { category: "" }]) {
    const withoutCategory = map(manifest({ bbMarketplace }));
    assert.equal(withoutCategory.category, undefined);
    assert.deepEqual(withoutCategory.warnings.map(({ reason }) => reason), ["missing-category"]);
  }
  const secondaryOnly = map(manifest({ bbMarketplace: { secondaryCategories: ["security"] } }));
  assert.equal(secondaryOnly.secondaryCategories, undefined);
  assert.match(secondaryOnly.warnings[0].detail, /secondaryCategories is ignored/);
  assert.deepEqual(mapped.warnings, []);
  assert.equal(reason(manifest({ bbMarketplace: { secondaryCategories: ["nope"] } })), "unknown-category");
  assert.equal(reason(manifest({ bbMarketplace: { category: 3 } })), "unknown-category");
  assert.equal(reason(manifest({ bbMarketplace: { category: "nope" } })), "unknown-category");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", secondaryCategories: ["nope"] } })), "unknown-category");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", secondaryCategories: ["utilities"] } })), "invalid-manifest");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", catgory: "x" } })), "invalid-manifest");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", screenshots: Array(7).fill("a.png") } })), "invalid-screenshot");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", screenshots: ["../a.png"] } })), "invalid-screenshot");
  assert.equal(reason(manifest({ bbMarketplace: { category: "utilities", screenshots: ["https://x/a.png"] } })), "invalid-screenshot");
  assert.equal(reason(manifest({ bb: { name: "N", description: "D", branding: { icon: "./icon.gif" } } })), "invalid-icon");
  assert.equal(reason(manifest({ bb: { name: "", description: "D" } })), "invalid-manifest");
  assert.equal(reason(manifest({ bb: undefined })), "invalid-manifest");
  assert.equal(reason(manifest({ name: "memory" })), "id-reserved");
});

test("npm repository fields map to a GitHub owner", () => {
  assert.deepEqual(parseGithubRepository("github:a/b"), { owner: "a", repo: "b", subdir: "" });
  assert.deepEqual(parseGithubRepository("a/b"), { owner: "a", repo: "b", subdir: "" });
  assert.deepEqual(parseGithubRepository({ url: "git+https://github.com/A/b.git", directory: "plugins/x" }), { owner: "A", repo: "b", subdir: "plugins/x" });
  assert.deepEqual(parseGithubRepository("git@github.com:a/b.git"), { owner: "a", repo: "b", subdir: "" });
  assert.equal(parseGithubRepository("https://gitlab.com/a/b"), undefined);
});

test("npm version facts skip deprecated and prerelease versions for the range", () => {
  const facts = npmVersionFacts({
    "dist-tags": { latest: "2.0.0" },
    time: { "0.9.0-beta": "2025-01-01T00:00:00Z", "1.0.0": "2025-02-01T00:00:00Z", "1.1.0": "2025-03-01T00:00:00Z", "2.0.0": "2025-04-01T00:00:00Z" },
    versions: { "0.9.0-beta": {}, "1.0.0": { deprecated: "x" }, "1.1.0": {}, "2.0.0": {} },
  });
  assert.deepEqual(facts, { latest: "2.0.0", earliest: "1.1.0", publishedAt: "2025-01-01T00:00:00.000Z" });
});

test("tarballs read into a file map without the package/ prefix", () => {
  const files = readTarball(tarball({ "package.json": "{}", "a/b.txt": "hi" }));
  assert.deepEqual([...files.keys()], ["package.json", "a/b.txt"]);
  assert.equal(files.get("a/b.txt").toString(), "hi");
});

// ---------------------------------------------------------------- claims

const candidate = (key, id, { owner, source, publishedAt = "2026-01-01T00:00:00Z", ...rest } = {}) => ({
  key,
  label: key,
  owner,
  checkedAt: NOW.toISOString(),
  version: "1.0.0",
  entry: {
    id,
    displayName: id,
    description: id,
    icon: "Puzzle",
    author: { name: owner ?? "x" },
    category: "utilities",
    source: source ?? { git: { url: `https://github.com/${owner}/${id}.git`, range: ">=1.0.0" } },
    publishedAt,
  },
  ...rest,
});

const resolve = (candidates, { claims = {}, legacy = [], legacyListings, blocked = {} } = {}) =>
  resolveListings({ candidates, legacyEntries: legacy, legacyListings, claims, blocked, categoryIds, reserved, now: NOW.toISOString() });

test("the first source to claim an id keeps it, across runs", () => {
  const claims = {};
  const first = resolve(
    [candidate("github:2", "dup", { owner: "late", publishedAt: "2026-05-01T00:00:00Z" }), candidate("github:1", "dup", { owner: "early" })],
    { claims },
  );
  assert.equal(first.sources["github:1"].status, "listed");
  assert.equal(first.sources["github:2"].reason, "id-claimed");
  assert.equal(claims.dup.key, "github:1");
  // A later run where the claimant is older on paper still respects the ledger.
  const second = resolve(
    [candidate("github:2", "dup", { owner: "late", publishedAt: "2020-01-01T00:00:00Z" }), candidate("github:1", "dup", { owner: "early" })],
    { claims },
  );
  assert.equal(second.sources["github:1"].status, "listed");
  assert.equal(second.sources["github:2"].reason, "id-claimed");
});

test("a crawled entry replaces a legacy entry by source or by GitHub owner", () => {
  const legacy = [
    { id: "same-source", author: { name: "x", github: "someone" }, source: { git: { url: "https://github.com/Org/Repo.git", subdir: "p", range: "^1.0.0" } } },
    { id: "same-author", author: { name: "x", github: "Moved" }, source: { git: { url: "https://github.com/moved/old.git", range: "^1.0.0" } } },
    { id: "git-to-npm", author: { name: "x", github: "carol" }, source: { git: { url: "https://github.com/carol/x.git", range: "^1.0.0" } } },
    { id: "other", author: { name: "x", github: "rightful" }, source: { npm: { package: "other" } } },
  ];
  const result = resolve(
    [
      candidate("github:1/p", "same-source", { owner: "org", source: { git: { url: "https://github.com/org/repo", subdir: "./p", range: ">=1.0.0" } } }),
      candidate("github:2", "same-author", { owner: "moved" }),
      candidate("npm:@carol/x", "git-to-npm", { owner: "carol", source: { npm: { package: "@carol/x", range: ">=1.0.0" } } }),
      candidate("github:3", "other", { owner: "squatter" }),
    ],
    { legacy },
  );
  assert.deepEqual(result.replacesLegacy, ["git-to-npm", "same-author", "same-source"]);
  assert.equal(result.sources["github:1/p"].replaces, "legacy");
  assert.equal(result.sources["github:3"].reason, "id-claimed");
  assert.match(result.sources["github:3"].detail, /entries\/other\.json/);
  assert.equal(sameSource({ npm: { package: "a" } }, { git: { url: "a" } }), false);
});

test("a replacing entry keeps legacy category, screenshots, and overview it does not supply", () => {
  const legacy = [
    { id: "bare", category: "security", secondaryCategories: ["thread-content"], author: { github: "o" }, source: { npm: { package: "bare" } } },
    { id: "full", category: "security", author: { github: "o" }, source: { npm: { package: "full" } } },
  ];
  const legacyListings = new Map([
    ["bare", { screenshots: ["https://getbb.app/marketplace/v1/screenshots/bare/a.png"], overview: "Old.\n" }],
    ["full", { screenshots: ["https://getbb.app/marketplace/v1/screenshots/full/a.png"], overview: "Old.\n" }],
  ]);
  const missingCategory = [{ reason: "missing-category", detail: "package.json has no bbMarketplace.category." }];
  const bare = candidate("npm:bare", "bare", { owner: "o", source: { npm: { package: "bare", range: ">=1.0.0" } } });
  delete bare.entry.category;
  bare.warnings = missingCategory;
  const full = candidate("npm:full", "full", { owner: "o", source: { npm: { package: "full", range: ">=1.0.0" } } });
  full.entry = { ...full.entry, screenshots: [`${ASSET_URL_BASE}/${"b".repeat(32)}.png`], overview: "New.\n" };
  const loose = candidate("npm:loose", "loose", { source: { npm: { package: "loose", range: ">=1.0.0" } } });
  delete loose.entry.category;
  loose.warnings = missingCategory;
  const result = resolve([bare, full, loose], { legacy, legacyListings });
  const byId = new Map(result.plugins.map((entry) => [entry.id, entry]));

  assert.equal(byId.get("bare").category, "security");
  assert.deepEqual(byId.get("bare").secondaryCategories, ["thread-content"]);
  assert.deepEqual(byId.get("bare").screenshots, ["https://getbb.app/marketplace/v1/screenshots/bare/a.png"]);
  assert.equal(byId.get("bare").overview, "Old.\n");
  assert.deepEqual(result.sources["npm:bare"].fromLegacy, ["category", "screenshots", "overview"]);
  assert.match(result.sources["npm:bare"].warnings[0].detail, /keeps the category of entries\/bare\.json/);
  assert.deepEqual(Object.keys(byId.get("bare")), ["id", "displayName", "description", "icon", "screenshots", "overview", "author", "category", "secondaryCategories", "source", "publishedAt"]);

  // Release fields win as a whole.
  assert.deepEqual(byId.get("full").screenshots, [`${ASSET_URL_BASE}/${"b".repeat(32)}.png`]);
  assert.equal(byId.get("full").overview, "New.\n");
  assert.equal(result.sources["npm:full"].fromLegacy, undefined);
  assert.equal(result.sources["npm:full"].warnings, undefined);

  // No legacy entry: listed without a category, with a warning.
  assert.equal(result.sources["npm:loose"].status, "listed");
  assert.equal(byId.get("loose").category, undefined);
  assert.match(result.sources["npm:loose"].warnings[0].detail, /The listing has no category\./);

  // A release category replaces the legacy secondary categories too.
  const own = carryOverLegacy({ id: "x", category: "utilities" }, legacy[0], {});
  assert.equal(own.entry.category, "utilities");
  assert.equal(own.entry.secondaryCategories, undefined);
  assert.deepEqual(own.fromLegacy, []);
});

test("blocked sources and categories removed from this repository are skipped", () => {
  const result = resolve(
    [
      candidate("github:9", "nine", { owner: "spam", repoId: 9 }),
      candidate("github:10", "ten", { owner: "Evil" }),
      candidate("npm:bad", "bad", { npmPackage: "bad" }),
      { ...candidate("github:11", "eleven", { owner: "ok" }), entry: { ...candidate("x", "eleven").entry, category: "gone" } },
    ],
    { blocked: { githubRepositoryIds: [9], githubOwners: ["evil"], npmPackages: ["bad"] } },
  );
  assert.equal(result.sources["github:9"].reason, "blocked");
  assert.equal(result.sources["github:10"].reason, "blocked");
  assert.equal(result.sources["npm:bad"].reason, "blocked");
  assert.equal(result.sources["github:11"].reason, "unknown-category");
  assert.equal(result.plugins.length, 0);
});

// ---------------------------------------------------------------- crawl

test("a crawl lists, skips with reasons, dedupes npm/GitHub, and writes assets", async () => {
  const { result } = await runCrawl(world());
  const sources = result.report.sources;
  const byId = new Map(result.entries.plugins.map((entry) => [entry.id, entry]));

  // Root plugin: highest stable v-tag, earliest for the range and the date.
  assert.equal(sources["github:alice/bb-plugin-notes"].status, "listed");
  assert.equal(sources["github:alice/bb-plugin-notes"].version, "0.2.0");
  const notes = byId.get("notes");
  assert.deepEqual(notes.source, { git: { url: "https://github.com/alice/bb-plugin-notes.git", range: ">=0.1.0" } });
  assert.equal(notes.publishedAt, "2026-10-01T10:00:00.000Z");
  assert.deepEqual(notes.author, { name: "alice", github: "alice", url: "https://github.com/alice" });
  assert.deepEqual(notes.tags, ["notes", "markdown"]);
  assert.deepEqual(notes.secondaryCategories, ["security"]);
  assert.equal(notes.overview, "# Notes\n\nWrite things down.\n");
  assert.match(notes.icon.url, new RegExp(`^${ASSET_URL_BASE}/[0-9a-f]{32}\\.svg$`));
  assert.match(notes.screenshots[0], /\/assets\/[0-9a-f]{32}\.png$/);
  assert.equal(result.assets.size, 2);
  const iconName = notes.icon.url.split("/").at(-1);
  assert.deepEqual(result.assets.get(iconName).bytes, SVG);
  assert.equal(result.assets.get(iconName).contentType, "image/svg+xml");

  // Monorepo: basename prefix, then the plugin id prefix, then nothing.
  assert.deepEqual(byId.get("alpha").source.git, {
    url: "https://github.com/acme/tools.git",
    subdir: "plugins/alpha",
    range: ">=1.0.0",
    tagPrefix: "alpha/",
  });
  assert.equal(byId.get("monorepo-tool").source.git.tagPrefix, "monorepo-tool/");
  assert.equal(sources["github:acme/tools/plugins/beta-dir"].replaces, "legacy", "same GitHub owner as the legacy entry");
  assert.deepEqual(result.entries.replacesLegacy, ["monorepo-tool"]);
  const replaced = byId.get("monorepo-tool");
  assert.equal(replaced.category, "security");
  assert.deepEqual(replaced.secondaryCategories, ["thread-content"]);
  assert.deepEqual(replaced.screenshots, [LEGACY_SHOT]);
  assert.equal(replaced.overview, "Legacy overview.\n");
  assert.deepEqual(sources["github:acme/tools/plugins/beta-dir"].fromLegacy, ["category", "screenshots", "overview"]);
  assert.deepEqual(sources["github:acme/tools/plugins/beta-dir"].warnings.map(({ reason }) => reason), ["missing-category"]);

  // No category and a bad overview: listed anyway, with warnings.
  const alpha = byId.get("alpha");
  assert.equal(sources["github:acme/tools/plugins/alpha"].status, "listed");
  assert.equal(alpha.category, undefined);
  assert.equal(alpha.overview, undefined);
  assert.deepEqual(
    sources["github:acme/tools/plugins/alpha"].warnings.map(({ reason }) => reason),
    ["missing-category", "invalid-overview"],
  );
  assert.equal(sources["github:alice/bb-plugin-notes"].warnings, undefined);
  assert.equal(sources["github:acme/tools/plugins/gamma"].reason, "no-release-tag");

  // Fork, squatter, deprecated npm, npm preferred over GitHub.
  assert.equal(sources["github:bob/bb-plugin-notes-fork"].reason, "fork");
  assert.equal(sources["github:mallory/bb-plugin-taken"].reason, "id-claimed");
  assert.equal(sources["npm:@dave/bb-plugin-old"].reason, "deprecated");
  assert.equal(sources["github:carol/bb-plugin-npm-twin"].reason, "npm-preferred");
  assert.equal(sources["npm:not-opted-in"], undefined);
  const twin = byId.get("npm-twin");
  assert.deepEqual(twin.source, { npm: { package: "bb-plugin-npm-twin", range: ">=1.1.0" } });
  assert.equal(twin.icon, "Sparkles");
  assert.equal(twin.overview, "Twin overview.\n");
  assert.equal(twin.publishedAt, "2026-07-01T00:00:00.000Z");
  assert.deepEqual(twin.author, { name: "carol", github: "carol", url: "https://github.com/carol" });
  assert.equal(result.state.claims["npm-twin"].key, "npm:bb-plugin-npm-twin");

  // Every report value is a contract reason code.
  for (const verdict of Object.values(sources)) {
    if (verdict.status === "skipped") assert.ok(REASONS.includes(verdict.reason), JSON.stringify(verdict));
    for (const warning of verdict.warnings ?? []) assert.ok(WARNINGS.includes(warning.reason));
    assert.ok(verdict.checkedAt);
  }
});

test("an unchanged source is not fetched again", async () => {
  const routes = world();
  const first = await runCrawl(routes);
  const second = await runCrawl(routes, { state: JSON.parse(JSON.stringify(first.result.state)) });
  const refetched = second.calls.filter(
    ({ url }) => url.startsWith("https://raw.githubusercontent.com/alice") || url.endsWith(".tgz") || url.includes("/commits/"),
  );
  assert.deepEqual(refetched.map(({ url }) => url), []);
  const conditional = second.calls.filter(({ headers }) => headers["if-none-match"] !== undefined);
  assert.ok(conditional.some(({ url }) => url.endsWith("alice/bb-plugin-notes/git/matching-refs/tags")));
  assert.deepEqual(second.result.entries.plugins, first.result.entries.plugins);
  assert.equal(second.result.assets.size, 0, "assets were written by the run that built them");
});

test("a new tag reprocesses only that repository", async () => {
  const first = await runCrawl(world());
  const routes = world({ notesTags: ["v0.1.0", "v0.2.0", "v0.3.0"] });
  routes["https://api.github.com/repos/alice/bb-plugin-notes/git/matching-refs/tags"] = etagged('"t3"', {
    json: tagRefs(["v0.1.0", "v0.2.0", "v0.3.0"]),
  });
  routes[raw("alice/bb-plugin-notes", "refs/tags/v0.3.0", "package.json")] = { body: JSON.stringify(manifest()) };
  const second = await runCrawl(routes, { state: first.result.state });
  assert.equal(second.result.report.sources["github:alice/bb-plugin-notes"].version, "0.3.0");
  assert.ok(!second.calls.some(({ url }) => url.includes("/notes/commits/")), "the earliest tag's date is cached");
  assert.ok(!second.calls.some(({ url }) => url.startsWith("https://raw.githubusercontent.com/acme/tools/refs/tags")));
});

test("a transient failure keeps the last good listing", async () => {
  const first = await runCrawl(world());
  const routes = world();
  routes["https://api.github.com/repos/alice/bb-plugin-notes/git/matching-refs/tags"] = { status: 502 };
  routes["https://api.github.com/search/repositories?*"] = { status: 503 };
  routes["https://registry.npmjs.org/bb-plugin-npm-twin"] = { status: 500 };
  const second = await runCrawl(routes, { state: first.result.state });
  assert.deepEqual(
    second.result.entries.plugins.map((entry) => entry.id),
    first.result.entries.plugins.map((entry) => entry.id),
  );
  assert.ok(second.result.problems.some((problem) => problem.includes("alice/bb-plugin-notes")));
  assert.equal(second.result.discovery.githubSearchComplete, false);
});

test("search partitions created: ranges past 1000 results", async () => {
  const queries = [];
  const routes = {
    "https://api.github.com/search/repositories?*": (url) => {
      const query = new URL(url).searchParams.get("q");
      queries.push(query);
      const [from, to] = /created:(\S+)\.\.(\S+)/.exec(query).slice(1);
      const days = (Date.parse(to) - Date.parse(from)) / 86_400_000;
      if (days > 2000) return { json: { total_count: 1500, items: [] } };
      return { json: { total_count: 1, items: [repoItem(Date.parse(from), `o/r${from}`, { fork: true })] } };
    },
    "https://registry.npmjs.org/-/v1/search?*": { json: { total: 0, objects: [] } },
  };
  const { result } = await runCrawl(routes);
  assert.ok(queries.length > 2);
  assert.ok(queries.every((query) => query.startsWith("topic:bb-plugin fork:true created:")));
  assert.equal(result.discovery.githubSearchComplete, true);
  assert.ok(result.discovery.githubRepositories >= 2);
});

test("GitHub rate limits wait for Retry-After, then stop the API for the run", async () => {
  let calls = 0;
  const waits = [];
  const fetchImpl = async () => {
    calls += 1;
    if (calls === 1) return new Response("", { status: 403, headers: { "retry-after": "2" } });
    if (calls === 2) return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    return new Response("", {
      status: 403,
      headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600) },
    });
  };
  const http = createHttp({ fetchImpl, sleep: async (ms) => waits.push(ms) });
  assert.equal((await http.api("/a")).status, 200);
  assert.deepEqual(waits, [2000]);
  await assert.rejects(http.api("/b"), RateLimitError);
  const before = calls;
  await assert.rejects(http.api("/c"), RateLimitError);
  assert.equal(calls, before, "no request once the budget is spent");
});

// ---------------------------------------------------------------- build merge

test("build merges crawled entries into v2 only, with legacy precedence", () => {
  const dir = mkdtempSync(join(tmpdir(), "crawl-build-"));
  try {
    const legacyIds = readdirSync(join(root, "entries"))
      .filter((name) => name.endsWith(".json"))
      .sort()
      .map((name) => name.replace(/\.json$/, ""));
    const [replacedId, keptId] = legacyIds;
    const crawledEntry = (id, extra = {}) => ({
      id,
      displayName: `Crawled ${id}`,
      description: "From a release.",
      icon: { url: `${ASSET_URL_BASE}/${"a".repeat(32)}.svg` },
      author: { name: "x", github: "x", url: "https://github.com/x" },
      category: "utilities",
      source: { git: { url: `https://github.com/x/${id}.git`, range: ">=1.0.0" } },
      publishedAt: "2026-11-01T00:00:00.000Z",
      ...extra,
    });
    writeFileSync(
      join(dir, "entries.json"),
      JSON.stringify({
        plugins: [
          crawledEntry("zz-crawled-new"),
          crawledEntry("zz-no-category", { category: undefined }),
          crawledEntry(replacedId),
          crawledEntry(keptId),
          crawledEntry("zz-bad-tags", { tags: Array(11).fill("t") }),
          crawledEntry("zz-bad-icon", { icon: { url: "https://evil.example/x.svg" } }),
        ],
        replacesLegacy: [replacedId],
      }),
    );
    const v2Out = join(dir, "v2.json");
    const output = execFileSync(
      process.execPath,
      [join(root, "scripts", "build.mjs"), "--crawled", join(dir, "entries.json"), "--v2-out", v2Out],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
    assert.match(output, /2 crawled, 1 legacy replaced by crawled/);
    const v2 = JSON.parse(readFileSync(v2Out, "utf8"));
    const v1 = JSON.parse(readFileSync(join(root, "dist", "marketplace.json"), "utf8"));
    const v2ById = new Map(v2.plugins.map((entry) => [entry.id, entry]));
    assert.equal(v2ById.get("zz-crawled-new").displayName, "Crawled zz-crawled-new");
    assert.ok(v2ById.has("zz-no-category") && v2ById.get("zz-no-category").category === undefined);
    assert.equal(v2ById.get(replacedId).displayName, `Crawled ${replacedId}`);
    assert.notEqual(v2ById.get(replacedId).publishedAt, "2026-11-01T00:00:00.000Z", "keeps the legacy date");
    assert.notEqual(v2ById.get(keptId).displayName, `Crawled ${keptId}`, "legacy wins without a replace mark");
    assert.ok(!v2ById.has("zz-bad-tags") && !v2ById.has("zz-bad-icon"));
    assert.ok(!v1.plugins.some((entry) => entry.id === "zz-crawled-new"), "crawled entries never enter v1");
    assert.notEqual(v1.plugins.find((entry) => entry.id === replacedId).displayName, `Crawled ${replacedId}`);

    // What a replacing entry carries over is exactly what the build publishes.
    const legacyFiles = legacyIds.map((id) => JSON.parse(readFileSync(join(root, "entries", `${id}.json`), "utf8")));
    const listings = readLegacyListings(root, legacyFiles);
    let compared = 0;
    for (const id of legacyIds.filter((id) => id !== replacedId)) {
      assert.deepEqual(listings.get(id).screenshots, v2ById.get(id).screenshots, id);
      assert.equal(listings.get(id).overview, v2ById.get(id).overview, id);
      if (v2ById.get(id).screenshots !== undefined) compared += 1;
    }
    assert.ok(compared > 100);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// ---------------------------------------------------------------- index cache

test("index files: a missing object is empty, other failures throw", async () => {
  const answer = (status, body = "{}") => async () => new Response(status === 404 ? "no" : body, { status });
  assert.equal(await getIndexFile("state.json", { fetchImpl: answer(404) }), undefined);
  assert.equal((await getIndexFile("state.json", { fetchImpl: answer(200, '{"a":1}') })).toString(), '{"a":1}');
  await assert.rejects(getIndexFile("state.json", { fetchImpl: answer(500), retries: 0 }), /HTTP 500/);
});

test("the ranking refreshes once it is older than the limit", () => {
  const dir = mkdtempSync(join(tmpdir(), "ranking-"));
  try {
    const path = join(dir, "ranking.json");
    assert.equal(rankingDue(path, 20), true, "missing");
    writeFileSync(path, JSON.stringify({ generatedAt: new Date(Date.now() - 3_600_000).toISOString() }));
    assert.equal(rankingDue(path, 20), false);
    assert.equal(rankingDue(path, 20, Date.now() + 20 * 3_600_000), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
