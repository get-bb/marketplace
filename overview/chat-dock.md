## What you get

Open a thread's right panel and the composer moves into it: the message box, the cards above it (running commands, child threads, questions) and the chips under it. The timeline keeps the full width of its column, and you can read a diff, a file or a browser tab in the panel while you write about it.

Nothing is rebuilt. BB's own composer is moved as it is, so a half-written draft, an open picker and the other plugins' parts of the composer come along, and they go back to the column when the panel closes.

## Two ways to dock

- **At the panel's bottom** (the default): a strip under whichever tab is open, in the bottom tile when the panel is split. The tab shrinks to make room, so nothing is covered, and the composer stays put while you switch tabs.
- **As a Chat tab**: switch the strip off and the composer lives in a Chat tab instead. It is in the panel while that tab is the active one in its pane, and in the column otherwise, and the tab splits and drags like any other.

The dock button in the composer's action row switches docking on and off. **Chat dock** in the thread's actions menu (⋯ in the thread header, or a sidebar row's menu) chooses between the two and holds the other options, with a check beside each one that is on. Switching moves the composer once, straight to its new place.

## Behavior

- Hiding the right panel (Ctrl+J) puts the composer back under the timeline.
- Opening another thread with the panel open docks that thread's composer.
- Split chat panes each keep their own composer.
- On a phone-width screen the composer docks at the bottom of the panel drawer. BB hides composer actions there, so use the thread menu.

## Settings

Each option is a plugin setting: docking itself, the strip or the Chat tab, the dock button and a debug log. All of them are in the thread menu and on the plugin's page in BB settings.

## Requirements

- BB 0.48 or later.
- It moves BB's own page elements, which are not a documented interface, so a future BB release may need a plugin update.
- No external service or account is used.
