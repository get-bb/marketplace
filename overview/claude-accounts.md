Several Claude Code logins on one Mac: see which one still has quota, switch to it, keep working.

## Who it is for

People who keep more than one Claude account on the same computer and hit a session limit mid-thread. The job is to look at remaining quota, pick an account that can still run, and continue — without a terminal login dance.

Not a password manager. It does not switch Cursor or Codex; those logins stay where BB already put them, and the page only shows their limits.

## What you get

A page in BB lists this machine's current Claude login and the accounts you saved. Limits are percent bars per window. Switch makes a saved account the machine login for new Claude threads. Forget drops a snapshot. Sign in another account opens Claude's own browser login and saves the result.

Running threads keep the session they started with. A snapshot Anthropic no longer accepts is refused, and the current login stays put.

CLI: `bb claude-accounts`. macOS only. Switching uses Anthropic OAuth.

## How it works

Claude Code credentials live in the login Keychain. Snapshots sit in a second Keychain service on this Mac. Labels live in plugin host-data. Tokens never leave the machine. Only the host worker reads or writes them.

## First step

Open **Fast Switch Claude Accounts**, press Limits on a saved account, then Switch onto one that still has quota. Start a new Claude thread.
