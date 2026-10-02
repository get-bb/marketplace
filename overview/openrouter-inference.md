## Titles and commit messages from any OpenRouter model

OpenRouter Inference lets BB generate thread titles and commit messages with a model you pick on OpenRouter, billed to your own API key.

## Pick a model

Open **Settings → OpenRouter Inference**, paste your API key, and search OpenRouter's model list by name or id. Each model shows its price per million tokens and context size. Click **Test** to generate a sample title with the selected model.

## Turn it on

Click **Use for titles & commit messages**. BB then routes its helper inference to this plugin. If you pick a different model later, BB uses it right away.

## Requirements

Requires BB 0.42 or later, Plugin SDK 0.4.56 or later, and an [OpenRouter API key](https://openrouter.ai/keys). Prompts for titles and commit messages, including thread text and diffs, go to OpenRouter and the provider that serves the selected model.
