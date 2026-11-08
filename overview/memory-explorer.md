## What you get

- A **Memory** page in the sidebar listing every global and project memory in BB's Memory plugin, each type with its own icon and colour.
- **Table**: sort by any column, filter by type, and search names, aliases, email addresses, Slack ids and summaries.
- **Drawer**: click a row or a graph node to read the memory. Follow a `[[link]]` to the memory it names, and see what links back to it, a small zoomable graph of its neighbours and, for an entity, the open threads whose title names it.
- **Graph**: every memory and link on one canvas. Zoom, pan, and drag a node to pin it. Relations are arrows labelled with their type, such as `member of` or `led to`, so you see how memories relate, not only that they do. Unconnected entities and broken links are listed below.
- **Preferences**: a preference tagged `unconfirmed` gets Confirm and Discard buttons.
- **Notes**: keep your own Notes on an entity. They are saved as the entity memory's `## Notes` section, so agents can read them.

## Links and relations

Links are written `[[memory-name]]` or `[[memory-name|label]]` in any memory. A `## Relations` section of lines like `- member of [[team.core]]` or `- led to [[procedure.key-rotation]]` says how the memory relates to the one it names. Every memory can have one: a person is a member of a team, an episode led to a procedure, the procedure is based on that episode.

## Entities

A memory named `<type>.<slug>`, of kind `reference` and tagged `entity` and its type, is shown as an entity. The types are person, company, team, system, integration, meeting, initiative and other. Front matter at the top of its text gives the name, aliases and links. Every other memory is shown by its kind, such as preference, decision, procedure, fact or episode.

## Settings

**Digest command** runs a program or script after you confirm or discard a preference, for example one that rebuilds a digest of your preferences. It is empty by default, so nothing runs.

## Requirements

BB 0.48 or later, and BB's own Memory plugin, which ships with BB but is not installed by default: install **Memory** from the plugin store first. Memory Explorer stores nothing of its own: it reads and writes memories through the Memory plugin. The page does not watch memory for changes: press **Refresh** to read it again.

Source and format details: https://github.com/d-asensio/bb-plugin-memory-explorer
