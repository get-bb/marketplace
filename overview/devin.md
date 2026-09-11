## What you get

Devin appears in BB's provider picker. BB discovers models from the local ACP session and renders responses, tool calls, and file changes in the thread.

## Requirements

Install the Devin CLI on each BB host and authenticate it with `devin auth login`. The plugin does not store Devin credentials; authentication remains with the local CLI.

## How it works

BB launches `devin acp` as a local subprocess and uses the Agent Client Protocol for session and event transport. The integration exposes BB's `accept-edits` and `full` permission modes. Thread forking and native plan-mode controls are not exposed in this first release.
