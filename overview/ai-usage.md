AI Usage shows every Claude Code, Codex and Grok subscription your team shares, on a page in BB: how much of each limit is left, when it runs out at the current pace, which machine used it, and what the subscriptions cost a month. The numbers come from ai-usage, an open-source collector that runs on each of your team's machines.

## What you get

- **Attention first.** A window that is out or will run out before its reset, a machine that stopped reporting, an old release, an unused subscription.
- **Subscriptions.** Each one's limiting windows, what is left, when they reset, and the forecast at reset.
- **Devices × subscriptions.** Weighted tokens of every machine on every subscription, today or over 7, 30 or 90 days.
- **Cost.** What the subscriptions cost a month, how much the team used over 4 weeks, and the next charge.
- **Sidebar footer.** The top three alerts and a bar for each subscription.
- **Invite and Join.** Invite copies a message with the team key; Join pastes a colleague's key.

Before ai-usage is set up, the page shows an example team of made-up data.

## What it installs

On a Mac or Linux machine that runs BB as a person, not root, and has no ai-usage, the plugin installs it once with the install.sh of ai-usage's latest GitHub release: the `ai-usage` binary in `~/.local/bin`, which launchd or cron runs every 15 minutes, with BB open or not, and which updates itself from GitHub Releases. A machine that already has ai-usage is used as it is. Removing the plugin leaves ai-usage collecting; Settings → AI Usage → Remove ai-usage takes it off a machine first.

## What leaves your machines

Each machine sends a signed snapshot to a relay, by default the one ai-usage's maintainer runs. The relay sees tools, plans, percentages and token counts. Names, emails and project paths are encrypted with the team key, which stays on your machines. Anything that runs in BB as you, agents included, can read the team report through this plugin and ask it for the team key; the plugin answers no other plugin and logs neither.

Windows machines are not supported by the plugin yet. Source, issues and the full README: https://github.com/neoromantic/ai-usage
