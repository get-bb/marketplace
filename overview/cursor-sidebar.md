This plugin fills BB's experimental thread-list slot. It replaces the built-in list until you disable it with `bb plugin disable cursor-sidebar`.

## Grouping

Pick one grouping at a time. Never stacked.

- **Projects.** Chats nest under the chat that spawned them. Standalone chats file into folders. Pinned chats gather in one block.
- **Updated.** Groups by last activity date.
- **Status.** Groups by needs input, failed, working, unread, or idle.
- **Environment.** Groups by the machine the chat ran on, including chats with none.

Chat order can follow last activity or status. Project order can be manual, or worst status then most recently used. Group order can be most recent first, or the grouping's own default.

## View menu

The view menu also toggles updated time, environment, branch, machine, and the pull request mark. Filters hide chats by status or environment. Expand All, Collapse All, and Mark All as Read act on the loaded list.

A warning mark on the menu button means a view change has not reached the server. The notice inside the menu has a Retry button.

## Mobile

Touch uses the same list. There is no hover, so gestures carry the actions.

- Tap a row to open a chat. Tap a project name to fold it.
- Swipe left to pin. Swipe right to archive. A swipe has to travel 72px to commit.
- Hold until the row lifts, then drag to move a chat or a project. Let go without moving to open the actions menu.
- Hold a project heading and pick Move up or Move down when project order is manual.

While a row is lifted, or a swipe is locked sideways, the plugin holds the list still so the gesture wins over the scroll.

## Requirements

BB 0.42 or newer, Plugin SDK 0.4.47 or newer. View settings live in the plugin's SQLite database. Uninstalling the plugin removes them and leaves native threads, pins, and folders on the host. No extra account or service is required.
