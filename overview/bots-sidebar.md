Give recurring work a named specialist without tying its identity to one repository.

## What you get

- Named bots with avatars, their own instructions, and up to 3,000 characters of durable memory.
- Per-bot defaults for new conversations: harness, model, reasoning, permissions, starter prompt, checkout or worktree.
- A sidebar that groups conversations by bot and folds older chats into trees; running workflows appear as children.
- Drag-to-bot assignment, plus complete and archive controls. Idle chats complete after 3 days; a bot's first is kept.
- Change a thread's bot from its header or Info tab, which also shows the bot's system-prompt additions. Handoffs stay with their bot.
- Project membership and one optional owner per project to route new conversations.
- `@` bot references and attributed coordination through `bb bots message`.

## How it works

A bot's `+` starts a conversation in a project it owns, or a personal workspace. Edit instructions, memory, settings, and project roles in one dialog. Bot state lives in BB's private plugin storage; agents use `bot_read_state` and `bot_update_state`.

## Requirements

BB 0.47.1+ with Plugin SDK 0.6.79+ and a configured agent provider. No extra account or service; provider costs apply. Bot instructions and memory enter provider context. Plugins run with BB's full trust; bot membership is not a security boundary. Project-folder creation accepts POSIX paths (including WSL).
