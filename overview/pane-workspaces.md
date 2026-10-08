## Switch whole arrangements

Keep a default layout for each project and additional layouts anchored to individual threads. The built-in Threads section has its own workspace too. Use sidebar grid buttons, the searchable picker, the Workspaces page or command palette; project digit shortcuts stay tied to sidebar order.

Create a thread workspace from its anchor and up to five direct children. Its persistent icon restores the whole arrangement. Plain member clicks switch to their containing thread workspace by default; a setting turns off that within-project behavior. Cross-project clicks still switch workspaces. Reset a thread workspace to its group or forget its layout without deleting the thread.

## Protect saved layouts

Layouts remain in browser-local storage, with a previous revision for recovery. If live panes differ from a saved arrangement, restore the saved panes or keep the current layout. Active selection is per window. Stock bb reloads on a switch; hosts with the experimental layout API can switch without reloading.

## Requirements and identity

Requires bb 0.42+. Uses internal host interfaces, so bb updates may require plugin updates. The thread index covers up to 400 unarchived threads. No external account or service is required. Compact UI is optional for shared accent controls.

The plugin ID is pane-workspaces; the display name is Workspaces. Existing browser-local workspaces.v1/v2 storage is retained for migration and reuse. Disable the previous workspaces plugin before installing this renamed package; do not run both copies together.
