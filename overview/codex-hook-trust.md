Codex runs a hook only after you approve its exact definition. Any edit — or a Codex update that fingerprints hooks differently — silently switches it off. This plugin shows those hooks in the Codex thread and lets you allow them, or keep them off, with one informed click.

## What you get

- A compact card under the thread header when the project's Codex hooks are new or changed and not allowed.
- For every hook: event, matcher, the exact command, timeout, source file, and why it asks — new, changed (field-by-field diff against what you allowed), or unchanged but re-fingerprinted by a newer Codex.
- Allow: saved through Codex App Server on the machine running the thread and verified with Codex itself. Don't run: remembered for that exact version, Codex config untouched.
- Agents are told that hooks wait and where the card is, but cannot allow them. `bb codex-hook-trust status` shows the details.
- English and Russian labels based on browser language.

## Requirements

BB 0.50.1 or newer and Codex CLI on the machines that run Codex threads (tested with 0.171). Works next to Codex Project Trust: that card handles trusting the project, this one its hooks.
