Machine Load puts every machine enrolled in bb on the same charts, so you can see at a glance which one is busy, which one has room for a build, and what each one was doing an hour or a week ago.

## What you get

- **A Machines page in the sidebar** with shared time-series charts for CPU %, memory %, GPU %, network throughput and disk IO. Each machine has its own color, and the crosshair tooltip compares all machines at the same moment.
- **History from 15 minutes to 7 days.** Samples every 5 seconds by default, downsampled for longer ranges.
- **A card per machine** with CPU and load average, RAM, swap, disk usage, disk read and write, network down and up, CPU temperature and power, and every GPU with utilization, memory, temperature, power and frequency.
- **A sidebar badge** when any machine goes above 80% CPU or RAM, amber up to 95% and red above.
- **`bb machine-load`** prints the current load of every machine, and `--json` gives agents the same data before they start a heavy job.

## GPUs and sensors

- NVIDIA through `nvidia-smi`, AMD through sysfs, Intel integrated graphics through per-process DRM engine counters, and Apple silicon through IOAccelerator. None of them needs root.
- Intel GPU load counts the processes of the user that runs bb, which covers a desktop session.
- On Apple silicon Macs, CPU and GPU temperature, power and GPU frequency appear when `macmon` is installed separately (`brew install macmon`). Without it, those fields stay empty.

## How it works

A small worker runs inside the bb daemon on each machine and reads system counters: `/proc` and `/sys` on Linux; `vm_stat`, `sysctl`, `netstat` and `ioreg` on macOS. The bb server polls every connected machine and keeps the history in the plugin's own SQLite database. New machines appear automatically. Nothing leaves your machines, and no account or external service is needed.

## Settings

- `intervalSec`: how often machines are polled, 2 to 300 seconds, 5 by default.
- `retentionHours`: how long history is kept, 1 to 720 hours, 168 by default.
