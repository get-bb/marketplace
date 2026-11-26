## What you get

- **A strip around the notch.** A thin black strip hugs the MacBook camera notch on top of any app: a small robot and the number of projects in work on the left, a ring with the overall share of done tasks and the count such as `25/41` on the right. The robot thinks, asks, cheers, gets upset or sleeps with the state of the work.
- **A panel on hover.** One row per thread with a plan: the project icon, the task in work and how long it has run, the total work time and a track of coloured blocks, one per task (done, in progress, in review, queued, failed). Filters `All`, `Working` and `Paused`.
- **Tasks by queue.** Click a row to see its queues and tickets with time and executor, and the estimated time left. The arrow or "Open thread" opens the thread in bb.
- **Messages at the notch.** When a thread finishes, fails or waits for your answer, the strip grows into a short message for a few seconds, with an optional sound.
- **Quiet when idle.** No thread with a plan, no strip. Collapsed, the app uses well under 1% CPU.

## How it works

The plugin reads each recent thread's plan from the Working Thread plugin (`task-queue`) and the agent's turns from the thread, and serves one summary over bb's local HTTP with a plugin token. A small native app, `BBTouchbar.app` (Swift, AppKit and SwiftUI), draws the strip and polls that summary on `127.0.0.1` every 2 seconds. It makes no other network requests.

```sh
bb plugin install genidev-touchbar
bb genidev-touchbar install-app --run   # builds and installs the app (about a minute)
bb genidev-touchbar status              # installed? running? when it last read the summary
bb genidev-touchbar snapshot            # the same summary as text
```

`install-app` without `--run` prints the exact script command for your plugin copy. The app goes to `~/Applications/BBTouchbar.app` and starts at login through a LaunchAgent; `bb genidev-touchbar uninstall-app --run` removes it.

## Requirements

- bb 0.50 or later, macOS 13 or later, a MacBook with a camera notch. Without a notch the strip shows as a pill at the top centre.
- Xcode Command Line Tools: the app is built on your Mac from source.
- The Working Thread plugin (`task-queue`) for plans.
- Optional: the Project Icons plugin (`genidev-project-icons`) for thread and executor pictures; otherwise rows show letter badges.
- The app's labels (panel, menu, messages) are in Russian for now. The plugin, CLI and skill are in English.

## First step

Install both parts, then ask a lead agent to plan a task with `bb task-queue plan`. The strip appears as soon as a thread has a plan.
