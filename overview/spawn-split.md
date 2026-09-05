Spawn Split gives an agent a single tool, `spawn_split`, for fanning work out
into child agent threads without leaving the conversation it started in.
Call it with a prompt and it spawns one or more child threads - each parented
to the calling thread - and opens every one as its own split pane right next
to the caller, so the human running the session can watch each child work in
real time.

## The `spawn_split` tool

Arguments cover the common fan-out shapes: `prompt` (required), an optional
`title`, `provider`, and `model` override per child, `count` (1 to 8) for how
many children to spawn, `split` for which direction to open each pane
(`down`, `left`, `replace`, `right`, `top`), and `env` for which environment
each child runs in.

## Worktree vs shared

`env: "worktree"` (the default) gives every child a fresh, isolated managed
worktree, so parallel children never collide on the same files - ideal for
independent reviews, parallel implementations, or exploratory branches.
`env: "shared"` instead reuses the calling thread's own environment, so the
child reads and writes the exact same working tree as the caller - useful
when a child needs to continue or extend work already in progress rather
than start clean.

Results are bounded: `spawn_split` reports which children spawned and opened
successfully and which failed, rather than returning full transcripts, and
partial failures are reported without discarding the successes.

## Headless by design

This plugin ships no frontend surface. Spawning a child thread and opening
its pane both happen from backend code in the same tool call, using
`bb.sdk.threads.spawn` and `bb.sdk.threads.open`, so there is no page or
component for a user to install or configure beyond the plugin itself.
