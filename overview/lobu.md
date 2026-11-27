Keep what your agents learn in Lobu memory, without leaving bb.

## What you get

- Threads start with their project's Lobu brief, agents search Lobu before
  they work, and what they learn is saved to your personal Lobu workspace
  without asking.
- You are asked only when a new memory contradicts a saved one. A form above
  the composer shows both, so you can use the new one, keep both, or keep the
  saved one. Nothing is saved until you choose.
- Agents can supersede outdated memories in place, and edits or deletes made in
  Lobu sync back into your project brief.
- Works across every agent provider in bb: native `lobu_search` and
  `lobu_remember` tools plus `bb lobu search` and `bb lobu remember` CLI
  commands for ACP providers.
- Each thread's **Lobu** panel, opened from the side panel's new-tab menu,
  shows what the thread started with, looked up, and saved, with undo, pin,
  and one-click sharing to a linked team workspace.
- The New thread screen shows your Lobu **Inbox**, what new threads in the
  project start with under the thread that taught each memory, and the
  project's recent sessions.
- **Save to Lobu** on any message saves it directly, and **Save learnings to
  Lobu** asks the agent to look back over a whole thread. Archived threads are
  recapped into memory by default.
- Agents can show a Lobu view inline in chat with
  `::lobu-view{workspace="…" view="…"}`. It opens with the login bb uses and
  renders in a sandboxed frame.
- Type `@` in any composer to reference a memory, entity, feed, automation,
  paired device or connection, or open browser tab; it resolves into fresh
  context when the message is sent.
- Memories link to Lobu records only by ids the agent was shown, never by a
  guessed name, and the plugin never creates records.

## Getting started

A card on the New thread screen installs the Lobu CLI with bun or npm, then,
as in the Lobu Mac app, signs you in to Lobu Cloud or runs Lobu on this
machine. Settings → Plugins → Lobu shows which Lobu bb uses and what it
saved there, and switches between them. Needs bb 0.49 or newer.

## How it works

The plugin uses your `lobu` CLI login. Tokens stay in the bb server. The
[README](https://github.com/lobu-ai/bb-plugin-lobu#readme) covers settings and
details, and [GitHub issues](https://github.com/lobu-ai/bb-plugin-lobu/issues)
tracks bug reports.
