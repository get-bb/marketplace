## Why

A Thought shows what the agent is about to do before it does it. With every Thought open you catch a wrong turn early: stop the run and send a correction instead of reading the damage afterwards.

## What you get

- One button in the thread header shows **Thoughts: open** or **Thoughts: folded**. A click switches every Thought in every thread. The command palette has the same switch, **Thoughts: show or fold**. The choice is saved on your bb server, so every window and device follows it.
- Every Thought row opens on its own, for any provider whose reasoning bb shows as a Thought: Claude Code, Codex, Pi, Cursor, Grok. Rows open while they stream and stay open after the turn ends.
- Finished thoughts that bb folds into work groups, such as "Ran 5 commands", are shown too. A group that holds a Thought opens. A group of commands only stays folded.
- Long thoughts sit in the timeline in full. bb caps the Thought text at 20rem with an inner scroll bar; the plugin lifts that cap.
- In folded mode open Thoughts fold, and groups that hold a Thought fold too.
- Your clicks win. A Thought or a group you toggle by hand stays as you set it until you flip the button again.

## How it works

The plugin runs in the open app. It reads the thread timeline: row ids, the expand toggles, and the Thought text box. It clicks a Thought's toggle when it is closed. It opens a closed group once to look inside, keeps it open when a Thought is there, and closes it otherwise. It looks again when the group's header changes. The mode is one value in the plugin's storage on your bb server. It needs no account, key, or external service.

## Limits

- The plugin depends on bb's timeline markup. A bb update that renames it can stop the plugin without an error. Report it at https://github.com/smixs/bb-plugin-thoughts-open/issues.
- A group without a Thought opens for one frame before it closes again.
- The plugin shows what the provider sends. A provider that sends only a summary of its reasoning shows that summary.
