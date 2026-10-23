## Plan with your agent

Ask an agent to add publishing dates, move drafts, and show your live schedule inside a conversation.

Switch between month and week views, move items by dragging or with the keyboard, and check them off when posted. Keep reusable ideas in Evergreen and deferred work in Later. Choose an optional format for each item; new items start with No format and the browser remembers your choice.

## Keep context with each item

Add notes, a target, links, pull requests, and bb thread references. Mark what an item waits on with a text gate, a pull request, or another item.

## Connect your calendar

A new user first creates a Desktop app OAuth client in their own Google Cloud project, enables the Calendar API, and saves the client ID and secret in Content Calendar settings. Choose **Connect Google Calendar**, sign in and approve access on Google’s consent screen, then paste the redirected address from the page that does not load back into bb to finish connecting. This is a bring-your-own Google OAuth client flow. Credentials stay in secret settings. The plugin requests access to calendars created by the app and creates a dedicated Content calendar; it does not come with an account or calendar.

Choose an IANA time zone in Settings before creating a calendar; the default is UTC. Existing calendars keep their Google Calendar zone. Items sync with Google Calendar, including edits made there. Disconnected network writes queue for retry, and conflicting edits are shown for resolution. Disconnecting or uninstalling leaves your Google calendar intact. Export items as JSON from the CLI.

## Optional file and Moss attachments

Attaching files requires a connected machine enrolled in bb. Note discovery searches that machine’s default Moss notes folder. Without the folder, search has no results, but you can enter another file’s absolute path. Opening a note in Moss requires macOS with Moss installed; other files and platforms use bb’s file preview. With no connected machine, scheduling, sync, and link, pull request, and thread attachments remain available.

Attachment references, notes, and other item metadata are stored in Google Calendar and cached in bb. File contents are not copied into the calendar.

## Plugin access

Plugins run with bb's full access; read one before installing.
