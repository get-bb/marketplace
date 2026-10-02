Subscriptions keeps a bb thread in step with the GitHub pull requests and Linear issues it cares about. You follow an item once, and the plugin checks it on a schedule and posts a short update to the thread whenever something you track changes.

## What you get

- Per-thread subscriptions to GitHub pull requests and Linear issues.
- A count in the thread heading that shows how many items you follow, with a hover that lists each item and its current state.
- Update messages that name the change, such as a state transition or a new field value, and link straight back to the item.
- Bulk subscribe and unsubscribe, persistent subscriptions across restarts, retry backoff on failed checks, and paused checks for archived threads.

## How it works

Ask the agent to follow an item, for example "subscribe linear ENG-123", or run `bb subscriptions sub github owner/repo#123`. The plugin compares state on an interval you set and sends a message to the subscribing thread when it sees a change. An idle agent is woken so it can act on the update.

When several changes arrive close together, they are coalesced into one message. If a thread is busy and already has a queued message waiting, later changes rewrite that message in place instead of stacking up, so a fast-moving item never floods the queue with outdated notes.

## Requirements

GitHub reads use the `gh` CLI already authenticated on the bb server. Linear reads use one personal API key, which needs only the Read permission. There is no separate management panel; you manage everything through the agent or the `bb subscriptions` command.
