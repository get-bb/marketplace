## What you get

- **Cortado** follows bb's Light, Dark or System setting.
- **Cortado Dark** keeps the dark palette in both modes.
- **Cortado Light** keeps the light palette in both modes.

The grays carry no tint, so the warm colors do the work. The accent is amber and warnings are orange. In code, orange keywords and gold function names sit beside teal types, green strings and violet numbers. Every palette recolors the app, the syntax colors in chat, diffs and file previews, and the 16 terminal colors.

## Depth

In dark mode the sidebar, icon rail, side panels and code sit one step above the chat, the way macOS raises its sidebars. Menus sit one step higher. In light mode the sidebar is one step grayer than the white chat, and menus are white with a soft shadow.

## Contrast

Body text is 15.5:1 on the dark chat and 17.2:1 on the light one. A check that ships with the plugin tests 26 pairs in each mode against minimum contrast floors, most of them from WCAG, including secondary text, warnings, errors, code comments and input borders.

## How to use it

Choose a palette in **Settings → Appearance → Palette**, or run `bb theme set plugin:cortado:cortado`. Use `cortado-dark` or `cortado-light` in place of the last `cortado` for the fixed palettes.

Code renders in Fira Code and the terminal in FiraCode Nerd Font Mono. Install both, or bb falls back to your system's monospace font.

## Requirements

bb 0.48 or later. The plugin adds CSS and color files only. It runs nothing in the background and uses no account or external service.

## Source

[github.com/vburojevic/bb-plugin-cortado](https://github.com/vburojevic/bb-plugin-cortado), MIT license.
