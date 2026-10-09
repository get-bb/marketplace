Keep the conversations you return to in a manually ordered strip beneath BB's header. The sidebar stays available. See the [screenshots and setup guide](https://github.com/nicolay-i/bb-plugin-tabs#readme).

## Chats within reach

- One italic preview follows the unpinned chat you open. Opening another unpinned chat replaces it; creating a new chat shows its preview immediately. Closing a preview stays closed across reloads and other windows until you open that chat again. Background work never opens a preview.
- Double-click a preview to pin it. Drag pinned tabs across projects into one shared order, with an insertion marker and edge autoscroll. Double-click a pinned title to rename it inline. The context menu provides Copy link, Mark as unread, Pin/Unpin, Rename, and Archive.
- A compact **?** marker tells you when BB is waiting for an answer or approval instead of showing an endless working dot. Hover for an explanation. Pending input in a nested chat also marks its parent tab. Working and unread states remain distinct; lists and home cards show the full **Needs input** status.
- An optional pinned-chat list appears below the **New chat** composer. It shares the strip's ordering and shows the project and useful status below each title. Calm chats have no filler status.

## Navigation

- Search up to 100 recently visited chats by title from the list menu. Open it by click, a 300 ms hover, or a double Shift press. Arrow keys select a result and Enter opens it. Pinned chats precede history; **More** reveals another eight history entries.
- The plus after the last tab opens BB's native new-chat composer. Hover for 300 ms to choose from the 15 most recently active projects; **More** reveals the next group. Selecting a project preselects it in the composer.
- Desktop supports horizontal wheel scrolling, a conditional top scrollbar, middle-click close, `Ctrl+Tab` / `Ctrl+Shift+Tab`, and BB Desktop `Ctrl+W` / `⌘W`. An embedded browser with focus keeps its native close behavior. Compact and touch layouts use horizontal swipe, 44×44 targets, and explicit close buttons.

## Language and presentation

Choose from 15 interface languages: English, Russian, Spanish, Brazilian Portuguese, French, German, Simplified Chinese, Hindi, Arabic, Japanese, Indonesian, Turkish, Korean, Vietnamese, and Italian. **Auto** follows a supported BB page language, then the browser language, then English. Chat titles and project names are not translated. Static plugin-setting labels remain in English. Additional translations are machine-assisted first drafts.

The plugin includes a theme-aware SVG icon. Controls and status markers follow BB theme colors; animations respect reduced-motion preferences. The strip follows the main chat width around a right panel and hides in true split, full-panel, and drawer layouts.

## State and requirements

Tabs, order, and history live in plugin-owned storage and synchronize across windows. Archive or delete removes a chat from tabs and pins while retaining a disabled history record. Unarchiving re-enables history navigation without restoring the old pin or preview. Live sidebar state supplies activity; durable workflow status uses the built-in workflows plugin's public RPC as a bounded fallback.

Requires BB 0.43 or later. No external service or account is required, and no chat content is sent for runtime translation: language strings are bundled with the plugin.
