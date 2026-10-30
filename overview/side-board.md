Your agent's open questions, the bugs it noticed and the work it deferred stop scrolling away in chat. They land in a panel beside the thread, each with a short id, and they get closed when they are answered or done.

## What you get

- A **Side board** tab in every thread's side panel, with Questions, Bugs and Todos sections. Open items come first, and closed ones stay visible, struck through, with their resolution.
- Ids that are easy to answer: reply `Q3 clerk` in chat, or `go` to accept every recommendation.
- A header badge with the open count. It opens the panel when the agent adds something new.

## How it works

The plugin gives every agent three tools, `board_add`, `board_close` and `board_list`, plus standing instructions to call them whenever it asks you something, notices a bug or defers work, and to close items in the same turn they are resolved. It works the same in Claude Code, Codex and other bb providers. You don't need to set anything up per thread.

A safety net watches each reply. If an agent asked a question or finished work without updating the board, it gets one short reminder. You can turn this off in the plugin settings.

## Requirements

Nothing beyond bb. Boards are stored in bb's own database on your machine. There is no account, API key or external service.
