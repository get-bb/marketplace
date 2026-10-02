## What you get

A **Project Explorer** entry in the thread side panel's New tab list. It opens
a two-pane tab: the workspace file tree on the left, the file you picked on the
right.

The tree colours files the way VS Code does, from the working tree of the
thread's own environment:

- amber for modified, renamed, or copied
- green for added or untracked
- red and struck through for deleted
- purple for an unmerged conflict

A collapsed folder inherits amber when anything beneath it changed, so you can
see where an agent has been working without expanding the tree.

## How it works

Directories load one level at a time, when you expand them. Nothing walks the
repository, so a project with `node_modules` opens as quickly as an empty one,
and a folder you never open costs nothing. Listings are cached for the life of
the tab, and a collapsed folder unmounts its contents entirely.

Files open with BB's own syntax highlighting and code theme. The **Edit**
button swaps the viewer for a text editor: `Cmd+S` or `Ctrl+S` saves, `Tab`
inserts two spaces, and a dot beside the path marks unsaved work. Closing a
file with unsaved changes asks first.

Saving is compare-and-swap. The plugin sends back the SHA-256 the file had when
you opened it, so if the agent edited that file while you were typing, the save
stops and tells you instead of overwriting the agent's work.

Dotfiles such as `.claude`, `.env`, and `.github` appear in the tree. BB's own
directory listing hides them, so the plugin reads the directory itself through
a host entry that runs on the machine holding the files — which also means a
workspace on a remote host behaves the same way. `.git` stays hidden.

## Also included

A `bb project-explorer ls <path>` command lists any directory exactly as the
tree sees it, with `--json` for scripting. Agents can use it to inspect the
same workspace from a shell.

## Requirements

The thread needs an environment with a workspace path. Git colours need that
workspace to be a git repository; in a plain folder the tree still lists and
edits files, without colours.

Files over 2 MB and files containing NUL bytes are listed but not opened.
