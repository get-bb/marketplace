#!/usr/bin/env node
// Compose dist/ranking.json: recent install counts that scripts/build.mjs
// uses to fill trending collections and order categories.
//
// The counts come from the same `plugin_installed` telemetry event as
// stats.json, counted as distinct installations over the last 14 and 30
// days. The document is a build input only and is never published.
//
// Environment: see scripts/posthog.mjs.
//
// `--print` writes the document to stdout instead of dist/ranking.json.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { queryHogQL } from "./posthog.mjs";

const root = new URL("..", import.meta.url).pathname;
const printOnly = process.argv.includes("--print");

const ENTRY_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;
const MAX_ENTRIES = 5_000;

const QUERY = `
  SELECT properties.plugin_id AS plugin_id,
         count(DISTINCT if(timestamp > now() - INTERVAL 14 DAY, distinct_id, NULL)) AS installs_14d,
         count(DISTINCT distinct_id) AS installs_30d
  FROM events
  WHERE event = 'plugin_installed'
    AND timestamp > now() - INTERVAL 30 DAY
    AND properties.plugin_id IS NOT NULL
    AND properties.plugin_id != ''
  GROUP BY plugin_id
  ORDER BY installs_30d DESC
  LIMIT ${MAX_ENTRIES}
`;

const isCount = (value) => Number.isSafeInteger(value) && value >= 0;

let rows;
try {
  rows = await queryHogQL(QUERY);
} catch (error) {
  console.error(`error: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}

const plugins = {};
for (const row of rows) {
  const [id, installs14d, installs30d] = Array.isArray(row) ? row : [];
  if (
    typeof id !== "string" ||
    !ENTRY_ID_PATTERN.test(id) ||
    !isCount(installs14d) ||
    !isCount(installs30d)
  ) {
    continue;
  }
  plugins[id] = { installs14d, installs30d };
}
// No counts most likely means an outage or a renamed event; the build then
// falls back to newest entries instead of ranking everything at zero.
if (Object.keys(plugins).length === 0) {
  console.error("error: PostHog returned no usable recent install counts");
  process.exit(1);
}

const bytes = `${JSON.stringify(
  {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    plugins,
  },
  null,
  2,
)}\n`;

if (printOnly) {
  process.stdout.write(bytes);
} else {
  mkdirSync(join(root, "dist"), { recursive: true });
  writeFileSync(join(root, "dist", "ranking.json"), bytes);
  console.log(
    `built dist/ranking.json with ${Object.keys(plugins).length} counted plugins`,
  );
}
