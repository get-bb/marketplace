## What you get

- A thin coloured line under each project name in the sidebar. Nothing else changes: no dots, pills or extra buttons, and double-click rename, collapsing and empty sections keep working as before.
- A **Colour** item in every project's actions menu, just above Project settings. Hover, focus or click opens a compact panel to the right of the menu.
- The same palette on the project's own settings page.
- A small "Проект добавлен" dialog after you add a project, so the new project gets its colour straight away.

## The palette

- Three swatches with the colours you used most recently. Until you have used any, they are filled from the eight preset shades.
- A "no colour" swatch that removes the underline for that project.
- An RGB picker that is always visible: a saturation and brightness field, a hue slider and R, G and B number fields. Dragging in the field saves when you release the pointer; typed values are saved with the Применить (Apply) button. Hovering never saves anything.

## How it works

Colours are stored in the plugin's own storage on the bb server, one entry per project ID, so renaming a project keeps its colour. Projects without a stored colour get one of eight preset shades derived from the project name. Changes are pushed to every open bb window.

Command line:

```sh
bb genidev-project-colors list
bb genidev-project-colors set PROJECT_ID "#28A99C"
bb genidev-project-colors set PROJECT_ID none
```

`list` prints JSON with every project, its colour and the recent colours. `set` rejects IDs of projects that no longer exist.

## Requirements

- bb 0.49 or later.
- No external services and no account.
- The underline is placed by reading the sidebar's existing markup, so a bb update that changes the sidebar may need a plugin update.
- Interface text is in Russian, except the Colour menu item.

## First step

Open the "…" menu next to a project in the sidebar, point at **Colour** and pick a swatch.
