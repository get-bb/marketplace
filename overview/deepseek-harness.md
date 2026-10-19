# DeepSeek Harness

Run DeepSeek Harness threads in bb, with its modes and its slash commands.

## What you get

- **DeepSeek Harness as a provider.** dsh's ACP app is wired in as `acp-deepseek`, so a
  dsh thread behaves like any other bb thread: streaming, tool calls, reasoning effort,
  context usage, cancel.
- **Standard, Creator, and Minimal modes.** A row above the composer picks which dsh
  composition boots. Creator adds Cordis runtime inspection, the present tool, and the
  plugin manager; Minimal keeps only file access, a shell, and compaction.
- **Harness commands.** dsh's own slash-command registry (`/compact`, `/goal`,
  `/feedback`) is exposed to the agent through a bundled dsh plugin, and a bare command
  line typed into bb runs directly without a model turn.

## How it works

The plugin provisions three dsh profiles and a launcher that boots the one matching the
mode you picked. It installs a small dsh plugin for the command bridge and applies a
patch to dsh's ACP app so the command surface is reachable. One command sets all of it
up, and re-running it repairs an installation after a dsh upgrade.

## Requirements

DeepSeek Harness installed globally (`npm i -g @deepseek-ai/dsh`) and model credentials
for whichever route you use. Threads need a normal writable project directory; a drive
root is rejected by dsh's filesystem layer.

## For agents

`bb deepseek-harness status` reports what is installed, `install` repairs it, and `mode`
shows or changes the composition new threads use.
