Your published Claude Code artifacts and Codex Sites in one bb page, opened in bb's browser.

## What you get

- An **Artifacts** page in the navigation rail with two grids: Claude Code artifacts and Codex
  Sites, newest first. Each card shows a preview image, the title, who can open it and how long
  ago it changed. A star marks artifacts you starred in Claude.
- A click opens the artifact or site in bb's browser. "Open gallery" opens Claude's own gallery.
- A filter matches title, description and address; the refresh button reloads both lists.
- Agents can show an artifact or site in chat as the same card, with
  `::artifact{url="…"}` on its own line.
- `bb artifacts list` prints both lists in a terminal; `--json` gives agents the data.

## How it works

The bb server reads your Claude Code login from the macOS keychain and your Codex login from
`~/.codex/auth.json`. It sends them only to `api.anthropic.com` and `chatgpt.com` to list what
you published. Nothing is stored beyond a short in-memory cache.

## Requirements

- The bb server runs on a Mac signed in to Claude Code, Codex, or both.
- macOS may ask once to let bb read the `Claude Code-credentials` keychain item.
