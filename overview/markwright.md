## What you get

- **A rich editor for every Markdown file.** `.md` and `.markdown` files open in the side panel as a formatted document, with a toolbar and a bubble over any selection for bold, italic, strikethrough, code and links.
- **A `/` menu and a `+` button for every block.** Insert headings, quotes, dividers, bulleted, numbered and check lists, tables, code blocks, images, five GitHub callouts (Note, Tip, Important, Warning, Caution) and eight Mermaid diagram starters. Type to filter: `/todo`, `/diagram`, `/warn`.
- **Eleven document templates.** An empty file offers README, meeting notes, ADR, PRD, RFC, changelog entry, bug report, runbook, PR description, incident postmortem and weekly status. Any template can also be inserted at the cursor.
- **Live Mermaid diagrams.** A `mermaid` block renders as a diagram through bb's own renderer. **Edit diagram** shows the source, and the diagram follows as you type.
- **Tables you can type into.** Tab moves between cells, Tab in the last cell adds a row, and a table toolbar adds or removes rows and columns.

## How saving works

- A save rewrites only the blocks you changed. Untouched blocks keep their exact bytes, including list markers, table padding, front matter, raw HTML and line endings, so git diffs stay small. Opening a file never writes to it.
- Autosave runs 800 ms after you stop typing, and ⌘S saves at once.
- Every write checks the file's hash first. If an agent changed the file while you had unsaved edits, autosave pauses and a banner offers **Compare** (a diff of both versions), **Use theirs** or **Keep mine**. If you have no unsaved edits, the agent's change appears in place without moving your cursor.

## What opens read-only

A file the editor can't save back exactly opens in bb's normal preview, with the reason and an **Edit source** button: footnotes, reference-style links, `$$` math, MDX, and files over 600 KB. Raw HTML is fine. It shows as source and is never executed.

## Requirements

bb 0.49 or later. The editor reads and writes files on the machine they belong to through bb's own file API. It needs no account, API key or external service, and sends nothing off the machine.

The bundled agent skill tells agents which Markdown stays editable, such as callouts, `mermaid` fences and pipe tables, and which turns rich editing off.

To make it the default for Markdown, choose **Markwright** for `md` under Settings → File openers.
