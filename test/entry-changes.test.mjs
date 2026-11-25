import assert from "node:assert/strict";
import test from "node:test";
import {
  NEW_ENTRY_MESSAGE,
  checkEntryChanges,
  entryIdForPath,
  fetchIsMaintainer,
  parseNameStatus,
} from "../scripts/check-entry-changes.mjs";

const baseEntries = new Map([
  ["notes", { id: "notes", author: { name: "Alice", github: "Alice" } }],
  ["tasks", { id: "tasks", author: { name: "Bob", github: "bob" } }],
  ["orphan", { id: "orphan", author: { name: "No GitHub" } }],
]);

async function decide(changes, author, maintainer = false) {
  let asked = 0;
  const result = await checkEntryChanges({
    changes,
    author,
    baseEntries,
    isMaintainer: async () => {
      asked += 1;
      return maintainer;
    },
  });
  return { ...result, asked };
}

test("paths map to the entry they belong to", () => {
  assert.equal(entryIdForPath("entries/notes.json"), "notes");
  assert.equal(entryIdForPath("overview/notes.md"), "notes");
  assert.equal(entryIdForPath("screenshots/notes/a.png"), "notes");
  assert.equal(entryIdForPath("icons/notes-1234.svg"), undefined);
  assert.equal(entryIdForPath("README.md"), undefined);
});

test("git name-status output parses, renames included", () => {
  assert.deepEqual(parseNameStatus("A\tentries/new.json\nM\tentries/notes.json\nR087\tentries/a.json\tentries/b.json\n"), [
    { status: "A", path: "entries/new.json" },
    { status: "M", path: "entries/notes.json" },
    { status: "R", path: "entries/b.json", from: "entries/a.json" },
  ]);
});

test("a new entry fails for everyone, maintainers included", async () => {
  for (const maintainer of [false, true]) {
    const result = await decide([{ status: "A", path: "entries/brand-new.json" }], "someone", maintainer);
    assert.equal(result.errors.length, 1);
    assert.match(result.errors[0], /^entries\/brand-new\.json: This repository no longer accepts new marketplace entries/);
  }
  const renamed = await decide([{ status: "R", from: "entries/notes.json", path: "entries/notes-2.json" }], "alice");
  assert.deepEqual(renamed.added, ["entries/notes-2.json"]);
});

test("the failure gives the new steps", () => {
  for (const step of ['"bbMarketplace"', '"category"', "bb-plugin", "v1.2.3", "npm publish", "PLUGIN_OVERVIEW.md", "report.json", "existing entries can update their listing the same way"]) {
    assert.ok(NEW_ENTRY_MESSAGE.includes(step), step);
  }
});

test("the entry's author may edit or remove it, case-insensitively", async () => {
  const edit = await decide([{ status: "M", path: "entries/notes.json" }, { status: "A", path: "screenshots/notes/new.png" }], "alice");
  assert.deepEqual(edit.errors, []);
  assert.equal(edit.asked, 0, "no API call when the author owns every entry");
  const removal = await decide([{ status: "D", path: "entries/tasks.json" }, { status: "D", path: "overview/tasks.md" }], "bob");
  assert.deepEqual(removal.errors, []);
});

test("someone else's entry needs a maintainer", async () => {
  const changes = [{ status: "M", path: "entries/tasks.json" }, { status: "M", path: "overview/notes.md" }, { status: "D", path: "entries/orphan.json" }];
  const stranger = await decide(changes, "mallory");
  assert.equal(stranger.errors.length, 3);
  assert.match(stranger.errors.find((error) => error.startsWith("entries/tasks.json")), /@bob/);
  assert.match(stranger.errors.find((error) => error.startsWith("entries/orphan.json")), /no author\.github/);
  const maintainer = await decide(changes, "mallory", true);
  assert.deepEqual(maintainer.errors, []);
  assert.equal(maintainer.asked, 1);
  const mixed = await decide([{ status: "M", path: "entries/notes.json" }, { status: "M", path: "entries/tasks.json" }], "alice");
  assert.deepEqual(mixed.foreign, ["tasks"]);
  assert.equal(mixed.errors.length, 1);
});

test("an author cannot take an entry over by changing author.github", async () => {
  // The base branch decides ownership, not the edited file.
  const result = await decide([{ status: "M", path: "entries/tasks.json" }], "mallory");
  assert.equal(result.errors.length, 1);
});

test("changes outside entries need no check", async () => {
  const result = await decide([{ status: "M", path: "README.md" }, { status: "A", path: "icons/x.svg" }], "anyone");
  assert.deepEqual(result, { errors: [], added: [], owned: [], foreign: [], asked: 0 });
});

test("maintainer means admin or maintain permission", async () => {
  const answer = (status, body) => async () =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
  const check = (status, body) => fetchIsMaintainer({ repository: "o/r", login: "x", fetchImpl: answer(status, body) });
  assert.equal(await check(200, { permission: "admin", role_name: "admin" }), true);
  assert.equal(await check(200, { permission: "write", role_name: "maintain" }), true);
  assert.equal(await check(200, { permission: "write", role_name: "write" }), false);
  assert.equal(await check(200, { permission: "read", role_name: "triage" }), false);
  assert.equal(await check(404, {}), false);
  await assert.rejects(check(500, {}), /HTTP 500/);
});
