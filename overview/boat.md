Each thread gets its own Boat VM, so agents can run builds, Docker and long jobs without touching your computer. Machines stop when idle and resume where they left off.

## What you get

- A **Boat sandbox** option in the New Thread environment picker. The thread runs on a fresh Boat sandbox with its own Git worktree.
- Idle machines stop on their own after a set time, and active ones get their Boat auto-stop pushed out.
- Stopped machines resume with their disk intact, and are deleted when you remove them in bb.

## How it works

bb creates a sandbox through the Boat API and runs its normal machine bootstrap on it. Boat's stock Ubuntu image works as is. For starts in seconds, save a snapshot with bb pre-installed and your repos pre-cloned, and point the plugin at it. The README walks through it.

## Settings

- **Boat API key**: required.
- **Saved snapshot**: optional. Empty uses Boat's stock image.
- **Size**, **Boat environment** and **Billing org**: optional.
- **Auto-stop** and **Suspend after idle**: how long machines live.

## Requirements

- A [Boat](https://boat.dev) account. Sandboxes bill per second while running, and nothing while stopped.
- A bb hub the sandboxes can reach over the internet, such as one shared with bb connect.
