## Your assigned stories

See your Shortcut work on a Kanban board inside bb, grouped by workflow state. Switch between workflows, search your stories, and show completed work when you need it. Drag cards to change their order in Shortcut.

Click a card to read its description, tasks, labels, and estimate in a modal. Close it to return to the same place on the board. Change the story's workflow state from the modal, or open it on Shortcut. Story links in chat open a separate detail view.

## Start work from a story

Choose **Start work in bb** to move the story to **In Development** and create an agent thread with the story details. The agent receives instructions to investigate the story, implement the requested work, and verify the result.

The thread uses your current bb project, or the default project chosen in the plugin settings. The story's workflow must have an **In Development** state.

## Setup

Requires bb 0.35 or newer, a Shortcut account, and a Shortcut API token. Installing from Git also requires Node.js and npm.

Create a token in Shortcut under **Settings → API Tokens**. In bb, open **Settings → Plugins → Shortcut**, add the token, and choose a default project. bb stores the token as a secret.

This is an independent community plugin, not affiliated with or endorsed by Shortcut.
