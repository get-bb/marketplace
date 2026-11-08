## What you get

Agents answer with cards instead of long text. A status report comes back as metrics and a progress bar, proof that work is done as a checklist of criteria with their evidence, a comparison as a decision whose weights you can drag, and a test run as its failures with links to the lines. The answer stays in a sentence or two above the card.

There are 140 components in 32 families: layout, charts, data grids, diagrams, code and diffs, test, coverage and lint reports, eval runs, agent traces, flame graphs, migrations, plans, boards, roadmaps, maps, media players, 3D scenes, math, spreadsheets, API inspectors, whiteboards and more. Every card takes its colors from your bb theme and follows it when you switch.

## How it works

The agent writes a short `iris` code block in its reply, and bb draws it as a card while the reply streams in. Before sending, the agent checks the block with the `iris_check` tool, which reads the files it loads, moves every input to its extremes and returns an outline of what you will see.

- Sliders, toggles and pickers recompute the card in place.
- Pin up to five live cards beside the conversation, or let the agent pin and update a status card for you. A "2 pinned" chip above the composer opens them, and bb's home page shows every thread's pins. A pin can alert you when its condition turns true (a toast and the thread marked unread; bb offers plugins no phone push).
- Copy any card as an image: a PNG in your theme, ready to paste.
- The agent can read back what you set in its cards, so a slider or a pick doesn't need asking twice.
- Buttons put text in your message, and `iris_ask` opens a picker that waits for your answer, like ask mode: a ranked checklist, design variants in a live preview, a color with its contrast, marks on a screenshot, comments on a spec, or a list to put in order.
- A live card re-reads its files every 2 seconds, so a running job's log, progress or test results fill in as they land.
- `load("bb:...")` reads bb's own data for the card's thread: its context use, the threads it started, its pull request, commits and changes, plan usage, machines and plugins.
- The live project cards (changes, commits, pull request, threads and environments) update the moment bb reports a change, and make no requests while nothing changes.
- Other plugins can publish JSON that cards read with `load("plugin:<id>/<name>")`.
- `iris-react` and `iris-app` blocks run small React or HTML apps in a sandbox with no network.

The gallery in bb's sidebar shows every component live, with its code and every prop. The same gallery and a live editor run in the browser at https://vburojevic.github.io/bb-plugin-iris/.

## Safety

Expressions run in a sandboxed interpreter with no `eval` and a step budget. Cards make no network requests of their own: a web image or media file loads only when its full URL is written in the block, and map places and photo searches go through Iris's server only while web lookups are on. Files load only from the thread's workspace and bb's thread storage folders.

## Costs and settings

Iris adds about 3,600 tokens of instructions to each session it reaches: its rules and an index of every component. Prop details and examples load only when an agent asks for them. By default that is every top-level thread; threads that agents spawn under them are left out unless you turn on the `workers` setting. Maps, place search and photos call OpenStreetMap, Photon and Wikimedia Commons through Iris's server; turn `webLookups` off to keep cards offline. Some components use experimental bb plugin APIs, so a bb update can change how they look until Iris catches up.

Source, docs and the eval suite: https://github.com/vburojevic/bb-plugin-iris
