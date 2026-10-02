## Who it is for

People who work across BB threads and need to find a file an agent mentions, preview it, or add its path to a chat draft.

## What you get

Files in the tree and in search use Seti-style type icons (markdown, JSON, gitignore, `.env`, README, …). Folders keep only the twistie.

The tree sits on the right of the BB window. A folder selector pins a project source or thread workspace, so switching threads keeps the same tree state. Above the tree is a search box: type a file name, part of a path, or paste a path, and the list under it names the files that match. On a thread or New Thread page, Enter selects the file in the tree and opens its preview — one action, both results — and temporarily re-roots the tree when the file lives in another project.

In a thread or on the New Thread page, click a file to open BB's default preview. Right-click to add its absolute path to an open chat draft, create a blank `.md` in that folder (or the file's parent), delete a file, copy a relative or absolute path, copy the file itself onto the clipboard, or reveal the item in Finder. When several drafts are open, choose the target in the menu. Right-click the root name to create the markdown file at the top of the tree. A newly created `.md` opens in the external editor.

Search and chat paths ask the same question of the same index. When a message names a path, the tree can jump to it. A bare file name works too: the search roots are indexed by name, so `AGENTS-base.md` lands on the file even when nothing in the message says which folder it is in. If the hit is in another folder, the tree re-roots there instead of reporting a miss.

## How it works

The folder selector lists project sources and the current thread workspace. Set **Root folder for personal threads** to a path such as `~/Documents` to add it to the selector. Hidden and ignored folders (`.claude`, `node_modules`, `.git`, …) stay hidden unless you turn them on in settings. Search roots (default `~/Documents`, one path per line) are the extra places a chat path may land.

Open in Finder and Copy File are available for files on this computer. Copy File puts a real file on the macOS or Windows clipboard so Finder paste drops a copy, not a string. Finder reveal uses macOS `open -R`.

## First step

Install File Tree, open a thread, and leave the tree open on the right. Click a file you already know. Then right-click the same file: copy it, paste into Finder, and confirm a real copy appeared.
