Replay any thread frame by frame: every message, command, file change and
error, with a diff between any two moments. It works the same on every agent
provider.

## What you get

- A **Time Machine** page in the left sidebar: pick a thread (or type the id
  of a hidden one), drag across the filmstrip (or press play), inspect
  individual frames, and pin a start frame to see everything that changed
  between two moments as real diffs.
- Works the same on every provider BB ships: Codex, Claude Code, Pi, Muse
  Code, Cursor, opencode, Grok and Antigravity, including sub-agents,
  compactions, stopped turns, edited messages and forks.
- A `bb thread-time-machine dump <thread-id>` command that prints the same
  history as condensed text from a terminal.
- Live updates: frames appear while an agent is still working.

## How it works

The plugin reads BB's native thread event history (`threads.events.list`,
paged backward with seq cursors) and normalises each meaningful event into a
compact frame. What a frame shows is limited to what the provider records:
Codex stores reasoning encrypted, and some providers store edits without a
diff. Nothing leaves your machine; no account, API key, or external
service is involved. The plugin is read-only.

## For agents

The bundled skill (`skills/thread-time-machine`) tells agents how to use
`bb thread-time-machine dump` to summarize what a thread did over a long
session. This plugin never steers or edits threads — it only replays them.