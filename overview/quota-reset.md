Automatically use an existing local Codex reset when an explicitly authorized thread hits a usage limit.

## Controls

Choose thread IDs, pin the local account email, set a recovery-time threshold, a total reset budget and an expiration. The plugin starts disabled. Settings are available in BB and through its CLI.

## Diagnostics

Read the policy and journal with `bb quota-reset status --json`. Inspect reset credits without spending them with `bb quota-reset inspect --json`.

## Requirements and limits

Requires a local Codex ChatGPT login on the BB server host and an available reset entitlement. Pooled accounts and remote hosts are not supported. Durable goals that stop without a turn failure are not automatically resumed. Unknown redemption results block further spending for manual review. Real redemption and live failure recovery still require verification before unattended use.
