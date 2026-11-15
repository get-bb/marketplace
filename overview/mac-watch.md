## What you get

A **Mac Watch** page in the sidebar, built like the macOS system panel. Live charts of CPU, memory, network and power draw for the last 1, 6 or 24 hours.

Memory pressure spread out: app, wired, compressed, cached and swap. App lists by memory and by CPU, with the real icons.

A "Staying awake" block answers what keeps the machine up: is the lid closed, is sleep disabled system-wide, which processes hold a sleep assertion. It reads macOS itself, so any keep-awake app works, including one that only flips the system flag.

Power: charge, the watts the Mac draws right now, adapter wattage, battery health, cycles and temperature.

A Security panel holds the temperature of the processor, SSD and battery, macOS thermal pressure, battery-controller faults, cell spread, charging limited by heat, disk SMART status and kernel panics.

## Alerts

Push notifications only for real trouble: overheating, battery under 20%, memory or disk running out, SMART, a battery-controller fault, a kernel panic, an unexpected reboot. Running on battery, a closed lid and high load never notify. In the quiet hours, 23:00-09:00 by default, only critical alerts arrive; the rest wait for the morning. A repeat alarm comes at most every 30 minutes, a warning every 6 hours, and at most one notification per 15 minutes.

Power buttons: turn the display off, sleep with a wake timer, shut down.

## How it works

Every 15 seconds the plugin reads stock macOS tools: `vm_stat`, `sysctl`, `pmset`, `ioreg`, `netstat` and `ps`. No sudo, nothing installed. 24 hours of history stay in BB storage at one-minute resolution. Agents get `bb mac-watch status [--json]` and a skill that answers "is the Mac at home still awake".

## Requirements

macOS on Apple Silicon. Alerts go through the push-notifications plugin. Sleep, the wake timer and shutdown add a one-time sudoers rule for exactly three commands. Collection runs only while bb runs: if the Mac dies or leaves the network, the plugin goes with it and the page simply stops updating. Battery swelling cannot be measured directly; only the early signs are visible. The interface is in Russian.
