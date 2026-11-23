## What you get

- **Right panel over the chat.** When you open the thread's right panel, it slides in on top of the chat. The chat width changes once, after the motion ends, so text does not reflow while the panel moves. Closing plays the motion in reverse.
- **Close the panel the way you expect.** The panel's hide button shows a cross instead of the panel glyph. Press `Escape` (when focus is not in a text field and no menu or dialog is open) or click empty space in the chat to close it. Clicks on links, buttons, the prompt box, the header, menus, or a click that ends a text selection or a drag do not close it.
- **Tidy thread header.** The header buttons share one size and even spacing, and the "Open in" app button sits at the far right.
- **Pin icon.** The thread context pin button shows a pin and a crossed-out pin instead of the default glyph.
- **Message navigator.** The navigator at the right edge of the chat uses theme colors and a short fade-in for its popup.
- **Small fixes for other themes.** A send button with a label keeps its text, long thread titles in the sidebar end with an ellipsis before the status icon, and the top-right corner of the prompt box stays clear. These rules only apply when the matching elements are present.

## How it works

The plugin is a set of CSS rules plus one small click and key listener, loaded into the bb window. It changes no data and has no settings.

Because the rules target bb's own markup, a bb release can rename an element and a tweak can stop working without any error. The plugin ships a check for this:

```
bb genidev-ui-tweaks check
```

The command asks the open bb window to look for the key elements of every tweak and prints a table with one line per tweak: working, anchor missing (with the selector), or not checked (for example, the panel is closed). It exits with code 1 if any anchor is missing. The report text is in Russian.

## Requirements

- bb 0.50 or newer.
- No account, network access or external service.
- The check command needs an open bb window with the plugin loaded.

## First step

Open any thread, open the right panel, then click empty space in the chat or press `Escape` to watch it slide away. After the next bb update, run `bb genidev-ui-tweaks check` with a thread and the right panel open.
