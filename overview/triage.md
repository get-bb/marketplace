## Plan and run

Create a task, choose its project and agent, and run it now or schedule it for
later. Turn an existing session into a card without starting another agent.
Each card opens its linked conversation.

## Follow the work

- Organize cards into stages you can rename and reorder.
- Filter running tasks, unread updates, and settled work.
- See recent activity and tasks that need your attention.
- Optionally show cards and linked sessions in the sidebar.

Assigned agents report progress and completion through `triage_move_task`.
Use `bb triage list`, `bb triage show`, and `bb triage move` from the CLI.

## Requirements

Requires BB 0.42+ with a compatible Plugin SDK 0.4.47 runtime and a configured
agent provider. Provider accounts and usage charges apply. No separate Triage
account is needed. Cards and updates stay in BB's plugin-owned SQLite database.

Scheduled work runs while BB and Triage are running; overdue tasks are picked
up when they resume. Browser notifications require permission.
