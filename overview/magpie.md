## Requirements

You need a running [Magpie](https://usemagpie.ai) gateway that the BB server can reach. The default is `http://127.0.0.1:3425`. Subscription allowance and provider status also need `magpie web` and its Web UI key.

```sh
bb plugin config magpie set gatewayUrl http://127.0.0.1:3425
bb magpie check --native
```

Set `gatewayKey`, `webUrl`, and `webKey` in **Settings → Plugins → Magpie**. Native routing and automatic Pi sync are off after a fresh install.

## Usage page

Open **Magpie** in the navigation rail and pick **Today**, **7 days**, or **30 days**:

- **Estimated cost** at model list prices, with each agent's share of tokens.
- **Tokens or cost over time**, per hour or per day, split by agent.
- **Processed tokens, cached input, output, and requests**, each with a trend line.
- **Subscriptions**: the allowance used in each window and when it resets.
- **Breakdown** by model, agent, or day.

The Magpie button in the sidebar footer opens a compact allowance view. The page follows the browser language: Chinese or English.

## Models and routing

**Sync models** adds Magpie models to the Codex and Claude Code pickers and installs a Pi extension on connected machines. Turn on `autoSync` to keep them current.

Route one thread, or every thread of a provider:

```sh
bb magpie route <thread-id>
bb magpie routing codex
bb magpie routing claude
```

Add `--off` to stop routing.

## Data and credentials

Gateway and Web UI keys stay on the BB server. Machines get a per-machine token, not your gateway key. The browser receives only monitoring fields: no keys, cookies, request content, or raw upstream errors. The monitor only reads from Magpie; it never changes Magpie settings. Pi sync saves your prior Pi selection, and `bb magpie remove` restores it.

Full documentation: https://github.com/vaayne/agent-kit/tree/main/bb-extensions/magpie
