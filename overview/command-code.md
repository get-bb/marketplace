Adds Command Code to BB's provider picker, so threads can run on any of the 70 models it exposes — Claude, GPT, GLM, Kimi, DeepSeek, MiniMax and the rest — without leaving BB.

## What you get

Command Code is a terminal coding agent that learns your code style. It has no Agent Client Protocol server of its own, so this plugin ships one: a small adapter that drives `cmd` in headless mode and translates its event stream into ACP. BB's own ACP bridge does the rest.

The translation is what makes threads read like every other BB thread:

- **Tool calls become BB timeline cards.** A shell command renders as a command execution with its output streaming in. A file read links the file it touched. A write carries a diff.
- **Reasoning is separated from the answer.** Command Code's thinking stream lands in BB's reasoning item, not inline with the reply.
- **Every model is selectable.** The adapter reformats `cmd --list-models` into the shape BB's picker reads, with Command Code's own default model first.
- **Context survives the turn.** `cmd -p` is one-shot, so each prompt resumes the same Command Code session underneath. A restart does not lose the thread.

## What it costs you

Three installs, all public:

```bash
npm i -g command-code                                # the agent
npm i -g github:aqidd/bb-plugin-command-code         # the ACP adapter
bb plugin install git:https://github.com/aqidd/bb-plugin-command-code
```

Then `cmd login`. Command Code accounts are separate from BB; bring-your-own-key also works through `cmd`'s own config.

The provider stays hidden in BB's picker until `command-code-acp` is on the machine's `PATH`, so a partial install shows nothing rather than failing at run time.

## The permission tradeoff

Command Code's headless mode has no interactive permission channel. Verified against 1.53.0: without `--yolo` every write and shell tool is refused outright, and with it they all run unsupervised. There is no middle setting to map BB's per-tool approval onto.

So this plugin does not pretend to prompt per call. It exposes the choice once, in Settings → Plugins → Command Code:

- **Allow file writes and shell commands: on** — `cmd` runs with `--yolo`.
- **off** — the provider can read and search, nothing else.

If you want Command Code for review and exploration but not for edits, turn it off. Per-call approval through Command Code's `PreToolUse` hook is tracked in the repository issues.

## Known gaps

- No per-tool permission prompts (above).
- No usage or cost reporting in BB, though `cmd` reports per-turn tokens.
- No thread fork or edit-past-message: Command Code cannot clone a session.
- Images in prompts are dropped, including on the vision-capable models.

MIT licensed. Issues and pull requests at [aqidd/bb-plugin-command-code](https://github.com/aqidd/bb-plugin-command-code).
