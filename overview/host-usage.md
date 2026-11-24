Open Host Usage beside the other icons in your BB sidebar footer. See the latest measurement and spot low memory, a nearly full disk, or an unhealthy BB instance without leaving the current thread.

## What you see

- Host RAM, CPU load, swap where available, and storage capacity.
- Discovered BB instances first, with separate RAM, CPU, and temporary filesystem figures where available.
- All other visible containers in an expandable list, with engine health and resource details.
- A snapshot timestamp, a refresh button, and a clear indication when data is stale or missing.
- Your own names for the host and any container: hover over a name and click the pencil.

## Setup

The local view reads the machine and current BB process directly. For a Linux Docker or Podman host, schedule the included Python collector with `--publish-bb`. It delivers the snapshot to every BB container on the host. The collector can also discover native BB server processes on Linux. Setup requires host access and permission to read the relevant runtime and resource counters.

Host Usage keeps its data on your installation.
