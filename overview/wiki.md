## What you get

- **Search and save tools for agents.** `wiki_search` returns each matching note with its one-line summary and a snippet. `wiki_save` writes a new note, or adds a dated update section to an existing one. Both add a link back to the thread.
- **Related notes on the first message.** The plugin searches with the first message of a thread and gives the agent up to three notes that may fit.
- **Clickable citations.** Agents cite notes as links. A click opens the note in the side panel, and a hover shows its summary and first section.
- **@ mentions.** Type `@` and pick a note under "Wiki". The agent gets the whole note as context.
- **Wiki thread panel.** It lists the notes that link to the thread, notes that may be related, and lint counts for the whole wiki.
- **Save to wiki and archive.** A button in the thread header asks the agent to save what is worth keeping, then archives the thread when the agent is done.
- **A bundled skill** that tells agents when to search, when to save and how to cite notes.

## How it works

At startup, when a thread goes idle, and before each search or save, the plugin writes an index note that lists every note, commits changed notes, and rebuilds the search index if it is out of date.

From the command line, `bb wiki lint` lists orphan notes, broken `[[links]]` and notes without a Related notes section. `bb wiki unsaved` lists recent threads that no note links to.

## Requirements

- BB 0.44 or later, on the same machine as the notes.
- A folder of Markdown notes. Set it under Settings, Installed plugins, Wiki. Only `.md` files directly in the folder count.
- Optional: git. If the folder is in a git repository, the plugin commits each change.
- Optional: [mempalace](https://github.com/bunkerlab-net/mempalace) for search. Without it the plugin uses its own word search.

Source and settings: [github.com/himynameisjonas/bb-plugin-wiki](https://github.com/himynameisjonas/bb-plugin-wiki)
