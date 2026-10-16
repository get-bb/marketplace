Keep the conversations you return to in a manually ordered strip beneath BB's header, without replacing the sidebar. See the [screenshots and setup guide](https://github.com/nicolay-i/bb-plugin-tabs#readme).

## Chats within reach

- One italic preview follows the unpinned chat you open. Opening another replaces it; creating a chat shows its preview immediately. Closing a preview stays closed across reloads and windows until you reopen that chat. Background work never opens a preview.
- Double-click a preview to pin it. Drag pinned tabs across projects into one shared order. Double-click a pinned title to rename it. The context menu includes Copy link, Mark as unread, Pin/Unpin, Add/Remove favorite, Rename, and Archive.
- Favorite chats have their own **Favorites** list on **New chat**, independent of pinned and closed tabs. An optional **Tabs** list shows pinned chats in the strip's order. Both show the project and useful activity status.
- Compact home cards let you toggle pins and favorites directly. Changes save immediately, but a removed card stays in place until you leave the screen; another click restores an accidental removal.
- A **?** marker shows when BB needs an answer or approval, including in nested chats. Working, waiting-for-input, and unread states remain distinct.

## Navigation

- A branch icon distinguishes subthreads in tabs, home cards, pinned lists, history, and search. A localized tooltip provides context without extra visible text.
- The subthread counter counts distinct working, waiting-for-input, or unread descendants. Hover or click to explore direct children and recursively expand side menus. Click a title to open it as the normal preview. Archived branches are excluded; keyboard and touch expansion are supported.
- Search available BB chats by title and project name, including chats outside the last 100 visits. Combine project and title words to narrow results. An optional setting includes archived chats as disabled, struck-through results; deleted and hidden chats remain excluded. Open search by click, a 300 ms hover, or double Shift. Use arrows and Enter to navigate. History retains the last 100 visits; **More** reveals another eight.
- The plus opens BB's native composer. Hover to choose from the 15 most recently active projects; **More** reveals the next group.
- Desktop supports horizontal wheel scrolling, middle-click close, `Ctrl+Tab` / `Ctrl+Shift+Tab`, and BB Desktop `Ctrl+W` / `⌘W`. An embedded browser keeps its native close behavior. Touch layouts use horizontal swipe, 44px targets, and explicit close buttons.

## Language and presentation

Choose from 15 interface languages. **Auto** follows a supported BB page language, then the browser language, then English. Chat and project names are not translated. The settings panel follows the chosen language. Additional translations are machine-assisted first drafts.

The icon and controls follow BB theme colors; animations respect reduced motion. The strip follows the chat width beside a right panel and hides in true split, full-panel, and drawer layouts.

## State and requirements

Tabs, favorites, order, and history use plugin-owned storage and synchronize across windows. Archive or delete removes tabs, pins, and favorites but retains a disabled history record. Unarchive restores history navigation, not pins or favorites. Activity comes from BB's sidebar and, where available, public workflow status.

Requires BB 0.43 or later. No external service or account is required. Translation strings are bundled; chat content is not sent to a translation service.
