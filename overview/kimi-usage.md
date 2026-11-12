## What you get

A Kimi Code plan has no usage source in bb: the Provider usage view reads
OpenCode Go, Claude Code and a few other subscriptions through their own
collectors, and Kimi is not among them. The plan's 5-hour window and monthly
quota stay invisible until you visit the vendor's site.

This plugin adds the row. It shows every window the Kimi API reports — the
5-hour limit, a weekly or daily window when the plan has one, and the monthly
quota — with the percentage used and the reset time.

## How it reads the plan

The host entry finds the Kimi Code CLI credentials (`KIMI_CODE_HOME`,
`~/.kimi-code`, or the older `~/.kimi`), refreshes the OAuth token when it is
close to expiry, writes the rotated token back where the CLI expects it, and
calls the usage endpoint named by the CLI's own `config.toml`. Nothing is
hardcoded to a vendor host: the base URL comes from that config.

## When it stays quiet

The row appears only when the Kimi Code ACP provider is installed, enabled and
available in bb, because without that provider there is no subscription to
meter. A host whose login has expired drops out of the panel instead of showing
an empty row; `bb kimi-usage show` still reports that host as `expired`, so the
reason is not lost.

## Command

`bb kimi-usage show [--host <id>] [--json]` prints the same windows per host and
forces a fresh measurement.

## Requirements

The Kimi Code CLI signed in on the host (`kimi login`), the Kimi Code ACP
provider enabled in bb, and bb 0.49 or newer. The plugin refreshes the token
itself but cannot repair a rejected refresh token: that needs a new login.
