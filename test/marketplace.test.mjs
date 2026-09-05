import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  OVERVIEW_MAX_CHARS,
  SCREENSHOT_MAX_BYTES,
  checkOverviewMarkdown,
  checkRequiredCategories,
  compareV1EntryBytes,
  fetchMarketplaceText,
  findOrphanScreenshotFiles,
  fillEmptyCollections,
  findOrphanOverviewFiles,
  inspectImage,
  parseEntryAddedDates,
  projectV1Entry,
  projectV1Manifest,
  pullRequestEntryFiles,
  readEntryAddedDates,
  validateOverviewReference,
  validateAndRewriteIcon,
  validateScreenshotReference,
  v1GateDisposition,
} from "../scripts/marketplace-lib.mjs";

const testRoot = dirname(fileURLToPath(import.meta.url));
const fixtureRoot = join(testRoot, "fixtures");

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(fixtureRoot, relativePath), "utf8"));
}

function readText(relativePath) {
  return readFileSync(join(fixtureRoot, relativePath), "utf8");
}

function readHex(name) {
  const text = readFileSync(join(fixtureRoot, "screenshots", name), "utf8");
  return Buffer.from(text.trim(), "hex");
}

function withScreenshotRoot(callback) {
  const root = mkdtempSync(join(tmpdir(), "marketplace-screenshot-test-"));
  mkdirSync(join(root, "screenshots", "example-plugin"), { recursive: true });
  try {
    callback(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function writeScreenshot(root, filename, bytes) {
  writeFileSync(join(root, "screenshots", "example-plugin", filename), bytes);
}

function runGit(root, args, options = {}) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    timeout: 30_000,
    ...options,
  }).trim();
}

test("the v1 projection stays unchanged when a v2 entry has dates", () => {
  const source = readJson("projection/source-entry.json");
  const expected = readJson("projection/v1-entry.json");
  assert.deepEqual(projectV1Entry(source), expected);

  const manifest = projectV1Manifest(
    {
      schemaVersion: 1,
      name: "test",
      displayName: "Test",
      description: "A test marketplace.",
      categories: [{ id: "utilities" }],
      collections: [],
    },
    [source],
  );
  assert.deepEqual(Object.keys(manifest), [
    "$schema",
    "schemaVersion",
    "name",
    "displayName",
    "description",
    "plugins",
  ]);
  assert.deepEqual(manifest.plugins, [expected]);
});

test("the v1 gate permits additions", () => {
  const result = compareV1EntryBytes(
    readText("gate/live.json"),
    readText("gate/added.json"),
  );
  assert.deepEqual(result, { added: ["gamma"], changed: [], removed: [] });
});

test("the v1 gate finds a changed entry", () => {
  const result = compareV1EntryBytes(
    readText("gate/live.json"),
    readText("gate/changed.json"),
  );
  assert.deepEqual(result.changed, ["alpha"]);
  assert.deepEqual(result.removed, []);
});

test("the v1 gate finds a removed entry", () => {
  const result = compareV1EntryBytes(
    readText("gate/live.json"),
    readText("gate/removed.json"),
  );
  assert.deepEqual(result.changed, []);
  assert.deepEqual(result.removed, ["beta"]);
});

test("the v1 gate finds a byte format change", () => {
  const result = compareV1EntryBytes(
    readText("gate/live.json"),
    readText("gate/reformatted.json"),
  );
  assert.deepEqual(result.changed, ["alpha", "beta"]);
});

test("the v1-change label permits v1 entry changes", () => {
  const event = {
    pull_request: { labels: [{ name: "v1-change" }] },
  };
  assert.equal(
    v1GateDisposition(event, { eventName: "pull_request" }),
    "label-override",
  );
});

test("a push to main uses the warning policy", () => {
  const event = { ref: "refs/heads/main" };
  assert.equal(
    v1GateDisposition(event, { eventName: "push" }),
    "push-warning",
  );
});

test("the marketplace fetch retries twice", async () => {
  let calls = 0;
  const text = await fetchMarketplaceText("https://getbb.app/test.json", {
    timeoutMs: 100,
    fetchImpl: async (_url, options) => {
      calls += 1;
      assert.ok(options.signal instanceof AbortSignal);
      if (calls < 3) return { ok: false, status: 503 };
      return { ok: true, text: async () => "ready" };
    },
  });
  assert.equal(text, "ready");
  assert.equal(calls, 3);
});

test("the category rule fails only changed files", () => {
  const records = readJson("categories/entries.json");
  const result = checkRequiredCategories(records, [
    "entries/changed.json",
    "entries/ready.json",
  ]);
  assert.deepEqual(result.errors, ["entries/changed.json"]);
  assert.deepEqual(result.warnings, ["entries/old.json"]);
});

test("the pull request diff returns added and modified entry files", () => {
  const root = mkdtempSync(join(tmpdir(), "marketplace-git-test-"));
  try {
    runGit(root, ["init", "--quiet"]);
    runGit(root, ["config", "user.email", "test@example.com"]);
    runGit(root, ["config", "user.name", "Test User"]);
    mkdirSync(join(root, "entries"));
    writeFileSync(join(root, "entries", "changed.json"), "{}\n");
    writeFileSync(join(root, "entries", "removed.json"), "{}\n");
    writeFileSync(join(root, "entries", "unchanged.json"), "{}\n");
    runGit(root, ["add", "entries"]);
    runGit(root, ["commit", "--quiet", "-m", "Add entries"]);
    const base = runGit(root, ["rev-parse", "HEAD"]);

    writeFileSync(join(root, "entries", "changed.json"), '{"changed":true}\n');
    writeFileSync(join(root, "entries", "added.json"), "{}\n");
    rmSync(join(root, "entries", "removed.json"));
    runGit(root, ["add", "entries"]);
    runGit(root, ["commit", "--quiet", "-m", "Change entries"]);
    const head = runGit(root, ["rev-parse", "HEAD"]);

    const files = pullRequestEntryFiles(root, {
      pull_request: { base: { sha: base }, head: { sha: head } },
    });
    assert.deepEqual(files, ["entries/added.json", "entries/changed.json"]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("an empty collection gets eight newest entries", () => {
  const plugins = Array.from({ length: 10 }, (_, index) => ({
    id: `plugin-${index}`,
    publishedAt: new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
  }));
  const result = fillEmptyCollections(
    [{ id: "new", displayName: "New", pluginIds: [] }],
    plugins,
  );
  assert.deepEqual(result[0].pluginIds, [
    "plugin-9",
    "plugin-8",
    "plugin-7",
    "plugin-6",
    "plugin-5",
    "plugin-4",
    "plugin-3",
    "plugin-2",
  ]);
});

test("the collection fallback uses publishedAt and an id tie-break", () => {
  const plugins = [
    { id: "alpha", publishedAt: "2026-03-01T00:00:00Z" },
    { id: "beta", publishedAt: "2026-04-01T00:00:00Z" },
    { id: "charlie", publishedAt: "2026-04-01T00:00:00Z" },
    { id: "delta", publishedAt: "2026-01-01T00:00:00Z" },
  ];
  const result = fillEmptyCollections(
    [{ id: "new", displayName: "New", pluginIds: [] }],
    plugins,
  );
  assert.deepEqual(result[0].pluginIds, ["beta", "charlie", "alpha", "delta"]);
});

test("the Git log parser keeps the first addition date", () => {
  const dates = parseEntryAddedDates([
    "date:2026-04-02T00:00:00Z",
    "",
    "entries/example.json",
    "date:2026-04-01T00:00:00Z",
    "",
    "entries/example.json",
  ].join("\n"));
  assert.equal(dates.get("example"), "2026-04-01T00:00:00Z");
});

test("a later entry edit does not change its first addition date", () => {
  const root = mkdtempSync(join(tmpdir(), "marketplace-date-test-"));
  try {
    runGit(root, ["init", "--quiet"]);
    runGit(root, ["config", "user.email", "test@example.com"]);
    runGit(root, ["config", "user.name", "Test User"]);
    mkdirSync(join(root, "entries"));
    writeFileSync(join(root, "entries", "example.json"), '{"version":1}\n');
    runGit(root, ["add", "entries/example.json"]);
    runGit(root, ["commit", "--quiet", "-m", "Add entry"], {
      env: {
        ...process.env,
        GIT_AUTHOR_DATE: "2026-01-02T03:04:05+00:00",
        GIT_COMMITTER_DATE: "2026-01-02T03:04:05+00:00",
      },
    });

    writeFileSync(join(root, "entries", "example.json"), '{"version":2}\n');
    runGit(root, ["add", "entries/example.json"]);
    runGit(root, ["commit", "--quiet", "-m", "Edit entry"], {
      env: {
        ...process.env,
        GIT_AUTHOR_DATE: "2026-02-03T04:05:06+00:00",
        GIT_COMMITTER_DATE: "2026-02-03T04:05:06+00:00",
      },
    });

    const dates = readEntryAddedDates(root);
    assert.equal(dates.get("example"), "2026-01-02T03:04:05Z");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the image reader finds PNG, JPEG, and WebP widths", () => {
  assert.deepEqual(inspectImage(readHex("valid-png.hex")), {
    format: "png",
    width: 1200,
  });
  assert.deepEqual(inspectImage(readHex("valid-jpeg.hex")), {
    format: "jpeg",
    width: 1200,
  });
  assert.deepEqual(inspectImage(readHex("valid-webp.hex")), {
    format: "webp",
    width: 1200,
  });
  assert.deepEqual(inspectImage(readHex("progressive-jpeg.hex")), {
    format: "jpeg",
    width: 1200,
  });
  assert.deepEqual(inspectImage(readHex("valid-vp8.hex")), {
    format: "webp",
    width: 1200,
  });
  assert.deepEqual(inspectImage(readHex("valid-vp8l.hex")), {
    format: "webp",
    width: 1200,
  });
});

test("a valid screenshot gets an absolute URL", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "overview.png", readHex("valid-png.hex"));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/overview.png",
    );
    assert.deepEqual(result.problems, []);
    assert.equal(
      result.outputUrl,
      "https://getbb.app/marketplace/v2/screenshots/example-plugin/overview.png",
    );
  });
});

test("the screenshot check rejects a missing file", () => {
  withScreenshotRoot((root) => {
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/missing.png",
    );
    assert.match(result.problems[0], /does not exist/);
  });
});

test("the screenshot check rejects a false image extension", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "bad.png", readHex("not-image.hex"));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/bad.png",
    );
    assert.match(result.problems[0], /not a PNG, JPEG, or WebP/);
  });
});

test("the screenshot check rejects an extension mismatch", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "wrong.png", readHex("valid-jpeg.hex"));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/wrong.png",
    );
    assert.match(result.problems[0], /does not match/);
  });
});

test("the screenshot check rejects a file larger than 2 MiB", () => {
  withScreenshotRoot((root) => {
    const header = readHex("valid-png.hex");
    const padding = Buffer.alloc(SCREENSHOT_MAX_BYTES - header.length + 1);
    writeScreenshot(root, "large.png", Buffer.concat([header, padding]));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/large.png",
    );
    assert.match(result.problems[0], /larger than 2 MiB/);
  });
});

test("the screenshot check rejects an image narrower than 1200 pixels", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "narrow.png", readHex("narrow-png.hex"));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/narrow.png",
    );
    assert.match(result.problems[0], /less than 1200 pixels/);
  });
});

test("the screenshot check accepts a custom minimum width", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "narrow.png", readHex("narrow-png.hex"));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/narrow.png",
      320,
    );
    assert.deepEqual(result.problems, []);
  });
});

test("the screenshot check rejects a different host", () => {
  withScreenshotRoot((root) => {
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "https://example.com/marketplace/v2/screenshots/example-plugin/overview.png",
    );
    assert.match(result.problems[0], /must use https:\/\/getbb\.app/);
  });
});

test("the icon check rejects a different host", () => {
  const result = validateAndRewriteIcon("/unused", {
    url: "https://example.com/icon.png",
  });
  assert.match(result.problems[0], /must use https:\/\/getbb\.app/);
});

test("the icon check rewrites a relative icon URL", () => {
  const root = mkdtempSync(join(tmpdir(), "marketplace-icon-test-"));
  try {
    mkdirSync(join(root, "icons"));
    writeFileSync(join(root, "icons", "example.svg"), "<svg></svg>\n");
    const result = validateAndRewriteIcon(root, {
      url: "./icons/example.svg",
    });
    assert.deepEqual(result.problems, []);
    assert.deepEqual(result.icon, {
      url: "https://getbb.app/marketplace/v1/icons/example.svg",
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("the screenshot check finds an unreferenced file", () => {
  withScreenshotRoot((root) => {
    writeScreenshot(root, "used.png", readHex("valid-png.hex"));
    writeScreenshot(root, "orphan.png", readHex("valid-png.hex"));
    const orphans = findOrphanScreenshotFiles(
      root,
      new Set(["screenshots/example-plugin/used.png"]),
    );
    assert.deepEqual(orphans, ["screenshots/example-plugin/orphan.png"]);
  });
});

function withOverviewRoot(callback) {
  const root = mkdtempSync(join(tmpdir(), "marketplace-overview-test-"));
  mkdirSync(join(root, "overview"), { recursive: true });
  try {
    callback(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

function writeOverview(root, filename, bytes) {
  writeFileSync(join(root, "overview", filename), bytes);
}

test("a valid overview file becomes normalized markdown text", () => {
  withOverviewRoot((root) => {
    writeOverview(root, "example-plugin.md", readText("overview/valid.md"));
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/example-plugin.md",
    );
    assert.deepEqual(result.problems, []);
    assert.equal(result.relativeFile, "overview/example-plugin.md");
    assert.ok(result.text.startsWith("# Example Plugin\n"));
    assert.ok(result.text.includes("review.\n\n## What you get"));
    assert.ok(result.text.endsWith("first.\n"));
  });
});

test("the overview check normalizes CRLF line endings", () => {
  withOverviewRoot((root) => {
    writeOverview(root, "example-plugin.md", readText("overview/crlf.md"));
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/example-plugin.md",
    );
    assert.deepEqual(result.problems, []);
    assert.equal(result.text, "Line one\nLine two\n");
  });
});

test("the overview check rejects a path outside the plugin file", () => {
  withOverviewRoot((root) => {
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/other-plugin.md",
    );
    assert.match(result.problems[0], /must be \.\/overview\/example-plugin\.md/);
    assert.equal(result.relativeFile, undefined);
  });
});

test("the overview check rejects a missing file", () => {
  withOverviewRoot((root) => {
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/example-plugin.md",
    );
    assert.match(result.problems[0], /does not exist/);
  });
});

test("the overview check rejects a file that is not UTF-8", () => {
  withOverviewRoot((root) => {
    writeOverview(root, "example-plugin.md", Buffer.from([0x23, 0x20, 0xff, 0xfe]));
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/example-plugin.md",
    );
    assert.match(result.problems[0], /not UTF-8/);
  });
});

test("the overview check rejects a file above the character cap", () => {
  withOverviewRoot((root) => {
    writeOverview(root, "example-plugin.md", `${"a".repeat(OVERVIEW_MAX_CHARS + 1)}\n`);
    const result = validateOverviewReference(
      root,
      "example-plugin",
      "./overview/example-plugin.md",
    );
    assert.match(result.problems[0], /maximum is 4000/);
  });
  assert.deepEqual(checkOverviewMarkdown(`${"é".repeat(OVERVIEW_MAX_CHARS)}\n`), []);
});

test("the overview check rejects markdown outside the allowlist", () => {
  const cases = [
    ["<script>alert(1)</script>", /raw HTML at line 1/],
    ["Text with <b>inline</b> html", /raw HTML at line 1/],
    ["![logo](https://example.com/logo.png)", /an image at line 1/],
    ["![logo][ref]\n\n[ref]: https://example.com/logo.png", /an image at line 1/],
    ["| a | b |\n| - | - |\n| 1 | 2 |", /a table at line 1/],
    ["Text[^1]\n\n[^1]: Note", /a footnote/],
    ["- [ ] task", /a task list at line 1/],
    ["[docs](http://example.com)", /must use https/],
    ["[docs](javascript:alert(1))", /must use https/],
    ["[docs](./README.md)", /must be an absolute https URL/],
    ["[docs][ref]\n\n[ref]: http://example.com", /must use https/],
    ["Visit http://example.com today", /must use https/],
    ["Text with a \u0007 bell", /control character/],
    ["  \n\n", /is empty/],
  ];
  for (const [markdown, pattern] of cases) {
    const problems = checkOverviewMarkdown(`${markdown}\n`);
    assert.ok(
      problems.some((problem) => pattern.test(problem)),
      `${JSON.stringify(markdown)} gave ${JSON.stringify(problems)}`,
    );
  }
});

test("the overview check accepts every element in the allowlist", () => {
  const markdown = [
    "# Title",
    "",
    "Plain *emphasis* **strong** ~~gone~~ `code` and a [link](https://example.com).",
    "Hard break  ",
    "next line with https://example.com/auto autolink.",
    "",
    "> quote",
    "",
    "1. one",
    "2. two",
    "   - nested",
    "",
    "```js",
    "const x = 1;",
    "```",
    "",
    "---",
    "",
    "[ref]: https://example.com/ref",
    "",
    "See [the ref][ref].",
  ].join("\n");
  assert.deepEqual(checkOverviewMarkdown(`${markdown}\n`), []);
});

test("the overview check finds an unreferenced file", () => {
  withOverviewRoot((root) => {
    writeOverview(root, "used.md", "# Used\n");
    writeOverview(root, "orphan.md", "# Orphan\n");
    const orphans = findOrphanOverviewFiles(root, new Set(["overview/used.md"]));
    assert.deepEqual(orphans, ["overview/orphan.md"]);
  });
});
