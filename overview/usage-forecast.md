## What you get

A band above the composer of every thread. Collapsed, it is two lines: a headline («On track…», «At this pace you'll run out before the … reset.») with an auto-compact switch and a Compact button, and one row of short bars: one per limit window of the thread's provider (5H, W) and one for the context window (Ctx).

Each limit bar shows the time to reset, the percent used or left, and a tick where the current pace ends at the reset. Expanded, the band lists every window with a pace note («At this pace lasts to reset – about 92% used, resets in 3d», or the time the limit runs out and the daily budget that would last), the context breakdown into messages, tools and other, one line per other provider and the latest compacts.

A ring in the sidebar footer shows the worst limit window across every provider, filled to its used percent and coloured by its pace. Pressing it opens a compact card with every provider's windows, one line each, the plan name and the tokens used today and this month.

On the desktop, the thread context card gets a section with the fill in tokens, the breakdown, the Compact button and the thread's auto-compact mode.

## How the forecast works

The server polls bb for limits every 2 minutes (1–10, configurable), with every client closed too. The first forecast extends the current window's pace once 5 % of the window has passed. After the server has seen windows of the same kind close, it also shows a learned forecast from the last eight of them.

## Several hosts

Each connected bb host (the server and, for example, a laptop enrolled in the same bb) is polled on its own, with its own history and forecast. A thread shows the limits of the host it runs on, and the sidebar card shows one host per tab. Hosts signed in to one account show it once and get one push.

## Push notifications

When a limit window reaches 90 % (configurable) the server sends one push through bb's push-notifications plugin, and one more when the window runs out. On by default.

## Auto-compact

Off by default. When it is on, the server compacts a thread when the thread goes idle with its context at or above the threshold (80 % by default, 50–95). It never interrupts a turn. The threshold is a percent of the thread's working context limit in tokens. The limit is a per-thread limit, else a per-provider limit for Claude Code or Codex, else the point where the provider compacts on its own when bb reports it, else a global limit (150 000 by default). A per-thread mode and limit override the settings; the band's switch turns the thread's mode on or off.

For a provider that cannot compact (custom ACP agents), an optional setting, off by default, asks the agent for a summary, clears the thread's context and sends the summary back. The history stays visible, and nothing is cleared without a summary.

## Settings and CLI

Settings: context limits, auto-compact and its threshold, limit pushes and their threshold, the poll interval, the UI language (English or Russian), percent used or left, reset as a countdown or a time, providers to hide, and a switch for the band above the composer.

The `bb usage-forecast` command prints the status of every provider and a thread's context, compacts a thread and sets a thread's auto-compact mode. `bb usage-forecast headroom` tells an agent which provider has room left until its reset. Agents in bb threads get the same reference as a skill.

## Requirements

Limits appear only for providers that report them to bb; today these are Claude Code and Codex. Other providers show their status only. Codex reports no context breakdown, only the total.

## Privacy

All numbers come from bb itself. The plugin calls no provider API and reads no provider credentials. Account e-mail addresses and account keys are dropped before anything is stored, and e-mail addresses in error texts are masked.

Source and issues: https://github.com/ponomr/bb-plugin-usage-forecast
