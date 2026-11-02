## What you get

- While a thread runs, its newest 5 work blocks stay expanded, so the latest output is in view without clicks.
- Blocks count at every depth, in timeline order. A group such as "Ran 2 commands" counts, and so do the commands inside it. For example, with the limit at 5 and three groups of seven commands, the last five commands of the newest group stay open. That group opens to show them, but it takes no slot.
- When the final answer appears, only the last block stays open. Older blocks fold again.
- A run you stop before its answer keeps the running count.
- Your own toggles stay where you put them. The plugin changes a block only when its place in the window changes.

## Settings

- Open blocks while the thread runs: 0 to 10, default 5. 0 turns this mode off.
- Open blocks after the final answer: 0 to 3, default 1. 0 turns this mode off.
- Count Thought as a block: on by default. Turn it off to leave Thought rows out of the count.

Changes apply at once, with no reload.

## How it works

The plugin runs in the open app. It reads the thread timeline: the row ids, the thread pane, the expand buttons, and the Stop run button. It clicks a block's expand button only when that block's place in the window changes. It needs no account, key, or external service. Its settings are stored in bb on your bb server.

## Limits

The plugin depends on bb's timeline markup. A bb update that renames those attributes or the Stop run label can stop the plugin from working. It does not show an error of its own when that happens.
