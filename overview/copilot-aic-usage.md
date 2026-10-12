## What you get

See the current Copilot session's cumulative AI credits in the thread header. Open the badge for today's local usage, premium requests used this month, and the reset date. Expand Details for checkpoint times and data notes.

The badge updates while the thread is open. Missing data stays unavailable; saved checkpoints remain available when a session is idle. Daily totals cover Copilot sessions on the same host; incomplete scans show unavailable.

## Requirements

Install the `gh-copilot` provider plugin from BB's marketplace. Install GitHub Copilot CLI and sign in with a Copilot-enabled account on the machine running your BB environment. Requires BB 0.43.4 or newer and compatible Plugin SDK 0.5 APIs. Existing `acp-copilot` threads also work.

Follow the [Copilot ACP setup instructions](https://github.com/balazstasi/bb-plugin-copilot-aic-usage#readme).

## Local data

The plugin reads Copilot's local usage checkpoints. It does not send model requests, change Copilot files, or upload telemetry to an external service. BB receives usage values through its host connection. Prompts and responses are not returned or logged.

These figures are local telemetry, not a billing invoice. Copilot does not publish remaining AI credits; the monthly allowance counts premium requests. This independent community plugin is not affiliated with GitHub or Microsoft.
