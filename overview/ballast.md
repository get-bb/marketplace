## The number you were given is wrong

The usual way to check memory pressure on macOS is `memory_pressure`, whose
"free percentage" is what most scripts reach for. On the machine this plugin
was written for it reported **61% free** while the box held 5.2 GB of swap, 6 GB
of compressed pages, and had 1.4 GB genuinely unused. It counts inactive pages
as free, so it stays reassuring right up until everything stops.

Ballast reads `vm_stat` page classes directly and reconstructs what Activity
Monitor shows — app memory, wired, compressed, cached files — plus the two rates
that predict trouble: how fast the machine is paging in, and how hard the
compressor is working.

Four signals are graded independently and the worst one wins, so 90% used with
6 GB of clean cache behind it is correctly healthy, and 70% used while paging in
300 MB a minute is correctly not. The banner names the signal that decided,
because an alarm that will not say what moved is one you learn to ignore.

## Where it went

Consumers are grouped by process tree, so a headless Chrome is one browser
rather than thirty renderers, and by **BB thread** — matched through worktree
paths and argv. The question becomes "which thread is holding 2.4 GB" rather
than "which of these six node processes". One of those you can act on.

## Shedding load

Four rungs, in order of what they cost:

1. **Throttle** — lower BB's concurrency so no new threads start. Frees nothing,
   loses nothing, lifted automatically when pressure clears.
2. **Ask** — steer the hungriest threads to close their browsers and stop their
   dev servers. Costs a turn, costs no work.
3. **Stop** — terminate disposable processes.
4. **Escalate** — hand the whole picture to an agent with the tools to work it.
   It runs unattended with full permissions, because a thread that stops on an
   approval nobody is there to give is worse than no thread, and it is only
   started when there is something it could actually do.

Each rung is independent, and all four are off until you turn them on — a fresh
install reports and plans, and stops nothing. Every threshold crossing and every
automatic action is logged with the numbers that triggered it.

## What it will not stop

Only headless browsers, dev servers, test runners and build tools are ever
candidates, and only when nothing can still be waiting on them — in practice,
orphaned. The one exception is a headless browser idle at no CPU, the ordinary
shape of a leak from a finished suite. A process whose parent is alive is being
held by it, so idle alone never makes one safe: a language server or bundler at
0% CPU is waiting for work, not finished.

Agents, BB itself, editors, your own browser, containers, long-lived tool
services, system processes, other users' processes and anything Ballast could
not confidently identify are refused by construction. Refusals appear in the
plan with their reason rather than being hidden.

The apply step never accepts a PID. It takes identifiers Ballast minted while
building a plan and re-derives each target from a freshly read process table
immediately before signalling, so a recycled PID is refused rather than killed.
The panel, the `bb ballast` command and an agent all pass through that gate.

## Cost

A healthy machine is sampled once a minute, and a healthy sample reads only
memory totals — about ten milliseconds, no process table, no SDK call. The
expensive half runs only under real pressure or while you are looking, is
cached, and de-duplicates concurrent callers. The panel is refreshed by pushes
from the guard and idles when its tab is hidden.

## Agents

Ballast registers `ballast_status`, `ballast_plan` and `ballast_relieve` in
every thread, plus a skill, so an agent whose build just got killed can diagnose
it without being told the plugin exists. Under pressure it injects the current
numbers into every thread; below the watch threshold it contributes nothing.

## Requirements

macOS or Linux. No account, service, or separate install. Swap, compression and
kernel pressure level are read where the platform exposes them and reported as
absent where it does not.
