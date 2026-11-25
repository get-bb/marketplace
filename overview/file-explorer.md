## Who it is for

People who work across BB threads and need to find a file an agent mentions, preview it, or add its path to a chat draft.

## What you get

The tree sits on the right of the BB window as a pinned rail. A searchable folder selector pins a project source, a thread workspace, or a personal root, so switching threads keeps the same tree state, expanded directories, and selection.

Files use Seti-style type icons (markdown, JSON, gitignore, `.env`, README, TypeScript, and more); folders keep only the twistie.

The rail carries two tabs — **Files** and **Search text**:

- **Files tab**: a search box above the tree. Type a file name, part of a path, or paste a path, and the list under it names the files that match. On a thread or New Thread page, Enter selects the file in the tree and opens its preview — one action, both results — and temporarily re-roots the tree when the file lives in another project.
- **Search text tab**: search the contents of files under the pinned root with options for case sensitivity, whole-word, and regular expressions. Narrow the run with comma-separated include and exclude globs, or right-click a folder and choose **Find in Folder**. Click a match to open it; replace all matches in one file or across every matching file. Replace writes each file against the hash it was read at, so a file that changed under the run is refused rather than clobbered.

Right-click a file or folder to add its absolute path to an open chat draft, open it in the system file manager, create, rename, or delete, copy a relative or absolute path, or find inside the folder. Right-click the root name for the same create, copy, and reveal actions. When several drafts are open, choose the target in the menu. A newly created file opens in the external editor.

Search and chat paths ask the same question of the same index. When a message names a path, the tree can jump to it. A bare file name works too: the search roots are indexed by name, so `AGENTS-base.md` lands on the file even when nothing in the message says which folder it is in. If the hit is in another folder, the tree re-roots there instead of reporting a miss.

Git-ignored files appear dimmed, with a tooltip saying git ignores them.

## How it works

Set **Root folder for personal threads** to a path such as `~/Documents` to add it to the selector. Hidden files and folders stay hidden unless you turn on **Show hidden files and folders**; add names under **Files or folders to hide by default** to keep them out of the tree and search.

Search roots (default `~/Documents`, one path per line) are the extra places a chat path may land; a bounded name index walks them for bare-file-name lookups.

Content search runs ripgrep at the pinned root. Include and exclude globs are root-relative: `src/**` scopes the run to that folder, while `*.ts` matches the name at any depth. Files on another paired host search there — they never cross the host bridge.

Open in Explorer is available for files on this computer. It reveals the file in the system file manager: `open -R` on macOS, `explorer /select` on Windows, `xdg-open` on Linux.

## First step

Install File Explorer, open a thread, and leave the tree open on the right. Click a file you already know. Then right-click the same file: reveal it in Explorer, or copy its relative path.

## Settings

- **Show the pinned file explorer when BB opens** — tree is visible on BB startup (default: on)
- **Confirm before deleting files and folders** — safety dialog before destructive operations (default: on)
- **Show hidden files and folders** — reveal `.git`, `node_modules`, `.claude`, and other build/ignored folders
- **Root folder for personal threads** — set a path to offer it as a pinned folder
- **Files or folders to hide by default** — extra folder names to hide in the tree and search (one per line)
- **Folders to search for paths mentioned in chat** — search roots for name-based resolution (default `~/Documents`)
