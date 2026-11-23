## What you get

One less button in the Browser tab toolbar. The three-dot menu (the button labelled "Browser menu") is hidden while the plugin is enabled.

The plugin does one thing only. It has no settings, no pages and no commands.

## How it works

The plugin ships a single CSS rule that sets `display: none` on `button[aria-label="Browser menu"]`. Nothing is removed from the page and nothing is scripted. Disable or uninstall the plugin and the button comes back.

## Things to know

- The menu is hidden, not replaced. Whatever actions it holds are not reachable from the toolbar while the plugin is on.
- The rule relies on the button's accessible label. If a bb release renames the label, the button reappears until the plugin is updated.
- Requires bb 0.49 or later.
