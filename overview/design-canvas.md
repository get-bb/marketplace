## Credit

This plugin is the work of [961853266hyt](https://github.com/961853266hyt). It is a port of their [Design canvas plugin for paseo](https://paseo.sh/plugins/961853266hyt/design-canvas), version 0.4.0, from [961853266hyt/paseo-plugins](https://github.com/961853266hyt/paseo-plugins). The idea, the interaction design and nearly all of the code are theirs: the canvas, the in-frame runtime, comments, tweaks, the HTML patching, zip import and export, and the agent tools. The bb port adds a host layer for bb, artboard and multi-element selection, and copy as image. If you like it, star their repository and try the original in [paseo](https://paseo.sh).

## What you get

- **A Design tab** beside any thread, and a **Design home** page that starts a new design in a fresh thread and lists recent designs from every project.
- **Artboards side by side.** Each artboard is a self-contained HTML page at a real device width. Pan, zoom, fit, and show a layout grid.
- **Direct edits.** Drag elements the agent named, nudge them with the arrow keys, drag whole artboards, and fix text in place with a double click. Undo and redo cover every edit.
- **Comments that go back together.** Point at an element and comment; pins wait until you press Send to the agent, which sends them in one message. The agent resolves each comment with a line on what it changed.
- **Tweaks.** Controls the agent declares (colors, ranges, toggles, selects) drive CSS variables, so every artboard follows as you drag.
- **Copy as image.** Shift-click to select artboards and components across artboards, then right-click to copy them as one PNG at 2x. The toolbar copies the whole canvas.

## How it works

Designs are plain files under `design/` in the workspace: a `design.json` manifest, one HTML file per artboard, and the comments and tweak values you set. Agents get tools to create, read and revise designs and to resolve comments, plus a `/canvas` skill. A design made with the paseo plugin opens as it is.

## Requirements

- bb 0.49 or later.
- The agent tools and file access work for workspaces on the machine bb runs on.
- Each artboard runs in a sandboxed frame that cannot load anything from the network, so fonts and images must live in the workspace. Open only designs you trust.
- On a plain-http address the browser has no image clipboard; there Copy as image opens a preview, and right-click, Copy Image puts the PNG on the clipboard.
