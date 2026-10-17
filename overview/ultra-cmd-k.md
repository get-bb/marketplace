## What you get

- One palette for threads, projects, themes, light and dark mode, the favicon color, every BB command, plugins, skills and the `bb` CLI.
- Thread actions on the → key: open in a split, send a message, stop, pin, mark read or unread, rename, fork, compact, archive, copy the ID and delete.
- A live theme preview. Move the highlight to try a theme on the whole app. Esc puts yours back, and Enter keeps the new one.
- BB's own commands with their current shortcuts. Rows follow your changes in Settings, Keyboard.
- A `$` mode that runs any `bb` command on your primary host and shows the output inline.
- Prefixes that narrow the list: `>` commands, `@` threads, `#` projects, `/` skills, `$` bb and `?` shortcuts.

## Keys

- **Cmd+K** or **Ctrl+K** opens and closes the palette.
- **Enter** runs the highlighted row, and **Cmd+Enter** runs its second action, such as open in a split.
- **→** or **Tab** opens the row's page.
- **Esc** clears the query, then goes back, then closes.

## For agents and scripts

`bb ultra-cmd-k status`, `claim`, `release`, `themes`, `theme <id>` and `run <args>` work from a terminal. A bundled skill explains each one.

## Requirements

BB 0.46 or later. The plugin takes over Cmd+K and moves BB's quick palette to Cmd+Shift+P. Turn off **Take over Ctrl/Cmd+K** in the plugin settings, or run `bb ultra-cmd-k release`, to give the shortcut back. Do that before you disable or uninstall the plugin. Commands in `$` mode run the `bb` executable directly, with no shell, and keep the first 64 KB of output. The plugin uses no external service or account.
