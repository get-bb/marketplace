## What you get

- One scrolling view of every changed file in the thread's workspace. Changed lines show in red and green, and unchanged regions fold away.
- A switch between **Uncommitted** changes and **All changes** since the merge base with the base branch.
- ⌘-click a symbol, or press F12, to open its definition. Do it again from there to go one level deeper.
- Press Ctrl+- to go back one level. The back button shows the current file, line, and depth.
- Open the panel from the button in the thread header, or with ⌘⇧D.

## How it works

The panel uses the Monaco editor and the VS Code multi-file diff view. Only the files on screen get an editor, so a large change set stays responsive.

Definitions come from the language server for the file's language. The server runs on the machine that holds the workspace. It starts when the panel loads, so it can index the project before your first click.

## Requirements

- TypeScript and JavaScript: Node.js with `npx`. The first use downloads `typescript-language-server`.
- Go: `gopls`. Rust: `rust-analyzer`. Python: `pyright-langserver`. C and C++: `clangd`. Swift: `sourcekit-lsp`. Each must be on your PATH.
- Files in other languages show the diff without go to definition.
- Binary files and files too large to diff are skipped.
- Tested on macOS. The plugin uses experimental BB plugin APIs.
