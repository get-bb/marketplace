## What you get

Your bb automations become rows in the quick palette, next to bb's own
commands. Press the palette shortcut, type `run automation`, and start a
scheduled sweep the moment you want it rather than waiting for its cron
expression to come around.

Each row reads `Run automation: Widget sweep · Acme Widgets`, so the palette
finds it by the word `run`, by the automation's name, or by the project's name.
Selecting one queues the run exactly as the schedule would: same script or
agent, same project, same environment.

Rows are listed in every project's palette, not only in the project that owns
the automation. An automation worth starting by hand is worth reaching from
whichever window you are already in, and the run lands in the owning project
either way.

A paused automation keeps its row and says `(paused)` in the title. Running one
by hand is the case pausing does not cover.

## How it works

bb collects a plugin's palette rows once per app load, so the rows cannot be
fetched while the palette is open. The plugin keeps a list of your automations
and registers a row for each one at load time; a background refresh updates
that list for the next load. A newly created, renamed, or deleted automation
therefore appears in the palette after the next bb reload, and the browser
console says so when the plugin notices the difference.

Starting a run is one call to bb's own automations CLI, `bb automation run`.
The plugin adds no scheduler, no state of its own, and no second place to
configure anything: the Automations page stays the one place an automation is
created, edited, paused, and reviewed.

Because the palette has no way to draw a result, a started run is confirmed in
the browser console. The run itself appears where every other run does, on the
Automations page and in `bb automation runs`.

## Requirements

Needs bb 0.42 or later and the bundled automations plugin, which is where
automations live. Needs the `bb` CLI on the machine running the bb server; the
plugin finds it automatically and takes an explicit path as a setting when it
cannot. No account, no external service, and no network access beyond the bb
server you are already connected to.
