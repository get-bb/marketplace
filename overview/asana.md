## What you get

- **Your My Tasks list in bb.** An Asana tasks page in the sidebar, and an Asana tab beside every thread, show your open tasks under your own sections and in your order. Rows show due dates, overdue tasks in red, and time logged against the estimate; the sidebar icon counts overdue tasks. Press `/` to search, filter to overdue, and move with the arrow keys.
- **Tasks you can read and work.** Open a task to see its formatted description, images, attachments, comments, and subtasks. Change custom fields, the assignee, the due date, and its My Tasks section; post comments; mark it complete; and log time.
- **Threads started from a ticket.** Start thread opens a new thread in the bb project you've mapped to the task's Asana project, titled after the ticket, and the agent starts with a brief of the ticket's description and latest comments. The thread header links back to the task, and tasks that already have a thread show a filled chat bubble in the list that opens it.
- **Hand back in one step.** Post a comment (drafted from the thread's final message and any pull request link), reassign the task to whoever filed it, and optionally mark it complete.
- **Agents that ask first.** Agents read and update your tasks with the `bb asana` command. Before any write, the thread shows the exact change and the task it lands on, and nothing reaches Asana until you approve. A bundled skill keeps their comments short and in your voice.

## Requirements

- An Asana account and a personal access token, created at [app.asana.com/0/my-apps](https://app.asana.com/0/my-apps). Asana tokens can't be limited, so the plugin acts as you in every workspace you can see.
- Logging time from bb needs a number custom field in your projects (named "Actual Time" by default; you can change the name in settings). Projects on Asana's built-in time tracking show their time read-only.

## Privacy

The token is stored as a bb secret and sent only to Asana. The plugin sends no telemetry. A screenshot mode shows a made-up workspace for demos.
