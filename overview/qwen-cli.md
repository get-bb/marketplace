## Qwen CLI

Use your installed [Qwen Code CLI](https://qwenlm.github.io/qwen-code-docs/) as an ACP agent in BB. No extra sign-in, no separate configuration — your existing Qwen models, tools, and credentials work as-is.

### How it works

The plugin launches `qwen --acp` through BB's shared ACP bridge. The ACP dialect maps Qwen's tools to BB's rich timeline presentation with icons, labels, and progress indicators.

### Features

- **Plan mode** — research and plan before implementing via composer or `--prompt-mode plan`
- **Auto-approve** — automatically approve permission requests in Accept edits mode for unattended use
- **Sandbox** — run commands in Qwen's sandbox for additional isolation
- **BB-native delegation** — disable Qwen's native subagents and delegate work through `bb thread spawn` instead
- **Command descriptions** — show human-readable tool summaries instead of raw commands
- **Reasoning levels** — low, medium, and high reasoning effort per model

### Requirements

- Qwen Code CLI installed: `npm install -g @qwen-code/qwen-code@latest`
- Signed in via `qwen` interactive (`/auth`) or `OPENAI_API_KEY` + `OPENAI_BASE_URL` for CI/headless
- Node.js ≥ 22, BB ≥ 0.48

### Install

```sh
bb plugin install github:ols-md/bb-plugin-qwen-cli
```

### Permissions

- **Accept edits** — edits files automatically; shell commands, web fetches, and paths outside the workspace prompt for approval
- **Full access** — all operations allowed without prompting