## What you get

- A **Claude Auth** page in the left sidebar displaying your real-time Claude Code CLI authentication state, account email, subscription tier, and token expiration.
- Seamless remote and mobile authentication over Tailscale: view the OAuth URL, open Claude sign-in on your phone, and submit the authorization code directly into BB.
- Status monitoring for auto-refresh tokens across macOS Keychain and Linux / WSL credentials storage.
- Agent tools (`claude_auth_status`, `claude_auth_login`) allowing coding assistants to inspect login status or prompt you with an interactive login card when credentials expire.
- CLI commands (`bb claude-auth status`, `bb claude-auth login`, `bb claude-auth submit`, `bb claude-auth clean`) for fast terminal operation.

## How it works

Claude Code CLI stores its authentication credentials and refresh tokens in system credential stores (macOS Keychain, or Linux/WSL credentials file / Secret Service). When authenticating headlessly or remotely, standard terminal pipes cannot complete the interactive token exchange prompt.

This plugin executes the authentication flow inside a virtual pseudo-terminal (PTY) on your machine. It extracts the OAuth authorization URL without opening a local desktop browser, presents it through the BB interface or agent chat, feeds your authorization code back to the CLI, and inspects credential store status to verify that the session is active.

## For agents

The bundled agent skill enables assistant models to:
- Check login state before running heavy Claude tasks.
- Trigger interactive re-authentication cards directly in the thread when a token expires.
- Guide users through command-line authentication steps when requested.

## Resetting credentials

The plugin includes a clean command and button that signs out of Claude Code by deleting its credentials from the system store and clears dead OAuth flags from configuration files, allowing a fresh sign-in when sessions get stuck.
