Keep the conversations behind a task beside the BB thread doing the work.
Link a Mattermost conversation to a thread, quote a message into the current
draft without sending it, or prepare a new task with its source context.

## What you get

Search messages, browse mentions and unread channels, and read conversations
with replies grouped in order. Saved results remain visible while they refresh;
refresh failures keep the cached copy and show its age. Star conversations
across BB threads and pin the ones you want first. These are personal BB
bookmarks and do not change shared Mattermost pins.

Preview images in BB's image viewer, play audio and video, and open PDF or
text previews on demand. Downloads use BB's download flow. The relay serves
files up to 64 MiB; the CLI may download a larger file before the relay rejects
it. Document previews depend on browser support. HTML and SVG download rather
than render as active pages.

## Agent context

Agents can search and read through `mattermost_read` and retrieve linked
conversations through `mattermost_context`. Quoted context preserves source
authors, timestamps, and message IDs. The plugin never posts to Mattermost.

## Requirements

Install [mattermost-cli](https://github.com/rhnvrm/mattermost-cli) on an enrolled
BB host and sign in to your Mattermost account. Configure the plugin's host and
server URL in BB. Credentials stay in the CLI's credential store; cached
snapshots, small attachments, and bookmarks stay in BB plugin storage. Uncached
reads and attachments need access to your Mattermost server.
