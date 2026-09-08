## What you get

Muse Code appears in the provider picker beside the providers bb ships. Pick it
for a thread, choose a model from Muse's own catalog, and set a reasoning level
from low through x-high.

Everything Muse does lands on bb's timeline as bb items: commands with their
output, file edits, searches, its todo list, its reasoning, and the subagents
and workflows it starts. Approvals and questions arrive as bb prompts, so a
thread waiting on you looks like one.

bb's own tools go the other way. Thread mentions, findings, owner decisions, and
UltraGoal are all callable from inside Muse.

## How it works

Each thread gets its own `muse serve` host, driven over the Muse Session
Protocol. bb's permission policy sets Muse's approval mode: full access and auto
stop Muse asking, and accept-edits leaves you as the reviewer.

No mode covers everything. Muse reviews a shell command one argv stage at a
time and stops at any fragment its grammar cannot resolve, so a `${VAR}`
expansion or a heredoc is reviewed even when Muse is otherwise allowing
everything. bb asks about the command, not the fragment: one answer settles
every stage of it.

Injected tools reach Muse through an MCP server the bridge starts for that
thread, configured in a private directory. Your own Muse settings and
credentials are read, never written, and bb's tools never appear in your
terminal sessions.

When Muse fails a turn for something a new session clears, bb rebuilds the
session and runs your prompt again once, carrying a transcript of the
conversation into the replacement. An expired login or a rate limit is reported
instead, because neither is fixed by a rebuild.

Meta publishes no usage endpoint, so the subscription meter is measured from
Muse's own session logs over a five-hour rolling window.

## Requirements

The Muse Code CLI must be installed on the machine that runs the thread, and
signed in with `muse login`. The plugin reports the installation and login state
and can run the install for you. A Meta account with Muse Code access is
required; the rate limits are Meta's.

Muse's own OS sandbox is left off by default, because builds and test runs do
not survive it. Turned on, the shell runs with network access enabled rather
than Muse's proxy-only default, which cuts the bb CLI's larger responses. Both
are settings on the plugin.

## Links

- [Muse Code](https://developer.meta.com/ai/products/muse-code/)
- [Plugin source](https://github.com/braedonsaunders/bb-plugin-provider-muse)
