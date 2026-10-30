## What you get

- A tab beside the chat for Markdown, PDF, Word, PowerPoint, Excel, and HTML files. Links in messages, the file picker, and `bb thread open` all land there, and a file attached to a message opens from the message's action bar.
- Comments on selected text, on a box drawn around a chart or picture, on spreadsheet cells and ranges, on any element of an HTML page, or on the whole document. Right-click a selection or press Cmd+Option+M (Ctrl+Alt+M).
- Drawing over HTML pages, PDFs, and slides with a pen, a straight line, an arrow, or a box: cross out a button, frame a block, draw an arrow to where it should move. The agent gets a picture of your strokes over the page as you saw it, and on HTML the elements each stroke touches.
- Drafts that wait until you send them: to the current chat, or to a new chat in the same project and workspace with the same model.
- A status on every comment: waiting, done with a note on what changed, or needs you when the agent answered with a question.
- A thread under every comment: answer the agent's question or correct what it did, and the agent replies in the same place, as many rounds as it takes.
- Live sites in bb's browser (desktop app): press Review beside the address bar and comment on the running page by text, element, or drawing. Comments stay on their pages across reloads and deploys, and Send hands them to the chat that owns the tab.
- A PDF with comments to send to anyone: highlights, boxes, and drawings as annotations any PDF viewer shows, with a numbered list of comments at the end. Doc Review in another bb imports them, so a colleague can reply or hand them to an agent and send the file back.
- A **Doc Review** page in the sidebar with the files you commented on, recent files, and a folder browser.

## How the hand-off works

One message carries every draft: where it points (lines, page, slide, or cell), the quoted text or cell values, and your request. A comment on an area arrives with an image of that region, so the agent sees the chart you circled.

The bundled skill tells the agent how to change each format: Markdown directly; Word, PowerPoint, and Excel files in place, keeping their layout and formulas; and a PDF through the file it was generated from. The agent closes each comment with `bb doc-review resolve` or answers with `bb doc-review reply`, and the tab updates while you read. Your reply in a thread goes out with the next batch, together with the conversation so far.

## Viewing

Word and PowerPoint files are converted to PDF by LibreOffice on the bb server and cached per file version. Pages stay sharp as you zoom with the buttons, Ctrl or Cmd with the wheel, or a pinch. All pages share one scale, so a landscape sheet scrolls sideways instead of shrinking, and a long document loads only the pages on screen. **Classic** switches to the browser's PDF viewer for search and printing. Workbooks open as a grid with sheet tabs, number formats, fills, borders, merged cells, and frozen panes. HTML files open as the live page in a sandbox that keeps its scripts away from bb; a prototype with desktop and phone frames takes comments inside both.

## On a phone

bb's mobile web app shows the same tab. Pinch to zoom, hold and drag to mark an area or draw, tap a cell to comment on it. The comment list opens as a sheet from the bottom.

The plugin never writes to your file. Only the agent you send the comments to changes it, and the tab picks up the new version on its own.

## Requirements

- poppler-utils (`pdfinfo`, `pdftoppm`, `pdftotext`) on the machine the bb server runs on.
- LibreOffice Writer and Impress on the same machine for Word and PowerPoint files. LibreOffice Calc adds full formatting for legacy spreadsheets (`xls`, `xlsb`, `ods`).
- Chrome or Chromium on the same machine, optional, for pictures of drawings on HTML pages.
- Files on other bb machines are copied to the server for rendering, up to 64 MB.
