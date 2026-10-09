## Find the right plugin

Type `#` in the composer followed by a keyword, such as `#pdf`, to search the plugins you have and the ones in BB Community. Type `#plugins` to browse everything. The same results also appear in the `@` menu, so `@pdf` works too.

Results come in two groups:

- **Installed plugins** lists the enabled, running plugins on this bb, each with its own icon.
- **Community plugins** lists compatible BB Community plugins you have not installed yet, marked "Not installed" and shown with the Plugins icon.

Search covers names, plugin IDs, full descriptions, and long-form overviews. Community results also match tags and categories, with name and description matches ranked ahead of overview mentions. Installed matches appear without waiting for the catalog.

## Point your agent at it

Select a result to add a plugin mention to your message. The mention keeps the plugin's icon, so you can tell at a glance which plugin you picked.

- Mention an installed plugin to tell your agent which one to use for the task.
- Mention a Community plugin to discuss whether it fits. Your agent knows it is not installed yet and will not try to use it.

A mention never installs, enables, or runs a plugin by itself.

## Let your agent search

Ask your agent to find a plugin for the task. It can run `bb at-plugin search "keyword" --json` and `bb at-plugin show <plugin-id> --json`, which return descriptions, overview text, and screenshot links it can show you.
