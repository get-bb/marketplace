## What you get

Click **Host Pulse** in the sidebar footer to open the floating monitor in one click; click it again to hide the card. The compact card stays visible across BB pages, threads and projects. Drag its title with a mouse or finger, or use the arrow keys. Its position and visibility are saved in your browser.

See overall CPU and memory use, one bar per logical core, root-disk space and activity, IOPS, download/upload speed, and the current CPU and memory process leaders. Open the details panel for CPU history, swap, disk and network activity, and uptime.

Provider quotas have separate usage meters and reset countdowns for every reported window. The optional DeepSeek row shows API money remaining in the account's currency.

## Updates and alerts

Server readings refresh every five seconds by default. Quotas refresh once a minute; DeepSeek balance refreshes every ten seconds. These requests stop when the card and details are closed or the browser tab is hidden. Failed requests show stale or unavailable data and retry automatically.

Optional background monitoring checks CPU and memory every 30 seconds. Sustained overload can show an in-app alert when BB is open and visible. It is off by default. `bb host-pulse snapshot`, `health` and `logs` also expose the readings and diagnostics in a terminal.

## Requirements

Requires BB 0.48.1 and Plugin SDK 0.6.104 or newer. It monitors the BB server host; detailed disk activity, network rates and current CPU leaders need Linux. Host metrics need no external account.

Quotas use BB's installed **Provider usage** plugin and its configured provider accounts. DeepSeek balance requires an existing local DSH custom provider using an environment or `.env` API key; it calls DeepSeek's official balance API. The key stays on the server. Managed DSH credential stores, per-thread accounts and remote DSH hosts are not supported by this balance adapter.

See the [README](https://github.com/maryanovas/bb-plugin-host-pulse#readme) for setup, metric definitions and limitations.
