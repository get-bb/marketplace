bb writes a thread title one time, from your first message. When the work
moves on, the title stays behind. Retitle writes the title from the
conversation instead.

## What you get

- **A new title after the first reply.** A small model reads the conversation
  and writes a short title, one time per thread.
- **⌘⌥R to rename again.** Press it in any thread, click the pencil button in
  the thread header, or run "Retitle: rename thread from the conversation"
  from the quick palette. `bb retitle` does the
  same from a terminal or an agent.
- **Optional emoji.** Titles can start with one emoji that fits the topic, for
  example "🐛 Fix flaky login test".
- **Your titles stay.** If you type a title yourself, automatic renaming stops
  for that thread.
- **Optional updates.** Set "Rename again every N messages" to keep long
  threads current. The default is 0, which means never.

## How it works

For each rename, the plugin starts a short hidden helper thread in the same
environment as the renamed thread, so bb makes no new worktree. The helper
reads the start of each message in the conversation, answers with a title, and
is deleted.

The helper uses the provider of the renamed thread and a small model from that
provider: Haiku 4.5 on Claude Code, gpt-5.4-mini on Codex, and the default
model on other providers. You can set a different provider or model.

## Requirements

Each rename uses one short session on your provider, and counts against its
usage. A rename takes about 15 seconds. The plugin needs no API key and no
external service.
