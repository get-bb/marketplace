## What you get

When a message contains a wide Markdown table, bb can let it break out of the chat column. This plugin pins each table to the column width and gives it its own horizontal scrollbar, so the rest of the message stays put.

It has no settings, no pages and no commands. Install it and tables behave differently; uninstall it and bb's default returns.

## How it works

The plugin injects one small style block into the bb page while it is enabled. The rules apply to tables inside bb's Markdown preview: they cap the table wrapper at 100% of the column, clear the side margins used for the breakout, and set `overflow-x: auto` on the inner box. The style block is removed when the plugin is disabled or unloaded.

## Requirements

- bb desktop or web app; no account, network access or other plugin needed.
- The rules match bb's own Markdown preview markup (a `data-markdown-preview` container and a table wrapper styled with `--md-table-breakout-max`). If a bb release renames these, the plugin stops having an effect until it is updated.
- The package does not declare a bb version range. It was built and checked against bb 0.50.
