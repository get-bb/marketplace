Threadspace turns the BB sidebar into a Notion-style list of projects and threads.

## What you get

- **Projects with an emoji and a colour.** The colour fills the whole project row, using Notion's background palette in light and dark themes. Pick icon and colour in one window from the project's `···` menu.
- **Pinned threads stay in their project.** Pin a thread and it moves to the top of its own project with a pushpin, instead of into a shared favourites list.
- **Waiting for you.** Threads that need your answer are collected above the projects, with the project name and a count. Answer one and it leaves the section.
- **One status column.** A synchronised spinner for running agents, a question bubble for input, a triangle for errors, and a dot for unread results. Collapsed projects and parent threads show a compact count, and nothing when idle.
- **Instant selection.** The thread you press highlights at once, while BB is still loading it.
- **Parent disclosure.** Hover a parent thread and the provider icon becomes a chevron in a small rounded box, the same nested-page control Notion uses.
- **Keyboard and mouse.** Arrow keys move and fold rows. Drag projects to reorder them; the order syncs between windows.

- **Hidden sidebar on hover (experimental).** Turn it on in settings or with `⌘⇧S`: the sidebar stays collapsed and slides in when the pointer reaches the left edge.

## Setup

After installing, choose Threadspace as the thread list:

```sh
bb settings ui set sidebar.threadListProvider threadspace/notion-sidebar
```

Return to the built-in list with `thread-list/thread-list`.

The panel follows the BB theme and interface language (English or Russian). Archive, rename, split and the thread menu use BB's native actions.
