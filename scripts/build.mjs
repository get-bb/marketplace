#!/usr/bin/env node
// Build the frozen v1 document and the full v2 document from one source.
// The --liveness option also checks each remote source.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import {
  checkRequiredCategories,
  findOrphanAboutFiles,
  findOrphanScreenshotFiles,
  fillEmptyCollections,
  projectV1Manifest,
  pullRequestEntryFiles,
  readEntryAddedDates,
  validateAboutReference,
  validateAndRewriteIcon,
  validateScreenshotReference,
} from "./marketplace-lib.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const liveness = process.argv.includes("--liveness");
const problems = [];
const warnings = [];

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const base = readJson(join(root, "marketplace.base.json"));
const v1Schema = readJson(join(root, "schema", "marketplace.schema.json"));
const v2Schema = readJson(join(root, "schema", "marketplace-v2.schema.json"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateV1 = ajv.compile(v1Schema);
const validateV2 = ajv.compile(v2Schema);
const validateEntry = ajv.compile({
  ...v2Schema.$defs.entry,
  $defs: v2Schema.$defs,
});
const validateBbOfficialScreenshotMap = ajv.compile({
  type: "object",
  propertyNames: { pattern: "^[a-z0-9][a-z0-9-]*$" },
  additionalProperties: {
    ...v2Schema.$defs.entry.properties.screenshots,
    minItems: 1,
    uniqueItems: true,
  },
});

let bbOfficialScreenshots = {};
try {
  const candidate = readJson(join(root, "bb-official-screenshots.json"));
  if (validateBbOfficialScreenshotMap(candidate)) {
    bbOfficialScreenshots = candidate;
  } else {
    for (const error of validateBbOfficialScreenshotMap.errors ?? []) {
      problems.push(
        `bb-official-screenshots.json: ${error.instancePath || "/"} ${error.message}`,
      );
    }
  }
} catch (error) {
  problems.push(`bb-official-screenshots.json: The JSON is not valid. ${error.message}`);
}

const entryFiles = readdirSync(join(root, "entries"))
  .filter((name) => name.endsWith(".json"))
  .sort();
if (entryFiles.length === 0) {
  problems.push("The entries directory has no entry files.");
}

const seenPluginIds = new Set();
const entryRecords = [];
for (const file of entryFiles) {
  const path = join(root, "entries", file);
  let entry;
  try {
    entry = readJson(path);
  } catch (error) {
    problems.push(`${file}: The JSON is not valid. ${error.message}`);
    continue;
  }

  const expectedId = file.replace(/\.json$/, "");
  if (entry.id !== expectedId) {
    problems.push(`${file}: The id must be "${expectedId}".`);
  }
  if (seenPluginIds.has(entry.id)) {
    problems.push(`${file}: The id "${entry.id}" occurs more than once.`);
  }
  seenPluginIds.add(entry.id);

  if (!validateEntry(entry)) {
    for (const error of validateEntry.errors ?? []) {
      problems.push(`${file}: ${error.instancePath || "/"} ${error.message}`);
    }
  }
  entryRecords.push({ entry, file });
}

function changedPullRequestEntryFiles() {
  const eventPath = process.env.GITHUB_EVENT_PATH;
  if (eventPath === undefined) return [];

  let event;
  try {
    event = readJson(eventPath);
  } catch (error) {
    problems.push(`The GitHub event file is not valid JSON. ${error.message}`);
    return [];
  }
  try {
    return pullRequestEntryFiles(root, event);
  } catch (error) {
    const reason = error.message.split("\n")[0];
    problems.push(`The build cannot find changed entry files. ${reason}`);
    return [];
  }
}

const categoryPolicy = checkRequiredCategories(
  entryRecords,
  changedPullRequestEntryFiles(),
);
for (const file of categoryPolicy.errors) {
  problems.push(`${file}: A new or changed entry must have a category.`);
}
if (categoryPolicy.warnings.length > 0) {
  warnings.push(
    `${categoryPolicy.warnings.length} unchanged entry files have no category.`,
  );
}

const categoryIds = new Set();
for (const category of base.categories ?? []) {
  if (categoryIds.has(category.id)) {
    problems.push(
      `marketplace.base.json: The category id "${category.id}" occurs more than once.`,
    );
  }
  categoryIds.add(category.id);
}

const collectionIds = new Set();
for (const collection of base.collections ?? []) {
  if (collectionIds.has(collection.id)) {
    problems.push(
      `marketplace.base.json: The collection id "${collection.id}" occurs more than once.`,
    );
  }
  collectionIds.add(collection.id);
  for (const pluginId of collection.pluginIds ?? []) {
    if (!seenPluginIds.has(pluginId)) {
      problems.push(
        `marketplace.base.json: The collection "${collection.id}" names the unknown plugin "${pluginId}".`,
      );
    }
  }
}

const plugins = entryRecords.map(({ entry }) => entry);
for (const entry of plugins) {
  if (entry.category !== undefined && !categoryIds.has(entry.category)) {
    problems.push(`${entry.id}.json: The category "${entry.category}" is not defined.`);
  }
}

const referencedScreenshotFiles = new Set();
const referencedAboutFiles = new Set();
const addedAtById = entryAddedDates();
const v2Plugins = plugins.map((entry) => {
  const output = { ...entry };
  delete output.updatedAt;
  const publishedAt = addedAtById.get(entry.id);
  if (publishedAt === undefined) {
    delete output.publishedAt;
  } else {
    output.publishedAt = publishedAt;
  }
  const iconResult = validateAndRewriteIcon(root, entry.icon);
  output.icon = iconResult.icon;
  for (const problem of iconResult.problems) {
    problems.push(`${entry.id}.json: ${problem}`);
  }

  if (entry.screenshots !== undefined) {
    output.screenshots = entry.screenshots.map((reference) => {
      const result = validateScreenshotReference(root, entry.id, reference);
      for (const problem of result.problems) {
        problems.push(`${entry.id}.json: ${problem}`);
      }
      if (result.relativeFile !== undefined) {
        referencedScreenshotFiles.add(result.relativeFile);
      }
      return result.outputUrl;
    });
  }

  if (entry.about !== undefined) {
    const result = validateAboutReference(root, entry.id, entry.about);
    for (const problem of result.problems) {
      problems.push(`${entry.id}.json: ${problem}`);
    }
    if (result.relativeFile !== undefined) {
      referencedAboutFiles.add(result.relativeFile);
    }
    if (result.text !== undefined) output.about = result.text;
  }
  return output;
});

for (const [pluginId, screenshots] of Object.entries(bbOfficialScreenshots)) {
  for (const reference of screenshots) {
    const result = validateScreenshotReference(root, pluginId, reference, 320);
    for (const problem of result.problems) {
      problems.push(`bb-official-screenshots.json: ${problem}`);
    }
    if (result.relativeFile !== undefined) {
      referencedScreenshotFiles.add(result.relativeFile);
    }
  }
}

for (const file of findOrphanScreenshotFiles(root, referencedScreenshotFiles)) {
  problems.push(`${file}: No marketplace entry references this screenshot file.`);
}
for (const file of findOrphanAboutFiles(root, referencedAboutFiles)) {
  problems.push(`${file}: No marketplace entry references this about file.`);
}

function entryAddedDates() {
  try {
    const dates = readEntryAddedDates(root);
    for (const { entry, file } of entryRecords) {
      if (!dates.has(entry.id)) {
        problems.push(`${file}: The Git history has no first addition date.`);
      }
    }
    return dates;
  } catch (error) {
    const reason = error.message.split("\n")[0];
    problems.push(`The build cannot read entry addition dates. ${reason}`);
    return new Map();
  }
}

const collections = fillEmptyCollections(
  base.collections ?? [],
  v2Plugins,
);
const v1Manifest = projectV1Manifest(base, plugins);
const v2Manifest = {
  $schema: "https://getbb.app/schemas/marketplace-v2.schema.json",
  schemaVersion: 2,
  name: base.name,
  displayName: base.displayName,
  ...(base.description === undefined ? {} : { description: base.description }),
  ...(base.categories === undefined ? {} : { categories: base.categories }),
  ...(base.collections === undefined ? {} : { collections }),
  plugins: v2Plugins,
};

if (!validateV1(v1Manifest)) {
  for (const error of validateV1.errors ?? []) {
    problems.push(`v1 schema: ${error.instancePath || "/"} ${error.message}`);
  }
}
if (!validateV2(v2Manifest)) {
  for (const error of validateV2.errors ?? []) {
    problems.push(`v2 schema: ${error.instancePath || "/"} ${error.message}`);
  }
}

if (liveness) {
  for (const entry of plugins) {
    const source = entry.source ?? {};
    try {
      if (source.git) {
        const { url, ref, range, tagPrefix } = source.git;
        if (range !== undefined) {
          const prefix = tagPrefix ?? "";
          const out = execFileSync(
            "git",
            ["ls-remote", "--tags", url, `refs/tags/${prefix}v*`],
            { encoding: "utf8", timeout: 30_000 },
          );
          const escapedPrefix = prefix.replaceAll(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&",
          );
          const tagPattern = new RegExp(
            `refs/tags/${escapedPrefix}(v\\d+\\.\\d+\\.\\d+)(\\^\\{\\})?$`,
          );
          const hasTag = out
            .split("\n")
            .some((line) => tagPattern.test(line.trim()));
          if (!hasTag) {
            problems.push(
              `${entry.id}: The source has no ${prefix}vX.Y.Z tag for "${range}".`,
            );
          }
        } else {
          const out = execFileSync("git", ["ls-remote", url, ref, `${ref}^{}`], {
            encoding: "utf8",
            timeout: 30_000,
          });
          const isCommit = /^[0-9a-f]{7,40}$/i.test(ref);
          if (!isCommit && out.trim().length === 0) {
            problems.push(`${entry.id}: The git ref "${ref}" does not exist.`);
          }
          if (isCommit) {
            execFileSync("git", ["ls-remote", url, "HEAD"], {
              encoding: "utf8",
              timeout: 30_000,
            });
          }
        }
      } else if (source.npm) {
        execFileSync("npm", ["view", source.npm.package, "name"], {
          encoding: "utf8",
          timeout: 30_000,
        });
      }
    } catch (error) {
      const reason = error.message.split("\n")[0];
      problems.push(`${entry.id}: The source check failed. ${reason}`);
    }
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (problems.length > 0) {
  for (const problem of problems) console.error(`error: ${problem}`);
  process.exit(1);
}

const outputs = [
  ["marketplace.json", v1Manifest],
  ["v2/marketplace.json", v2Manifest],
];
for (const [label, manifest] of outputs) {
  const bytes = `${JSON.stringify(manifest, null, 2)}\n`;
  if (Buffer.byteLength(bytes, "utf8") > 1_048_576) {
    console.error(`error: The ${label} document is larger than 1 MiB.`);
    process.exit(1);
  }
}

mkdirSync(join(root, "dist", "v2"), { recursive: true });
writeFileSync(
  join(root, "dist", "marketplace.json"),
  `${JSON.stringify(v1Manifest, null, 2)}\n`,
);
writeFileSync(
  join(root, "dist", "v2", "marketplace.json"),
  `${JSON.stringify(v2Manifest, null, 2)}\n`,
);
console.log(`built dist/marketplace.json with ${plugins.length} entries`);
console.log(`built dist/v2/marketplace.json with ${plugins.length} entries`);
