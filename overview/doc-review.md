## What you get

- A tab beside the chat for Markdown, PDF, Word, PowerPoint, and Excel files. Links in messages, the file picker, and `bb thread open` all land there.
- Comments on selected text, on a box drawn around a chart or picture, on spreadsheet cells and ranges, or on the whole document. Right-click a selection or press Cmd+Option+M (Ctrl+Alt+M) to comment without reaching for the mouse.
- Drafts that wait until you send them: to the current chat, or to a new chat in the same project and workspace with the same model.
- A status on every comment that follows the agent's work: waiting, done with a note on what changed, or needs you when the agent answered with a question.
- A **Doc Review** page in the sidebar with the files you commented on, recent files, and a folder browser.

## How the hand-off works

One message carries every draft: where it points (lines, page, slide, or cell), the quoted text or cell values, and your request. A comment on an area arrives with an image of that region, so the agent sees the chart you circled.

The bundled skill tells the agent how to change each format: Markdown directly; Word, PowerPoint, and Excel files in place, keeping their layout and formulas; and a PDF through the file it was generated from. The agent closes each comment with `bb doc-review resolve` or answers it with `bb doc-review reply`, and the tab updates while you read.

## Viewing

Word and PowerPoint files are converted to PDF by LibreOffice on the bb server and cached per file version, so a document converts once. Pages render as images with a selectable text layer. **Classic** switches to the browser's own PDF viewer for search, zoom, and printing, and the download button saves the original file. Workbooks open as a grid with sheet tabs, number formats, fills, borders, merged cells, and frozen panes.

The plugin never writes to your file. Only the agent you send the comments to changes it, and the tab picks up the new version on its own.

## Requirements

- poppler-utils (`pdfinfo`, `pdftoppm`, `pdftotext`) on the machine the bb server runs on, for pages and text selection.
- LibreOffice Writer and Impress on the same machine for Word and PowerPoint files. LibreOffice Calc adds full formatting for legacy spreadsheets (`xls`, `xlsb`, `ods`); without it they open with values and fills.
- Files on other bb machines are copied to the server for rendering, up to 64 MB.
