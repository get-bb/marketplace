## What you get

- Headings, bold, italics, inline code, links, quotes, lists, and task checkboxes render as you type. The line under the cursor shows its Markdown, dimmed, so you can see what you are editing.
- Tables stay tables. Click a cell and that cell alone shows its raw Markdown in place; the rest of the table stays rendered. A table falls back to raw text only when it no longer parses as a table.
- Opening a file never rewrites it, and saving changes only the characters you typed. Agent-written tables, bare email addresses, and spacing stay exactly as they were.
- Ctrl/Cmd+click opens a link. **Source** in the header shows all the Markdown at once.

## Tables

- Tab and Shift+Tab move between cells. Tab past the last cell adds a row.
- Enter moves down a row, Shift+Enter inserts `<br>`, and Escape leaves the cell.
- A `|` you type or paste is saved as `\|`, so a cell edit cannot split its row.

## Saving

Changes save about one second after you stop typing, and Ctrl/Cmd+S saves at once. Every save checks the file's hash first. If an agent changes the file while you have no unsaved edits, its change appears in place. If you do have unsaved edits, a banner asks whether to keep yours or load the disk version, and nothing is overwritten until you choose.

## Default opener

On install, Live Markdown becomes the opener for `.md`, `.mdx`, and `.markdown` files in each browser, the first time bb loads there, for any of those types you have not already assigned. It never replaces a choice you made. Change it any time under Settings → File openers, or right-click a file link and pick Open with.

## Requirements

bb 0.43 or later. No account or external service. Files over 4 MB, or not UTF-8, open in bb's own preview.
