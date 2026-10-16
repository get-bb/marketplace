# Server Switcher

See which bb server you are on at a glance, and jump to another server on your
bb account with one click.

## What you get

- **Current server at a glance.** A strip above the sidebar footer, open by
  default, shows the server's name, its `getbb.app` address, your GitHub
  avatar, and whether it is online. Opening another plugin's footer panel takes
  its place; click your avatar in the footer to bring it back.
- **One-click switching.** Click the strip to list the other servers on your bb
  account. Offline servers are greyed out. In a browser the tab opens the
  server you pick; in the bb desktop app the switch goes through the app's own
  server menu.
- **Colored rings to tell servers apart.** Every server starts with its own
  two-color gradient ring. Click any avatar to pick a preset or custom color,
  click the bar to make a two-color gradient, remove the ring, or reset it.
- **The same controls from the CLI.**
  `bb server-switcher ring list | set <server> <color> [<color>] | clear <server> | reset <server>`.

## Requirements

- bb 0.46 or newer, signed in to a bb account (`bb account login`), with the
  bundled bb connect plugin enabled. The server list and avatar come from your
  getbb.app account.
- Rings are saved on the server you are viewing, so each server keeps its own
  choices.
- In the bb mobile app the list is read-only.
