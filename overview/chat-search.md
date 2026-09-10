Find any word or phrase in the chat you are reading and see every occurrence
lit up in the conversation itself, like find-in-page for a thread.

## What you get

- A **Find in chat** tab in the thread's right panel with a search box,
  match-case and regex toggles, a hit list, and previous/next navigation.
- In-place highlighting of every match in the rendered messages, with the
  current hit in a stronger colour. Highlights update as new messages stream
  in and disappear when the tab closes.
- A quick-palette row and a **Mod+Shift+F** shortcut that open the tab.
- A `bb chat-search find` command for agents and scripts.

## How it works

The plugin reads the thread's message history through the BB server and
matches the query there, so hits include messages that are scrolled far out of
view. Highlighting is painted with the browser's CSS Custom Highlight API and
never rewrites the chat's DOM. Nothing leaves your machine.
