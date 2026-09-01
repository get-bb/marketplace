import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

export const V1_ENTRY_FIELDS = Object.freeze([
  "id",
  "displayName",
  "description",
  "icon",
  "tags",
  "author",
  "source",
]);

export const V1_TOP_LEVEL_FIELDS = Object.freeze([
  "schemaVersion",
  "name",
  "displayName",
  "description",
]);

export const SCREENSHOT_MAX_BYTES = 2 * 1024 * 1024;
export const SCREENSHOT_MIN_WIDTH = 1200;

const MARKETPLACE_ORIGIN = "https://getbb.app";
const SCREENSHOT_FILE_PATTERN =
  /^[A-Za-z0-9][A-Za-z0-9._-]*\.(?:png|jpg|jpeg|webp)$/;

function selectFields(value, fields) {
  const allowed = new Set(fields);
  return Object.fromEntries(
    Object.entries(value).filter(([field]) => allowed.has(field)),
  );
}

export function projectV1Entry(entry) {
  return selectFields(entry, V1_ENTRY_FIELDS);
}

export function projectV1Manifest(base, plugins) {
  return {
    $schema: "https://getbb.app/schemas/marketplace.schema.json",
    ...selectFields(base, V1_TOP_LEVEL_FIELDS),
    plugins: plugins.map(projectV1Entry),
  };
}

function stringEnd(text, start) {
  let escaped = false;
  for (let index = start + 1; index < text.length; index += 1) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (text[index] === "\\") {
      escaped = true;
      continue;
    }
    if (text[index] === '"') return index + 1;
  }
  throw new Error("The JSON text has an open string.");
}

function valueEnd(text, start) {
  if (text[start] === '"') return stringEnd(text, start);
  if (text[start] !== "{" && text[start] !== "[") {
    let index = start;
    while (index < text.length && !",]}".includes(text[index])) index += 1;
    return index;
  }

  const stack = [text[start]];
  for (let index = start + 1; index < text.length; index += 1) {
    if (text[index] === '"') {
      index = stringEnd(text, index) - 1;
      continue;
    }
    if (text[index] === "{" || text[index] === "[") stack.push(text[index]);
    if (text[index] === "}" || text[index] === "]") stack.pop();
    if (stack.length === 0) return index + 1;
  }
  throw new Error("The JSON text has an open object or array.");
}

function skipSpace(text, start) {
  let index = start;
  while (/\s/.test(text[index] ?? "")) index += 1;
  return index;
}

function pluginArrayStart(text) {
  let index = skipSpace(text, 0);
  if (text[index] !== "{") throw new Error("The marketplace document must be an object.");
  index += 1;

  while (index < text.length) {
    index = skipSpace(text, index);
    if (text[index] === ",") {
      index += 1;
      continue;
    }
    if (text[index] === "}") break;
    if (text[index] !== '"') throw new Error("The marketplace document has an invalid key.");

    const end = stringEnd(text, index);
    const key = JSON.parse(text.slice(index, end));
    index = skipSpace(text, end);
    if (text[index] !== ":") throw new Error("The marketplace document has an invalid value.");
    index = skipSpace(text, index + 1);
    if (key === "plugins") {
      if (text[index] !== "[") throw new Error("The plugins value must be an array.");
      return index;
    }
    index = valueEnd(text, index);
  }
  throw new Error("The marketplace document has no plugins array.");
}

export function extractV1EntryBytes(text) {
  const entries = new Map();
  let index = pluginArrayStart(text) + 1;
  while (index < text.length) {
    index = skipSpace(text, index);
    if (text[index] === ",") {
      index += 1;
      continue;
    }
    if (text[index] === "]") return entries;
    const end = valueEnd(text, index);
    const raw = text.slice(index, end);
    const entry = JSON.parse(raw);
    entries.set(entry.id, Buffer.from(raw, "utf8"));
    index = end;
  }
  throw new Error("The plugins array is not closed.");
}

export function compareV1EntryBytes(liveText, candidateText) {
  const liveEntries = extractV1EntryBytes(liveText);
  const candidateEntries = extractV1EntryBytes(candidateText);
  const changed = [];
  const removed = [];
  const added = [];

  for (const [id, liveBytes] of liveEntries) {
    const candidateBytes = candidateEntries.get(id);
    if (candidateBytes === undefined) removed.push(id);
    else if (!liveBytes.equals(candidateBytes)) changed.push(id);
  }
  for (const id of candidateEntries.keys()) {
    if (!liveEntries.has(id)) added.push(id);
  }

  return {
    added: added.sort(),
    changed: changed.sort(),
    removed: removed.sort(),
  };
}

export function checkRequiredCategories(entryRecords, changedEntryFiles) {
  const changed = new Set(
    changedEntryFiles.map((file) => file.replaceAll("\\", "/")),
  );
  const errors = [];
  const warnings = [];

  for (const { entry, file } of entryRecords) {
    if (typeof entry.category === "string" && entry.category.length > 0) {
      continue;
    }
    const normalizedFile = `entries/${file}`;
    if (changed.has(normalizedFile)) errors.push(normalizedFile);
    else warnings.push(normalizedFile);
  }

  return { errors: errors.sort(), warnings: warnings.sort() };
}

function isPng(buffer) {
  return (
    buffer.length >= 24 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    ) &&
    buffer.toString("ascii", 12, 16) === "IHDR"
  );
}

function jpegWidth(buffer) {
  if (
    buffer.length < 4 ||
    buffer[0] !== 0xff ||
    buffer[1] !== 0xd8 ||
    buffer[2] !== 0xff
  ) {
    return undefined;
  }

  const startOfFrameMarkers = new Set([
    0xc0,
    0xc1,
    0xc2,
    0xc3,
    0xc5,
    0xc6,
    0xc7,
    0xc9,
    0xca,
    0xcb,
    0xcd,
    0xce,
    0xcf,
  ]);
  let offset = 2;
  while (offset + 3 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (buffer[offset] === 0xff) offset += 1;
    const marker = buffer[offset];
    const markerStart = offset - 1;
    if (marker === 0xd9 || marker === 0xda) break;
    if (marker >= 0xd0 && marker <= 0xd7) {
      offset += 1;
      continue;
    }
    if (markerStart + 4 > buffer.length) break;
    const segmentLength = buffer.readUInt16BE(markerStart + 2);
    if (segmentLength < 2 || markerStart + 2 + segmentLength > buffer.length) {
      break;
    }
    if (startOfFrameMarkers.has(marker) && segmentLength >= 7) {
      return buffer.readUInt16BE(markerStart + 7);
    }
    offset = markerStart + 2 + segmentLength;
  }
  return undefined;
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function webpWidth(buffer) {
  if (
    buffer.length < 21 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return undefined;
  }

  const chunk = buffer.toString("ascii", 12, 16);
  if (chunk === "VP8X" && buffer.length >= 30) {
    return readUInt24LE(buffer, 24) + 1;
  }
  if (
    chunk === "VP8 " &&
    buffer.length >= 30 &&
    buffer[23] === 0x9d &&
    buffer[24] === 0x01 &&
    buffer[25] === 0x2a
  ) {
    return buffer.readUInt16LE(26) & 0x3fff;
  }
  if (chunk === "VP8L" && buffer.length >= 25 && buffer[20] === 0x2f) {
    return 1 + buffer[21] + ((buffer[22] & 0x3f) << 8);
  }
  return undefined;
}

export function inspectImage(buffer) {
  if (isPng(buffer)) {
    return { format: "png", width: buffer.readUInt32BE(16) };
  }
  const jpeg = jpegWidth(buffer);
  if (jpeg !== undefined) return { format: "jpeg", width: jpeg };
  const webp = webpWidth(buffer);
  if (webp !== undefined) return { format: "webp", width: webp };
  return undefined;
}

function expectedImageFormat(filename) {
  const extension = filename.split(".").at(-1);
  if (extension === "jpg" || extension === "jpeg") return "jpeg";
  return extension;
}

function parseScreenshotReference(pluginId, reference) {
  if (typeof reference !== "string") {
    throw new Error("The screenshot reference must be a string.");
  }

  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(reference)) {
    let url;
    try {
      url = new URL(reference);
    } catch {
      throw new Error(`The screenshot URL is not valid: ${reference}`);
    }
    if (url.origin !== MARKETPLACE_ORIGIN) {
      throw new Error(`The screenshot URL must use ${MARKETPLACE_ORIGIN}: ${reference}`);
    }
    if (url.search || url.hash || url.username || url.password) {
      throw new Error(`The screenshot URL has unsupported parts: ${reference}`);
    }
    const prefix = `/marketplace/v2/screenshots/${pluginId}/`;
    if (!url.pathname.startsWith(prefix)) {
      throw new Error(`The screenshot URL must use the ${pluginId} directory: ${reference}`);
    }
    const filename = url.pathname.slice(prefix.length);
    if (!SCREENSHOT_FILE_PATTERN.test(filename)) {
      throw new Error(`The screenshot filename is not valid: ${reference}`);
    }
    return { filename, outputUrl: reference };
  }

  const prefix = `./screenshots/${pluginId}/`;
  if (!reference.startsWith(prefix)) {
    throw new Error(`The screenshot path must use the ${pluginId} directory: ${reference}`);
  }
  const filename = reference.slice(prefix.length);
  if (!SCREENSHOT_FILE_PATTERN.test(filename)) {
    throw new Error(`The screenshot filename is not valid: ${reference}`);
  }
  return {
    filename,
    outputUrl: `${MARKETPLACE_ORIGIN}/marketplace/v2/screenshots/${pluginId}/${filename}`,
  };
}

export function validateScreenshotReference(root, pluginId, reference) {
  const problems = [];
  let parsed;
  try {
    parsed = parseScreenshotReference(pluginId, reference);
  } catch (error) {
    return { outputUrl: reference, problems: [error.message] };
  }

  const path = join(root, "screenshots", pluginId, parsed.filename);
  if (!existsSync(path)) {
    problems.push(`The screenshot file does not exist: ${path}`);
    return { outputUrl: parsed.outputUrl, problems };
  }

  const stat = statSync(path);
  if (!stat.isFile()) {
    problems.push(`The screenshot path is not a file: ${path}`);
    return { outputUrl: parsed.outputUrl, problems };
  }
  if (stat.size > SCREENSHOT_MAX_BYTES) {
    problems.push(`The screenshot file is larger than 2 MB: ${path}`);
    return { outputUrl: parsed.outputUrl, problems };
  }

  const image = inspectImage(readFileSync(path));
  if (image === undefined) {
    problems.push(`The screenshot file is not a PNG, JPEG, or WebP image: ${path}`);
    return { outputUrl: parsed.outputUrl, problems };
  }
  if (image.format !== expectedImageFormat(parsed.filename)) {
    problems.push(`The screenshot extension does not match its image format: ${path}`);
  }
  if (image.width < SCREENSHOT_MIN_WIDTH) {
    problems.push(`The screenshot width is less than 1200 pixels: ${path}`);
  }

  return { outputUrl: parsed.outputUrl, problems };
}

export function validateAndRewriteIcon(root, icon) {
  if (typeof icon === "string") return { icon, problems: [] };
  const reference = icon?.url;
  const problems = [];

  if (typeof reference !== "string") return { icon, problems };
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(reference)) {
    try {
      const url = new URL(reference);
      if (url.origin !== MARKETPLACE_ORIGIN) {
        problems.push(`The icon URL must use ${MARKETPLACE_ORIGIN}: ${reference}`);
      }
    } catch {
      problems.push(`The icon URL is not valid: ${reference}`);
    }
    return { icon, problems };
  }

  const match = reference.match(
    /^\.\/icons\/([A-Za-z0-9][A-Za-z0-9._-]*\.(?:svg|png|webp))$/,
  );
  if (match === null) {
    problems.push(`The icon path must name one file in ./icons/: ${reference}`);
    return { icon, problems };
  }
  const filename = match[1];
  const path = join(root, "icons", filename);
  if (!existsSync(path) || !statSync(path).isFile()) {
    problems.push(`The icon file does not exist: ${path}`);
  }
  return {
    icon: {
      ...icon,
      url: `${MARKETPLACE_ORIGIN}/marketplace/v1/icons/${filename}`,
    },
    problems,
  };
}

function timeValue(value) {
  const time = Date.parse(value ?? "");
  return Number.isNaN(time) ? Number.NEGATIVE_INFINITY : time;
}

export function fillEmptyCollections(collections, plugins, modifiedAtById) {
  const allHavePublishedAt =
    plugins.length > 0 &&
    plugins.every((plugin) => typeof plugin.publishedAt === "string");
  const fallbackIds = [...plugins]
    .sort((left, right) => {
      const leftDate = allHavePublishedAt
        ? left.publishedAt
        : modifiedAtById.get(left.id);
      const rightDate = allHavePublishedAt
        ? right.publishedAt
        : modifiedAtById.get(right.id);
      return timeValue(rightDate) - timeValue(leftDate) || left.id.localeCompare(right.id);
    })
    .slice(0, 8)
    .map((plugin) => plugin.id);

  return collections.map((collection) =>
    Array.isArray(collection.pluginIds) && collection.pluginIds.length === 0
      ? { ...collection, pluginIds: fallbackIds }
      : collection,
  );
}
