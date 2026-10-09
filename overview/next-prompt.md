See the instruction you were about to type before you type it.

## What you get

- One line above the composer after each finished turn: `↳ next: run the tests`.
- Click it, or press Tab or → in the empty composer, to put it in the draft. It
  is never sent for you.
- `bb next-prompt` to show, generate, and debug suggestions.

## How it works

When a visible top-level thread goes idle, the plugin sends the first request
and the newest user and assistant messages (no tool output) to a model, Sonnet
by default. It filters the reply to one short instruction in your voice and
keeps it until the thread moves on. Nothing is written to the thread or the agent's context.

## Requirements

Pick the model with bb's provider/model picker. Claude Code and Codex models
run as a lean CLI call (`claude` or `codex` logged in on the bb server) and use
your existing subscription; other providers run as a hidden worker thread. An
Anthropic- or OpenAI-compatible HTTP API can replace either.
