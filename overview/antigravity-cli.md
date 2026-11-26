## Models and reasoning

The model picker uses the choices available to your Antigravity account and CLI version. Examples include Gemini 4 Hydrogen, Orchestrator with a Neon, Carbon, or Argon planner, Claude Opus 5.5, and Claude Sonnet 5.5. The reasoning options depend on the model and plugin version. [Antigravity model guide](https://antigravity.google/docs/models)

## Work in BB

- Choose **Plan** to outline a task or **Build** to implement it. Plan mode does not enforce read-only access.
- Read replies as they arrive and see background commands and agents while they run. Tool cards can show command descriptions, exit codes, and requests to run outside the sandbox.
- View quota used and reset times by model group in the usage sidebar or **Settings → Usage limits** when the CLI reports them.
- Use the BB skills picker to find personal and workspace Antigravity skills.
- In plugin settings, show or hide the provider, request the CLI terminal sandbox for new threads, or disable native subagents to delegate through BB threads.

## Permissions and sandbox

With **Accept edits**, the CLI applies its native editing permissions. By default, remaining ACP permission requests appear in BB for review. In this mode, the optional automatic approval setting approves requests, including commands outside the sandbox if host policy permits them. **Full access** automatically approves ACP permission requests, including requests to run commands outside the sandbox. The plugin uses the CLI's sandbox settings by default. Sandbox availability depends on the host OS and CLI version.

## Requirements

You need BB 0.48 or later, Node.js 22 or later, and the standalone Antigravity CLI with `agy acp` available on the agent host. Sign in to an eligible Antigravity account on that host, including when you run the agent remotely. Antigravity quota or charges apply. This experimental provider has been tested locally on Windows. macOS and Linux still need validation.

See the [setup instructions](https://github.com/ols-md/bb-plugin-antigravity#getting-started) for installation and sign-in.
