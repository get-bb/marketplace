# Action Topbar

Keep the thread's open Action panes in a compact topbar with a searchable launcher. Drag supported Actions into a pane zone, move an already-open pane by dragging its tab, and close panes from the topbar.

## Version 0.1.1

Tabs remain stable while the conversation and pane contents update. Open Action tabs use BB's native pane drag instead of relaunching a right-panel tab. The launcher shows a visible status when drag support or an Action is unavailable.

## Compatibility

Action dragging depends on BB's experimental `experimental_beginThreadActionSplitDrag` content-script API and matching Action pane rendering support. A BB or SDK version number alone does not guarantee that support.

Stock BB 0.44.0 does not expose the required API. The [v0.1.1 release](https://github.com/MateoCerquetella/bb-plugins/releases/tag/action-topbar/v0.1.1) includes a matching core patch for the exact BB 0.44.0 source revision. That patch must be applied and the frontend rebuilt to enable Action pane dragging on that release. It is a local core modification that a later BB update can replace.

See the [plugin README](https://github.com/MateoCerquetella/bb-plugins/tree/main/plugins/action-topbar) for installation and the experimental compatibility warning.
