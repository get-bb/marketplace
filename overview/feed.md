## What you get

A Feed tab on one manager thread lists every thread that needs you, in three sections:

- **Needs your response**: an idle root thread, a thread whose session or queued work failed, or a manager child that the manager marked for you.
- **In progress**: a thread that is running, has queued work, a running terminal or background job, or a running descendant.
- **Paused**: rows you paused. A new message to the thread unpauses it.

Each row shows the thread title, the time of its latest result, and a one-line summary of that result that answers your last message first. Expand a row to read the agent's latest message in full. From the row you can reply to the thread, pause it, archive it, or move it between sections with the star.

## How it works

The Feed shows the manager's direct children and the visible root threads in two sidebar sections that you choose: one for threads you run yourself, and one for threads the manager starts. The bundled `feed` skill tells the manager agent to start new work in the children section, and gives it the `feed_mark` tool to flag a child's result for you.

After each result, the plugin makes one model call to write the row's summary. A newer result replaces an older summary.

## Requirements

- BB 0.43 or later, with Plugin SDK 0.4.87 or later.
- A Codex login (`codex login`, with a ChatGPT account or an OpenAI API key) on the machine that runs the BB server, for the summaries. Without it, each row shows the first sentence of the agent's latest message instead.
- Two sidebar sections and one manager thread. Set their IDs in the plugin settings.
