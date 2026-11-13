#!/usr/bin/env node
// Print the icon, screenshot, or overview files whose published copy is
// missing or different, one path per line, so the publish workflow uploads
// only those.
//
//   node scripts/changed-assets.mjs icons
//   node scripts/changed-assets.mjs screenshots
//   node scripts/changed-assets.mjs overviews
//
// R2's ETag for a single-part object is the MD5 of its bytes, and getbb.app
// serves it unchanged, so a matching ETag means the object already has this
// content. Every other answer (missing, error, timeout, a multipart ETag)
// counts as changed: the worst case is an upload that was not needed.
//
// Environment:
//   MARKETPLACE_ASSET_BASE_URL  where the bucket root is served; defaults to
//                               https://getbb.app/marketplace/v1/
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DEFAULT_BASE_URL = "https://getbb.app/marketplace/v1/";
const CONCURRENCY = 16;
const ICON_PATTERN = /\.(svg|png|webp)$/;
const OVERVIEW_PATTERN = /\.md$/;

/** The files of one asset group with the bucket key each is published at. */
export function listAssets(root, group) {
  if (group === "icons") {
    const dir = join(root, "icons");
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((name) => ICON_PATTERN.test(name))
      .sort()
      .map((name) => ({ file: `icons/${name}`, key: `icons/${name}` }));
  }
  if (group === "screenshots") {
    const dir = join(root, "screenshots");
    if (!existsSync(dir)) return [];
    return readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const parent = entry.parentPath ?? entry.path;
        const file = relative(root, join(parent, entry.name))
          .split(sep)
          .join("/");
        return { file, key: `v2/${file}` };
      })
      .sort((left, right) => (left.file < right.file ? -1 : 1));
  }
  if (group === "overviews") {
    const dir = join(root, "overview");
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((name) => OVERVIEW_PATTERN.test(name))
      .sort()
      .map((name) => ({ file: `overview/${name}`, key: `v2/overview/${name}` }));
  }
  throw new Error(`unknown asset group "${group}"`);
}

async function isPublished(url, md5, fetchImpl) {
  try {
    const response = await fetchImpl(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) return false;
    const etag = response.headers.get("etag") ?? "";
    return etag.replace(/^W\//, "").replaceAll('"', "") === md5;
  } catch {
    return false;
  }
}

/** The assets whose published copy is missing or has other content. */
export async function changedAssets(
  root,
  assets,
  { baseUrl = DEFAULT_BASE_URL, fetchImpl = fetch } = {},
) {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const changed = new Array(assets.length).fill(false);
  let next = 0;
  async function worker() {
    while (next < assets.length) {
      const index = next;
      next += 1;
      const { file, key } = assets[index];
      const md5 = createHash("md5")
        .update(readFileSync(join(root, file)))
        .digest("hex");
      const url = base + key.split("/").map(encodeURIComponent).join("/");
      changed[index] = !(await isPublished(url, md5, fetchImpl));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return assets.filter((_, index) => changed[index]);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const assets = listAssets(root, process.argv[2]);
  const changed = await changedAssets(root, assets, {
    baseUrl: process.env.MARKETPLACE_ASSET_BASE_URL || DEFAULT_BASE_URL,
  });
  console.error(
    `${changed.length} of ${assets.length} ${process.argv[2]} need an upload.`,
  );
  for (const { file } of changed) console.log(file);
}
