Keep agents moving when they stop only to ask for an unnecessary confirmation.

## How it works

After a BB thread becomes idle, Jev, Please Proceed sends the complete available top-level user and assistant text conversation to TypeSafe Jev and asks one Noul question: should the agent continue because it is waiting for a rubber stamp or has paused before an obvious, already-authorized next step?

Only a Noul value above 0.95 triggers a continuation. The plugin rechecks that the thread is still idle and unchanged, then supplies the agent-only message `please proceed`. It never includes system prompts, tool traffic, attachments, nested-agent messages, or its own continuation messages in Jev's input.

## Choose how to reach Jev

Use a TypeSafe API key, a Vercel AI Gateway key, an OpenRouter key, or configure several. `auto` tries the configured routes in that order and falls back when one fails; you can also pin one provider. `bb jev-please-proceed check` verifies the selected route with synthetic text without reading a thread.

## Guardrails

- Pending interactions and queued messages block automatic continuation.
- Every idle transition is deduplicated.
- An identical repeated stopping response is not continued twice.
- All provider attempts share one five-second timeout, and no route is retried.
- Only hashes and aggregate counters are stored; transcript text and raw Jev output are not retained.

The plugin requires at least one supported API key and sends conversation text through the selected provider for processing by TypeSafe Jev. TypeSafe, Vercel AI Gateway, or OpenRouter usage charges and account limits may apply. Aggregate behavior and the last successful route are available through `bb jev-please-proceed status`.
