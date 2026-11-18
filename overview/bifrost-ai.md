Titles and commit messages come from your own gateway, on the models you
already pay for, instead of bb cloud or a provider login.

## What you get

- **Thread titles** from any model your Bifrost gateway routes.
- **Commit messages** from the same gateway.
- **A secret key setting**: the virtual key is written to a 0600 file on the bb
  server, never to the database or the browser.
- **A readiness line** in Settings → AI services, so you can see whether bb can
  reach the gateway before a title fails.

## How it works

The plugin registers an AI service named Bifrost with bb. When bb needs a
thread title or a commit message it sends the prompt to the service, which
forwards it to your gateway's OpenAI-compatible `/v1/chat/completions` endpoint
with the virtual key in the `x-bf-vk` header. bb writes the prompt and cleans
the reply, so the plugin only carries text in and out.

Pick the service per task in Settings → AI services or from a shell:

```sh
bb settings ai-services set thread-title bifrost
bb settings ai-services set commit-message bifrost
```

## Requirements

A running Bifrost gateway and a virtual key with grants for the model you
choose. No account is needed on getbb.app, and no inference leaves your own
gateway.

bb abandons a title after five seconds, so choose a model that answers quickly.
On a gateway routing through a paid token pass, a bare model alias answers in
under a second while an `auto` alias can take four.

## Settings

- **Bifrost URL** is the gateway base URL without `/v1`, defaulting to
  `http://127.0.0.1:8090`.
- **Model** is the model or alias sent to the gateway, defaulting to
  `deepseek-v4.1-flash`.
- **Virtual key** is the Bifrost key, stored as a server-side secret.

Voice input is not offered; only thread titles and commit messages.
