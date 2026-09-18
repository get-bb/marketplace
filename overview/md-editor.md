## What you get

Markdown PRO opens every `.md`, `.markdown` and `.mdx` file in BB as a formatted document you edit in place, from chat links, the file picker, Tasks and `bb thread open`.

- **Style toolbar** — bold, italic, strikethrough, highlight, inline code, headings, links, bulleted, numbered and task lists, quotes, code blocks and tables, plus an Insert menu and a Contents menu built from your headings.
- **Agent Markdown that survives saving** — GitHub callouts (`> [!NOTE]`, `> [!WARNING]`, collapsible `[!TIP]-`), `<details>` blocks, footnotes, `<kbd>`, `<sub>`, `<sup>`, `==highlight==`, emoji shortcodes, raw HTML and HTML comments. Opening a file never rewrites it, and an edit changes only the lines you touched.
- **Mermaid diagrams** — rendered in place. Right-click a flowchart block to rename it, add a block or a yes/no branch after it, change its shape or delete it; the change is written back into the diagram source. Templates for sequence, Gantt, class, state, ER, mind map, pie and timeline diagrams.
- **LaTeX** — `$…$`, `\(…\)`, `$$…$$` and `\[…\]`; click a formula to edit it. Prices like "$5 and $10" stay plain text.
- **Code** — syntax highlighting for 37 languages with automatic detection, diff line colors, a Format button for JSON, Copy on every block, and long blocks collapsed.
- **Directory trees** written with `├──` and `└──` render as a folder tree with comments.
- **YAML front matter** collapses to one Properties line and expands into a card with title, status badge, owner, dates and tags; Edit YAML opens the source.
- **Status badges and links** — PASS, FAIL, DONE, TODO, ✅ and ❌ become colored badges. BB thread ids open the thread and task keys like `ABC-12` open the task.

## Quote to chat

Select text, right-click and choose **Quote in chat**: the exact Markdown lands in the thread composer with the file path, line numbers and machine. **Comment in chat…** adds your note to the quote in one step. The same menu formats text, turns blocks into headings, lists or callouts, edits tables and links, and copies a `path:lines` reference.

## Machine-aware files

A file opens from the machine and folder of the thread, environment or project it came from, whichever device you are browsing on. Relative links resolve from the document's own folder on that machine. A missing file reports the machine and path instead of opening a different copy.

## Safe editing

Autosave writes 1.5 seconds after you stop typing, guarded by the file's hash. When an agent changes the file while you have unsaved edits, you choose between loading their version and keeping yours. A file deleted while open can be recreated from the editor.

## For agents

The plugin ships a `markdown-pro` skill that tells agents which callouts, diagrams, math, trees and status formats render well, so the documents they write look finished when you open them.

## Also included

A right-click menu on BB's side-panel tabs: close, close other tabs, close tabs to the left or right, close all, and pin a tab so bulk closing skips it.

## Requirements

BB 0.43 or later. No account, API key or external service. The interface follows BB's language (English or Russian).
