A failed turn stops being final. Agent Retry watches every failed turn in bb and queues another attempt after a wait that grows with each try, up to the budget you set.

## What you get

Any failure, not a list of approved ones. bb's built-in retry covers a fixed set of provider messages, and the built-in Provider Retry plugin covers overloaded providers and resettable rate-limit windows. Everything else — a gateway error with no structured classification, a provider process that died mid-stream, a request refused at the door — was previously the end of the turn. This plugin retries all of it, and its skip list names only the failures that cannot succeed on a second try.

A wait that grows. Exponential, linear, or flat, with a configurable base delay, growth, per-attempt ceiling, and jitter, so a fleet of threads that failed together does not come back together.

50 attempts by default. Counting the original dispatch as attempt 1, that is roughly eleven hours of retrying before the cap, with a chain-span limit available when you want a shorter leash.

Control over where it applies. Scope by project, provider, thread id, thread-id pattern, hidden background workers, or child threads.

An audit trail. `bb agent-retry log` records every decision with the rule that made it, `bb agent-retry simulate` replays a failure shape you describe by hand, and `bb agent-retry status` shows what is pending right now.

## How it works

bb fires a `turn.failed` event for every failed turn, carrying a durable attempt counter and the provider's own classification — which may be absent. The plugin decides from that, the provider's error text, and your configuration, then asks core to re-submit the turn at a chosen time.

A retry re-runs the turn rather than replaying the request: when the provider had already accepted the input, the conversation continues instead of starting over, and the model, reasoning level, and permission mode are preserved. The queued retry is an ordinary durable queue row — it survives a restart, it appears on the thread's queue card with its reason, and you can send it now or cancel it.

## Requirements

Nothing beyond bb itself. No account, no network service, no API key.

Because core allows one live retry per failed turn, disable the built-in Provider Retry plugin when this one is enabled, or the two will race for the same turn.
