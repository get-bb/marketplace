## Who it is for

People who keep more than one Claude or ChatGPT account on the same computer and hit a limit mid-thread. The job is to look at remaining quota, pick an account that can still run, and continue without a terminal login dance.

Not a password manager. Cursor and other providers BB is logged into show limits only; their logins stay where BB put them.

## What you get

A page in BB with a section for each provider you can switch.

- **Claude Code.** This machine's current login and the accounts you saved. Limits are percent bars per window. Switch makes a saved account the machine login for new Claude threads. Forget drops a snapshot. Sign in another account opens Claude's own browser login and saves the result. A snapshot Anthropic no longer accepts is refused, and the current login stays put.
- **Codex.** Save the current ChatGPT login under a label, switch between saved logins, read each saved account's session and weekly limits, forget one, or sign in to another account through the Codex CLI's browser login. A saved account left idle past its token lifetime shows Expired until you switch to it and start a thread.
- **Other providers.** Limits for Cursor and the rest.

A switch applies to new threads. Running threads keep the session they started with.

CLI: `bb claude-accounts` covers the same actions, for example `status`, `switch`, `usage`, `codex-status`, `codex-switch` and `codex-usage`.

## How it works

Claude Code credentials live in the login Keychain; saved snapshots sit in a second Keychain service on this Mac. Codex snapshots have their own Keychain service, and a Codex switch atomically replaces the Codex CLI's auth file. Labels live in plugin host data. Only the host worker reads or writes tokens; the page and the CLI see labels, emails, plans and percentages. Tokens go only to Anthropic and OpenAI, for sign-in, refresh and limit reads.

## Requirements

macOS. Codex switching needs the Codex CLI signed in with ChatGPT and the Xcode Command Line Tools; API-key logins are not supported. Finish running Codex threads before a Codex switch, otherwise an old thread can refresh its token and overwrite the shared auth file.

## First step

Open **Fast Switch Accounts** and save the current login under a label. Press Limits on a saved account, then Switch to one that still has quota. Start a new thread.
