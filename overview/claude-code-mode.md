## What you get

- Per-thread opt-in to Claude Code's experimental Code Mode, in which Claude
  writes JavaScript that calls tools: parallel calls, chaining, and output
  filtered before it reaches the model.
- A sticky `</>` button in the New thread toolbar. It shows when Claude Code is
  selected, is disabled with a reason for unsupported models, and applies to
  first messages that a person sends from the app.
- A command for agents and scripts:
  `bb claude-code-mode spawn --model claude-sonnet-5-5 --prompt-file brief.md`.
  Plain `bb thread spawn` never enables Code Mode.
- A `</> Claude Code Mode` badge above the composer of a thread in Code Mode.
- Resumed sessions keep their mode. The model id stays unchanged.

## When it helps

Work with many or noisy tool calls. In our own runs with Sonnet 5.5, a 40-file
scan used 82k input tokens instead of 301k (2 model turns instead of 5), and a
noisy test-and-fix task used 171k instead of 240k. These figures are
indicative, not a guarantee. Most input is prompt-cache reads, so the cost
saving is smaller than the token saving.

## Requirements

- bb 0.50 or later, and Claude Code CLI 2.1.323 or later, signed in.
- Opus 5.5, Sonnet 5.5, Haiku 5.5 or Fable 5.2.
- macOS or Linux with `bash` and `python3`. Windows is not supported.
- Threads that run on the same machine as the bb server.

## Limits

- Code Mode is an experimental Claude Code feature, and the plugin uses
  experimental bb plugin APIs. Either can change in any release.
- Code Mode threads do not have Claude in Chrome, computer use or Remote
  Control.
- The mode is fixed at the first launch.
- While enabled, the plugin routes every Claude Code launch on the bb server's
  machine through its wrapper script.
- A Code Mode thread resumes only while the plugin is active.
- Other machines get no wrapper, so Code Mode is not applied there, although an
  opted-in thread can still show the badge.
- Compact layouts hide the toolbar button.

This is an independent community plugin, not made or endorsed by Anthropic.
