See which messages have side chats, and get back to them.

## What you get

- A small thread icon under every message that has a side chat forked from it. A number beside it says how many when there is more than one. Hover to see their names.
- A panel tab for each message's side chats. Click the icon to open it. The tab is named after the start of the message and has one inner tab for each of that message's side chats, so you switch between them in one place.
- A **Side chats** action in the panel's + menu that lists every message of the thread that has side chats.
- A name for each side chat. Click the pencil on its inner tab, or double-click the tab, type a name, and press Enter. Save an empty name to go back to "Side chat".

## How it works

Side chats come from bb's bundled Side chat plugin. They are hidden forks of the thread, and bb does not record which message a side chat was started from. This plugin finds the message by comparing the text the side chat quotes with the thread's messages:

- A side chat started with **Reply in side chat** on a message links to that message.
- A side chat started from selected text links to the message that contains the text.
- A side chat started with **Start side chat**, or one whose quote is not found, links to the last response written before it was created.

A side chat you opened but never wrote in gets no icon. A name is saved as the title of the side chat's own thread. **Reply in side chat** still opens the bundled plugin's own tab for a new side chat; clicking the icon closes that tab and shows the side chat in the message's own tab.

The icon stays visible under the message through a small style override of bb's own markup. If a bb release changes that markup, the icon shows only on hover, like the other buttons under a message.

In the macOS desktop app, the plugin also puts the close button of every panel tab back to its normal size, which fixes a tall hover highlight.

The plugin stores each side chat's message in its own storage and adds no agent tools or CLI commands.
