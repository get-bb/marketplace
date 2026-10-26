OptBot extends [Bots Sidebar](https://github.com/tobi/bb-bots-sidebar) by Tobias Lütke and replaces how a bot remembers with [OptChat](https://gist.github.com/VictorTaelin/91837951a5ce5b38f341ec1ba1df6449) (now UniiChat), Victor Taelin's design for an endless chat whose history is its memory.

## What you get

- One memory per bot, shared by its conversations and kept apart from other bots.
- Every message and tool call kept word for word; nothing is rewritten or dropped.
- Each turn starts fresh from a bounded view (64-128 KB) of the whole history and zooms down to the original message when a summary is too vague.
- Subagents on request: BB threads under the conversation, titled with their tasks, whose reports reach the bot as they finish.
- A BB restart loses nothing: cut turns and subagents go on once BB is back.
- Edit bot → Memory shows the history, the summary tree and the current view.

## Requirements

- BB 0.44 or newer and an installed agent provider (Codex, Claude Code, Pi or ACP). Its usage costs apply; turns run with Full access.
- A Codex, Claude Code or Pi login on one BB machine for summaries. No API key is needed.

This is an early release.
