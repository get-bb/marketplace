## What you get

Tree Sidebar replaces bb's thread list with your projects organized like they are on disk. It makes the sidebar feel like the file tree browser in your IDE. Pins still move to the top, and forks and side chats do what you'd expect.

## Search

The sidebar's search box matches thread titles, project names, and the text of messages. A thread found by its messages shows the matching line under its title, with the match highlighted. Archived threads that match get their own section below the tree, laid out the same way.

## On every row

- Hover a thread for an **Archive** button. Child threads are archived with it.
- Right-click a thread to open it in a split, copy its link, mark it read or unread, pin it, archive it, or delete it.
- Hover a project for a **+** button that starts a new thread in it.
- Folding a folder is remembered on each device, and the thread you open is always shown, even inside a folded folder.
- bb's next thread, previous thread, and numbered thread shortcuts keep working.

## Settings

Find these at Settings → Installed plugins → Tree Sidebar.

- **Hide empty projects** is on by default. It keeps projects with no threads out of the tree.
- **Sort bb's projects to match the tree** is off by default. It rewrites bb's own project order, which the new-thread project picker uses, so the picker lists projects in tree order. This replaces the order you set by dragging.
- **Indent the project picker to match the tree** is off by default. It indents each project in the new-thread project picker by its depth in the tree, and widens the picker so longer names fit. This restyles part of bb's own interface. If a bb update changes that part, the indent stops and nothing else breaks.

## Requirements

bb 0.35 or later. The plugin reads bb's own projects and threads, and uses no external service or account. If bb doesn't switch to the tree on its own after you install it, choose **Tree Sidebar** at Settings → Appearance → Sidebar.
