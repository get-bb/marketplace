## What you get

- A bar above the thread's message box for each task the agent plans: stages as capsules, steps as dots, and a pill at the head naming the current stage and step. Hover the bar to see how long the task has run; hover a mark to see its step and how long it took.
- Four states with their own colours: working, needs your answer, error, done. On a question or an error the pill shows the agent's note, and an accepted visible human reply or explicit plan operation changes the state.
- A compact thread-level list of observed delegations and direct child threads, independent of plans. Unknown outcomes are labelled; errors remain visible. Open approval requests in the current thread and direct child threads appear as a general count; incomplete coverage is marked.
- Click Progress to fold or show the whole block. It remembers your choice for this thread in this browser. Questions and errors remain visible as counts in the summary.
- Three plans are shown at a time, questions and errors first; Show all opens the rest. The layout adapts to narrow screens.
- The arrow beside the percent opens the step list. Use … → Hide plan to hide one safely; Hidden plans → Restore brings it back. Hidden plans keep updating; a new question or error brings them back to attention.
- Finished plans hide after 30 seconds by default, once tracked agents finish. You can restore them. Saved auto-close preferences are kept.
- The plan can change mid-task: finished steps keep their done by title.
- The answer speed in the message box, `⚡ ≈ 42 tok/s`: bright while the agent writes, dimmed with the last figure between turns. An estimate from the text it writes over the latest minute, exact after the turn when bb reports the tokens.

## How it works

The plugin adds a `plan_progress` tool. The agent sends the whole plan once, then short calls such as `{id, next: true}` after each step, `{id, state: "needs_input", note}` before asking you something, and `{id, state: "done"}` at the end. The rules for when to use it come with the tool. The subagent rows and the answer speed are read from the thread's own timeline and events and cost no tokens.

The original zycck mod can stay enabled in Claude Desktop. BB's Claude processes get a session-only override that isolates that mod; settings files stay unchanged. Tasks with three or more actions receive an explicit progress rule, including read-only work. A bounded automatic reminder can recover a missed or stale update without a reminder from the user. Model compliance is not an absolute guarantee. `bb plan-progress diagnose` reports observed routing, call outcomes, reminder delivery and auto-hide conditions without sending a reminder. A detected Desktop-tool call shows a warning.

Bars are stored per thread in the plugin's storage on your bb server. Nothing leaves the machine, and the plugin needs no account or API key.

## Settings

Settings → Plugins → Plan Progress → the gear at the top right: twinkling dots on or off, auto-close for finished bars after 10, 30 or 60 seconds, the answer speed on or off, and a short chime on a question, an error and the finish.

## Credits

A port of [plan-progress](https://github.com/zycck/claude-mods) by zycck, a mod for Claude Code (MIT): adapted for BB with its own UI and lifecycle handling.

## Requirements

bb 0.48.1 or later. The bar sits in an experimental part of the bb plugin API and may need an update after a bb release. Agent tools reach a thread when its session starts: open a new thread after installing.

Live 0.6 checks cover Codex, OpenCode v2, ACP OpenCode and Pi/OpenRouter on selected models. Fresh Claude Code, Pi/Ollama Cloud, live approval responses and automatic provider retries remain unverified. Helper approval attribution is incomplete. Event and child reads are bounded; observed error traces retain up to 100 entries per thread.
