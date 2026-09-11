Choose fx in BB's provider picker to work with its coding agent in your threads. Follow streamed replies and tool activity, select models available to your fx account, and resume previous sessions.

## What you get

- An fx provider with a mark that follows BB's light and dark themes.
- Model discovery from the authenticated agent, including its account default.
- Session restore and streamed text and tool activity through BB's shared Agent Client Protocol bridge.
- BB permission controls for approval requests forwarded by fx.

## Requirements

Install BB 0.42.1 or newer and the [fx CLI](https://fx.sh/) on each machine where you want to run fx threads. The `fx` executable must be on that machine's `PATH`. Run `fx login` there to authenticate. Model access, usage limits, and any service charges depend on your fx account and model provider.

## Permissions and limits

The plugin starts `fx acp` with `FX_PERMISSION_MODE=ask`. BB handles the approval requests fx sends according to the thread's permission mode. Existing fx permission rules, session grants, and tool restrictions still apply before a request reaches BB.

Reasoning controls appear only when fx advertises effort choices for the selected model over ACP; released fx 0.0.7 and 0.0.8 do not. Session forks, service tiers, manual compaction, and provider-side thread renaming or archiving are not offered. The plugin stores no account credentials of its own; the fx CLI manages authentication and communicates with its services.
