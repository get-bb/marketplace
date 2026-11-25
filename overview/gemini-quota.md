Check how much of your Gemini quota is used in BB’s Provider Usage panel. Both the five-hour and weekly windows appear under the Antigravity host, along with the snapshot time and estimated reset times.

## How it works

Click **↻** in Provider Usage to open a temporary Antigravity terminal on the configured host, run `/usage`, and save the result. The terminal closes when the refresh finishes. If a refresh fails, the panel shows the last successful snapshot with its timestamp. BB can also read a `/usage` screen you already have open. Quota snapshots are stored locally in BB.

## Setup

You need BB 0.50 or later and a signed-in Antigravity CLI on the target host. Set the source terminal ID with `bb plugin config gemini-quota set terminalId <term_id>`. Set `agyPath` to the executable’s absolute path if the target host uses a different install or home directory. Tested with Antigravity CLI 1.5.16 on Linux using the English `/usage` screen.

## Availability

This integration reads the interactive CLI display. Quota availability depends on your Google account and plan. Google does not provide a public consumer quota API. See the [Antigravity terms](https://antigravity.google/terms) and [Google’s quota integration guidance](https://discuss.ai.google.dev/t/tos-clarification-read-only-agy-p-usage-credits-from-acp-clients-or-native-quota-surface/203283).
