Each window OpenCode reports — rolling, weekly, and monthly — appears with the
percentage consumed and the time it resets, so you can see how much plan is
left without leaving BB.

## What you get

The sidebar footer card and Settings → Provider usage both list OpenCode Go.
Each window shows the percentage consumed and its reset time. The same values
are available to scripts as JSON through `bb settings usage`.

## Setup

Install the plugin, then sign in to OpenCode Go once on that host if you have
not already:

```
opencode auth login
```

Choose OpenCode Go when prompted. The plugin reads that key from
`~/.local/share/opencode/auth.json`, falling back to
`~/.config/opencode/auth.json`; `OPENCODE_AUTH_JSON` overrides the path. There
is no second credential to create and nothing else to configure.

## How it works

The plugin registers `opencode-go` as a maintenance-only provider. It answers
usage and health requests and never runs a thread, so it adds no models to the
composer and takes no part in a turn.

Usage comes from OpenCode's official API at https://opencode.ai using the API
key OpenCode already stores for its own `opencode-go` entry. Requests time out
after ten seconds, and a rejected or planless key is reported as an error rather
than as zero usage.

## Requirements

An OpenCode Go subscription, with OpenCode signed in on the machine. Where no
Go key exists the provider is absent from both the usage panel and the model
picker.
