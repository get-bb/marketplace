#!/usr/bin/env node
// Compose dist/stats.json: the install-count sidecar BB reads beside
// marketplace.json. Counts come from the `plugin_installed` telemetry event
// every BB server already sends, queried through PostHog's HogQL API.
//
// The counts do not live in marketplace.json on purpose. That schema is
// strict, so an unknown field there rejects the whole catalog on an older
// desktop; and the numbers move daily while the manifest sits unchanged
// behind a 304, which would make every count refresh a full catalog rewrite.
//
// Environment:
//   POSTHOG_API_KEY     personal API key with project read access (secret)
//   POSTHOG_PROJECT_ID  numeric project id
//   POSTHOG_HOST        defaults to https://us.posthog.com
//   GENERATED_AT        ISO timestamp to stamp; defaults to now
//
// `--print` writes the document to stdout instead of dist/stats.json.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const printOnly = process.argv.includes("--print");

/** Same id shape the marketplace schema requires of an entry. */
const ENTRY_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

/** A hostile or broken answer must not become a 100 MB sidecar. */
const MAX_ENTRIES = 5_000;

/**
 * Distinct BB installations that reported installing each public plugin.
 *
 * Distinct, not raw event count: one person reinstalling a plugin ten times
 * while debugging is one install of it, and a raw count would let anyone
 * inflate their own listing from a loop.
 *
 * Telemetry only carries `plugin_id` for public plugins — bundled builtins and
 * bb-community entries — and sends null for direct and third-party installs,
 * so no private plugin id or source can reach this file. Bundled builtins are
 * counted too even though they have no entry here: BB looks them up in this
 * same document.
 */
const QUERY = `
  SELECT properties.plugin_id AS plugin_id,
         count(DISTINCT distinct_id) AS installs
  FROM events
  WHERE event = 'plugin_installed'
    AND properties.plugin_id IS NOT NULL
    AND properties.plugin_id != ''
  GROUP BY plugin_id
  ORDER BY installs DESC
  LIMIT ${MAX_ENTRIES}
`;

function required(name) {
  const value = process.env[name];
  if (value === undefined || value.trim().length === 0) {
    console.error(`error: ${name} is not set`);
    process.exit(1);
  }
  return value.trim();
}

async function queryInstallCounts() {
  const host = (process.env.POSTHOG_HOST ?? "https://us.posthog.com").replace(
    /\/+$/,
    "",
  );
  const projectId = required("POSTHOG_PROJECT_ID");
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${required("POSTHOG_API_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query: QUERY },
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    // The body names the real problem (bad key, wrong project, HogQL error).
    const detail = await response.text().catch(() => "");
    throw new Error(
      `PostHog query failed with HTTP ${response.status}: ${detail.slice(0, 500)}`,
    );
  }
  const body = await response.json();
  if (!Array.isArray(body?.results)) {
    throw new Error("PostHog answer has no results array");
  }
  return body.results;
}

/** Rows PostHog returns are `[plugin_id, installs]`; drop anything else. */
function pluginsFromRows(rows) {
  const plugins = {};
  let dropped = 0;
  for (const row of rows) {
    const [id, installs] = Array.isArray(row) ? row : [];
    if (
      typeof id !== "string" ||
      !ENTRY_ID_PATTERN.test(id) ||
      typeof installs !== "number" ||
      !Number.isSafeInteger(installs) ||
      installs < 0
    ) {
      dropped += 1;
      continue;
    }
    plugins[id] = { installs };
  }
  if (dropped > 0) {
    console.error(`warning: dropped ${dropped} unusable row(s) from PostHog`);
  }
  // Sorted keys keep the published document byte-stable between runs that
  // return the same counts, so an unchanged sidecar keeps its ETag.
  return Object.fromEntries(
    Object.keys(plugins)
      .sort()
      .map((id) => [id, plugins[id]]),
  );
}

let rows;
try {
  rows = await queryInstallCounts();
} catch (error) {
  // A rejected top-level await prints an undici stack trace; the job log
  // should name the problem instead.
  console.error(`error: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
const plugins = pluginsFromRows(rows);
// Publishing an empty document would silently zero every counter in the
// store. An outage, a rotated key, or a renamed event must fail the job
// instead, leaving the last good sidecar in place.
if (Object.keys(plugins).length === 0) {
  console.error("error: PostHog returned no usable install counts");
  process.exit(1);
}

const document = {
  schemaVersion: 1,
  generatedAt: process.env.GENERATED_AT ?? new Date().toISOString(),
  plugins,
};
const bytes = `${JSON.stringify(document, null, 2)}\n`;

if (printOnly) {
  process.stdout.write(bytes);
} else {
  mkdirSync(join(root, "dist"), { recursive: true });
  writeFileSync(join(root, "dist", "stats.json"), bytes);
  console.log(
    `built dist/stats.json with ${Object.keys(plugins).length} counted plugins`,
  );
}
