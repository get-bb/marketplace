RouterAI is a Russian model aggregator: one account and one key instead of a dozen subscriptions, paid in rubles. This plugin adds it to bb as a provider. Threads run on RouterAI models, and OpenCode acts as the agent; the plugin configures OpenCode for RouterAI and leaves your own OpenCode settings alone.

## What you get

- **One-click sign-in.** Press Sign in with RouterAI, approve access on routerai.ru, and the key is stored in bb. Set a spending limit for the key on the same page. For bb on a server or in Docker, sign in with a code instead.
- **Money in view.** Your balance and the key's remaining limit sit in the sidebar. Each thread shows its spend in rubles above the composer and in bb's context window.
- **The whole catalog.** About 300 tool-calling models with ruble prices and context sizes. Search them, build your own list and order; the first model is the default for new threads.
- **Clear refusals.** If you are not signed in, the key was revoked, or OpenCode is missing, the message is not sent and bb tells you what to do. The thread does not fail with an error code.
- **Claude Code through RouterAI.** One switch routes bb's built-in Claude Code provider to RouterAI's Claude models, paid from your RouterAI balance, with no Claude subscription and all of the provider's features.
- **A key per installation.** Each bb installation gets its own key named `bb-<machine>-<4 chars>`, so signing in on a second computer does not sign out the first.
- **`bb routerai` command.** Sign in and out, check status and balance, and manage the model list from the terminal.

## Requirements

- A RouterAI account: https://routerai.ru
- OpenCode on the machine where bb runs threads: `npm install -g opencode-ai`
- For Claude Code mode, Claude Code on that machine.
- bb 0.49 or newer.

## Privacy and billing

Prompts, files the agent reads, and tool output go to RouterAI and to the provider of the model you choose. RouterAI bills usage to your balance. The key is kept in bb secrets and in a 0600 file in the plugin's data directory on the agent's machine; it never enters thread events, the thread environment, or provider settings. Signing out deletes the file.

While Claude Code mode is on, every thread on the Claude Code provider goes through RouterAI, and personal settings from `~/.claude` do not apply; project settings still work. Turn the mode off to return to your Claude subscription.

The spend shown in a thread is computed from the token counts the agent reports and catalog prices, so the final charge on routerai.ru can be slightly higher. Your RouterAI dashboard has the exact charges.

Tested on Linux with bb 0.49, OpenCode 1.19 and Claude Code 2.1. Source, docs and issues: https://github.com/router-ai/bb-plugin-routerai
