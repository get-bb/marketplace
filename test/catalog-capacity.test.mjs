import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

for (const version of [1, 2]) {
  test(`v${version} accepts catalogs larger than 1024 plugins and still validates entries`, () => {
    const filename = version === 1 ? "marketplace.schema.json" : "marketplace-v2.schema.json";
    const schema = JSON.parse(readFileSync(new URL(`../schema/${filename}`, import.meta.url), "utf8"));
    const ajv = new Ajv2020({ strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const manifest = {
      schemaVersion: version,
      name: "test-marketplace",
      displayName: "Test Marketplace",
      plugins: Array.from({ length: 1025 }, (_, index) => ({
        id: `plugin-${index}`,
        displayName: `Plugin ${index}`,
        description: "A test plugin.",
        icon: "Zap",
        author: { name: "Test Author" },
        category: "utilities",
        source: { git: { url: "https://github.com/example/plugin.git", range: "^1.0.0" } },
      })),
    };
    if (version === 1) {
      for (const entry of manifest.plugins) delete entry.category;
    }
    assert.equal(validate(manifest), true, JSON.stringify(validate.errors));
    delete manifest.plugins[1024].source;
    assert.equal(validate(manifest), false);
    assert.ok(validate.errors.some(error => error.instancePath === "/plugins/1024"));
  });
}
