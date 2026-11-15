See how much of its context window each thread has used, and move a long task to a fresh thread before the window fills. The new thread picks up from notes the agent writes down first.

## What you get

- A context meter above each thread's chat input, showing the percentage of the context window in use.
- An **Auto handoff** switch beside it, set per thread.
- A `bb context-handoff` command and a `context-handoff` skill that agents use to save their notes and confirm them.

Sub-agent threads are left alone.

## Meter colors

The bar changes color as the thread fills:

- **Below 20%:** your theme's main color (light gray in BB's dark theme, dark gray in its light theme).
- **20% to 30%:** yellow.
- **30% to 40%:** orange.
- **40% to 65%:** red.
- **65% and up:** dark red.

The percentage is the share of the context window that the provider reports. When a provider reports no usage or no window size, the meter says so and automatic checks wait.

## Auto handoff switch

A thread you start has the switch off and shows only the meter.

- **Turned on below 20%:** the thread keeps working, a tick marks 30% on the bar, and the handoff is requested once usage reaches it.
- **Turned on at 20% or more:** the handoff is requested at once, for the next safe stopping point. An idle thread starts a turn to do it.
- **Turned off:** a pending handoff is cancelled and the thread carries on. A new thread that already confirmed its notes keeps running.

A request never cuts off a turn or a tool. It waits for the current turn, and the agent finishes the step it is on before it writes its notes.

## What a handoff does

The agent saves the original request and plan in `PLAN.md`, and its progress, decisions and next step in `HANDOFF.md`, inside a `.handoff` folder in the workspace. The plugin then starts a new thread with the same workspace and provider. That thread must read the notes and confirm their checkpoint with `bb context-handoff resume` before it does any work, and the old thread shows a link to it.

The new thread starts with the switch on, so a long task keeps handing off at 30%. Every new part is a direct child of the first thread, so nesting stays one level deep.

## Requirements

- BB with plugin SDK 0.6.132 or newer (tested on BB 0.49), and a provider that reports token usage and context window size.
- An agent that follows the checkpoint request. The handoff happens at its next safe stopping point, not at an exact percentage.
- Keep the `.handoff` notes folder out of git.

`bb context-handoff status` shows a thread's switch, stage and usage. `bb plugin config context-handoff set enabled false` pauses handoffs for every thread.
