Chat Tabs puts the current conversation and pinned chats within reach in BB,
without replacing the sidebar or changing BB core. See the [screenshots and
setup guide](https://github.com/nicolay-i/bb-plugin-tabs#readme).

## What you get

- A single unpinned preview behaves like a VS Code preview tab: a newly current
  or more recently active chat replaces it, and italic text communicates its
  temporary state. Work in a nested workflow folds up to the root conversation,
  so the visible parent tab receives the working marker and previews do not
  jump to technical child chats.
- Double-click a preview to pin it. Double-click a pinned tab title to rename
  it inline, with Escape cancelling the change. A tab context menu sized like
  BB's native sidebar actions provides Copy link, Mark as unread, Pin/Unpin,
  modal Rename, and Archive. Archive uses the BB host action and removes the
  plugin tab immediately.
- Pinned tabs form one manually ordered horizontal sequence across projects.
  Desktop drag and drop shows one highlighted slot and edge autoscroll; preview
  tabs never participate. Hover text gives the complete project and chat titles
  and explains primary click behavior. Unread state has its own dot, independent
  of working activity.
- The **New chat** composer has an immediately visible pinned-chat list. It
  uses the same global order: title on the first line, project on the left of
  the second, and only useful **Working** and/or **Unread** status on the right.
  Calm chats have no filler status. Preview does not enter this list, and the
  `showPinnedTabsList` setting hides it without changing pins.
- The desktop strip supports horizontal mouse-wheel scrolling, a theme-aware
  top scrollbar only when necessary, middle-click close, `Ctrl+Tab` /
  `Ctrl+Shift+Tab`, and Desktop `Ctrl+W` / `⌘W`. When the embedded BrowserView
  has focus, the native browser tab close keeps priority. Compact and touch
  layouts preserve native horizontal swipe, 44×44 targets, and explicit Close
  actions instead of HTML drag and drop.
- A borderless plus directly after the last tab opens BB's native composer.
  Hovering for 300 ms offers the 15 projects with the newest chat activity;
  **More** reveals subsequent groups of 15 on click or a 300 ms hover. Picking
  a project preselects it. Both menus animate, with reduced-motion support.
- The list icon opens the same Radix dropdown by click, after 300 ms of
  hover, or with a double Shift press. Type to search available chats by title
  (including unloaded history pages), choose with the arrow keys and open with
  Enter. Manually ordered **Pinned** chats precede **History** of up to 100
  visits. Eight history records render at a time; **More** loads the next page
  on click, tap, keyboard selection or after 300 ms of hover. Section visibility
  settings do not delete pins or history.
- Lifecycle data comes from public archive/delete/unarchive events and bounded
  `bb.sdk.threads.get()` reconciliation, not from sidebar omission. Archive or
  delete removes a chat from tabs, pins, and the home list while preserving a
  disabled Archived or Deleted tombstone in history. Unarchiving re-enables it
  but deliberately does not restore its old pin or preview. Transient and
  permission errors never hide a chat as deleted.
- Tabs and history use plugin-owned KV keys and realtime events. Realtime and
  live sidebar state are the primary source of activity; durable workflow
  status is a visibility-aware, rate-limited fallback through the built-in
  `workflows` public RPC. Client and server coalesce equivalent requests.
- The scoped CSS hybrid operates in a single main pane. It follows the main
  chat width around a right panel, but hides in true split, full-panel, and
  drawer states. All presentation uses BB theme tokens (`background`,
  `foreground`, `muted`, `border`, `popover`, `primary`, and `ring`) with
  `color-mix(in oklch)`.
