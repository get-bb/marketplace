Realtime Gateway lets the Voice Mode plugin in bb run its voice sessions through a Vercel AI Gateway key. Your sessions bill to that gateway account, and the bb host never needs an OpenAI key of its own.

## What you get

- Voice sessions in Voice Mode billed through the Vercel AI Gateway.
- One gateway key on the bb host, instead of a provider key per vendor.
- A live `bb realtime-gateway test` probe that mints a secret and opens one real session, so you can confirm the handshake before relying on it.
- A model setting you control: `openai/gpt-realtime-mini` by default, or any other gateway realtime id such as `openai/gpt-realtime-2`.

## How it works

Voice Mode discovers installed plugins that publish a `realtimeConnection` rpc and asks one for a session. Realtime Gateway answers by minting a single-use client secret from the gateway's client-secrets endpoint, then returns the gateway realtime URL with that secret attached to the WebSocket handshake.

The gateway's realtime endpoint rejects an Authorization header, so the credential travels in the `Sec-WebSocket-Protocol` header instead, alongside the protocol marker the gateway expects. Secrets are created server-side and spent by the session, so they never reach the browser. A fresh secret is minted per session, which makes Voice Mode's refresh request a no-op.

Pair the plugin with Voice Mode's **Connection** setting on `auto`, or set it to `plugin` to pin this provider. On `plugin`, Voice Mode reports an error when this plugin cannot mint a secret rather than falling back to another provider without telling you.

## Requirements

- bb 0.46 or newer.
- A Vercel account with AI Gateway access and usage billing enabled.
- A gateway API key, entered in **Settings → Plugins → Realtime Gateway** or through `bb plugin config realtime-gateway`. The `AI_GATEWAY_API_KEY` environment variable works as a fallback.
- The Voice Mode plugin, installed from https://github.com/steveafrost/bb-plugin-voice-mode

No OpenAI key is needed on the bb host.

## Limits

This is one provider path. Voice Mode's own OpenAI key path still works and is unaffected.

The plugin depends on Vercel's realtime protocol as it stands today, version `0.0.1`, because the gateway authenticates the handshake through the subprotocol header. If Vercel changes that protocol, sessions fail until the plugin is updated.
