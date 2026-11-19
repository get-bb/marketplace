## What you get

- **A panel below the chat, like an IDE.** The whole App panel moves under the conversation: the terminal, browser tabs, file and diff previews, and plugin tabs. Mod+J still opens and closes it.
- **Resize by dragging.** Drag the divider between chat and panel; the plugin drives bb's own resize, so double-click to reset works as before. On tablets the grab area is larger for touch.
- **One click back.** The thread header shows **Panel right** or **Panel below**, and the command palette has **Bottom Panel: Toggle terminal panel position**. Your choice is remembered on each device.
- **Cmd+L to chat, like Cursor.** Select text in the terminal and press Cmd+L (macOS) or Ctrl+L (Windows and Linux): the selection goes into that thread's composer and focus moves there. Nothing is sent automatically, so you can add context first. Non-Latin keyboard layouts, such as Russian, work too.

## How to use

1. Press Mod+J to open the panel; it appears below the chat.
2. Drag the divider to set its height.
3. Select text in the terminal, then press Cmd+L or Ctrl+L to add it to the chat draft.
4. Click **Panel right** in the thread header to return to bb's native layout, and **Panel below** to come back.

## Good to know

Requires bb 0.49 or later. Phones and narrow windows (up to 767 px) keep bb's drawer. The multi-thread split view and plugin pages stay native. The panel briefly appears on the right while bb loads. The shortcut is fixed: it is not listed in Settings → Keyboard and cannot be rebound. Ctrl+L without a selection popup still clears the terminal. In a browser, Cmd/Ctrl+L is also the address-bar shortcut. No account, network service or API key, and no data leaves your machine: the plugin stores only a local layout preference in your browser.
