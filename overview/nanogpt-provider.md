Pick NanoGPT in the provider list, choose any of its models, and run bb threads on them. The models appear as soon as you paste a NanoGPT API key into the plugin settings, and not before.

## What you get

- A gear in the composer that opens a small form for your API key, so setup doesn't send you to the plugin list.
- The live NanoGPT model catalog, fetched with your key.
- Streaming answers with a separate reasoning channel.
- Tool calls through bb's dynamic tools, such as asking you a question or running a workflow.
- Plan mode prepares a plan without executing tools, including when a model unexpectedly returns a tool call.
- Text files you attach to a message are read and sent to the model.
- Local PNG, JPEG, GIF and WebP images are sent as data URLs for vision-capable models.
- Queued follow-up messages while a turn runs, and a stop button that cancels the request.
- An optional base URL for another OpenAI-compatible endpoint.

## How it works

The plugin checks your key against NanoGPT before it hands the key to the provider. A key that NanoGPT rejects gives you no models. The key is stored as a secret setting on the bb server. Prompts, tool results, attached text files, image URLs and local image data are sent to NanoGPT, or to the base URL you set. Custom endpoints require HTTPS; HTTP is accepted only on localhost, 127.0.0.1 or [::1]. Authenticated requests do not follow redirects.

## Requirements

- A NanoGPT account and API key from https://nano-gpt.com/api. NanoGPT bills your usage.
- Network access from the bb server and from each host that runs a thread.

## Limits

Only the full permission mode is offered. Conversation history is kept in memory and starts fresh after a daemon restart. Stop preserves the current in-memory session. Older completed turns are removed from model context with a visible notice when the local input budget is exceeded; this does not delete the conversation shown in bb or provide persistence. The fallback budget is approximate and does not claim a verified context-window size for every model. Stored assistant/tool text is bounded to 24000 bytes with a truncation marker.

In bb 0.49.0 a NanoGPT thread has no file or shell tools of its own, unlike providers that bring their own. Attached text files are sent inline up to 100000 bytes; binary and unreadable files are described as unavailable. Local images are limited to 5000000 bytes each and 10000000 bytes combined per prompt; choose a model that supports vision. Reasoning effort uses the upstream model's default; low/medium/high overrides are not offered. There is no manual compaction, automatic summarization, fork, archive, rename or service-tier support.

## Support the author

The plugin is free and MIT licensed. If it saves you time, you can support its author with a donation. Send each asset only on the network named next to its address; a transfer on the wrong network cannot be recovered.

- Bitcoin (BTC): `13BEg3VPxsiSfLhKNM1GnXEmy6kz23ybYz`
- Ethereum (ETH, ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
- USDT on Tron (TRC-20): `TS9mfjWxhEtXt8omkyd3cUyvZmp1YBfJwW`
- USDT on Ethereum (ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
