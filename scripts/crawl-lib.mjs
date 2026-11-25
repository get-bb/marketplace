// Pure rules for the self-published listing crawler. CONTRACT.md in the
// marketplace-discovery plan is the source of these rules; bb's
// `bb plugin publish --check` implements the same ones.
//
// Nothing here does I/O, so tests can drive every rule with plain objects.
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";

export const OPT_IN_KEYWORD = "bb-plugin";
export const DEFAULT_ICON = "Puzzle";
export const MAX_SCREENSHOTS = 6;
export const MAX_TAGS = 10;
export const MAX_SECONDARY_CATEGORIES = 3;

// Reason codes shared with `bb plugin publish --check`.
export const REASONS = Object.freeze([
  "no-release-tag",
  "no-manifest",
  "invalid-manifest",
  "missing-category",
  "unknown-category",
  "invalid-screenshot",
  "invalid-overview",
  "invalid-icon",
  "id-claimed",
  "id-reserved",
  "blocked",
  "fork",
  "archived",
  "deprecated",
  "npm-preferred",
]);

const DROPPED_KEYWORDS = new Set(["bb-plugin", "bb", "bb-plugins"]);
const TAG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ICON_NAME_PATTERN = /^[A-Za-z][A-Za-z0-9]*$/;
const CORE_OWNED_IDS = new Set(["npm", "cache", "runtime", "snapshots"]);
const BB_MARKETPLACE_KEYS = new Set([
  "category",
  "secondaryCategories",
  "screenshots",
]);
const SCREENSHOT_EXTENSIONS = /\.(?:png|jpg|jpeg|webp)$/i;
const ICON_EXTENSIONS = /\.(?:svg|png|webp)$/i;
const STABLE_VERSION = "(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)";

/** A rule failure with a contract reason code. */
export class Skip extends Error {
  constructor(reason, detail) {
    super(detail ?? reason);
    this.reason = reason;
    this.detail = detail;
  }
}

/**
 * `derivePluginId` from bb (packages/domain/src/plugin-id.ts) plus the
 * marketplace's reserved ids. Throws a Skip.
 */
export function derivePluginId(packageName, reserved) {
  if (typeof packageName !== "string" || packageName.length === 0) {
    throw new Skip("invalid-manifest", "package.json has no name.");
  }
  const base = packageName.includes("/")
    ? (packageName.split("/").at(-1) ?? packageName)
    : packageName;
  const id = base
    .replace(/^bb-plugin-/, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/^-+|-+$/g, "");
  if (id.length === 0) {
    throw new Skip("invalid-manifest", `The package name "${packageName}" gives no plugin id.`);
  }
  if (CORE_OWNED_IDS.has(id)) {
    throw new Skip("id-reserved", `The plugin id "${id}" is reserved by bb.`);
  }
  if (id.startsWith(reserved?.reservedPrefix ?? "bb--")) {
    throw new Skip("id-reserved", `The plugin id "${id}" starts with "${reserved?.reservedPrefix ?? "bb--"}", which bb reserves.`);
  }
  if (reserved?.bundledPluginIds?.includes(id)) {
    throw new Skip("id-reserved", `The plugin id "${id}" belongs to a plugin bundled with bb.`);
  }
  return id;
}

export function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    const difference = left[index] - right[index];
    if (difference !== 0) return difference;
  }
  return 0;
}

const escapeRegExp = (value) => value.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The stable `<prefix>vX.Y.Z` tags among `tagNames`, lowest first. bb installs
 * a range source from `<tagPrefix>v<version>` tags only, so tags without the
 * `v` never qualify (see CONTRACT.md).
 */
export function qualifyingTags(tagNames, prefix) {
  const pattern = new RegExp(`^${escapeRegExp(prefix)}v${STABLE_VERSION}$`);
  const tags = [];
  for (const name of tagNames) {
    const match = pattern.exec(name);
    if (match === null) continue;
    const parts = match.slice(1, 4).map(Number);
    tags.push({ name, version: parts.join("."), parts });
  }
  return tags.sort((left, right) => compareVersions(left.parts, right.parts));
}

/**
 * Pick the release for one plugin: the highest qualifying tag under the
 * first prefix that has any. Returns undefined when no prefix has a tag.
 */
export function selectRelease(tagNames, prefixes) {
  for (const prefix of prefixes) {
    const tags = qualifyingTags(tagNames, prefix);
    if (tags.length === 0) continue;
    return { prefix, latest: tags.at(-1), earliest: tags[0] };
  }
  return undefined;
}

/** Tag prefixes to try for a plugin directory, in contract order. */
export function tagPrefixesFor(subdir, pluginId) {
  if (subdir === "") return [""];
  const prefixes = [`${subdir.split("/").at(-1)}/`];
  if (pluginId !== undefined && !prefixes.includes(`${pluginId}/`)) {
    prefixes.push(`${pluginId}/`);
  }
  return prefixes;
}

export function keywordsToTags(keywords) {
  if (!Array.isArray(keywords)) return [];
  const tags = [];
  for (const keyword of keywords) {
    if (typeof keyword !== "string") continue;
    const tag = keyword.trim().toLowerCase();
    if (DROPPED_KEYWORDS.has(tag)) continue;
    if (tag.length > 32 || !TAG_PATTERN.test(tag)) continue;
    if (!tags.includes(tag)) tags.push(tag);
    if (tags.length === MAX_TAGS) break;
  }
  return tags;
}

export function hasOptInKeyword(keywords) {
  return (
    Array.isArray(keywords) &&
    keywords.some(
      (keyword) => typeof keyword === "string" && keyword.trim().toLowerCase() === OPT_IN_KEYWORD,
    )
  );
}

/**
 * Normalize a path inside the plugin directory, relative to it. Returns
 * undefined for absolute paths, URLs, backslashes, or escapes.
 */
export function pluginRelativePath(reference) {
  if (typeof reference !== "string" || reference.length === 0) return undefined;
  if (reference.includes("\\") || reference.includes("\0")) return undefined;
  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(reference) || reference.startsWith("/")) {
    return undefined;
  }
  const segments = [];
  for (const segment of reference.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") return undefined;
    segments.push(segment);
  }
  return segments.length === 0 ? undefined : segments.join("/");
}

/** `./plugins/x` from .bb/plugins.json → `plugins/x`; `./` → "" (root). */
export function normalizeSubdir(source) {
  if (typeof source !== "string") return undefined;
  if (source === "." || source === "./") return "";
  if (!source.startsWith("./")) return undefined;
  return pluginRelativePath(source);
}

/** Plugin directories from a .bb/plugins.json text. Throws a Skip. */
export function parseCollectionManifest(text) {
  let json;
  try {
    json = JSON.parse(text);
  } catch (error) {
    throw new Skip("invalid-manifest", `.bb/plugins.json is not valid JSON: ${error.message}`);
  }
  if (!Array.isArray(json?.plugins) || json.plugins.length === 0) {
    throw new Skip("invalid-manifest", ".bb/plugins.json has no plugins array.");
  }
  const subdirs = [];
  for (const plugin of json.plugins) {
    const subdir = normalizeSubdir(plugin?.source);
    if (subdir === undefined) {
      throw new Skip(
        "invalid-manifest",
        `.bb/plugins.json has an invalid source ${JSON.stringify(plugin?.source)}; use "./path".`,
      );
    }
    if (!subdirs.includes(subdir)) subdirs.push(subdir);
  }
  return subdirs;
}

/**
 * Check package.json and map it to the listing fields that need no fetch.
 * Throws a Skip. `assetRefs` lists the plugin-relative files to fetch next.
 */
export function mapManifest(pkg, { categoryIds, reserved }) {
  if (pkg === null || typeof pkg !== "object" || Array.isArray(pkg)) {
    throw new Skip("invalid-manifest", "package.json must be a JSON object.");
  }
  const id = derivePluginId(pkg.name, reserved);
  const bb = pkg.bb;
  if (bb === null || typeof bb !== "object" || Array.isArray(bb)) {
    throw new Skip("invalid-manifest", "package.json has no bb object.");
  }
  const displayName = typeof bb.name === "string" ? bb.name.trim() : "";
  if (displayName.length === 0) {
    throw new Skip("invalid-manifest", "package.json bb.name is required.");
  }
  const description = typeof bb.description === "string" ? bb.description.trim() : "";
  if (description.length === 0) {
    throw new Skip("invalid-manifest", "package.json bb.description is required.");
  }

  const market = pkg.bbMarketplace;
  if (market === undefined) {
    throw new Skip("missing-category", "package.json has no bbMarketplace.category.");
  }
  if (market === null || typeof market !== "object" || Array.isArray(market)) {
    throw new Skip("invalid-manifest", "package.json bbMarketplace must be an object.");
  }
  const unknownKeys = Object.keys(market).filter((key) => !BB_MARKETPLACE_KEYS.has(key));
  if (unknownKeys.length > 0) {
    throw new Skip(
      "invalid-manifest",
      `package.json bbMarketplace has unknown keys: ${unknownKeys.join(", ")}.`,
    );
  }
  if (market.category === undefined || market.category === "") {
    throw new Skip("missing-category", "package.json has no bbMarketplace.category.");
  }
  if (typeof market.category !== "string" || !categoryIds.has(market.category)) {
    throw new Skip("unknown-category", `The category ${JSON.stringify(market.category)} is not a marketplace category.`);
  }
  let secondaryCategories;
  if (market.secondaryCategories !== undefined) {
    const list = market.secondaryCategories;
    if (!Array.isArray(list) || list.length > MAX_SECONDARY_CATEGORIES) {
      throw new Skip("invalid-manifest", "bbMarketplace.secondaryCategories must be an array of at most 3 category ids.");
    }
    for (const value of list) {
      if (typeof value !== "string" || !categoryIds.has(value)) {
        throw new Skip("unknown-category", `The secondary category ${JSON.stringify(value)} is not a marketplace category.`);
      }
    }
    if (new Set(list).size !== list.length || list.includes(market.category)) {
      throw new Skip("invalid-manifest", "bbMarketplace.secondaryCategories must be distinct from each other and from category.");
    }
    if (list.length > 0) secondaryCategories = [...list];
  }

  let screenshots = [];
  if (market.screenshots !== undefined) {
    if (!Array.isArray(market.screenshots) || market.screenshots.length > MAX_SCREENSHOTS) {
      throw new Skip("invalid-screenshot", "bbMarketplace.screenshots must be an array of at most 6 paths.");
    }
    screenshots = market.screenshots.map((reference) => {
      const path = pluginRelativePath(reference);
      if (path === undefined || !SCREENSHOT_EXTENSIONS.test(path)) {
        throw new Skip(
          "invalid-screenshot",
          `The screenshot ${JSON.stringify(reference)} must be a relative .png, .jpg, .jpeg, or .webp path inside the plugin directory.`,
        );
      }
      return path;
    });
  }

  const declaredIcon = bb.branding?.icon;
  let icon;
  if (declaredIcon === undefined) {
    icon = { name: DEFAULT_ICON };
  } else if (typeof declaredIcon === "string" && ICON_NAME_PATTERN.test(declaredIcon)) {
    icon = { name: declaredIcon };
  } else {
    const path = pluginRelativePath(declaredIcon);
    if (path === undefined || !ICON_EXTENSIONS.test(path)) {
      throw new Skip(
        "invalid-icon",
        `bb.branding.icon ${JSON.stringify(declaredIcon)} must be an icon name or a relative .svg, .png, or .webp path.`,
      );
    }
    icon = { path };
  }

  return {
    id,
    displayName,
    description,
    tags: keywordsToTags(pkg.keywords),
    category: market.category,
    secondaryCategories,
    screenshots,
    icon,
  };
}

/** Assemble a v2 entry in its published form. */
export function assembleEntry(mapped, { iconUrl, screenshotUrls, overview, author, source, publishedAt }) {
  const entry = {
    id: mapped.id,
    displayName: mapped.displayName,
    description: mapped.description,
    icon: iconUrl === undefined ? mapped.icon.name : { url: iconUrl },
  };
  if (screenshotUrls.length > 0) entry.screenshots = screenshotUrls;
  if (overview !== undefined) entry.overview = overview;
  if (mapped.tags.length > 0) entry.tags = mapped.tags;
  entry.author = author;
  entry.category = mapped.category;
  if (mapped.secondaryCategories !== undefined) {
    entry.secondaryCategories = mapped.secondaryCategories;
  }
  entry.source = source;
  if (publishedAt !== undefined) entry.publishedAt = publishedAt;
  return entry;
}

export function githubAuthor(owner) {
  return { name: owner, github: owner, url: `https://github.com/${owner}` };
}

const GITHUB_LOGIN = /^[A-Za-z0-9](?:-?[A-Za-z0-9]){0,38}$/;

/**
 * The github.com owner/repo of an npm `repository` field, or undefined.
 * Accepts the string shorthands and git URL forms npm documents.
 */
export function parseGithubRepository(repository) {
  const url = typeof repository === "string" ? repository : repository?.url;
  if (typeof url !== "string") return undefined;
  const directory = typeof repository === "object" ? repository.directory : undefined;
  let match =
    /^(?:github:)?([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+?)(?:\.git)?$/.exec(url) ??
    /^(?:git\+)?(?:https?|git|ssh|git\+ssh):\/\/(?:[^@/]+@)?(?:www\.)?github\.com[/:]([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+?)(?:\.git)?\/?(?:#.*)?$/i.exec(url) ??
    /^git@github\.com:([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+?)(?:\.git)?$/i.exec(url);
  if (match === null || !GITHUB_LOGIN.test(match[1])) return undefined;
  const subdir = typeof directory === "string" ? (pluginRelativePath(directory) ?? "") : "";
  return { owner: match[1], repo: match[2], subdir };
}

export function npmAuthor(packument, githubRepository) {
  if (githubRepository !== undefined) return githubAuthor(githubRepository.owner);
  const maintainer = (packument.maintainers ?? []).find(
    (candidate) => typeof candidate?.name === "string" && candidate.name.length > 0,
  );
  return { name: maintainer?.name ?? packument.name };
}

/** Version facts from a full npm packument. */
export function npmVersionFacts(packument) {
  const latest = packument?.["dist-tags"]?.latest;
  const versions = packument?.versions ?? {};
  const stable = new RegExp(`^${STABLE_VERSION}$`);
  const candidates = Object.keys(versions)
    .filter((version) => stable.test(version) && !versions[version]?.deprecated)
    .map((version) => ({ version, parts: version.split(".").map(Number) }))
    .sort((left, right) => compareVersions(left.parts, right.parts));
  let firstTime;
  for (const version of Object.keys(versions)) {
    const time = packument.time?.[version];
    if (typeof time === "string" && (firstTime === undefined || time < firstTime)) {
      firstTime = time;
    }
  }
  return {
    latest,
    earliest: candidates[0]?.version ?? latest,
    publishedAt: firstTime === undefined ? undefined : new Date(firstTime).toISOString(),
  };
}

export function contentHash(bytes) {
  return createHash("sha256").update(bytes).digest("hex").slice(0, 32);
}

export const CONTENT_TYPES = Object.freeze({
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
});

/** Read a .tgz into a map of path (without the first segment) → bytes. */
export function readTarball(gzipped, { maxBytes = 64 * 1024 * 1024 } = {}) {
  const tar = gunzipSync(gzipped, { maxOutputLength: maxBytes });
  const files = new Map();
  let offset = 0;
  let longName;
  let paxPath;
  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    if (header.every((byte) => byte === 0)) break;
    const field = (start, length) => {
      const raw = header.subarray(start, start + length);
      const end = raw.indexOf(0);
      return raw.subarray(0, end === -1 ? length : end).toString("utf8");
    };
    const size = Number.parseInt(field(124, 12).trim() || "0", 8);
    const type = String.fromCharCode(header[156] || 48);
    const magic = field(257, 6);
    let name = field(0, 100);
    if (magic.startsWith("ustar")) {
      const prefix = field(345, 155);
      if (prefix) name = `${prefix}/${name}`;
    }
    const body = tar.subarray(offset + 512, offset + 512 + size);
    offset += 512 + Math.ceil(size / 512) * 512;
    if (type === "L") {
      longName = body.toString("utf8").replace(/\0.*$/s, "");
      continue;
    }
    if (type === "x") {
      const match = /\d+ path=([^\n]*)\n/.exec(body.toString("utf8"));
      paxPath = match?.[1];
      continue;
    }
    if (type === "g") continue;
    const path = paxPath ?? longName ?? name;
    paxPath = undefined;
    longName = undefined;
    if (type !== "0" && type !== "\0" && type !== "7") continue;
    const stripped = path.split("/").slice(1).join("/");
    if (stripped) files.set(stripped, Buffer.from(body));
  }
  return files;
}

/** github.com/Owner/Repo(.git) → owner/repo, lowercased, for comparisons. */
export function normalizeGitUrl(url) {
  if (typeof url !== "string") return undefined;
  const match = /^https:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/i.exec(url);
  if (match !== null) return `github.com/${match[1]}/${match[2]}`.toLowerCase();
  return url.replace(/\.git\/?$/, "").replace(/\/$/, "").toLowerCase();
}

function normalizeSourceSubdir(subdir) {
  return subdir === undefined ? "" : (pluginRelativePath(subdir) ?? subdir);
}

/** Same source in the contract's sense: normalized git URL + subdir, or npm package. */
export function sameSource(left, right) {
  if (left?.npm !== undefined || right?.npm !== undefined) {
    return left?.npm?.package !== undefined && left?.npm?.package === right?.npm?.package;
  }
  return (
    normalizeGitUrl(left?.git?.url) === normalizeGitUrl(right?.git?.url) &&
    normalizeSourceSubdir(left?.git?.subdir) === normalizeSourceSubdir(right?.git?.subdir)
  );
}

function compareCandidates(left, right) {
  const leftTime = left.entry?.publishedAt ?? "";
  const rightTime = right.entry?.publishedAt ?? "";
  if (leftTime !== rightTime) {
    if (leftTime === "") return 1;
    if (rightTime === "") return -1;
    return leftTime < rightTime ? -1 : 1;
  }
  return left.key < right.key ? -1 : left.key > right.key ? 1 : 0;
}

export function blockedReason(candidate, blocked) {
  const owners = new Set((blocked?.githubOwners ?? []).map((owner) => String(owner).toLowerCase()));
  if (candidate.repoId !== undefined && (blocked?.githubRepositoryIds ?? []).map(Number).includes(Number(candidate.repoId))) {
    return "The repository is on the marketplace block list.";
  }
  if (candidate.owner !== undefined && owners.has(candidate.owner.toLowerCase())) {
    return `The owner ${candidate.owner} is on the marketplace block list.`;
  }
  if (candidate.npmPackage !== undefined && (blocked?.npmPackages ?? []).includes(candidate.npmPackage)) {
    return "The npm package is on the marketplace block list.";
  }
  return undefined;
}

/**
 * Turn per-source candidates into listings and verdicts.
 *
 * A candidate is `{ key, label, checkedAt, repoId?, owner?, npmPackage?,
 * github?: { fullName, subdir }, npmRepository?: { owner, repo, subdir },
 * version?, entry? , reason?, detail? }`: an entry when the source passed
 * every per-source rule, otherwise a reason. `claims` is the ledger
 * `{ [id]: { key, label, claimedAt } }`; it is updated in place.
 */
export function resolveListings({
  candidates,
  legacyEntries,
  claims,
  blocked,
  categoryIds,
  reserved,
  now,
}) {
  const verdicts = new Map();
  const skip = (candidate, reason, detail) => {
    verdicts.set(candidate.label, {
      status: "skipped",
      reason,
      ...(detail === undefined ? {} : { detail }),
      ...(candidate.entry?.id === undefined ? {} : { id: candidate.entry.id }),
      ...(candidate.version === undefined ? {} : { version: candidate.version }),
      checkedAt: candidate.checkedAt,
    });
  };

  const live = [];
  for (const candidate of candidates) {
    const blockedDetail = blockedReason(candidate, blocked);
    if (blockedDetail !== undefined) {
      skip(candidate, "blocked", blockedDetail);
      continue;
    }
    if (candidate.entry === undefined) {
      skip(candidate, candidate.reason, candidate.detail);
      continue;
    }
    // Categories and reserved ids can change in this repository after the
    // source was processed, so check them on every run.
    try {
      derivePluginId(candidate.entry.id, reserved);
    } catch (error) {
      skip(candidate, error.reason, error.detail);
      continue;
    }
    const unknown = [candidate.entry.category, ...(candidate.entry.secondaryCategories ?? [])]
      .find((category) => !categoryIds.has(category));
    if (unknown !== undefined) {
      skip(candidate, "unknown-category", `The category "${unknown}" is not a marketplace category.`);
      continue;
    }
    live.push(candidate);
  }

  // The same plugin on npm and GitHub is listed once, from npm.
  const githubByLocation = new Map();
  for (const candidate of live) {
    if (candidate.github === undefined) continue;
    githubByLocation.set(
      `${candidate.github.fullName.toLowerCase()}#${candidate.github.subdir}`,
      candidate,
    );
  }
  const superseded = new Set();
  for (const candidate of live) {
    const repository = candidate.npmRepository;
    if (repository === undefined) continue;
    const match = githubByLocation.get(
      `${repository.owner}/${repository.repo}`.toLowerCase() + `#${repository.subdir}`,
    );
    if (match === undefined || superseded.has(match)) continue;
    superseded.add(match);
    skip(match, "npm-preferred", `Listed from ${candidate.label}.`);
    const claim = claims[match.entry.id];
    if (claim?.key === match.key && match.entry.id === candidate.entry.id) {
      claims[candidate.entry.id] = { ...claim, key: candidate.key, label: candidate.label };
    }
  }

  const legacyById = new Map(legacyEntries.map((entry) => [entry.id, entry]));
  const listed = [];
  const replacesLegacy = [];
  for (const candidate of live.filter((item) => !superseded.has(item)).sort(compareCandidates)) {
    const { id } = candidate.entry;
    const claim = claims[id];
    const legacy = legacyById.get(id);
    if (claim !== undefined && claim.key !== candidate.key) {
      skip(candidate, "id-claimed", `The id "${id}" belongs to ${claim.label}.`);
      continue;
    }
    let replaces = false;
    if (legacy !== undefined) {
      const authorMatches =
        typeof legacy.author?.github === "string" &&
        candidate.owner !== undefined &&
        legacy.author.github.toLowerCase() === candidate.owner.toLowerCase();
      if (!sameSource(legacy.source, candidate.entry.source) && !authorMatches) {
        skip(
          candidate,
          "id-claimed",
          `The id "${id}" belongs to the existing marketplace entry entries/${id}.json.`,
        );
        continue;
      }
      replaces = true;
    }
    if (claim === undefined) {
      claims[id] = { key: candidate.key, label: candidate.label, claimedAt: now };
    } else if (claim.label !== candidate.label) {
      claims[id] = { ...claim, label: candidate.label };
    }
    listed.push(candidate.entry);
    if (replaces) replacesLegacy.push(id);
    verdicts.set(candidate.label, {
      status: "listed",
      id,
      ...(candidate.version === undefined ? {} : { version: candidate.version }),
      ...(replaces ? { replaces: "legacy" } : {}),
      checkedAt: candidate.checkedAt,
    });
  }

  listed.sort((left, right) => left.id.localeCompare(right.id));
  return {
    plugins: listed,
    replacesLegacy: replacesLegacy.sort(),
    sources: Object.fromEntries(
      [...verdicts.entries()].sort(([left], [right]) => left.localeCompare(right)),
    ),
  };
}
