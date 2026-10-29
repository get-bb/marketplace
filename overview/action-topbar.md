# Action Topbar

Keep the thread's open Action panes in a compact topbar with a searchable launcher. Drag an Action into a pane, move an already-open pane by dragging its tab, and close panes from the topbar.

## Version 0.1.4

Native Action workspace panes are back on BB 0.46.1 with the included host patch. Edge drops split the workspace, center drops replace, and Start Terminal creates a terminal for the thread in the new pane.

Official BB 0.46.1 and 0.47.1 builds no longer expose the experimental `experimental_beginThreadActionSplitDrag` content-script API. Without the patch, the plugin opens the Action in the pane under the pointer and still supports tab reordering and pane moves.

The patch, apply/build steps, and backup instructions are in the [plugin repository](https://github.com/MateoCerquetella/bb-plugins/tree/main/plugins/action-topbar#native-action-splits-on-bb-0461) and the [v0.1.4 release](https://github.com/MateoCerquetella/bb-plugins/releases/tag/action-topbar/v0.1.4).

## Compatibility

Requires BB 0.40+. Native Action splits require a BB 0.46.1 build with the included patch; other builds use the open-in-pane fallback.

See the [plugin README](https://github.com/MateoCerquetella/bb-plugins/tree/main/plugins/action-topbar) for installation and usage.
