## What you get

- **One level above your projects.** The sidebar reads folder, then project,
  then that project's threads. BB's own project and thread rows do not change.
- **Fold a whole group at once.** Click a folder header to hide or show every
  project in it. A folded folder shows how many projects it holds, and a dot
  when one of their threads needs you.
- **Drag to file.** Grab a project by its name, the same drag BB uses to
  reorder projects, and drop it on a folder. A line marks where it will land.
  Drop it above the first folder to take it out again. On a touch screen,
  press and hold first.
- **Your current thread stays visible.** Opening a thread whose project sits
  in a folded folder opens that folder.
- **New folder** sits at the end of the list. Type a name and press Enter.
  Each folder's menu renames, moves, or deletes it. Deleting a folder never
  deletes a project or a thread.

## How it works

The plugin does not replace BB's thread list. It adds folder headers to BB's
own list and sorts the projects under them. A thread-list plugin that renders
BB's list keeps working beside it.

Folders are stored on your BB server, so every client shows the same folders.
Which folders are folded is saved on each client, so a work laptop can keep
Personal folded while a phone keeps Work folded.

Agents can file projects with the `bb sidebar-folders` command:

```sh
bb sidebar-folders list
bb sidebar-folders create Work
bb sidebar-folders assign <project-id> <folder-id>
```

## Limits

- The plugin finds projects through BB's sidebar markup. If a BB update
  changes that markup, the folders stop showing and BB's plain list shows
  instead. The sidebar itself keeps working.
- Only BB's by-project sidebar layout is supported.
- Dragging a project also reorders it, because the drag is BB's own. Inside a
  folder, projects keep BB's order.
- Filing is a pointer gesture. From the keyboard, use
  `bb sidebar-folders assign`.
