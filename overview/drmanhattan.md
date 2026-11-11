[drmanhattan](https://github.com/gagansingh/drmanhattan) is a local job queue for heavy commands. With this plugin, bb's agents send their builds and tests through it, so several threads working at once take turns instead of all compiling at the same time.

## What you get

- **Agents that queue heavy commands.** On machines where drmanhattan is installed, threads are told to run builds and tests with `manhattan submit --wait`, so agents working side by side take turns instead of overloading the machine. Commands that usually finish in seconds still start at once.
- **A thread's runs beside its composer.** While a thread has runs going, the row above its composer says how many are running and waiting. Expand it to see each run's slot, place in line and time against its usual time, cancel one, or open its log on the dashboard.
- **A history in the Info tab.** The thread's recent runs, passed or failed, with a link to each log.
- **The queue in bb's navigation.** A drmanhattan page shows every connected machine's queue: slots in use, what is running and waiting, and what finished lately, each run linked to the thread that queued it, with its log and a cancel button. The full dashboard is a click away.
- **Services stopped with their thread.** Archiving or deleting a thread stops the dev servers, databases and other services it started through drmanhattan.
- **Links back.** On the drmanhattan dashboard, each run from a bb thread links to that thread.

## For agents and scripts

- `bb drmanhattan runs` lists a thread's runs (the current thread by default).
- `bb drmanhattan status` shows the whole queue on a machine.
- `bb drmanhattan cancel <run-id>` cancels one of the thread's runs.

Add `--json` for machine-readable output.

## Settings

- **Tell agents to run heavy commands through drmanhattan** (on by default) adds the usage to threads' instructions. The plugin's skill stays available either way.
- **Stop a thread's services when it is archived** (on by default).

## Requirements

drmanhattan 0.8.1 or later on each machine whose threads should use it (0.9.0 or later for recent results on the drmanhattan page), running as a daemon (`drmanhattan --yes &`, or as a service). It is free, open source, and runs on macOS and Linux (x86_64); the [install instructions](https://github.com/gagansingh/drmanhattan#install) take one command. Machines without it are left alone.
