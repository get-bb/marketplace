Keep "Your messages" for the messages you actually wrote.

BB delivers two kinds of messages to an agent as if you had typed them:
`[bb system]` notices about child threads finishing, failing or being
interrupted, and messages that other agent threads send with
`bb thread tell`. The thread outline (the rail on the right of a thread) lists
both under **Your messages**, so in an orchestrator thread your own prompts
get lost among them.

## What you get

- A third **System messages** tab in the thread outline, next to
  **Agent messages** and **Your messages**, holding every `[bb system]` notice
  and every message from another thread.
- **Your messages** shows only what you wrote.
- Clicking an entry in **System messages** jumps to it, like any other
  outline entry.
- A date-and-time line above every outline entry, in all three tabs:
  "Today, 2:34 PM", "Yesterday, 22:10", "Oct 3, 9:15 AM", with the year for
  older messages. Language and clock follow your computer.
- Messages from threads the app hasn't loaded show the sender thread's title
  instead of a bare "Agent" chip.
- The tab only appears in threads that have such messages, and remembers your
  choice while the outline closes and reopens.

## How it works

The Plugin SDK has no slot for the thread outline, so the plugin works on the
rendered outline: it adds one tab button, widens the popover so the three tabs
fit, hides entries in the list, and adds the time lines. Times and sender
titles come from the thread's own event log on your BB server. The plugin does
not change messages and sends nothing anywhere. Disabling the plugin restores the outline exactly as BB
ships it.

A future BB update can change the outline's internal layout. The
**System messages** tab may then disappear until the plugin is updated; the
outline itself keeps working.
