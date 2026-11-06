## What you get

A credit indicator beside the thread's context usage opens exact amounts, capture state and coverage. Historical amounts stay visible when new capture is unavailable. Missing telemetry stays unknown instead of appearing as zero.

## Copilot CLI

The BB installation reads native Copilot CLI usage checkpoints. No Pi companion is needed. Checkpoint availability and coverage depend on the provider.

## Pi setup

Pi users also install this release's companion through Pi's package manager on the machine running their thread. The clickable Set up credits indicator provides the command, runtime requirements and restart guidance. Retry check refreshes status without running an installer or calling a model.

The companion reports session-specific startup readiness separately from usage. Ready with no observations means awaiting Copilot usage. Unsupported runtime, disabled capture and errors have their own states. Pi coverage is always partial, and readiness is best-effort process evidence rather than a heartbeat.

## Requirements and privacy

Requires BB 0.48.1+ and authenticated GitHub Copilot access through Copilot CLI or Pi. Pi capture additionally requires Pi 1.5.0+ and the separate companion installation. Tested on macOS. No Pi TUI meter is added.

Private local receipts contain scalar usage and pseudonymous identifiers, not prompts, answers or credentials. The CLI reader returns only usage fields from a bounded log tail. No additional analytics endpoint is used. This is observed telemetry, not an invoice or remaining subscription balance.

The 256-entry receipt cap requires deliberate archival with Pi stopped. Removal preserves receipts. Composer placement uses a private BB DOM adapter with a toolbar fallback and may need updates when BB changes.

[Installation and updates](https://github.com/lalitjeevanrao/copilot-session-credits#readme) · [Privacy and trust](https://github.com/lalitjeevanrao/copilot-session-credits/blob/main/SECURITY.md) · [Receipt cleanup](https://github.com/lalitjeevanrao/copilot-session-credits/blob/main/docs/cleanup.md)
