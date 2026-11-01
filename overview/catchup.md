Catch Up stores each recap in its own database, so a recap never enters the thread's transcript or model context.

## What you get

- A minimal card above the composer with only the recap and a × button. Close it when you have read it; it stays closed on every device until a newer recap replaces it.
- Other layouts in settings: a compact banner, a banner that opens expanded, a larger card, or no inline recap until you open the panel.
- Automatic recaps after a visible thread goes idle and reaches the configured number of user turns. A thread with a running child thread stays active. A new turn hides the old recap until the next one is ready.
- Generate a recap by hand from the thread header, the command palette, or the CLI. This needs a visible, idle thread.
- Refreshes that send the previous recap plus the new turns, not the whole transcript again.

## Language

Each recap follows the language of your latest messages. With the default prompt, Catch Up also compares the writing system of the recap with your messages. A mismatch takes one more short model request to translate the recap. Languages that share a script, such as English and German, are not told apart.

To use one language in every thread, set **Recap language** in settings. The language then goes into the prompt, and the check is off. A custom prompt also turns the check off.

## Settings

Automatic recaps and auto-cleanup are on by default. The idle delay defaults to 30 seconds (range 0–86,400), the minimum defaults to 3 user turns (range 1–100), and concurrency defaults to 2 workers (range 1–5). Prompts are capped at 8,000 characters and recap text at 1,200 characters. Automatic recaps above 800 raw characters are dropped. Cleanup removes suppressed attempts, older invalidated recaps, and visible records beyond the newest 1,000. It never deletes BB threads, messages, files, or projects.

## CLI

```sh
bb catchup generate [thread-id] [--json]
bb catchup show [thread-id] [--json]
bb catchup preview [thread-id] [--json]
bb catchup list [--limit N] [--json]
```

Omit `thread-id` in a thread-aware BB CLI context. `preview` shows the card at once in open BB windows, generates nothing, and stores nothing. It also works while the thread is active, so it is useful to check how a layout renders. The bundled `catchup` skill documents CLI use, including `/catchup preview`.

## Privacy and permissions

A hidden BB worker receives a bounded transcript and the configured prompt. It uses `accept-edits`, the least-permissive spawn mode BB offers, and is told to return only a recap. Catch Up archives and stops it after each attempt. Hidden is not a security boundary: the worker remains subject to BB's tools and permission model. The configured provider may process the transcript remotely under its own policy. Catch Up makes no direct network requests, filesystem access, subprocesses, or telemetry calls, and uses BB's namespaced storage for its SQLite database.

## Requirements

- BB 0.48 or newer.
- No account or API key of its own. Catch Up uses the provider and model already configured in BB, under that provider's normal billing.

## Credits

Based on [Recap by MacHatter1](https://github.com/MacHatter1/bb-recap), with its MIT license and copyright notice preserved.
