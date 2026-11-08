Pick NanoGPT in the provider list, choose any of its models, and run bb threads on them. The models appear as soon as you paste a NanoGPT API key into the plugin settings, and not before.

## What you get

- A gear in the composer that opens a small form for your API key, so setup doesn't send you to the plugin list.
- The live NanoGPT model catalog, fetched with your key.
- Streaming answers with a separate reasoning channel.
- Tool calls, so the agent can read and edit files in your project like it does with any other provider.
- Queued follow-up messages while a turn runs, and a stop button that cancels the request.
- An optional base URL for another OpenAI-compatible endpoint.

## How it works

The plugin checks your key against NanoGPT before it hands the key to the provider. A key that NanoGPT rejects gives you no models. The key is stored as a secret setting on the bb server. Prompts, tool results and attached images are sent to NanoGPT, or to the base URL you set.

## Requirements

- A NanoGPT account and API key from https://nano-gpt.com/api. NanoGPT bills your usage.
- Network access from the bb server and from each host that runs a thread.

## Limits

Only the full permission mode is offered. Conversation history is kept in memory and starts fresh after a daemon restart. Local files and images are sent as a text placeholder, not their contents.
