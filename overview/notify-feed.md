## What you get

When a root thread assigns tasks to child threads, the conversation fills with handoffs and completion reports. Notify Feed hides those rows from the main chat and moves them into a Notifications panel on the right. The conversation keeps only your messages and direct agent replies. Agents continue to receive all background traffic normally.

- Messages sent by child threads, BB system notices (completed, failed, interrupted, needs attention, batch digests), and external tool messages starting with `[notify:Name]` leave the main feed.
- A button in the thread header shows total notifications or the count of new entries since you last opened the tab.
- Cards are grouped by day with filters for All, Done, Attention, and Info / replies. Clicking a card expands its full text.
- A thread message and its completion notice within 60 seconds combine into a single card.
- A switch changes the tab to a list of sending threads with status indicators. Open a thread to read the complete conversation in time order.
- Reply directly to child threads from the panel without switching conversations.
- An optional toggle sends a note to the root agent when you reply to a child thread.

## Configuration

Settings are available under Settings -> Plugins -> Notify Feed, or via `bb plugin config notify-feed set <key> <value>`:

- `language` (`en`): interface language (`en` or `ru`). Russian translates system notices in the tab.
- `marker` (`""`): reply prefix such as `[bg]`. When set, the plugin instructs agents to prefix short background replies with this marker, moving them to the tab. Empty leaves agent prompts untouched.
- `hide` (`true`): hides notification rows in the main feed. Set to `false` to restore the stock feed while keeping the tab active.
- `threads` (`[]`): JSON array of thread IDs where the plugin runs. Empty enables the plugin everywhere.

## How it works

The plugin runs entirely on your local machine using BB's internal APIs. It requires no external network access, cloud accounts, or third-party servers.

The server caches thread metadata locally, checks whether child threads are archived, and tracks the last viewed timestamp per thread. When replying to a child thread, the plugin verifies whether the message arrived before alerting you to an error, avoiding accidental duplicate turns.

## Limitations

- Hiding feed rows and showing the thread header button rely on BB experimental slots (`experimental_appOverlay` and `experimental_threadHeaderAction`). If these slots are absent, the Notifications tab remains accessible from the right panel menu.
- Feed polling runs every 8 seconds. New messages take up to 8 seconds to hide.
- If two consecutive polls fail, the plugin temporarily unhides rows to prevent stale filtering.
- Messages sent from the tab have a 20,000 character limit.
- Sending a note to the host agent starts that agent's turn, as BB cannot deliver messages without starting a turn.
- In the tab composer, pressing Enter submits the message.
- At most 20 history pages are read per thread.
