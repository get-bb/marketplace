## What you get

- A floating new-thread composer that opens over any screen with Cmd+N (Ctrl+N on Windows and Linux).
- A preset picker beside the prompt. A preset is a provider, model, reasoning level and service tier, and you can save up to 30.
- Background creation. Cmd+Enter starts the thread without opening it and shows a toast with an Open button.
- Preset editing in the picker and in the plugin settings: rename, reorder by dragging, or delete.
- A bottom sheet in place of the floating composer on phones.

## Keys

- **Enter** creates the thread and opens it.
- **Cmd+Enter** or **Ctrl+Enter** creates it in the background.
- **Shift+Enter** adds a line.
- **Esc** closes the launcher and keeps the draft.

## For agents and scripts

`bb ultra-launcher status`, `claim`, `release`, `presets` and `restore-defaults` manage the shortcut and the presets from a terminal. A bundled skill explains each one.

## Requirements

BB 0.46 or later. The plugin takes over Cmd+N and moves BB's own New thread shortcut to Cmd+Shift+O. Turn off **Take over Ctrl/Cmd+N** in the plugin settings to give the shortcut back. Switching presets resets the environment choice, so choose the preset first. The plugin uses no external service or account.
