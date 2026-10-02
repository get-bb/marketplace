## What you get

See separate Antigravity weekly quota windows for Gemini and Claude/GPT model families in BB’s Provider Usage panel. Each window includes its reported reset time when Antigravity provides one.

## Requirements

Install and configure a working Antigravity ACP provider before installing this plugin. The plugin adds usage reporting only; it does not install, modify, or replace an Antigravity coding-agent provider.

## Privacy

The plugin reads the existing local Antigravity login only to request quota data. It does not log, display, or persist access tokens or refresh tokens. An expired login may require the user to supply an OAuth client secret through `ANTIGRAVITY_OAUTH_CLIENT_SECRET` so the local token can be refreshed.
