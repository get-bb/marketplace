## What you get

- Archive a thread and it moves into your Archived section right away. A parent
  archived with its children takes the children along, each one moved.
- Unarchive it and it goes back to the section it came from. A thread that had
  no section leaves the Archived section.
- Threads archived before you installed the plugin, or while it was turned off,
  are moved in when the plugin loads.
- A `bb archive-section` command shows the matched section and moves any
  stragglers on demand.

## How it works

The plugin listens for BB's archive and unarchive events on the server, so it
works from the sidebar, the thread menu, the CLI, and agents alike. It picks the
section by name and ignores emoji, spacing, and case, so "Archived" finds a
section called "🗑️ Archived". If no section matches, it creates one the first
time you archive a thread.

## Settings

- **Archive section name**: which section receives archived threads. Default
  "Archived".
- **Restore section on unarchive**: turn off to leave unarchived threads in the
  Archived section.

## Requirements

Nothing beyond BB. The plugin needs no account or external service, and it
stores only each archived thread's previous section, on your BB server.
