Shows a compact file tree of the thread workspace on the right.

## Who it is for

People who already work in a BB thread and keep hitting paths: an agent cites a file, they need that file in chat, in the preview, or on the Desktop. The next step is still in the thread, not a full file manager.

Not for people whose job is to upload, move, rename, or unzip under `$HOME`. That is a different product.

## What you get

The tree sits on the right of the thread. Above it is a search box: type a file name, part of a path, or paste a path, and the list under it names the files that match. Enter selects the file in the tree and opens it in the preview — one action, both results — and re-roots the tree when the file lives in another project.

Click a file to open BB's default preview. Right-click to add the relative path to the draft, copy a relative or absolute path, copy the file itself onto the clipboard, or reveal the item in Finder.

Search and chat paths ask the same question of the same index. When a message names a path, the tree can jump to it. A bare file name works too: the search roots are indexed by name, so `AGENTS-base.md` lands on the file even when nothing in the message says which folder it is in. If the hit is in another folder, the tree re-roots there instead of reporting a miss.

## How it works

The tree is the thread checkout for project threads. Set **Root folder for personal threads** to a path such as `~/Documents` to browse a fixed folder in general BB threads without moving or changing their workspace. Ignored folders (`node_modules`, `.git`, `dist`, …) stay hidden unless you turn them on in settings. Search roots (default `~/Documents`, one path per line) are the extra places a chat path may land.

Open in Finder and Copy File run on the machine that holds the files. Copy File puts a real file on the macOS or Windows clipboard so Finder paste drops a copy, not a string. Finder reveal uses macOS `open -R`.

## First step

Install File Tree, open a thread, and leave the tree open on the right. Click a file you already know. Then right-click the same file: copy it, paste into Finder, and confirm a real copy appeared.
