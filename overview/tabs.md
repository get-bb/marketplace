Return to important conversations without digging through the sidebar. See the [setup guide](https://github.com/nicolay-i/bb-plugin-tabs#readme).

## Tabs and workspaces

Keep manually ordered pins, one italic preview, and independent favorites. Optional Tabs and Favorites cards appear on New chat. Favorite chats survive closing their tabs; removed cards support undo during that visit.

Work, Home, Other, and custom workspaces have separate tabs and favorites. The native thread-header selector remains available with the strip hidden. Switching restores this window's last active tab, or opens New chat for an empty set. Create, rename, or remove sets without deleting chats. Disabling workspaces preserves them.

Restore explicit closes with `Ctrl+Shift+T` / `⌘⇧T` when BB receives the shortcut. Up to 100 window-local undo records survive reload; unavailable chats are skipped and failures remain retryable.

## Navigation and activity

Search chat titles and project names, including conversations beyond the last 100 visits. Pins from the current workspace appear first; other-workspace pins remain accessible below without duplicates. A fixed plus opens BB's native composer and prioritizes this workspace's projects in its menu.

Working, unread, and waiting-for-input signals remain distinct. A grey dot shows sidechat-only work. Branch markers and nested menus help explore subthreads. Desktop supports manual drag ordering and keyboard navigation; touch uses swipe and 44px targets. Palette commands (`⌘⇧P`) select tabs by number, pin, favorite, switch workspaces, and rename; defaults such as `Ctrl+Alt+1…9` / `⌘⌥1…9` are rebindable in Settings → Keyboard and work in any keyboard layout.

## Appearance preview

Settings have General and Appearance tabs. Try a six-color palette, project aliases and inherited colors, or override an individual tab's color. A searchable project manager supports autocomplete, editing, and confirmed removal from the appearance list only. Native projects, chat titles, and memberships stay unchanged. Appearance is shared across workspaces.

## Language and requirements

English is the source language. Choose among 15 languages inside Chat Tabs settings, with all language names in one alphabetical list. Auto follows BB's page language, then the browser, then English. It does not change BB's own language or translate user-authored names. Additional translations are machine-assisted drafts.

Follows BB themes and reduced-motion preferences. Workspace data uses plugin-owned SQLite; history stays separate. Requires BB 0.43 or later, with no external service or account.
