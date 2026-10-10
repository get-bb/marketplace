Browse, edit, and save the files of a project, environment, or thread workspace
without leaving BB.

## What you get

- A **Finder** page in the sidebar with a workspace picker, and a **Finder**
  tab beside every thread, toggled by the folder button in the thread header.
- A file tree with a dotfile toggle, a path filter, expand/collapse all,
  refresh, new file, new folder, upload, rename, and delete. Right-click a row
  for the same actions plus copy-path.
- Search in files: reads file contents across the whole workspace or one
  folder, with match case, regexp, and whole-word toggles. Results group under
  a sticky file header and a hit opens the file at its line.
- A CodeMirror editor with syntax highlighting in your BB code theme, find in
  file, go to line, multi-cursor, and code folding.
- **Auto-save** (off by default) and a **line-wrap** toggle, both remembered
  between sessions.
- A markdown preview that renders **Mermaid** diagrams with BB's own message
  renderer, so it looks like the rest of BB.
- Copy the file's contents or its path in one click.
- **Add the file to the prompt**: it becomes an `@` mention whose contents are
  resolved when the message is sent, so the agent reads the file as it is then.
- File references BB opens from chat render in this editor instead of BB's
  read-only preview, with line targeting, find, edit, and save. Markdown keeps
  BB's preview.

## How it works

The plugin resolves a workspace to a directory and a machine, then reads and
writes through BB's host-aware file API, so a workspace on another machine
works the same way. Paths are confined to the workspace root.

Every save carries the hash the edit was based on. If an agent changed the file
while you were typing, the save stops with a conflict notice and offers Reload
or Save again rather than overwriting the agent's work.

A write from anywhere, another tab, another device, or the plugin's CLI,
refreshes every open tree over realtime.

## For agents

The bundled skill teaches an agent to resolve the workspace with `bb finder
root` before touching paths, list it with `bb finder tree`, and read a file with
`bb finder read <path>`. That matters because the workspace is not always on the
machine the agent runs on.
