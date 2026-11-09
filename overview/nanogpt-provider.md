Pick NanoGPT in the provider list, choose any of its models, and run bb threads on them. The models appear as soon as you paste a NanoGPT API key into the plugin settings, and not before.

## What you get

- A gear in the composer that opens a small form for your API key, so setup doesn't send you to the plugin list.
- The live NanoGPT model catalog, fetched with your key.
- Streaming answers with a separate reasoning channel; explicit Low, Medium and High effort choices when the catalog declares support.
- Tool calls through bb's dynamic tools, such as asking you a question or running a workflow.
- Optional one-time tool confirmations and an exact-name denylist, editable under Tool controls in the settings popup.
- Plan mode prepares a plan without executing tools, including when a model unexpectedly returns a tool call.
- Attached text files are read and sent to the model.
- Local PNG, JPEG, GIF and WebP images are sent as data URLs for vision-capable models.
- Queued follow-up messages while a turn runs, and a stop button that cancels the request.
- An optional base URL for another OpenAI-compatible endpoint.

## How it works

The plugin checks your key against NanoGPT before it hands the key to the provider; a rejected key gives you no models. The key is stored as a secret setting on the bb server. Prompts, tool results, attached text files, image URLs and local image data are sent to NanoGPT, or to the base URL you set. Custom endpoints require HTTPS; HTTP is accepted only on localhost, 127.0.0.1 or [::1]. Authenticated requests do not follow redirects.

## Requirements

- A NanoGPT account and API key from https://nano-gpt.com/api. NanoGPT bills your usage.
- Network access from the bb server and from each host that runs a thread.

## Limits

Only the full permission mode is offered; other modes are rejected before execution. The bridge enforces exact session tool denials, rejects duplicate tool names, and reserves its history tool for internal restoration. Optional confirmation asks before each ordinary tool call and accepts only a one-time decision; workspace isolation and automatic review remain unsupported.

bb remains the source of truth for conversation history. After thread resume, the provider reads bounded pages of bb events and reconstructs accepted prompts, assistant text, and normalized tool interactions; historical tool calls are never executed again. Stop preserves the in-memory session; release discards provider memory. The model's advertised context window sets the input budget when the catalog provides one, otherwise a local 32,768-token fallback applies; older turns are evicted with a visible notice and oversized in-turn tool replies are shortened in place before a turn is rejected. A failed history read fails only its turn; later turns continue instead of failing forever. Stored assistant/tool text is bounded to 24,000 bytes.

In bb 0.49.0 a NanoGPT thread has no file or shell tools of its own. Attached text files are sent inline up to 100,000 bytes. Local images are limited to 5,000,000 bytes each and 10,000,000 bytes combined per prompt; choose a model that supports vision. Explicit Low, Medium and High reasoning choices appear only when the catalog declares them; an unsupported selection fails clearly. There is no manual compaction, automatic summarization, fork, archive, rename or service-tier support.

## Support the author

The plugin is free and MIT licensed. If it saves you time, you can support its author with a donation. Send each asset only on the network named next to its address; a transfer on the wrong network cannot be recovered.

- Bitcoin (BTC): `13BEg3VPxsiSfLhKNM1GnXEmy6kz23ybYz`
- Ethereum (ETH, ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
- USDT on Tron (TRC-20): `TS9mfjWxhEtXt8omkyd3cUyvZmp1YBfJwW`
- USDT on Ethereum (ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
