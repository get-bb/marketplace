Run Claude Code threads on different Claude accounts: a work account for one
project, a personal one for another, and a switch per thread when you need it.

## What you get

- **Settings → Claude profiles**: add accounts as a Claude config folder
  (`~/.claude-work`), a `claude setup-token` token, or an Anthropic Console
  API key. Each one shows, for every machine, whether Anthropic accepts its
  login, and for config-folder logins the plan (Pro, Max) and how much of the
  5-hour and weekly limits is used. The machine's own login is listed too.
- **Defaults**: one for all projects, one per project.
- **New-thread picker**: choose a different account for the thread you are
  about to start, with each account's remaining 5-hour limit beside it, or
  make it the project's default.
- **Thread menu → Claude account**: switch a thread. If it already has a
  conversation, bb asks first, then copies the conversation to the new account
  so it continues where it left off.
- **Thread Info**: shows each thread's account and where it came from.
- `bb claude-profiles` commands for the same things.

## How it works

Each thread is pinned to an account on its first run. bb then starts Claude
Code with that account's config folder, or a small wrapper that supplies its
token or API key and clears any other Anthropic credential, so the machine's
own login cannot win. Secrets stay on the bb server and never appear in the
thread timeline. Usage and plan come from the same Anthropic endpoints Claude
Code calls; setup-tokens and API keys don't report them. Without any
accounts, threads use the machine's own Claude login as before.

## Requirements

Claude Code on each machine that runs threads. Usage and plan checks read a
config folder's login on Linux and Windows; on macOS that login is kept in the
Keychain and isn't checked.
