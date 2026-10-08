Put several agents on one message. MoA Provider adds a Mixture of Agents
provider to BB's model picker whose models are your presets: advisor agents read the request
first, then an aggregator agent reads their notes and does the work. Any
installed provider and model can fill a slot.

## What you get

- A **Mixture of Agents** provider in the model picker, with one model per
  preset (up to 32).
- A **Presets** page in this plugin's settings: one aggregator slot and up to
  six advisor slots, each picked with BB's own provider/model/reasoning
  picker.
- A live **advisor panel** in the thread for every round: provider, model,
  reasoning level, status with a running timer, what each advisor is doing,
  and its answer as it streams. **Open ↗** jumps to that advisor's thread.
- The aggregator's reasoning, commands, file changes, approvals and reply
  mirrored into the same thread as they happen.
- **`/moa <question>`** in a thread on any other provider: that thread's own
  agent asks the advisors, shows the panel live, then weighs their notes.
- Optional mid-task check-ins: the aggregator gets a `moa_consult` tool, and a
  preset can nudge it to use that tool every N tool calls (1–50).
- `bb moa-provider list` to print the presets, and two bundled skills.

## How it works

Every slot runs as an ordinary BB provider on a hidden worker thread in the MoA
thread's environment, using that provider's existing sign-in. Advisors run in
parallel, once per message. They are told to change nothing and to keep to the
workspace, and any approval they ask for is declined, so a hidden advisor never
waits on you. Those rules are instructions, not a sandbox: an advisor can still
read outside the workspace, and what it reads goes to its model's provider. The
aggregator receives your message unchanged, with the advisors' answers appended
as a private notes block, so its cached conversation prefix survives. Workers
belong to the MoA thread: they archive and delete with it, and are reused on
later messages, so each keeps its own context.

The plugin runs no model and stores nothing off your machine: no API keys, no
proxy, no external service.

## Cost and limits

A message costs one advisor turn per advisor, plus the aggregator's whole turn.
Most of the cost is the aggregator's. An advisor that shows no progress for
`advisorTimeoutSeconds` (180 by default) is stopped, and what it wrote still
reaches the aggregator, marked as cut off. A round that keeps working is capped
at 30 minutes, and a mid-task check-in at 4. MoA turns cannot be steered: a
message you send mid-turn runs as the next turn.
