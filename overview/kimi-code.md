Run Kimi Code CLI threads from bb's provider picker — on your machine and on
any remote host enrolled to your bb server.

## What you get

- Kimi Code as a provider in bb, with streaming threads and resume (fork is
  disabled: kimi ≥ 2.3.0 locks live sessions to their owning process)
- The model picker filled from Kimi Code itself (`kimi-code/k3`,
  `kimi-code/k3-256k`, K2.8 Preview, K2.7 Code Highspeed)
- Thinking levels (Low / High / Max) and the mode selector
  (Default / Plan / Auto / YOLO) in the composer
- Kimi Code's slash commands (`/compact`, `/status`, `/usage`, and your skill
  commands) in bb's composer menu
- Tool calls — file edits, commands, searches — as native bb timeline rows,
  gated by bb permission modes
- Sign-in detection with `kimi login` hints, and an install action for hosts
  where the CLI is missing

## How it works

The plugin registers a provider declaration on the bb server and ships bb's
published ACP bridge as its host artifact. bb delivers that artifact to the
target host's daemon, which verifies its digest and runs `kimi acp` over
stdio. Remote hosts use the exact same path as localhost — there is nothing
remote-specific to configure in the plugin.

## Requirements

- bb 0.46 or newer
- Kimi Code CLI on each host (`kimi`), installed manually or from the
  provider card in bb
- A signed-in Kimi Code account on each host: `kimi login`

Known limits: no video input (ACP has no video content block), no account
quota display (Kimi Code exposes no usage API). MCP servers are configured by
Kimi Code itself, not by bb.

Source, issues, and the development guide:
https://github.com/dpolishuk/bb-kimi-code
