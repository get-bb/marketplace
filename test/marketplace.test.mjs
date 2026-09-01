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
  SCREENSHOT_MAX_BYTES,
  checkRequiredCategories,
  compareV1EntryBytes,
  fetchMarketplaceText,
  findOrphanScreenshotFiles,
  fillEmptyCollections,
  inspectImage,
  parseEntryAddedDates,
  projectV1Entry,
  projectV1Manifest,
  pullRequestEntryFiles,
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

function runGit(root, args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    timeout: 30_000,
  }).trim();
}

test("the v1 projection keeps only v1 fields", () => {
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
  }));
  const dates = new Map(
    plugins.map((plugin, index) => [
      plugin.id,
      new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
    ]),
  );
  const result = fillEmptyCollections(
    [{ id: "new", displayName: "New", pluginIds: [] }],
    plugins,
    dates,
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

test("the collection fallback mixes entry dates and uses an id tie-break", () => {
  const plugins = [
    { id: "alpha", publishedAt: "2026-03-01T00:00:00Z" },
    { id: "beta" },
    { id: "charlie", publishedAt: "2026-04-01T00:00:00Z" },
    { id: "delta" },
  ];
  const addedDates = new Map([
    ["beta", "2026-04-01T00:00:00Z"],
    ["delta", "2026-01-01T00:00:00Z"],
  ]);
  const result = fillEmptyCollections(
    [{ id: "new", displayName: "New", pluginIds: [] }],
    plugins,
    addedDates,
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
