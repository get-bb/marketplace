# Subscription Pace

Track several AI subscription allowances in one panel: how much of each you have used, whether
it will last until the reset, and the combined picture across all of them.

## What it shows

A single chart with every subscription as its own line, plus a filter to look at one, two, or
three at a time. Each row names the number that matters — the percentage used, the day the
current rate runs the allowance out, and when it resets.

**Vercel Token Pass** and **OpenCode Go** occupy slots 1 and 2 and are read live. Slots 3 to 5
take any kind from the catalogue: Claude Pro / Max, ChatGPT / Codex, GitHub Copilot, Cursor,
Gemini, the Anthropic and OpenAI APIs, or a figure you type in yourself.

## Why percent of allowance

Providers do not agree on units. Vercel publishes dollars. OpenCode publishes percentages and no
history at all. So every slot is measured the one way they share:

```
usedPercent = spend / that subscription's own allowance × 100
```

That is the chart's axis, fixed at 0 to 110% so the allowance rule stays visible whether a line
sits at 6% or at 100%. Dollars still appear where a provider publishes them: on the row, and in
the headline subtotal when every readable slot reports dollars.

**Percentages are not summed.** The headline is the share of total allowance used, weighted by
each slot's allowance — a $10 plan at 100% beside a $200 plan at 0% is 4.8% consumed, not 50%. A
plain mean would let the smallest plan dominate, and a sum of dollars would silently drop
OpenCode, which reports no money at all.

## Where the numbers come from

- **Vercel Token Pass** — the AI Gateway spend report, read with the key bb already holds.
- **OpenCode Go** — its `/usage` endpoint, sampled hourly to build the trend it does not publish.
- **ChatGPT / Codex** — BB's own Codex provider, which reads the plan's quota.
- **Everything else** — a figure you enter, dated to the day you last changed it.

Only two settings are credentials: your Vercel AI Gateway key and your OpenCode key. Both are
stored in BB's own secret files, never returned to the interface, and never sent anywhere except
the provider they belong to.

## What it will not do

- **It does not guess.** A provider that cannot be read shows as unreadable, never as zero — a
  subscription with an unknown balance is not a subscription with an empty one.
- **It does not invent history.** OpenCode publishes no series, so the plugin records one sample
  a day and says so. Codex publishes only its current quota, so that row is a marker rather than
  a curve.
- **It does not project a figure that has already run out.** When the allowance is spent before
  the reset, the row names the last day it was spent instead of forecasting a future date.

## Setup

1. Add your Vercel AI Gateway key and OpenCode key in the plugin settings.
2. Check the allowance and renewal day on each slot. They start from a guess based on the
   subscription you picked, so confirm them.
3. For the Codex slot, enable BB's Codex provider and sign in — `bb plugin enable provider-codex`.
   Without it that slot reads as unreadable rather than 0%.

Slots 1 and 2 are on unless you switch them off. Slots 3 to 5 are off until you name a
subscription, so an empty slot never starts measuring something you did not choose.
