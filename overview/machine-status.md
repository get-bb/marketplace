## What you get

Machine Status adds a configurable status disclosure to BB’s sidebar. It lists
each connected machine's battery charge, used memory, and used local storage.

By default, connected machines without a selected status are hidden. You can
show them from the plugin settings when you need to see every connected machine.
Choose one or more metrics with the Battery, Memory, and Storage checkboxes.
Each machine's battery status turns red when it is at or below the configurable
low-battery threshold (20% by default).
Memory and storage status turn red when their used percentage reaches their
configurable high-usage thresholds (90% by default).

The status refreshes when a metric's integer percentage changes or when its BB machine entry changes.

## How it works

The plugin polls connected machines once per minute and keeps their status separate. A changed machine updates the shared status without changing unchanged metrics.

It uses native OS interfaces: `pmset`, `vm_stat`, and `df` on macOS;
`/sys/class/power_supply`, `/proc/meminfo`, and `df` on Linux; and CIM queries
through PowerShell on Windows.

## Requirements

Requires BB 0.43 or later, Plugin SDK 0.4.104 or later, and an enrolled BB machine. Memory and storage work on any supported machine; battery status needs a machine with a battery interface its operating system exposes. No external account or paid service is required.
