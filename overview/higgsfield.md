## What you get

- **Burn forecast.** A chart of this billing cycle: your real balance from the
  monthly grant to today, then a dashed projection at your current pace to the
  reset date. It ends on the number that matters: credits left to expire, or
  the day the balance hits zero.
- **Reset and grant.** Days until your credits refresh, the date, and how many
  credits the next grant adds on your plan. Last cycle's expired credits are
  shown next to this cycle's usage.
- **Burn rate.** Credits per day this cycle and over the last 7 days, against
  the pace that would spend the whole balance by the reset.
- **Generations by model.** For every model: generations, failed generations
  whose credits were refunded, credits spent, credits per generation, share,
  and when you last used it. Each model is tagged Image, Video, Audio, or Text.
- **Daily spend.** A stacked chart and a share breakdown, colored by model or
  by media type. Filter by this cycle, 7, 30, or 90 days.
- **Recent activity.** The latest transactions (generations, refunds, grants,
  credit packages, expiries) and the latest generation jobs with their status.
- **Agent access.** `bb higgsfield status` and `bb higgsfield models` give an
  agent the same numbers, so you can ask "how many Higgsfield credits do I
  have left?" in any thread.

## How it works

The plugin runs the official Higgsfield CLI on your machine with read-only
commands: `account status`, `account transactions`, `generate list`, and
`model list`. It never starts a generation.

Sign-in goes through Higgsfield's own browser login (`higgsfield auth login`),
where you can choose Continue with Google. The token stays with the CLI; the
plugin never reads or stores it.

The reset date is inferred from your history: the last monthly "Subscription
Credits" grant starts the cycle, and the next reset is one month later. The
forecast assumes the next grant equals the last one.

## Requirements

- The Higgsfield CLI installed on the BB host, on `PATH` or set in the plugin
  settings.
- A Higgsfield account. The forecast needs a subscription plan with a monthly
  credit grant.

This is a community plugin. It is not made or endorsed by Higgsfield.
