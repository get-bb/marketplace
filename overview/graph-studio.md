## Cycles, not just steps

Most workflow tools run a list of steps forwards. Graph Studio exists for the
case that breaks them: the reviewer finds a problem and the work has to go
back. A back edge is a normal edge here, not a special case.

## A node is a thread, not a model call

Each node spawns a BB thread, waits for it to go idle, and puts its last
message into the graph's state. Your workers therefore show up in the sidebar
where you can open them, they inherit the parent thread's environment and
worktree, and they run on the provider subscriptions you already have. There
is no separate API key and no second account.

## Watch it while it runs

The canvas shows the graph executing: which node is working, a clock on the
one currently running, an activity line under it, and a link into the worker's
own thread while it is still going rather than after it finishes. The header
counts finished nodes, steps and tokens; clicking a node lists every attempt
with its duration, tokens and result, next to the prompt it was given.

## Design and run it from the chat

Ask for a flow in plain words — "build me a flow that reviews and reworks until
approved" — and the bundled skill has the agent create, change, explain or
start it. A running graph appears in the thread as a live card with the same
canvas, and the Graph Studio side panel follows the run beside the chat. The
full-screen editor is where you review and fine-tune: nodes, prompts, result
fields, edges and limits in one inspector.

## Stop and ask a person

A `human` node pauses the run and waits for your answer. A `dialog` node keeps
one thread open so a worker that interviews you — asking one question, waiting,
then the next — stays a conversation instead of degrading into a monologue.

## 32 templates to start from

Shipped as code and read-only; clone one under a new id to make it yours. They
cover the established orchestration patterns — prompt chaining, routing,
map-reduce, evaluator–optimizer, supervisor, swarm, state machine, debate — and
the library search understands the catalogue's own vocabulary, so looking for
`orchestrator–worker` finds `map-reduce`.

## Combine it with Crew

A flow ends; a [Crew](https://github.com/sajov/bb-plugins/tree/main/bb-plugin-crew)
is a team that stays. A `member` node hands one step to a persistent crew
member instead of spawning a fresh thread, so the member keeps its context,
worktree and model — the `owner-check-loop` template runs build and check on a
crew this way. In the other direction, a crew member can start a Graph Studio
graph with `crew_graph_run`, and a run waiting on a human node shows up in the
crew's **Needs you**. Without the Crew plugin, graphs without member nodes run
as before.

## Edges you can read

Conditions are a small, inspectable language — `always`, `contains`, `equals`,
`matches`, `visitsBelow` — never arbitrary code, so an edge can be checked
before it runs. Nodes declare result fields and edges compare those fields,
rather than searching a worker's prose for a keyword. Per-node visit limits,
per-visit retries and a per-graph step cap mean a cycle always terminates.

## Survives a reload

Runs are checkpointed into the plugin's own database. Reloading the plugin
resumes a run from its last checkpoint instead of re-running finished nodes.

## Keep a graph in your repo

Graphs live centrally, so one you build is available in every project. To
version or share one, export it to a file and import it elsewhere:

```sh
bb graph-studio export my-graph > .bb/graphs/my-graph.graph.json
bb graph-studio import .bb/graphs/my-graph.graph.json
```

## Drive it from the command line or from an agent

```sh
bb graph-studio graphs [search]
bb graph-studio run evaluator-optimizer "Write the onboarding text"
bb graph-studio status <run-id>
```

An agent inside a BB thread can drive it too, through the
`graph_studio_graphs`, `graph_studio_describe`, `graph_studio_get`,
`graph_studio_save`, `graph_studio_run`, `graph_studio_status` and
`graph_studio_answer` tools.

## Requirements

Requires BB 0.42 or later and Plugin SDK 0.5.29 or later. No extra service,
account or API key is needed — runs use the providers BB is already configured
with.

The Work templates run their steps on
[Matt Pocock's skills](https://github.com/mattpocock/skills). Install them
first with `npx skills add mattpocock/skills`; without them those steps fall
back to their prompt alone. The Pattern templates need no skills.
