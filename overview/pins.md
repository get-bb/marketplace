Pin any message in a chat, Telegram style. Pinned messages show in a bar at
the top of the thread, and every pin from every thread is in a Pins tab of the
right panel.

## What you get

- A **Pin** button on every message. Click it again to unpin. Select text in
  an assistant reply first and the pin keeps just that selection.
- A bar under the thread header with one pin at a time, a counter such as
  `2/5`, arrows to move between pins, and a button to unpin. Click the text to
  jump to the message.
- A **Pins** tab with pins from all threads, newest first, with search and a
  "This thread" filter.
- A **Pins** entry in the sidebar navigation: a full page with every pin
  grouped by thread, search, collapsible groups, jump and remove, and a badge
  with the total pin count.
- A **Pins: Show pinned messages** command in the command palette.

## How it works

Pins live in this plugin's own storage on the BB server, with a copy of the
text, so a pin stays readable after its thread is deleted. Nothing leaves the
machine, and the plugin needs no account or API key.
