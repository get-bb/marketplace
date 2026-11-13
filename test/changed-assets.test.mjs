import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { changedAssets, listAssets } from "../scripts/changed-assets.mjs";

const md5 = (text) => createHash("md5").update(text).digest("hex");

function fixtureRoot(files) {
  const root = mkdtempSync(join(tmpdir(), "changed-assets-"));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(join(root, file, ".."), { recursive: true });
    writeFileSync(join(root, file), text);
  }
  return root;
}

/** Serves HEAD answers keyed by URL path; unknown paths answer 404. */
async function withBucket(answers, run) {
  const requests = [];
  const server = createServer((request, response) => {
    requests.push(`${request.method} ${request.url}`);
    const answer = answers[request.url];
    if (answer === undefined) {
      response.writeHead(404).end();
    } else {
      response.writeHead(answer.status ?? 200, answer.headers ?? {}).end();
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const baseUrl = `http://127.0.0.1:${server.address().port}/bucket/`;
    return await run(baseUrl, requests);
  } finally {
    server.close();
  }
}

test("asset groups map files to their bucket keys", () => {
  const root = fixtureRoot({
    "icons/b.png": "b",
    "icons/a-1234.svg": "a",
    "icons/README.md": "not an icon",
    "screenshots/plugin/two.webp": "2",
    "screenshots/plugin/one.png": "1",
    "overview/b.md": "b",
    "overview/a.md": "a",
    "overview/notes.txt": "not an overview",
  });
  try {
    assert.deepEqual(listAssets(root, "icons"), [
      { file: "icons/a-1234.svg", key: "icons/a-1234.svg" },
      { file: "icons/b.png", key: "icons/b.png" },
    ]);
    assert.deepEqual(listAssets(root, "screenshots"), [
      {
        file: "screenshots/plugin/one.png",
        key: "v2/screenshots/plugin/one.png",
      },
      {
        file: "screenshots/plugin/two.webp",
        key: "v2/screenshots/plugin/two.webp",
      },
    ]);
    assert.deepEqual(listAssets(join(root, "missing"), "screenshots"), []);
    assert.deepEqual(listAssets(root, "overviews"), [
      { file: "overview/a.md", key: "v2/overview/a.md" },
      { file: "overview/b.md", key: "v2/overview/b.md" },
    ]);
    assert.deepEqual(listAssets(join(root, "missing"), "overviews"), []);
    assert.throws(() => listAssets(root, "other"), /unknown asset group/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("only an asset whose published ETag matches its content is skipped", async () => {
  const root = fixtureRoot({
    "icons/same.svg": "same",
    "icons/weak.svg": "weak",
    "icons/edited.svg": "new content",
    "icons/missing.svg": "missing",
    "icons/failing.svg": "failing",
    "icons/multipart.svg": "multipart",
    "icons/no-etag.svg": "no etag",
  });
  try {
    await withBucket(
      {
        "/bucket/icons/same.svg": { headers: { etag: `"${md5("same")}"` } },
        "/bucket/icons/weak.svg": { headers: { etag: `W/"${md5("weak")}"` } },
        "/bucket/icons/edited.svg": {
          headers: { etag: `"${md5("old content")}"` },
        },
        "/bucket/icons/failing.svg": {
          status: 500,
          headers: { etag: `"${md5("failing")}"` },
        },
        "/bucket/icons/multipart.svg": {
          headers: { etag: `"${md5("multipart")}-2"` },
        },
        "/bucket/icons/no-etag.svg": {},
      },
      async (baseUrl, requests) => {
        const changed = await changedAssets(root, listAssets(root, "icons"), {
          baseUrl,
        });
        assert.deepEqual(
          changed.map(({ file }) => file),
          [
            "icons/edited.svg",
            "icons/failing.svg",
            "icons/missing.svg",
            "icons/multipart.svg",
            "icons/no-etag.svg",
          ],
        );
        assert.ok(requests.every((request) => request.startsWith("HEAD ")));
      },
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("every asset counts as changed when the published site is unreachable", async () => {
  const root = fixtureRoot({ "icons/a.svg": "a", "icons/b.svg": "b" });
  try {
    const assets = listAssets(root, "icons");
    const changed = await changedAssets(root, assets, {
      fetchImpl: async () => {
        throw new Error("offline");
      },
    });
    assert.deepEqual(changed, assets);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
