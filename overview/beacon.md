## Status in the footer

Open Status for CPU, per-core load, memory, swap, root disk, network rates, top processes, and uptime on the machine that runs BB. It samples only while the popover is open.

`bb beacon snapshot` prints the same numbers. `--json` gives the full reading. `bb beacon health` reports pressure and exits 2 when a reading is critical.

Background monitoring watches CPU and memory every 30 seconds while Status is closed. A full minute of overload can send an in-app toast if BB is open and visible. There is no OS push and no third-party monitor.

## Thresholds

Dashboard colors turn amber at 75% and red at 95%. CLI health warns at 85% and goes critical at 95%. It also compares five-minute load with core count. Background alerts wait a full minute at higher thresholds. Those scales are independent.

Metrics stay on the BB server. Chart history lives in memory and expires when nobody is looking. Beacon never calls an external API. It does not change server settings, enable swap, or kill processes.

## Requirements

BB 0.43 or newer. It inspects only the BB server host, not other enrolled machines or containers. Detailed network rates need Linux. A process can show more than 100% CPU because that figure is a lifetime average relative to one core.

No account, API key, or extra install.
