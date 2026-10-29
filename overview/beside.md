## What you get

Your threads stay in the order you started them. A row never jumps because an agent finished something; its status shows at the end of the row instead.

Work you have dealt with moves to a shelf:

- **Snoozed** threads stay hidden until the time you pick.
- **Settled** threads are done, until they have news.
- **Muted** threads stay out of the way until you unmute them, and their push notifications go quiet too.

A snoozed or settled thread comes back to the Inbox when it finishes, fails or asks you something. A thread that is waiting for your answer cannot be parked.

## Everyday use

- Hover a row to snooze it, settle it, or open bb's own thread menu.
- Drag pinned threads into the order you want. bb's own list keeps the same order.
- Child threads sit under their parent and move with it.
- Each shelf has a menu for bulk actions with Undo: Settle all, Snooze all, Wake all, Archive all and more.

## Optional rules

- **Settle after reading** settles a thread once you have read it and moved on to another thread. Moving between a parent and its children does not count.
- **Auto-archive** archives threads that have stayed settled for 1 to 30 days with no news. It is off until you choose a number of days.
- **Decision mode** asks a System One decision model whether a parked thread's news needs you. Routine updates stay on their shelf with an unread dot; questions, failures and anything the model is unsure about still come back. It is off until you choose a model in settings, where you can also tune how much reaches your Inbox and see each decision. We recommend a self-hosted model such as Liquid d1, so your agents' messages stay on your machines. With a hosted model, such as TypeSafe's Jev, the agent's last message and the thread title are sent to that service.

## Requirements

Beside needs bb 0.46 or later. It replaces bb's sidebar thread list; you can switch back in Settings at any time. It uses bb's experimental plugin APIs, so a bb update can change how it behaves.
