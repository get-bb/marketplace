Pick NanoGPT in the provider list, choose any of its models, and run bb threads on them. The models appear as soon as you paste a NanoGPT API key into the plugin settings, and not before.

## What you get

- A gear in the composer that opens a small form for your API key, so setup doesn't send you to the plugin list.
- The live NanoGPT model catalog, fetched with your key.
- Streaming answers with a separate reasoning channel.
- Tool calls through bb's dynamic tools, such as asking you a question or running a workflow.
- Text files you attach to a message are read and sent to the model.
- Queued follow-up messages while a turn runs, and a stop button that cancels the request.
- An optional base URL for another OpenAI-compatible endpoint.

## How it works

The plugin checks your key against NanoGPT before it hands the key to the provider. A key that NanoGPT rejects gives you no models. The key is stored as a secret setting on the bb server. Prompts, tool results, attached text files, and image URLs are sent to NanoGPT, or to the base URL you set. Local images are described rather than sent.

## Requirements

- A NanoGPT account and API key from https://nano-gpt.com/api. NanoGPT bills your usage.
- Network access from the bb server and from each host that runs a thread.

## Limits

Only the full permission mode is offered. Conversation history is kept in memory and starts fresh after a daemon restart. In bb 0.49.0 a NanoGPT thread has no file or shell tools of its own, unlike providers that bring their own. Attached text files are sent inline up to 100000 bytes; binary files and local images are only described to the model, not sent.

## Support the author

The plugin is free and MIT licensed. If it saves you time, you can support its author with a donation. Send each asset only on the network named next to its address; a transfer on the wrong network cannot be recovered.

- Bitcoin (BTC): `13BEg3VPxsiSfLhKNM1GnXEmy6kz23ybYz`
- Ethereum (ETH, ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
- USDT on Tron (TRC-20): `TS9mfjWxhEtXt8omkyd3cUyvZmp1YBfJwW`
- USDT on Ethereum (ERC-20): `0x94e35bfeee8f9d0338994acda2c9e8d7e3d9779d`
