## What you get

Every chrome surface — sidebar, main pane, composer, popovers, dialogs, and cards — turns into a translucent frosted sheet over a soft mesh wallpaper. Switch between light and dark in Settings → Appearance, or with `bb theme set plugin:theme-glass:glass`.

## How it works

Material values are tokens tuned per mode: surface tint and alpha, blur strength, and the wallpaper itself. Separation comes from tint alone — no surface draws a border or shadow, so the window reads as one continuous glass pane instead of stacked panels. The composer keeps a high fill and a strong blur, so message text scrolling behind it stays a soft wash and never overlaps your input.

## Legibility

Body text keeps a contrast ratio above 4.5:1 against the worst wallpaper stop in each mode. Content borders stay: markdown blockquotes, code blocks, and table cells still draw their lines.

## Requirements

Needs a browser with `backdrop-filter` (Chrome 76+, Safari 9+, Firefox 103+). Without it, or with reduced transparency enabled, the theme falls back to a flat solid palette. Runs in the browser and the desktop app.

## Links

- Repository: https://github.com/rayzalzero/bb-plugin-theme-glass