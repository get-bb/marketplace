A long thread list makes it hard to see what you are doing today. Focus Sidebar keeps the current few hours in front of you and puts the rest one tab away, without archiving or deleting anything on its own.

## What you get

- **Focus tab** with the threads that had activity in the last 8 hours. Change the window to 2, 4, 6, 12 or 24 hours from the list header.
- Threads that are **running, waiting for your answer, have a queued message, or are pinned** stay in Focus however old they are, so nothing that needs you drops out of sight.
- **Archive tab** with every older thread, grouped by day (Today, Yesterday, the weekday, then the date) and sorted newest first. A blue dot on the tab tells you an unread thread is in there.
- **Closed** switch in Archive that also lists the threads you closed, with a button to reopen each one.
- **Search** at the top of the list. Titles, project names and branches match as you type; matches inside message text follow, with the matched words highlighted.
- **Close button** on every row (on hover, or always on touch screens) and in the thread header. Closing is bb's own archive, with its Undo toast.
- Child threads fold under their parent, and right-click or long-press opens bb's full thread menu.

## How it works

Threads move between Focus and Archive by their latest activity only. The plugin never archives a thread for you, so worktrees, terminals and running agents are left alone until you press close.

The focus window and the Closed switch are stored on your bb server, so the desktop app, a laptop and the phone show the same list. You can also set them from a terminal with `bb focus-sidebar hours 6` or `bb focus-sidebar closed on`.

## Switching back

bb picks Focus Sidebar as the thread list when you install it. To return to bb's own list, choose it under Settings → Appearance → Sidebar, or disable the plugin.
