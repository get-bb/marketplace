## What you get

- A chip in the thread header with the Linear logo, the issue id, and its title. Titles over 40 characters show a short AI label; the full title stays in the tooltip and the card.
- Click the chip for the full card: workflow state, priority, project, assignee, labels, and the description with its attached images, plus Open in Linear, Change card, and Unlink.
- When no card is connected, the chip reads "No Linear card" and opens an explorer of the issues assigned to you, grouped In progress, Todo, Triage, and Backlog. Search by id or title, filter by Linear project, show done issues, expand an issue to read it, and link it to the chat.
- A Projects section on the plugin's settings page with one checkbox per bb project, so the chip shows only where you work from Linear.

## How a chat gets its card

1. An issue you linked from the explorer.
2. Otherwise, the issue named by the thread's git branch. Linear's generated branch names, such as `name/eng-123-fix-login`, match when `ENG` is one of your team keys.
3. Unlink detaches the card and stops branch detection for that chat.

## Requirements

- A Linear personal API key, entered in the plugin settings. It stays on the bb server; attachments load through the plugin with that key.
- Short AI titles use bb's Account Pooler (Claude Haiku). Without it, the chip shows the full title, truncated.
