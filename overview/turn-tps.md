## What you get

Every completed turn shows a badge under the assistant message: output tokens, wall-clock duration, and the resulting tokens per second. The turn header carries the same rate as a short label, with the division spelled out on hover.

## How the rate is measured

The rate divides reported output tokens by the full turn duration, from `turn/started` to `turn/completed`. Tool execution, retries, and time spent waiting on the provider count against the number, so it reads lower than raw model decode speed. Reasoning tokens are counted once, never added again.

Active turns gain their badge when the turn completes. A turn with no usable usage or lifecycle timestamps shows nothing rather than an estimate.

## Where the numbers come from

BB providers that report usage in the event stream, such as Codex, Antigravity, and Exo, supply the token counts directly. ACP and OMP threads report no usage, so the badge reads the local OMP session file for that thread and labels the figure as native generation speed.

## Requirements

BB 0.42 or later. The ACP and OMP path needs that thread's OMP session file on the machine running BB; without it, those turns show no badge. Badges require an exact thread and turn match, so a change to BB's timeline markup hides a badge instead of displaying a wrong number.
