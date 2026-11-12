Keep work and personal projects in one bb without seeing both at once. Pick a space from the sidebar header and the thread list shows only that space's projects and their threads.

## What you get

- A space switcher in the sidebar header, with New thread on its own row underneath. Each space has a name, an icon and an optional tint.
- A menu with every space, a checkmark on the current one, **All projects** to leave spaces, and **Edit Spaces…**.
- Switching to a space reopens the thread you last had open there, so you pick up where you left off.
- Ctrl + Alt + 1 to 9 (⌃ ⌥ 1 to 9 on macOS) switch to the first nine spaces; bb already uses Ctrl/⌘ + 1–9 to jump between threads. The command palette also has Next space, Previous space, Show all projects and Edit Spaces.
- **Edit Spaces…** sets each space's name, icon, tint, order and projects. A project in no space shows in every space.
- Drag folders from Explorer or Finder into Edit Spaces: each folder becomes a project in the selected space, and a folder that is already a project is reused.
- Eight tints (blue, teal, green, yellow, orange, red, pink, purple) color the sidebar of the active space, so Work and Personal look different at a glance. The content area keeps your theme's colors, and the tint follows any theme in light and dark mode.
- 33 space icons in three rows (work, making and learning, life), including a rocket, briefcase, camera and airplane from the free Hugeicons set.
- `bb space list`, `bb space <name|number>`, `bb space off` and `bb space add [--space <name>] <folder>...` do the same from a terminal or an agent.

## How it works

Switching writes the Thread list plugin's hidden groups. Spaces only adds and removes its own `project:<id>` keys, so groups you hide yourself stay hidden. While a space is active the thread list is grouped by project, because project groups exist only in that mode; **All projects** puts your previous grouping back.

By default the list's **More** row is hidden while it only holds other spaces' projects. Turn on **Show other spaces' projects under More** in Edit Spaces to keep them reachable there.

## Requirements and limits

- bb 0.49 or later, with the bundled Thread list plugin enabled.
- Spaces replaces the sidebar navigation with bb's Rail plus the switcher. Choose it under Settings → Appearance → Navigation if another navigation plugin is active.
- The New thread row and the hidden More row rely on bb's sidebar markup. If a bb update changes it, New thread moves back into the header and More shows again; nothing is lost.
- bb tells plugins only a dropped folder's name, so Spaces looks the folder up on disk (git repos, then your home folder and drives, four levels deep). If two folders share a name the most recently active git repo wins; pass a path to `bb space add` to be exact.
- Choose **All projects** before you uninstall, so every project shows again.
