## What you get

Noted opens an agent's HTML page or Markdown file in the thread's side panel and turns it into something you can mark up. Hover to see each element outlined, click one or select a run of text, and type what should change. Notes queue below the artifact, where you can edit or remove them, add a free-form message, and send the whole batch at once.

## How the feedback arrives

The batch lands in the thread as one structured message. Each item names the element's selector, quotes the text you pointed at, and states your request, so the agent edits the right spot in place. Choose **Queue** or **Steer** to control how the message reaches an agent that is already running.

## Revisions

Noted records a revision after each agent turn and refreshes the open review when the file changes, so you can check the result and annotate again without reopening anything.

## For agents

Installing Noted adds two skills to new agent sessions. `noted` covers the review loop: opening a review with `bb noted open <file>`, replying, checking status, and ending a session. `reviewable-html` gives agents a house template for annotation-friendly plans, reports, and comparisons. A review can also be routed to another thread, such as a parent orchestrator, with `--view` and `--reply-to`.

## Optional features

Turn these on in the plugin settings:

- `newWindow` opens the same review in a separate browser window.
- `markdownEditing` adds a source editor for Markdown files. Saving writes the original file and rejects the save if the file changed while you were editing.

## Requirements

bb 0.40 or later. No external service or account. Noted stores sessions and feedback in BB-managed storage and sends feedback only to the thread you choose.

Built on [Lavish](https://github.com/kunchenguid/lavish-axi) by Kun Chen.
