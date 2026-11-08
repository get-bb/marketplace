See your Kimi Code membership quota inside BB, next to the usage of your other providers.

## What you get

- **Kimi Code** alongside Codex/Claude in the BB server machine's usage card,
  without switching to a separate source. It includes three windows: the rolling
  5-hour window, the monthly coding limit, and the monthly total limit, each
  with the percentage used and the reset time.
- A `bb kimi-quota` command for the terminal and for agents, with a `--json`
  option for scripts.

## How it works

The plugin reads the login from your local Kimi Code CLI, so there is no API
key to configure. The CLI access token lives 15 minutes; the plugin refreshes
it through Kimi's OAuth endpoint and writes the rotated token pair back to the
CLI's credential file atomically, so the CLI keeps working. Quota numbers are
cached for one minute between panel refreshes.

## Requirements

The Kimi Code CLI must be installed and logged in on the machine that runs the
BB server, and your Kimi membership must include Kimi Code. The plugin follows
the CLI region (`api.kimi.com` for mainland China accounts, `api.kimi.ai` for
overseas accounts).
