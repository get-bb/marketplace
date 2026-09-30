Hotspot keeps a per-minute record of CPU, memory and macOS thermal pressure,
and charges the load to the BB threads whose processes caused it. When the
fans spin up, you see which agent's dev server, build or test run is
responsible, and you can stop it from BB.

## What you get

- **A footer readout.** A flame that turns amber or red with the heat, plus
  CPU and memory figures, updated every 2 seconds while a BB window is on
  screen.
- **A popover with the answer.** Click the footer for a verdict such as
  "Running hot since 2:13 PM, mostly Run e2e test suite", a numbers row (heat,
  CPU, memory with swap, load per core, each with a line for the last hour),
  the busiest threads with their CPU and memory under a **BB total** row, and
  your recent hot spells.
- **A drill-down for each thread.** Unfold a thread to see its five busiest
  processes. Stop its running turn, kill all its work processes, or kill one
  process with its × button. Each kill first lists what gets stopped and what
  is spared.
- **An Activity Monitor button** for the load that comes from outside BB.
- **A Hotspot page** with a 24-hour or 7-day timeline of CPU and thermal
  pressure, hot spells shaded, a memory plot on the same time axis, and the
  list of hot spells. Open a spell to see the threads that used the most CPU
  during it, each with its busiest processes.
- **A toast** when the Mac starts running hot, naming the thread responsible.
- **Answers for agents and terminals.** Ask an agent "why was my Mac hot at
  3pm?" and it reads the `hotspot_history` tool. `bb hotspot status` and
  `bb hotspot episodes` answer the same question in a terminal.

## How it works

Hotspot stores one sample a minute from `ps`, `notifyutil`, `vm_stat` and
`sysctl`, and keeps seven days of history in its own database on the BB
server. Three hot minutes in a row (thermal pressure above nominal, or CPU at
80% of all cores) open a hot spell, and three normal minutes close it. The
2-second live readings are never stored. Sampling only reads, and it needs no
account, root access or network service.

A kill targets only a thread's own work: the dev servers, builds, test
runners and headless browsers its shells started. It never signals the
thread's agent or its MCP servers, BB, your apps or system processes. Agents
get no tool to kill processes or stop turns. Set `allowKill` to `false` to
remove the kill actions.

## Requirements

Hotspot is built for macOS. On Linux it records CPU, memory and threads, but
it has no thermal reading, so only the CPU rule opens a hot spell, and memory
has no pressure level. The Activity Monitor button opens GNOME's or KDE's
system monitor there. Windows is not supported.
