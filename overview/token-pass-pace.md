See how much of your Vercel Token Pass is gone this billing period, and whether it lasts until it renews.

## What you get

- A **Token Pass Pace** page in the left sidebar: the share of the period allowance already spent, a chart of measured spend, and the forecast to your renewal day.
- A compact line in the sidebar footer: the percentage, a bar, and the day the pass is projected to run out.

## How to read it

The big number is how much of the period allowance is gone. When your recent spending would use up the pass before it renews, the page names the day that happens — "On pace to hit the limit Oct 27". If the allowance is already spent it says so, and when it resets.

The chart covers the whole period on one 100% scale: a solid line where you have been, then a dashed line where you are heading.

## What you need

Three settings, entered once:

- A Vercel **AI Gateway** API key, from Vercel → AI Gateway → API Keys. Any key on the team that owns your Token Pass works.
- Your **renewal day** — the day of the month the pass renews, from Vercel → Teams → Billing. Vercel publishes no billing period over any API, so the plugin cannot detect it; it is one number, entered once.
- Your **allowance**, if it is not $80.

On first run the panel lists these with where to find each one.

Vercel publishes no balance for Token Pass, so the figure here is your allowance minus measured spend, and the forecast extends your recent daily average to the renewal day. It is an estimate, not a provider-stated balance.

## Privacy

The key stays on your machine, in this plugin's own settings. The plugin talks only to the Vercel AI Gateway reporting endpoint, on demand — no background polling.
