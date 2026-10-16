## What you get

- Charts, tables, diagrams, maps, timelines, kanban boards and roadmaps built from what the agent found, in BB's colours and in light or dark mode.
- Inputs that work in place: drag a slider, tick a box or edit a table and the result recomputes in the page, with no extra model call.
- Answers that go back: buttons, choices and forms send your pick to the agent as your next message.
- Tool output as components: test reports, logs, stack traces, lint and type errors, coverage, dependency audits, CI runs and benchmarks, read from the files the agent saved instead of pasted into the reply.
- Your project, read live from BB: the thread's changes, commits, pull request, worker threads and worktrees.
- Evidence you can check: acceptance grids that say what was verified and by whom, image comparisons with a pixel difference, and transcripts aligned word by word.
- Small sandboxed apps for what the components can't express, such as a game or a simulation, with no network access.

## How it works

Once the plugin is on, agents in the threads you read learn the components and pick them on their own. A reply carries a short `ui` block that BB draws while the reply streams. The Gen-UI Gallery page in the sidebar shows all 86 components with more than 170 examples. `bb genui render` prints any reply with its UI as plain markdown.

## Requirements and costs

- BB 0.45 or later.
- About 4,000 tokens of instructions in each session whose replies you read. Worker threads that agents spawn get none.
- Web lookups, on by default and switchable in the plugin's settings: photo search on Wikimedia Commons, place names through Photon and map tiles from OpenStreetMap. These services see your IP address and what is looked up.
- Components read files only from the thread's workspace, its thread storage and /tmp.
- BB has no plugin slot for code blocks yet, so the plugin draws over BB's own. A BB update can show the blocks as code until the plugin catches up.

Source and documentation: https://github.com/ComicBit/bb-plugin-genui
