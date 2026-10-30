## What you get

Three agent tools that any BB thread can call in the middle of its turn. The thread keeps its own model and context, and passes only the parts of the work that another model does better or for less money.

- **route_worker** hands a self-contained task to another BB harness and model, for example a smaller Codex or Claude Code model, or an ACP agent. The worker runs as a hidden child thread in the same environment and edits the same files. The tool waits for it and returns its final message, so the calling agent can review the diff and continue.
- **route_ask** sends one prompt to a model on an OpenAI-compatible API and returns the text. Use it for extraction, summaries, reformatting, or a second opinion. That model sees only the prompt, and it cannot edit files.
- **route_decide** asks a System One decision model, such as TypeSafe Jev, a choice or yes/no question. It returns the pick and every option with its probability, usually in well under a second.

## How it works

You list the workers and models in the plugin settings, each under a short name. A thread gets a tool only after that tool is configured, and the thread instructions name the workers and models that it can use. Workers accept any provider and model id from `bb provider list` and `bb provider models`, with an optional reasoning level and permission mode.

Only one worker runs in an environment at a time, so two agents never edit the same files together. A worker that finishes is stopped and archived. A worker that fails stays open so that you can read what happened. A worker that runs past its time limit is stopped, and its edits stay in the environment.

## Requirements

- At least one BB provider for route_worker. A hidden worker cannot ask for approval, so it runs with full permissions unless you set a stricter mode.
- An OpenAI-compatible endpoint and API key for route_ask, for example OpenRouter, OpenAI, LiteLLM, or a local Ollama. Usage is billed by that service.
- A System One endpoint and API key for route_decide, for example `https://api.typesafe.ai/v1/systemone`. Usage is billed by that service.

The plugin has no preset endpoints, keys, or models. Keys are stored as secret plugin settings.
