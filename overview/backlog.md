## Your Backlog.md project in BB

Open Backlog.MD from the BB navigation. The top bar has a project menu with all
your BB projects, and the Tasks, Documents, and Decisions tabs. The layout
follows the width of the plugin, so it also works in BB split view.

## Tasks

The Kanban board shows one lane for each configured status. Search the task
text, filter by status, priority, assignee, or label, and sort in either
direction. Cards show the start of the description, the labels, the assignees,
and the checklist progress. Drag cards, or use the keyboard, to change the
status or the order.

Open a task to read its Markdown, its subtasks, and its properties.
Double-click a property or a section heading to edit it. Then click Save or
Cancel.

## Documents and decisions

The Documents tab lists the files in `docs/`. The Decisions tab lists the files
in `decisions/`. Each card shows the file name and the start of the first
paragraph. The front matter shows as one row of small items, such as the ID,
the dates, and the status. Click Edit to change a file. You can hide the file
list to give the file more space.

## Add text to chat

Select text in a task, a document, or a decision, and click the + button. The
text goes to the draft of the latest thread of the project, with the path of
the source file. If the project has no thread, BB opens a new thread draft. The
plugin never sends the message.

Type `@` in the BB composer to mention a task by words from its title or its
description. When you send the message, the agent gets the current content of
the task.

## File safety

The Markdown files are the only source of truth. A save changes only the
edited part of the file. Before each save, the plugin checks that the file did
not change. When changes overlap, the plugin keeps your draft and shows the
current file.

## Requirements and limits

The plugin needs BB 0.43 or later with Plugin SDK 0.5.9 or a later 0.5
version. The BB project needs a Backlog.md folder on an enrolled host. You do
not need the Backlog CLI, an external account, or an API key.

The interface has a light theme only. We tested the plugin on macOS. We did
not test Windows host paths. The plugin uses experimental BB host and provider
APIs. It does not create, delete, archive, or restore tasks. It does not run
task hooks or Git commands.

## Acknowledgments

This is an independent BB plugin. It is not affiliated with or endorsed by the
official [Backlog.md project](https://github.com/MrLesk/Backlog.md). We thank
its maintainers and contributors for their work.
