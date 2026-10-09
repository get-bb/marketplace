## Who it is for

People who work across BB threads and need to find a file an agent mentions, preview it, or add its path to a chat draft.

## What you get

The tree sits on the right of the BB window as a pinned rail. A folder selector pins a project source or thread workspace, so switching threads keeps the same tree state, expanded directories, and selection.

Files in the tree use Seti-style type icons (markdown, JSON, gitignore, `.env`, README, TypeScript, and more). Folders keep only the twistie.

The rail carries two tabs — **Files** and **Search text**:

- **Files tab**: a search box above the tree. Type a file name, part of a path, or paste a path, and the list under it names the files that match. On a thread or New Thread page, Enter selects the file in the tree and opens its preview — one action, both results — and temporarily re-roots the tree when the file lives in another project.
- **Search text tab**: search the contents of files under the pinned root, with options for case sensitivity, whole-word, and regular expressions. Click a match to open it; click the replace button on a file to replace all matches in that file. A replace-all button replaces across all matching files. Replace writes each file against the hash it was read at, so a file that changed under the run is refused rather than clobbered.

In a thread or on the New Thread page, click a file to open BB's default preview. Right-click to add its absolute path to an open chat draft, create a file or folder (type a name when prompted), rename or delete a file or folder, copy a relative or absolute path, or reveal the item in the system file manager. When several drafts are open, choose the target in the menu. Right-click the root name to create a file at the top of the tree. A newly created file opens in the external editor.

Search and chat paths ask the same question of the same index. When a message names a path, the tree can jump to it. A bare file name works too: the search roots are indexed by name, so `AGENTS-base.md` lands on the file even when nothing in the message says which folder it is in. If the hit is in another folder, the tree re-roots there instead of reporting a miss.

Git-ignored files appear dimmed in the tree with a tooltip noting they are ignored by git.

## How it works

The folder selector lists project sources and the current thread workspace. Set **Root folder for personal threads** to a path such as `~/Documents` to add it to the selector. Hidden and ignored folders (`.claude`, `node_modules`, `.git`, and more) stay hidden unless you turn them on in settings. Search roots (default `~/Documents`, one path per line) are the extra places a chat path may land; the name index walks these roots with a bounded BFS to answer bare-file-name lookups.

Content search runs ripgrep at the pinned root. Files on another paired host search there — they never cross the host bridge.

Open in Explorer is available for files on this computer. It reveals the file in the system file manager: `open -R` on macOS, `explorer /select` on Windows, `xdg-open` on Linux.

## First step

Install File Explorer, open a thread, and leave the tree open on the right. Click a file you already know. Then right-click the same file: reveal it in Explorer.

## Settings

- **Show the pinned file explorer when BB opens** — tree is visible on BB startup (default: on)
- **Confirm before deleting files and folders** — safety dialog before destructive operations (default: on)
- **Show hidden files and folders** — reveal `.git`, `node_modules`, `.claude`, and other build/ignored folders
- **Root folder for personal threads** — set a path to offer it as a pinned folder
- **Files or folders to hide by default** — extra folder names to hide in the tree and search (one per line)
- **Folders to search for paths mentioned in chat** — search roots for name-based resolution (default `~/Documents`)