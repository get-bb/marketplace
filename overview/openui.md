## How it works

Agents put OpenUI Lang programs in their replies (` ```openui-lang ` blocks) wherever a picture beats a paragraph: numbers, comparisons, options, steps, a flow or a form. BB draws them inline with OpenUI's React renderer and its standard library of cards, tables, charts, tabs and forms. This plugin adds about 70 components on top, in eight groups.

## What you get

- **Numbers and charts**: gauges, progress bars, sparklines, segmented bars, treemaps, histograms, box plots, heatmaps, calendar heatmaps and funnels, plus Mermaid diagrams drawn by BB's renderer.
- **Decisions you can click**: a weighted comparison whose options re-rank live as you change the weights, a carousel of options to pick from, and a plan with files, risk and estimate that you approve before work starts. Your pick goes back to the agent as your next message.
- **Time and planning**: roadmaps with a today line, kanban boards, timelines, a month calendar, workstream status rows, three-point estimates with P50 and P90, and acceptance criteria with evidence.
- **Reports**: test runs with failures first and file:line, lint and review findings by file, coverage worst first, outdated and vulnerable dependencies, CI pipelines, before/after benchmarks, timing waterfalls and release provenance.
- **Code and logs**: unified diffs, numbered file snippets that open at the line, build logs with errors and warnings counted, stack traces for six languages, JSON explorers and file trees.
- **BB project**: the thread's changed files, its commits and its pull request with checks and review state, live, plus the status of other threads and environments.
- **Inputs and learning**: steppers, star ratings, editable lists, colour swatches, timers, step-by-step walkthroughs, follow-up suggestions, and quizzes and flashcards that send your score back when you finish.
- **Maps, media and sandbox**: OpenStreetMap maps with numbered pins, credited Wikimedia Commons photos, pinned image hotspots, image compare, cited sources, small sandboxed HTML apps and GLSL shaders.

Agents check a block with `check_openui`, see working examples with `openui_examples`, and fetch a component's signature with `openui_components` only when they need it, so the always-on prompt stays small.

The full component list, screenshots and a demo video are in the [README](https://github.com/ahsan7162/bb-plugin-openui#readme).

## Requirements and costs

- BB 0.49 or later (uses the experimental code-fence renderer slot).
- About 3,000 tokens of instructions in each session a person reads. Worker threads get none.
- No OpenUI Gateway and no API key. Gateway's automatic error correction is not used, so a block with no renderable root shows as code.
- Web lookups, on by default: Map sends place names to Photon and loads tiles from OpenStreetMap, Map also queries Wikipedia, and both Map and ImageSearch query Wikimedia Commons. These services see your IP address and the request. Turn off the plugin's Web lookups setting and nothing is fetched.
- Blocks also load the image URLs the agent writes, and source components load site icons from Google's favicon service. These see your IP address and the domains shown.
- Form input is not saved: it resets when the reply scrolls out of view or the thread reloads.
- Running it together with genui gives agents two UI languages and both prompts. Turn one off.
