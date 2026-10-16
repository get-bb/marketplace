## What you get

- A row in the quick palette for every automation, such as `Run automation: Widget sweep · Acme Widgets`. Type `run`, the automation's name, or its project's name to find it.
- Selecting a row starts the automation now, the same as when its schedule fires. The run shows on the Automations page with the others.
- Every project's automations, in every window. A paused automation keeps its row, marked `(paused)`.

## How it works

The plugin lists your automations through the `bb` CLI each time bb loads, and saves the list in the browser for the next load. So an automation you add, rename, or delete shows in the palette after you reload bb. Selecting a row runs `bb automation run`. It uses no account and no outside service.

## Requirements

bb 0.42 or later, with the bundled Automations plugin, and the `bb` CLI on the machine running the bb server. If the plugin cannot find the CLI, set its path in the plugin's settings.
