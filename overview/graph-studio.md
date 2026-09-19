## Cycles, not just steps

Most workflow tools run a list of steps forwards. Graph Studio exists for the
case that breaks them: the reviewer finds a problem and the work has to go
back. A back edge is a normal edge here, not a special case.

Build agent graphs that may contain cycles, run them against real BB threads,
and watch them execute on a live canvas.

## A node is a thread, not a model call

Each node spawns a BB thread, waits for it to go idle, and puts its last
message into the graph's state. Your workers therefore show up in the sidebar
where you can open them, they inherit the parent thread's environment and
worktree, and they run on the provider subscriptions you already have. There is
no separate API key and no second account.

## Watch it while it runs

The canvas shows the graph executing: which node is working, a clock on the one
currently running, an activity line under it, and a link into the worker's own
thread while it is still going rather than after it finishes.

## Stop and ask a person

A `human` node pauses the run and waits for your answer. A `dialog` node keeps
one thread open so a worker that interviews you — asking one question, waiting,
then the next — stays a conversation instead of degrading into a monologue.

## 31 templates to start from

Shipped as code and read-only; clone one under a new id to make it yours. They
cover the established orchestration patterns — prompt chaining, routing,
map-reduce, evaluator-optimizer, supervisor, swarm, state machine, debate — and
the library search understands the catalogue's own vocabulary, so looking for
`orchestrator-worker` finds `map-reduce`.

Every graph carries an example task in plain words, so the run field is never
an empty box asking what to type.

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
`graph_studio_graphs`, `graph_studio_describe`, `graph_studio_run` and
`graph_studio_status` tools.

## Requirements

Requires BB 0.42 or later and Plugin SDK 0.4.47 or later. No extra service,
account or API key is needed — runs use the providers BB is already configured
with. State, edges and checkpoints are handled by LangGraph; execution, threads
and permissions by BB.
