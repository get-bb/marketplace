# bb-freebuff

Talk to **Buffy**, the Freebuff agent, from inside bb threads. The plugin
registers a `freebuff` provider; pick it in bb's model picker and the thread
runs on your existing Freebuff account.

## How it works

Nothing here calls Freebuff's API directly. The plugin launches the installed
`freebuff` CLI in a pseudo-terminal — one process per bb thread — types your
prompt, and streams the reply back into the timeline as bb agent chunks by
reading Freebuff's own persisted conversation file. That is the same binary
you would run in your terminal, so Freebuff free mode stays on its supported
path.

- `server.ts` registers the provider and points bb's ACP bridge at
  `adapter/acp.mjs`.
- `host.ts` re-exports bb's published ACP bridge kit, so the `bb.host` artifact
  runs the generic ACP bridge.
- The adapter speaks ACP over stdio, spawns one `freebuff` instance per thread
  behind `script(1)`, and forwards `agent_message_chunk` and
  `agent_thought_chunk` updates as they are persisted.

Follow-ups in the same bb thread continue the same Freebuff conversation.

## Requirements

- bb >= 0.45
- The `freebuff` CLI installed and signed in (`npm i -g freebuff`, then run it
  once)
- Linux or macOS — the adapter uses `script(1)` for the PTY

## Install

```sh
bb plugin install git:https://github.com/masked8knights/bb-freebuff.git@main
```

## Limitations

- The model list is a static Freebuff catalog; Freebuff keeps using the model
  saved in its own TUI (`/model`).
- Every bb thread spends from the same account-level Freebucks allowance, and
  Freebuff allows only a few live sessions at once, so keep the number of
  active threads small.
- Approvals happen inside Freebuff's TUI: the provider runs with permission
  mode `full` and bb shows no approval cards.
- A turn that produces nothing for 10 minutes fails.

Unofficial community plugin, not affiliated with or endorsed by Freebuff or
Codebuff. MIT licensed; uses your existing Freebuff login through the official
CLI only.
