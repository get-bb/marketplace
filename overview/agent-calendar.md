## Check your agents like your own calendar

Open **Agent Calendar** from the app sidebar to see a **Day**, **3 days**, or **Week** at a time. Each thread is its own block, colored by its project and labeled with its title, time span, and project. Click a block to open the thread, or click a day's header to focus on that day. Summary cards show the thread count, hours on the calendar, raw agent-turn time, and peak number of agents running in parallel.

Switch to **Projects** to merge a project's parallel threads into one entry, such as "monorepo, 9:00–11:45, 17 threads". Click the entry to list its threads and open one.

## Time sheet

The **Time sheet** lists every thread under its project, with decimal hours for each day of the week and a total. **Copy as CSV** puts the project, thread title, thread ID, daily hours, and total on your clipboard.

## How blocks are built

A thread appears on the calendar only while an agent turn is running. Turns of the same thread separated by at most the merge gap become one block. The gap is 30 minutes by default, with 15m, 1h, and 2h available. Each block is rounded out to the surrounding quarter hours, so a two-minute turn takes a 15-minute slot.

Hours count each thread, so five agents working for one hour count as five hours. "Agent turns" is the time turns were running, before merging and rounding. The eight projects with the most agent time over the last 30 days get their own colors; other projects share a neutral color.

## Command line

Agents and scripts can read the same data with `bb agent-calendar`, and the bundled skill teaches agents to use it for questions such as "what did my agents work on last week?".

```sh
bb agent-calendar                      # this week's time sheet
bb agent-calendar --week last          # last week's time sheet
bb agent-calendar log                  # today's work blocks, in order
bb agent-calendar log --day yesterday --json
```

## Data

The plugin indexes turn history into its own SQLite database on the bb server and uses no external service. It backfills all visible threads, including archived ones, then re-reads only threads that changed. Hidden background threads are not shown, and deleted threads drop out. Times use your time zone in the app and the bb server's time zone in the CLI. Weeks start on Monday.
