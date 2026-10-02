## Independent review for coding work

Advisor gives a coding thread a second model that checks its work before the final answer and can review the completed turn afterward. The reviewer has its own persistent context and can inspect the same workspace. Failed or timed-out reviews appear as unavailable, never as approval.

## Findings that stay with the thread

Open the Advisor panel to see findings, evidence, and review history. Findings remain tracked across turns; a later review can re-check a correction and close the original finding. Use **Review now** for an on-demand check or **Fix in new turn** to ask the primary agent to address a finding.

## Choose where reviews run

Use the switch in an existing thread's composer to override the global default. New threads follow that default. Turning a thread off stops automatic reviews and automatic corrective turns; explicit review requests still work. Automatic corrective turns are off by default.

Choose a reviewer model and reasoning level for each connected machine, or follow the primary thread's model. The reviewer can use the same provider or another configured provider that supports its required permission mode.

## Requirements and usage

Requires BB 0.40 or later, plugin SDK 0.4.21 or later, and a configured agent provider capable of running a reviewer in Accept Edits mode. Reviews use your existing provider account and consume additional model usage under that account's billing or subscription limits. No separate Advisor service or account is required.

The reviewer is instructed to inspect without editing, but Accept Edits does permit workspace writes. Claude Code may still request command approval in the hidden reviewer thread; use **Show reviewer** to inspect it if a review stalls. On BB 0.43.1, an existing Codex session needs a fresh model session to gain a newly enabled review tool; **Review now** works immediately.

See the [setup and behavior guide](https://github.com/salemsayed/bb-plugin-advisor#readme) for settings, reviewer policy, and operating details.
