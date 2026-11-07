## Copilot session credits at a glance

Copilot CLI supplies native cumulative usage checkpoints. The Pi companion records observed provider usage in private receipts; Pi coverage is partial and can miss earlier calls or hidden retries. Each BB thread shows its own reported provider-session usage, not a subscription balance or invoice total.

The anchored credits panel shows exact reported amounts, coverage and capture status. Recorded credits remain visible if capture stops; missing usage is a dash.

## Setup

With **Copilot CLI**, install this BB plugin. It reads the CLI’s reported usage; no companion is needed.

With **Pi Coding Agent**, click **Set up credits** for the companion install command. Install it on the machine running Pi, then restart the session. Requires **Pi 1.5.0+** with GitHub Copilot signed in. The companion adds no Pi TUI meter.

Requires **BB 0.48.1+** and authenticated GitHub Copilot access. Tested on macOS.

## Coverage and privacy

These are reported session credits, not a remaining subscription balance or invoice. Pi coverage is partial: earlier calls and hidden retries may be missing.

Pi receipts stay on the execution host and contain usage amounts and identifiers, not prompts, responses or credentials. The plugin adds no analytics endpoint. Removing it preserves receipts; the receipt folder has a 256-entry limit.

[Installation and screenshots](https://github.com/lalitjeevanrao/copilot-session-credits#readme) · [Security](https://github.com/lalitjeevanrao/copilot-session-credits/blob/main/SECURITY.md) · [Receipt cleanup](https://github.com/lalitjeevanrao/copilot-session-credits/blob/main/docs/cleanup.md)

Version 0.3.0 uses the BB ID `copilot-session-credits`. Remove the old BB plugin ID before upgrading, and replace the existing Pi source rather than installing a second companion. Legacy receipts remain readable without moving them.
