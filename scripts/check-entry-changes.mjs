#!/usr/bin/env node
// Pull request policy for legacy entries.
//
// - A pull request cannot add a file under entries/. New plugins list
//   themselves: see README.md, "Submit a plugin".
// - A pull request that edits or removes an entry, or changes its overview or
//   screenshots, passes only when its author is the entry's `author.github`
//   (as on the base branch) or a repository maintainer (admin or maintain).
//
// The CI step reads the pull request from GITHUB_EVENT_PATH and asks the
// GitHub API for the author's permission only when it needs to.
// Environment: GITHUB_EVENT_PATH, GITHUB_REPOSITORY, GITHUB_TOKEN.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

export const README_URL = "https://github.com/get-bb/marketplace#readme";

export const NEW_ENTRY_MESSAGE = `This repository no longer accepts new marketplace entries by pull request.
bb now lists plugins automatically from their own repository or npm package:

1. In the plugin's package.json, add "bbMarketplace" with a "category" from
   marketplace.base.json, for example:
     "bbMarketplace": { "category": "utilities", "screenshots": ["./screenshots/overview.png"] }
   Put a long description in PLUGIN_OVERVIEW.md beside package.json.
2. Opt in and release:
   - GitHub: add the topic "bb-plugin" to the public repository, then push a
     release tag: v1.2.3 for a plugin at the repository root, or
     <directory name>/v1.2.3 for a plugin in a subdirectory listed in
     .bb/plugins.json.
   - npm: add "bb-plugin" to "keywords" and run npm publish. List the overview,
     icon, and screenshots in "files".
3. The crawler lists the plugin within 30 minutes. Its verdict is in
   https://getbb.app/marketplace/v1/index/v1/report.json

Authors of existing entries can update their listing the same way: a release
from the same source, or from the GitHub owner named in the entry's
author.github, replaces the entry.

Listings are not reviewed by BB. Details: ${README_URL}
Please close this pull request.`;

/** The entry id a changed path belongs to, or undefined. */
export function entryIdForPath(path) {
  return (
    /^entries\/([^/]+)\.json$/.exec(path)?.[1] ??
    /^overview\/([^/]+)\.md$/.exec(path)?.[1] ??
    /^screenshots\/([^/]+)\/[^/]+$/.exec(path)?.[1]
  );
}

/** Parse `git diff --name-status -M` output into `{ status, path, from? }`. */
export function parseNameStatus(output) {
  const changes = [];
  for (const line of output.split("\n")) {
    if (line.trim() === "") continue;
    const [code, first, second] = line.split("\t");
    const status = code[0];
    if (status === "R" || status === "C") {
      changes.push({ status, path: second, from: first });
    } else {
      changes.push({ status, path: first });
    }
  }
  return changes;
}

/**
 * Decide a pull request's entry changes.
 *
 * `changes`: `{ status: "A"|"M"|"D"|"R"|"C"|..., path, from? }` against the
 * base branch. `baseEntries`: id → entry on the base branch. `isMaintainer`:
 * an async check of the author, called only when it decides the result.
 */
export async function checkEntryChanges({ changes, author, baseEntries, isMaintainer }) {
  const added = [];
  const owned = new Set();
  for (const change of changes) {
    const paths = change.status === "R" ? [change.from, change.path] : [change.path];
    for (const path of paths) {
      const id = entryIdForPath(path);
      if (id === undefined) continue;
      const isNewEntryFile =
        path.startsWith("entries/") &&
        !baseEntries.has(id) &&
        (change.status === "A" || change.status === "C" || (change.status === "R" && path === change.path));
      if (isNewEntryFile) added.push(path);
      else if (baseEntries.has(id)) owned.add(id);
    }
  }

  const errors = [];
  if (added.length > 0) {
    errors.push(`${added.join(", ")}: ${NEW_ENTRY_MESSAGE}`);
  }

  const login = author.toLowerCase();
  const foreign = [...owned]
    .filter((id) => baseEntries.get(id)?.author?.github?.toLowerCase() !== login)
    .sort();
  if (foreign.length > 0 && !(await isMaintainer())) {
    for (const id of foreign) {
      const owner = baseEntries.get(id)?.author?.github;
      errors.push(
        `entries/${id}.json: Only the entry's author (${owner === undefined ? "no author.github" : `@${owner}`}) or a maintainer can change or remove it. ` +
          `@${author} is neither. The entry's author can also update the listing by self-publishing; see ${README_URL}`,
      );
    }
  }
  return { errors, added, owned: [...owned].sort(), foreign };
}

export async function fetchIsMaintainer({ repository, login, token, fetchImpl = fetch }) {
  const response = await fetchImpl(
    `https://api.github.com/repos/${repository}/collaborators/${encodeURIComponent(login)}/permission`,
    {
      headers: {
        accept: "application/vnd.github+json",
        "x-github-api-version": "2022-11-28",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      signal: AbortSignal.timeout(30_000),
    },
  );
  // A non-collaborator is a 404 for this endpoint.
  if (response.status === 404) return false;
  if (!response.ok) {
    throw new Error(`The permission check for @${login} failed with HTTP ${response.status}.`);
  }
  const body = await response.json();
  return ["admin", "maintain"].includes(body.role_name) || body.permission === "admin";
}

function readBaseEntries(root, baseSha) {
  const files = execFileSync("git", ["-C", root, "ls-tree", "--name-only", baseSha, "entries/"], {
    encoding: "utf8",
  })
    .split("\n")
    .filter((path) => path.endsWith(".json"));
  const entries = new Map();
  for (const path of files) {
    const id = entryIdForPath(path);
    try {
      entries.set(
        id,
        JSON.parse(execFileSync("git", ["-C", root, "show", `${baseSha}:${path}`], { encoding: "utf8" })),
      );
    } catch {
      entries.set(id, {});
    }
  }
  return entries;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const eventPath = process.env.GITHUB_EVENT_PATH;
  const event = eventPath === undefined ? {} : JSON.parse(readFileSync(eventPath, "utf8"));
  const pullRequest = event.pull_request;
  if (pullRequest === undefined) {
    console.log("Not a pull request; no entry policy to check.");
    process.exit(0);
  }
  const baseSha = pullRequest.base.sha;
  const headSha = pullRequest.head.sha;
  const author = pullRequest.user.login;
  const changes = parseNameStatus(
    execFileSync(
      "git",
      ["-C", root, "diff", "--name-status", "-M", `${baseSha}...${headSha}`, "--", "entries/", "overview/", "screenshots/"],
      { encoding: "utf8" },
    ),
  );
  const result = await checkEntryChanges({
    changes,
    author,
    baseEntries: readBaseEntries(root, baseSha),
    isMaintainer: () =>
      fetchIsMaintainer({
        repository: process.env.GITHUB_REPOSITORY ?? "get-bb/marketplace",
        login: author,
        token: process.env.GITHUB_TOKEN,
      }),
  });
  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`::error::${error.replaceAll("%", "%25").replaceAll("\r", "").replaceAll("\n", "%0A")}`);
      console.error(`\n${error}\n`);
    }
    process.exit(1);
  }
  console.log(
    result.owned.length === 0
      ? "The pull request changes no entry."
      : `The pull request changes ${result.owned.join(", ")}; @${author} may change them.`,
  );
}
