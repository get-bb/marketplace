Every job is a LaunchAgent plist in `~/Library/LaunchAgents` that launchd itself owns: it fires on
schedule with bb closed, runs a missed fire once when the Mac wakes, and stays disabled across reboots
once you disable it. One sidebar page is where you make, read and change those jobs.

## What you get

- Jobs on a five-field cron expression or a fixed interval, with the schedule shown in words as you
  type it.
- The status launchd reports, the last twenty runs with duration and exit code, and the tail of the log.
- Follow a log live while a job runs.
- Run now, Enable, Disable, Edit and Delete, each doing the launchd part for you.
- Commands run through your login shell with your terminal's PATH, so tools from Homebrew or a version
  manager are found.
- The sidebar row says how many jobs are failing; opening a job clears it until it fails again.
- With several Macs connected to bb, a picker chooses whose jobs you see.
- Jobs made by the Paseo `launchd-jobs` plugin appear as they are, with their history, and are never
  moved.

## What it needs

macOS on the Mac whose jobs you manage. Commands run as you, with your permissions; only plists under
the plugin's own label prefix are ever listed or changed.

## Not a replacement for bb automations

bb's built-in automations run scripts and agents from the bb server while it runs. Use this plugin for
commands that must run on a schedule whether or not bb is open.
