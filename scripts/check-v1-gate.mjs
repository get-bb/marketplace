#!/usr/bin/env node
// Compare each v1 entry with the live document.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { compareV1EntryBytes } from "./marketplace-lib.mjs";

const LIVE_V1_URL = "https://getbb.app/marketplace/v1/marketplace.json";
const root = fileURLToPath(new URL("..", import.meta.url));

function readEvent() {
  const path = process.env.GITHUB_EVENT_PATH;
  if (path === undefined) return {};
  return JSON.parse(readFileSync(path, "utf8"));
}

function hasV1ChangeLabel(event) {
  return (event.pull_request?.labels ?? []).some(
    (label) => label.name === "v1-change",
  );
}

function isPushToMain(event) {
  return (
    process.env.GITHUB_EVENT_NAME === "push" &&
    (event.ref === "refs/heads/main" || process.env.GITHUB_REF === "refs/heads/main")
  );
}

let liveText;
try {
  const response = await fetch(LIVE_V1_URL);
  if (!response.ok) {
    throw new Error(`The server returned HTTP ${response.status}.`);
  }
  liveText = await response.text();
} catch (error) {
  console.error(`error: The v1 gate cannot read ${LIVE_V1_URL}. ${error.message}`);
  process.exit(1);
}

let candidateText;
try {
  candidateText = readFileSync(join(root, "dist", "marketplace.json"), "utf8");
} catch (error) {
  console.error(`error: The v1 gate cannot read dist/marketplace.json. ${error.message}`);
  process.exit(1);
}

let result;
try {
  result = compareV1EntryBytes(liveText, candidateText);
} catch (error) {
  console.error(`error: The v1 gate cannot compare the documents. ${error.message}`);
  process.exit(1);
}
if (result.changed.length === 0 && result.removed.length === 0) {
  console.log(
    `The v1 entry gate passed. ${result.added.length} new entries do not need an exception.`,
  );
  process.exit(0);
}

const details = [
  ...(result.changed.length === 0
    ? []
    : [`changed entries: ${result.changed.join(", ")}`]),
  ...(result.removed.length === 0
    ? []
    : [`removed entries: ${result.removed.join(", ")}`]),
].join("; ");
let event;
try {
  event = readEvent();
} catch (error) {
  console.error(`error: The v1 gate cannot read the GitHub event. ${error.message}`);
  process.exit(1);
}

if (isPushToMain(event)) {
  console.warn(`warning: The push changed frozen v1 entries. ${details}`);
  process.exit(0);
}
if (hasV1ChangeLabel(event)) {
  console.warn(`warning: The v1-change label permits these changes. ${details}`);
  process.exit(0);
}

console.error(`error: Frozen v1 entries changed. ${details}`);
console.error('error: Add the "v1-change" label if the change is intentional.');
process.exit(1);
