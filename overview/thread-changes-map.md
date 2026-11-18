## What you get

- A **Thread Changes Map** tab in each thread's right panel. It shows a lane
  diagram of the system the thread works on: people, UIs, services, external
  systems, and shared host services.
- **Change tags** on each part: NEW, CHANGED, IMPACTED (not edited, but the
  change affects it), and REMOVED. Parts with no tag did not change.
- **Plan progress** from the thread's plan bar. Each phase has a bar, and the
  fill of each part shows the state of the plan steps that build it.
- **Flows** that you play hop by hop with Back, Pause, Next, and Clear. Each
  hop shows what moves between the two parts.
- **Details** for each part or edge when you click it: decisions, plan steps,
  calls, callers, and files.
- A browser page with the same live map, for a second screen.
- A `bb thread-changes-map` command to start, check, refresh, show, or stop a
  map.

## How it works

Click **Start thread changes map** in the tab. The plugin starts a hidden
mapper thread in the same workspace. The mapper reads the conversation, the
plan bar, `git status`, and `git diff`, and draws a first map in a minute or
two.

After each turn of the main thread, and at most every 90 seconds during a long
turn, the mapper gets an update note and patches the map. The tab redraws in
place. A ring pulses on the parts that changed, and a halo marks the parts the
thread works on now.

The mapper writes the map through its own `thread_changes_map_apply` tool. Its
instructions allow only read-only commands, such as `git diff` and `cat`. bb
does not enforce this: the mapper shares the thread's workspace and permission
mode. If the provider does not take a note, bb sends it again, up to 3 attempts
in total.

## Requirements and cost

- bb 0.48 or later.
- The mapper is a second agent thread. It uses the provider and model of the
  main thread, or the ones you set in the plugin settings. Each update costs
  tokens on that provider.
- An idle mapper sleeps after 15 minutes. It wakes when the main thread
  finishes its next turn. Click **Stop** to end it.
