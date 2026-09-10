Give recurring work a named specialist without tying its identity to one repository.

## What you get

- Named bots with configurable avatars, their own instructions, and up to 3,000 characters of durable memory.
- A sidebar that groups conversations by bot, keeps active work visible, and folds older chats into expandable trees.
- Drag-to-bot assignment for existing chats, plus inline archive controls.
- Project membership and one optional owner per project to route new conversations. Existing conversation assignments stay intact.
- `@` completion for bot references and attributed asynchronous coordination through `bb bots list` and `bb bots message`.

## How it works

Start a personal conversation or use BB's native composer to choose a project and machine or create a worktree. Edit a bot's instructions, memory, settings, and project roles in one dialog.

Bot state lives in BB's private plugin storage, not in project files. Agents read and update their own state through `bot_read_state` and `bot_update_state`. Mentioning a bot does not send a message or reassign the current conversation by itself.

## Requirements

Requires BB 0.42 or newer with Plugin SDK 0.4.47 or newer and a configured agent provider. No additional account or external service is required; your provider's normal costs apply. Bot instructions and memory enter the provider's context when its conversations run. Plugins run with BB's full trust; bot membership is not a security boundary. Project-folder creation accepts POSIX paths (including WSL), not native Windows paths.

This is an alpha release.
