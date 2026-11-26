Side chats that never get lost.

BB's side chats reply to one message of a thread and live in a side panel tab.
When that tab closes, there is no way back to the chat. Side Chat Keeper lists
them again — per thread, per message, and across every project — and moves them
between the side panel and the main thread list.

## What you get

- A **Side chats** tab in each thread's side panel, grouped by the message each
  chat replies to, with archived chats tucked away and a New button for a chat
  from the thread tip.
- A chip beside messages that have side chats, listing every chat on that
  message.
- **Move to thread list** as a standalone thread or as a child of the source
  thread, by button or by dragging the chat onto the real sidebar: the thread,
  section, or project under the cursor lights up, and dropping back on the panel
  returns the chat. Undo everywhere.
- **Archive, restore, and delete** with one click from a row or the chat header.
- A **Side chats** page in the sidebar with search, a project filter, and
  archived chats, grouped by source thread.
- Thread menus that show how many side chats a thread has and let a promoted
  chat jump to its source or back to the panel.
- A `bb side-chat-keeper` command and a bundled skill, so agents can list, move,
  archive, and delete side chats too.

## How it works

The plugin reads the hidden fork threads the bundled side-chat plugin creates,
resolves the message each one replies to from the seed text it was created with,
and caches that in its own storage. Moving a chat flips the thread's visibility
and parent — nothing in BB itself is patched, and the connection to the source
thread stays intact: archiving the source archives its side chats, and a
promoted chat keeps its place in the project it came from.
