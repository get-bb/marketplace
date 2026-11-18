## What you get

A Kanban board for BB's built-in Tasks, in the sidebar, available from any
project and any thread. All six statuses render as lanes — Backlog, To Do,
In Progress, In Review, Done, Canceled — and every card in the selected
tracker project is on the board, with its key, priority badge, due date, and
labels.

Cards open a dialog where you can edit the title, description, status,
priority, and due date, toggle labels, read the task's comment history, and
add comments. The board's toolbar switches between all of your tracker
projects, and a button creates new tasks directly into the selected one.
Deleting a task asks for confirmation first.

## How it works

Tasks Kanban does not keep a copy of your tasks. The board proxies every read
and write into the built-in Tasks plugin, the same database behind the
`bb tasks` CLI. Drag a card to another lane and the underlying task changes
status; change a status from the CLI or let an agent update a task and the
board refreshes itself through a realtime signal. The two surfaces are the
same data, so nothing can drift.

Because it sits on the Tasks plugin's own interface, the board also picks up
whatever the Tasks UI gives you: @-mentions in chat resolve to tasks, agents
can be pointed at a task with its full context, and the sidebar task list
stays in step with the board.

## Languages

The interface follows your BB language. English and Russian are built in;
the strings live in one file (`lib/i18n.ts`), so a community translation is a
small pull request.

## Requirements

- BB 0.49 or newer.
- The built-in Tasks plugin (shipped with BB; no extra setup).
- No external services, accounts, or configuration.

## Working with agents

The plugin ships a `board` skill. You can mention a task in a message with
@ (the Tasks plugin provides the search) and ask your agent to move, finish,
or create tasks; the agent works through `bb tasks` and the board reflects
the result without a refresh.

## Limitations

The board shows one tracker project at a time (switched from the toolbar).
Subtasks are listed in the task dialog's data model but not rendered as
nested cards. Drag & drop sets status and, when dropped on a card, the
before-position; it does not reorder within a lane by free position.
