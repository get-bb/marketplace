## Set up from one page

Open Sync, connect GitHub, and choose where to keep your preferences. The plugin reuses your GitHub CLI sign-in or shows a one-time code for browser sign-in. It can create and initialize a private settings repository for you.

On the next laptop, choose the same repository and apply the GitHub settings in one confirmed action, or compare differences first. Automatic sync starts after the first successful transfer.

## Keep control

Independent edits merge automatically. Different edits to the same setting wait for your choice, with readable labels and shortcut values. Pause or resume sync, select groups and frequency, restore a local snapshot, and copy the next-laptop instructions from the same page.

A durable apply journal supports recovery after interruptions. Unknown settings remain in GitHub without being applied locally.

## Requirements and scope

Requires BB 0.49.0+, a GitHub account, and GitHub CLI on the BB server computer for guided sign-in. The repository must be private. No paid service or Git checkout is required. Credentials remain on the server.

Transfers theme selection, shortcut overrides, and selected navigation/interface settings. Referenced themes and interface plugins must be installed separately on each computer. Window layouts, arbitrary plugin settings, thread-list grouping, chats, and credentials do not travel.

The [setup guide](https://github.com/brudnyi/bb-sync#readme) describes the full scope. `bb sync status`, `bb sync now`, and `bb sync restore` are also available.
