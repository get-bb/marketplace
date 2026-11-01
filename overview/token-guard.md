Pasted an API key into a chat? It now sits in plain text in your agent history. Token Guard stops the next one before it is sent and shows you the ones already there.

## What you get

- Messages containing a credential are rejected before they reach the agent or the thread history.
- A Token Guard page scans Claude Code, Codex, and BB history in one click.
- A report with the kind of each credential, a fingerprint, where and how often it appears, and a link to revoke it.

## How it works

Everything runs on your BB server. Values are never shown, logged, or stored, and nothing leaves the machine. Only formats with a distinctive prefix are recognized, so false blocks stay rare. It does not check attached files or other enrolled machines.
