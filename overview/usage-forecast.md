## What you get

Your Claude Code and Codex limits wherever you look in bb, each coloured by whether it lasts to its reset.

- **Page header.** The open thread's 5-hour and weekly windows at the top right, with the time to the 5-hour reset: «5H 4h 41m 97%  W 61%». Styles: numbers, numbers with bars, forecast first (a window about to run out goes first, «out 14:20»), or every provider by its icon. On a phone: a dot and the worst percent.
- **Sidebar icon.** Two rings (5-hour outside, weekly inside) or one ring for the worst window.
- **Band above the composer.** One row of bars while all is calm. When a window will run out before its reset or the context passes 80%, a headline, an auto-compact switch and a Compact button join it. Expanded, it lists every window with a pace note («At this pace lasts to reset – about 8% left»), the context breakdown, the other providers and the token totals.
- **Floating widget.** Optional panel at the right edge: big numbers or one line per provider. Folds into a round badge, drags up or down.
- **Limits card.** The header and the sidebar icon open a card with every provider's windows, one tab per host: rows with bars, or big numbers. Every card has refresh and settings buttons.
- **Context card.** On the desktop, the thread context card shows the fill in tokens, the breakdown, Compact and the thread's auto-compact mode.

Every indicator shows the share left (default) or the share used, by one setting. A section «How it looks» on the settings page draws each widget live in the styles you choose.

## How the forecast works

The server polls bb for limits every 2 minutes (1–10, configurable), with every client closed too. The first forecast extends the current window's pace once 5 % of the window has passed. After the server has seen windows of the same kind close, it also shows a learned forecast from the last eight of them. A window without a forecast stays grey; amber means tight or will not last, red means it runs out soon or is used up.

## Several hosts

Each connected bb host is polled on its own, with its own history and forecast. A thread shows the limits of the host it runs on, and the limits card shows one host per tab. Hosts signed in to one account show it once and get one push.

## Push notifications

When a limit window reaches 90 % used (configurable) the server sends one push through bb's push-notifications plugin, and one more when the window runs out. On by default.

## Auto-compact

Off by default. When it is on, the server compacts a thread when the thread goes idle with its context at or above the threshold (80 % by default, 50–95). It never interrupts a turn. The threshold is a percent of the thread's working context limit: a per-thread limit, else a per-provider limit for Claude Code or Codex, else the point where the provider compacts on its own when bb reports it, else a global limit (150 000 by default).

For a provider that cannot compact (custom ACP agents), an optional setting, off by default, asks the agent for a summary, clears the thread's context and sends the summary back. Nothing is cleared without a summary.

## CLI and agents

`bb usage-forecast` prints every provider's limits and a thread's context, compacts a thread and sets its auto-compact mode. `bb usage-forecast headroom` tells an agent which provider has room left until its reset. Agents in bb threads get the same reference as a skill.

## Requirements

Limits appear only for providers that report them to bb; today these are Claude Code and Codex. Other providers show their status only. Codex reports no context breakdown, only the total.

## Privacy

All numbers come from bb itself. The plugin calls no provider API and reads no provider credentials. Account e-mails and keys are never stored.

Formerly «Usage Forecast»; the plugin id stays `usage-forecast`. Source and issues: https://github.com/ponomr/bb-plugin-usage-forecast
