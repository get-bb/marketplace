#!/usr/bin/env node
// Read the crawler's files back from the bucket through getbb.app.
//
//   node scripts/index-cache.mjs get <name> <file>
//     Download bucket key index/<name> to <file>. A missing object is not an
//     error (the first run has none); any other failure is, so a crawl never
//     starts from an empty state by accident and loses its claims ledger.
//
//   node scripts/index-cache.mjs due <ranking.json> <hours>
//     Print `due=true` when the ranking file is missing or older than
//     <hours>, for $GITHUB_OUTPUT. The workflow refreshes it from PostHog
//     once a day instead of every crawl.
//
// Environment: MARKETPLACE_INDEX_URL (default https://getbb.app/marketplace/v1/index)
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const DEFAULT_INDEX_URL = "https://getbb.app/marketplace/v1/index";

export async function getIndexFile(name, { baseUrl = DEFAULT_INDEX_URL, fetchImpl = fetch, retries = 3 } = {}) {
  // The query string skips the five-minute edge cache; the server ignores it.
  const url = `${baseUrl.replace(/\/$/, "")}/${name}?fresh=${Date.now()}`;
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, { signal: AbortSignal.timeout(60_000) });
      if (response.status === 404) return undefined;
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      lastError = error;
      if (attempt < retries) await new Promise((resolve) => setTimeout(resolve, 2000 * (attempt + 1)));
    }
  }
  throw new Error(`${url}: ${lastError.message}`);
}

export function rankingDue(path, hours, now = Date.now()) {
  try {
    const generatedAt = Date.parse(JSON.parse(readFileSync(path, "utf8")).generatedAt);
    return !(now - generatedAt < hours * 3_600_000);
  } catch {
    return true;
  }
}

const [command, ...args] = process.argv.slice(2);
if (command === "get") {
  const [name, file] = args;
  const bytes = await getIndexFile(name, {
    baseUrl: process.env.MARKETPLACE_INDEX_URL || DEFAULT_INDEX_URL,
  }).catch((error) => {
    console.error(`error: ${error.message}`);
    process.exit(1);
  });
  if (bytes === undefined) {
    console.log(`index/${name} does not exist yet`);
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, bytes);
    console.log(`restored index/${name} (${bytes.length} bytes)`);
  }
} else if (command === "due") {
  const [path, hours] = args;
  console.log(`due=${rankingDue(path, Number(hours))}`);
} else if (command !== undefined) {
  console.error(`unknown command ${command}`);
  process.exit(1);
}
