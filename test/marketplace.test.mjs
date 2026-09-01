import assert from "node:assert/strict";
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
  fillEmptyCollections,
  inspectImage,
  projectV1Entry,
  projectV1Manifest,
  validateAndRewriteIcon,
  validateScreenshotReference,
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

test("the category rule fails only changed files", () => {
  const records = readJson("categories/entries.json");
  const result = checkRequiredCategories(records, [
    "entries/changed.json",
    "entries/ready.json",
  ]);
  assert.deepEqual(result.errors, ["entries/changed.json"]);
  assert.deepEqual(result.warnings, ["entries/old.json"]);
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

test("the screenshot check rejects a file larger than 2 MB", () => {
  withScreenshotRoot((root) => {
    const header = readHex("valid-png.hex");
    const padding = Buffer.alloc(SCREENSHOT_MAX_BYTES - header.length + 1);
    writeScreenshot(root, "large.png", Buffer.concat([header, padding]));
    const result = validateScreenshotReference(
      root,
      "example-plugin",
      "./screenshots/example-plugin/large.png",
    );
    assert.match(result.problems[0], /larger than 2 MB/);
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
