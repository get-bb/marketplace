# Subscription Pace

Track several AI subscription allowances in one panel: how much of each you have used, whether it
will last until the reset, and which needs attention.

## What it shows

A single chart with every subscription as its own line, plus a filter for one, two or three at a
time. Each row names the percentage used, the day the current rate runs the allowance out, and
when it resets.

**Vercel Token Pass** and **OpenCode Go** occupy slots 1 and 2, read live — the AI Gateway spend
report, and an endpoint sampled hourly to build the trend OpenCode never publishes. Slots 3 to 5
take any kind from the catalogue — Claude, ChatGPT / Codex (read from BB's own Codex provider),
Copilot, Cursor, Gemini, the Anthropic and OpenAI APIs — or a figure you type in.

Only two settings are credentials, the Vercel and OpenCode keys. Both live in BB's own secret
files, never returned to the interface, and sent nowhere but the provider they belong to.

## Why percent of allowance

Providers do not agree on units — Vercel publishes dollars, OpenCode percentages and no history —
so every slot is measured the one way they share:

```
usedPercent = spend / that subscription's own allowance × 100
```

That is the chart's axis, fixed at 0 to 110% so the allowance rule stays visible whether a line
sits at 6% or at 100%. Dollars appear on the row either measured, when the provider publishes
money, or marked `≈` with the percentage they came from. A plan on the plugin's own suggested
limit shows none — it says "no dollar limit set", because a figure the plugin chose is not one it
may multiply out and call a spend.

The allowance you set is the only denominator, so a $150 pass is never measured against a default
$80 — dollars against one figure, a percentage against another.

**There is no combined percentage.** It was removed rather than fixed: weighted by each slot's
allowance, and OpenCode's is a *per-model* monthly limit ($15–$100) the endpoint never names — the
same 27% is $27 on a $100 model and $4.05 on a $15 one, so any weight is a guess. The header
carries a **count in trouble** instead — over the limit, or on pace to be before the reset — which
an average cannot say: 60% used is fine until you learn it took three days.

## The dashed line to renewal

Each measured subscription continues past today as a dashed line, from its trailing seven-day rate
to the "N% projected at renewal" its row reports — read from the collector, not recomputed, so
line and number cannot disagree.

It is drawn only where a rate exists. One reading, spend that stopped before today, and a figure
carried from a finished period have no rate, and drawing any of them flat would assert zero use
rather than an unpredictable one; the caption names each and gives its reason. The axis stays
pinned at 0–110%, so a projection can leave the frame — cut off there, arrowed, its label keeping
the real figure.

## What it will not do

- **It does not guess.** A provider that cannot be read shows as unreadable, never as zero.
- **It does not invent history.** OpenCode publishes no series, so the plugin records one sample a
  day and says so. Codex publishes only its current quota, so that row is a marker, not a curve.
- **It does not project a figure already run out.** When the allowance is spent before the reset,
  the row names the last day it was spent rather than forecasting a future one.

## Setup

1. Add your Vercel AI Gateway key and OpenCode key in the plugin settings.
2. Check each slot's allowance and renewal day — both start from a guess, and the allowance is the
   denominator every percentage uses. OpenCode Go has no default: enter your model's limit to see
   spend marked `≈`, or leave it blank to see only the share.
3. For the Codex slot, enable BB's Codex provider and sign in — `bb plugin enable provider-codex`.
   Without it that slot reads as unreadable, not 0%.

Slots 3 to 5 stay off until you name a subscription, so an empty slot measures nothing.
