An agent notices things it is not going to do — work that is out of scope,
blocked, deferred, a risk, or cleanup worth doing later. Those observations
normally live in one reply and are gone by the next turn. This keeps them.

## What you get

A banner above the composer listing what the current thread accumulated. Each
row can be pushed into the composer, handed to a new thread in the same
checkout, reordered, marked done, or dismissed. A dismissed row stays gone: an
agent that notices the same thing again cannot re-add it.

Five agent tools — `record_follow_up`, `list_follow_ups`, `complete_follow_up`,
`prioritize_follow_up`, and `amend_follow_up`. Agents record as they work and
close the rows they finish, including rows you wrote yourself.

A `bb follow-up` command covering the same ground from a terminal: `add`,
`show`, `move`, `amend`, `done`, `reopen`, `clear-done`, `describe`, `dismiss`,
`handoff`, `clear`, and `forget`.

Follow-ups in the `@` menu, so a row can be pulled into a prompt by name.
Mentioning one can claim it, marking it in progress as you send.

## How it works

There is no background model call. Capture happens inside a turn the agent is
already running, so the plugin costs nothing to run: no model to choose, no
cooldown, no polling.

Two optional buttons do spend a turn, and only when you press them. *Describe
this in more detail* asks a helper to write a row's detail. *Suggest what's
next* asks the thread's own agent what is worth picking up once the list is
empty. Both run on a model you choose, in the open and stoppable like any other
turn, and both are told that "nothing" is a real answer.

## For other plugins

`getFollowUpCountsV1` is a stable, versioned contract: one request returns open
and done counts for up to 500 threads, every requested thread comes back
including ones with nothing recorded, and repeated ids are deduped in
first-seen order. Read `protocolVersion` before the counts. Everything else in
the RPC surface is this plugin talking to its own frontend and may change shape.

## Requirements

None beyond BB. Follow-ups are stored per thread in this plugin's own database
on the BB server; nothing leaves the machine, and no account or API key is
needed.
