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
Protocol. bb's permission policy decides who answers an approval: under full
access and auto nobody asks you, and accept-edits leaves you as the reviewer.

Selecting Muse's most permissive approval mode is only half of that. Muse
reviews a shell command one argv stage at a time and escalates any fragment its
grammar cannot resolve — a `${VAR}`, a substitution, a heredoc — whatever mode
it is in, which is most of the commands an agent writes. So the bridge answers
those itself under a policy bb has already decided, and asks you only where bb
named you the reviewer, or where Muse flags a reach past your permission scope
and bb asked for that to be escalated.

Injected tools reach Muse through an MCP server the bridge starts for that
thread, configured in a private directory. Your own Muse settings and
credentials are read, never written, and bb's tools never appear in your
terminal sessions. Each thread's MCP server holds a credential minted for that
thread and its declared tools alone, so one thread cannot call another's.

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

## Security posture

**Muse's OS sandbox is off by default, and network access is allowed.** A shell
command Muse runs is confined by nothing at the OS level; bb's permission modes
and approvals are the enforcement surface, and under bb's Full access mode —
its documented approval bypass — that surface is deliberately empty.

The default is off because Muse's sandbox is all-or-nothing and denies the
Darwin per-user cache: with it on, nothing that invokes Swift or Clang builds.
Turn on **Muse's own OS sandbox** in the plugin settings for OS-level
containment, at that cost. Sandboxed commands are allowed network by default
rather than Muse's proxy-only, which truncates the bb CLI's larger responses;
**Sandbox network** narrows it.

## Links

- [Muse Code](https://developer.meta.com/ai/products/muse-code/)
- [Plugin source](https://github.com/braedonsaunders/bb-plugin-provider-muse)
