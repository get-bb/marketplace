Run Claude Code in bb with more than one subscription and spend less time
watching the limits. The plugin treats `~/.claude` and each subdirectory of
your accounts directory that holds a Claude Code login as an account, and
moves projects between them.

## What you get

- **Every account in Provider usage.** The 5-hour session, the weekly and
  the per-model weekly windows of each account, with a forecast of when each
  weekly window runs out at your pace. Refreshed every few minutes and on
  demand.
- **Automatic switching.** When a turn fails with a subscription-window rate
  limit, or the account refuses it, the plugin retries it at once on the best
  other account. When none is free, it moves the project to the account that
  frees first and queues the retry for that reset (up to a wait you set).
- **Switch ahead of the limit, if you want.** Set a percentage and a project
  whose account ends a turn at or above it moves before the next turn fails.
  Off by default; needs the automatic choice on.
- **A good start for new projects.** When a thread is created, a project
  created after the plugin first ran moves to the best account, and one
  whose account is already out moves to another. If the first turn still
  runs on the old account and fails there, it is retried once on the new one.
- **The account in every thread.** A Claude Code thread's header shows the
  project's account with a coloured dot for how much it has left, and a menu
  to switch now to the best account or to any other.
- **Accounts and projects in Settings.** Choose the account each project
  runs with or let the plugin manage it, add an account by name (the plugin
  sets it up and runs Claude Code's own login), and see every move with its
  reason. The CLI does the same: `bb claude-switcher use PROJECT ACCOUNT`.

## How the choice is made

The three Claude Code limits are not interchangeable, so an account is only a
candidate while its session and its weekly window are both under 100 % and
the provider reports no lock. Candidates are ordered by the closest weekly
reset, then by the lowest session use. If you name a preferred model, or
switch a thread to another model in bb's picker, only accounts that can still
run that model are chosen; when none can, the retry waits until one can.

## Requirements

bb 0.44 or later, on the machine that holds your Claude Code logins (macOS
keychain, or the credentials file on Linux). The switch is a project machine
environment variable, so threads that run on another host do not follow it.
Each account directory must share the session transcripts (`projects/`,
symlinked from `~/.claude`) and normally the settings, hooks and `CLAUDE.md`
too, or a thread cannot continue on the new account; the
[README](https://github.com/Finolaina/bb-plugin-claude-switcher#setting-up-extra-accounts)
shows the setup.

## How it works

One account = one `CLAUDE_CONFIG_DIR`. The plugin reads each directory's
login from where Claude Code keeps it, queries the usage endpoint Claude Code
itself uses, and sets `CLAUDE_CONFIG_DIR` as a project machine environment
variable when it switches.

## Privacy and terms

No telemetry and no third-party services: tokens go only to Anthropic's own
OAuth and usage endpoints, the ones the Claude Code CLI calls. The plugin
also refreshes an expired token itself, with Claude Code's public OAuth
client id, and writes it back where the CLI keeps it, even when automatic
switching is off. Anthropic's
[legal and compliance page](https://code.claude.com/docs/en/legal-and-compliance)
says OAuth logins are for ordinary use of Claude Code and that developers
may not collect, store or intermediate Claude.ai credentials or session
tokens, so Anthropic could regard this plugin as outside its terms. It is
an independent, MIT-licensed project, not affiliated with Anthropic; use it
at your own risk.
Full details, setup and troubleshooting are in the
[README](https://github.com/Finolaina/bb-plugin-claude-switcher#readme).
