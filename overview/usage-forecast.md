## What you get

A band above the composer of every thread. Collapsed, it is two lines: a headline («On track…», «At this pace you'll run out before the … reset.», «Limit reached…») with an auto-compact switch and a Compact button, and one row of short bars: one per limit window of the thread's provider (5H, W, F for Fable) and one for the context window (Ctx).

Each limit bar shows the time to reset, the percent used or left, and a tick where the current pace ends at the reset. Expanded, the band lists every window with a pace note («On pace for about 92% by reset – resets in 3d»), the context breakdown into messages, tools and other, one line per other provider and the latest compacts.

On the desktop, the thread context card gets a section with the fill in tokens, the breakdown, the Compact button and the thread's auto-compact mode. On a phone the same controls are in the expanded band.

## How the forecast works

The server polls bb for limits every 2 minutes (1–10, configurable), with every client closed too. The first forecast extends the current window's pace once 5 % of the window has passed. After the server has seen windows of the same kind close, it also shows a learned forecast from the last eight of them.

## Auto-compact

Off by default. When it is on, the server compacts a thread when the thread goes idle with its context at or above the threshold (80 % by default, 50–95). It never interrupts a turn and waits 10 minutes between attempts on one thread. The threshold is a percent of a working context limit in tokens (150 000 by default), which the model window caps, so a large-window model is compacted at the same fill as a small one. Claude Code compacts on its own at 78 % of its window, so for Claude Code threads the plugin acts a little below that point. A per-thread mode (as in settings, off, or on with its own threshold) and a per-thread limit override the global settings.

## Settings and CLI

Settings: the context limit, auto-compact and its threshold, the poll interval, the UI language (English or Russian) and whether limits show the percent used or the percent left.

The `bb usage-forecast` command prints the status of every provider and a thread's context, compacts a thread and sets a thread's auto-compact mode. Agents in bb threads get the same reference as a skill.

## Requirements

Limits appear only for providers that report them to bb; today these are Claude Code and Codex. Other providers show their status only. Codex reports no context breakdown, only the total.

## Privacy

All numbers come from bb itself. The plugin calls no provider API and reads no provider credentials. Account e-mail addresses and account keys are dropped before anything is stored, and e-mail addresses in error texts are masked.

Source and issues: https://github.com/ponomr/bb-plugin-usage-forecast
