Tired of typing "I confirm" into chat? Agents ask with a clear card: what changes, where, and how to undo it. You answer in one click, and every decision stays in a journal.

## What you get

- An approval card in place of the composer, written in plain words.
- A journal page and a `bb change-gate log` command.
- An approval covers one request; a decline tells the agent not to look for another route.

## How it works

Agents are instructed to call the `change_gate` tool before changing production or shared data. It is an agreement, not a lock: it cannot block other tools, and an agent with shell access could answer its own request, so keep your provider permission rules. Nothing leaves your BB server.
