## What you get

- Agents put OpenUI Lang programs in their replies (` ```openui-lang ` blocks). BB draws them inline with OpenUI's React renderer and its component library: cards, tables, charts, tabs and forms.
- About 70 more components from this plugin: gauges, sparklines, heatmaps and funnels; timelines, calendars, roadmaps, kanban boards and estimates; trees, JSON explorers and diffs; test, lint, coverage, CI and benchmark reports; maps, credited photos and small sandboxed apps.
- Plans, decisions, choices, quizzes, follow-up suggestions, buttons and forms send the user's answer back into the thread as their next message.
- Components for BB itself show the thread's changed files, commits and pull request, and the live status of other threads and environments.
- `check_openui`, `openui_examples` and `openui_components` tools let an agent check a block, see working examples, and fetch a component's signature before it uses it.

## Requirements and costs

- BB 0.49 or later (uses the experimental code-fence renderer slot).
- About 3,000 tokens of instructions in each session a person reads. Worker threads get none. Signatures for most components load only when an agent asks for them.
- No OpenUI Gateway and no API key. Gateway's automatic error correction is not used, so a block with no renderable root shows as code.
- Web lookups, on by default: Map sends place names to Photon and loads tiles from OpenStreetMap, Map also queries Wikipedia, and both Map and ImageSearch query Wikimedia Commons. These services see your IP address and the request. Turn off the plugin's Web lookups setting and nothing is fetched.
- Blocks also load the image URLs the agent writes (OpenUI's prompt suggests picsum.photos), and source/citation components load site icons from Google's favicon service. These see your IP address and the domains shown.
- Form input is not saved: it resets when the reply scrolls out of view or the thread reloads.
- Running it together with genui gives agents two UI languages and both prompts. Turn one off.
