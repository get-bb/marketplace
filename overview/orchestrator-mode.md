Make a BB thread delegate every unit of work. Your orchestrator reads, plans,
asks, delegates and reports; child worker threads carry out its briefs in the
same environment.

Long-running threads can start out delegating correctly, then drift into
editing files, running commands or fixing worker output themselves. In `guard`
and `block`, the watchdog keeps checking new timeline work as the conversation
continues, so detected direct work can be recorded, corrected or stopped.

## In the composer

Use the delegation icon or the **Orchestrator mode** row in the `+` menu to
toggle one thread. The strip above the input shows the enforcement level,
recent direct work and a **Turn off** button. The draft gains a left-edge
accent. BB may group the icon under **More plugin actions**.

In the root new-thread composer, the switch controls the new-thread default.
It applies only to qualifying root threads created while the default is on,
at a user-initiated dispatch. Existing threads, child workers and side chats
are left alone.

## Delegation and enforcement

Enabled provider sessions receive a delegation contract and the
`orchestrator_delegate` tool. Give the worker a self-contained brief: it does
not see the parent's conversation. You can wait for its result, delegate
without waiting, or request a hidden worker. Waiting defaults to 900 seconds;
a timeout leaves the worker running.

- **instruct:** contract only.
- **guard** (default): watch the timeline, record direct work and send
  corrective messages up to the configured cap.
- **block:** also stop the offending turn after detection.

Direct image generation counts as work and must be delegated. Recognised
read-only shell commands are allowed by default. You can treat all
commands as work instead. Corrective messages default to three per enablement;
recording and block-mode stops continue after the cap.

## Timing and limits

Instructions apply when the provider session is next constructed. A live
session keeps its existing instructions. The watchdog skips historical work
and grants grace turns during the transition: one when enabled while idle, or
the active turn and the next one when enabled mid-turn.

BB exposes no pre-tool-call veto. Block mode detects and stops; a fast write
can complete before that stop. Classification uses timeline row kinds and tool
names, so this is a coordination aid, not a security boundary. Workers share
your environment and use ordinary provider resources.

## CLI and settings

`bb orchestrator-mode` provides `status`, `on`, `off`, `violations` (including
`--clear`) and `default`. Thread commands accept `--thread`; every command
supports `--json`. Settings control the new-thread default, enforcement,
read-only command handling and the corrective-message cap.

Requires bb 0.44+ and Plugin SDK 0.5.29+. Licensed under MIT.
