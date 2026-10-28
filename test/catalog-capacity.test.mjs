import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
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


test("builds v1 and v2 catalogs larger than 1 MiB", () => {
  const root = mkdtempSync(join(tmpdir(), "marketplace-capacity-"));
  const repository = fileURLToPath(new URL("..", import.meta.url));
  try {
    for (const path of ["scripts", "schema", "reserved-plugin-ids.json", "package.json"]) {
      cpSync(join(repository, path), join(root, path), { recursive: true });
    }
    symlinkSync(join(repository, "node_modules"), join(root, "node_modules"), "dir");
    mkdirSync(join(root, "entries"));
    writeFileSync(join(root, "bb-official-screenshots.json"), "{}");
    writeFileSync(join(root, "marketplace.base.json"), JSON.stringify({
      schemaVersion: 1,
      name: "test-marketplace",
      displayName: "Test Marketplace",
      categories: [{ id: "utilities", displayName: "Utilities", description: "Utility plugins." }],
    }));
    for (let index = 0; index < 1100; index++) {
      const entry = {
        id: `capacity-plugin-${index}`,
        displayName: `Capacity Plugin ${index}`,
        description: "x".repeat(1000),
        icon: "Zap",
        author: { name: "Test Author" },
        category: "utilities",
        source: { git: { url: "https://github.com/example/plugin.git", range: "^1.0.0" } },
      };
      writeFileSync(join(root, "entries", `${entry.id}.json`), JSON.stringify(entry));
    }
    execFileSync("git", ["init", "--quiet"], { cwd: root });
    execFileSync("git", ["add", "entries"], { cwd: root });
    execFileSync("git", ["-c", "user.name=Test", "-c", "user.email=test@example.com", "-c", "commit.gpgsign=false", "commit", "--quiet", "-m", "Add test entries"], { cwd: root });
    const env = { ...process.env };
    delete env.GITHUB_EVENT_PATH;
    execFileSync(process.execPath, [join(root, "scripts/build.mjs")], { cwd: root, env });
    for (const path of ["marketplace.json", "v2/marketplace.json"]) {
      const bytes = readFileSync(join(root, "dist", path));
      assert.ok(bytes.length > 1_048_576);
      assert.equal(JSON.parse(bytes).plugins.length, 1100);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
