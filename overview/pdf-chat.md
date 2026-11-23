## What you get

- A PDF viewer for `.pdf` files in workspaces, host folders and thread storage. It shows up in the file tab's "Open with" menu as "PDF to chat".
- Select text in the document and a small bar with **Add to chat** and **Copy** appears at the end of the selection. The bar and the boxes below stay inside the PDF pane, also when the right panel is narrow.
- **Copy** puts the selected text on the clipboard as clean lines and shows "Copied" on the button; the selection stays.
- **Add to chat** opens a small box with the quoted text, the page number and an optional prompt (up to 4000 characters), and a **Send to chat** button.
- Press Enter to send, Shift+Enter for a new line, Escape to close the box without sending.
- The message goes out in this form: the file path, `Page N`, the selected text as a quote, then your prompt. If the assistant is still replying, the message is queued and sent after the current reply.
- Whatever you had typed in the composer is put back after the quote is sent, so a half-written message is not sent along with it.

## Reading and zoom

- Zoom from 25% to 500%: trackpad pinch, Cmd/Ctrl + mouse wheel, or Cmd/Ctrl with `+`, `-` and `0`. The toolbar has `-`, `+` and a Fit button for fit-to-width.
- Pages are drawn only when they are near the visible area, and PDF parsing runs in a web worker, so long documents do not freeze bb.
- The last three opened PDFs (up to 96 MB in total) are kept in memory and revalidated on reopen, so switching back is quick.

## Files and errors

- Show in Finder reveals the file on disk. If a PDF fails to load, the tab shows the reason with Retry and Open in default app.
- Clear messages for a damaged file, a password-protected PDF, a response that is not a PDF, and files over 200 MB.

## Requirements

- bb 0.49 or newer.
- The file must be on the machine bb runs on. Remote-only files cannot be revealed in Finder.
- The interface text is English only.
- The plugin has no settings.

## First step

Open any PDF as a file tab, select a sentence and click **Add to chat** or **Copy**. If another opener is chosen for PDF files, pick "PDF to chat" in the tab's "Open with" menu or under Settings, Files.
