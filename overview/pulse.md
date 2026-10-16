## What you get

A panel in bb's nav rail that lists what needs you from Slack, Gmail and Calendar, sorted into **Now** (high priority or due today), **Next**, **Later** and **Nice to Know** (FYIs that need no action). Filter by source, and anything new since you last looked gets an outline.

- **Done, Snooze and Dismiss stick.** A later run never re-raises an item you handled unless it finds new activity and records why. Closed items stay one click away to reopen.
- **Quick actions.** Runs attach up to three likely resolutions per item, such as "Decline meeting" or "Reply yes", with the message already written. A click copies the text and opens the source. Nothing is ever sent for you.
- **Agent threads.** The robot button starts a thread that does the work up to the point of review, such as drafting the weekly update someone asked for. The card shows Working, then Ready with the thread's one-line summary.

## How it works

Pulse schedules three capture runs: Hourly (every two hours), Daily (4 PM) and Weekly (Friday 3 PM), each with its own cron. Each run sends a prompt to its own bb thread, created on the first run in a "Pulse" sidebar section. The agent reads your sources and writes items through a bundled CLI into a small local store, so the panel updates live as the run works. **Run now** and the run menu use the same path, and each schedule can be paused from the menu.

Items carry stable source IDs, so a run updates an existing item instead of adding a duplicate. Agents write only through the CLI, which applies the same validation and sticky-state rules as the panel.

## Requirements

- Your agents need their own access to Slack, Gmail and Google Calendar, through MCP servers, CLIs or other plugins. Pulse has no connectors. Describe the tools in the settings, and every run and agent prompt includes that text.
- Pick a project for the threads in the settings. Runs call the bundled CLI from a shell, so the run thread needs permission to run commands.
- Optional settings: your first name, house rules for runs, a model and reasoning level, cron schedules, a time zone, a store directory, and skill rules that load your installed skills into agent threads.
- Every run is an agent turn on your provider, so it uses your model quota on each schedule.
