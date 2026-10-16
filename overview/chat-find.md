## What you get

- Ctrl+F (Cmd+F on macOS) opens a small find bar over the chat, the same chord you already use in a browser. Nothing to open in the side panel first.
- Every match in the chat is highlighted in place, and the current one is highlighted in a stronger color. The bar shows where you are, such as `3/12`.
- Enter jumps to the next match and Shift+Enter to the previous one, wrapping at either end. The chat scrolls so the match sits clear of the find bar and the composer.
- Matches are found inside bold text, links, and syntax-highlighted code, because the search follows the text you see rather than the markup under it. Matching ignores case and treats the query as plain text.
- While an agent is still replying, the count updates as new text streams in, and the match you are on stays selected.
- Escape closes the bar, clears the highlights, and puts the cursor back where it was, usually the composer.

## Which chat it searches

The bar opens over the chat you are typing in. With nothing focused, it uses the chat you clicked last, then the main chat of the focused split pane.

## Shortcuts it leaves alone

The embedded browser keeps Ctrl/Cmd+F for find in page while it has focus. Terminals, code editors, and open dialogs also keep the chord.

**Find in chat** is also in the quick palette (Ctrl/Cmd+Shift+P). You can give it another shortcut under Settings → Keyboard.

## Limits

It searches what the chat has rendered. Collapsed tool output and older messages that have not loaded yet are not searched until you expand or scroll to them.

## Requirements

bb 0.43 or later. No account, external service, or network access. Highlights use the CSS Custom Highlight API (Chrome 105+, Safari 17.2+, Firefox 140+); the bb desktop app supports it.
