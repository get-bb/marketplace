Browse the project that belongs to the active BB thread without leaving the
right sidebar.

## What you get

- The current Environment or Worktree's file and folder tree.
- Git status indicators for files and folders when the workspace is a Git
  repository.
- BB's built-in preview for text, Markdown, and image files.

## How it works

The panel follows the Environment attached to the active thread. It performs
read-only, environment-scoped filesystem and Git reads and does not require an
account, API key, or external service.

The interface follows the host document or browser locale by default. English
and German are supported; unsupported or unavailable locales fall back to
English. The settings menu provides an explicit automatic, English, or German
preference. File paths, filenames, branch names, and raw Git data remain
unchanged.

## Requirements

The plugin requires a BB version compatible with the package's declared engine
range and a thread with an available Environment for the tree to appear.
