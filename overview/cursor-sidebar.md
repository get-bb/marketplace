## What it does

Cursor Sidebar fills BB's experimental thread-list slot and replaces the built-in list. Chats nest under the chat that spawned them, pinned chats gather in one block, and standalone chats file into folders. Native projects, pins and folders stay on the host; only the view settings live in the plugin's own SQLite database, so uninstalling it removes the settings and leaves your threads alone.

## Grouping

Pick one grouping at a time, never stacked.

- **Projects** nests each chat under its project.
- **Updated** groups chats by last activity: Today, Yesterday, Last 7 days, Last 30 days, Older.
- **Status** groups by the strongest status in the group, in a fixed order: Needs your input, Failed, Unread, Working, Idle.
- **Environment** groups by the machine the chat ran on, including chats with none.
- **None** draws one flat list with no section headings. Pinned chats and child trees keep their own headings.

## Project icons

Each project can wear a glyph, an emoji, a one or two letter monogram or an uploaded PNG image. Open the picker from a project heading's Actions menu, from a chat row's right-click menu, or from the project switcher while one project is picked. The dialog has a searchable glyph grid, an emoji grid, a monogram field, an 18-colour palette, a live preview and an image upload that keeps PNG transparency. Rows show the project icon outside Projects grouping, and the Show menu turns that off.

The `bb cursor-sidebar icon` command sets, reads and clears a project icon from a shell. A chat can set its own project's icon; other chats can name the project with `--project`.

## View controls

The toolbar holds the project switcher on the left and the view menu on the right. The switcher reads All projects, one project's name, or a count, and offers every project plus New project. Picking one project narrows every grouping and drops that project's heading under Projects grouping.

The view menu sets the grouping, chat order, project order and group order. It also sets how many inactive chats a section previews: 5, 10, 20, 50 or All, with Show more for the next page. The Show section toggles the updated time, environment, branch, machine, pull request mark and project icons on rows. Filters cover status, age and environment. Expand All, Collapse All and Mark All as Read act on the loaded list.

A warning mark on the menu button means a view change has not reached the server. The notice inside the menu has a Retry button.

## Row details

A row can show its project icon, a status glyph and metadata. When a chat has child chats that are working, the age at the end of the row becomes a small accent pill with their count. The pill disappears when nothing below it is running.

## Compact navigation

The plugin also registers `cursor-sidebar/compact`, an optional navigation surface. It replaces the navigation rows with a header: back, forward and New thread on the left, and a menu of every navigation destination on the right. BB's own back and forward buttons are hidden while it is active, and the header drops its own buttons when the sidebar is too narrow. Choose Compact under Settings → Appearance.

## Mobile

Touch uses the same list with gestures instead of hover. Tap a row to open it and tap a project name to fold it. Swipe left to pin and right to archive; a swipe has to travel 72px. Hold until a row lifts to drag it, or let go without moving to open its actions menu. Hold a project heading and pick Move up or Move down when project order is Manual.

## Requirements

BB 0.48.1 or newer, with plugin SDK 0.6.104 or newer. No account or external service is needed.
