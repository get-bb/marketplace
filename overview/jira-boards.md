## Jira tickets, next to your conversation

Choose Jira boards in the plugin settings, browse horizontal Kanban columns beside the conversation, and filter with JQL. A compact toolbar provides issue lookup and refresh, and the tab reopens on the last board, filters and grouping; task pages load automatically, 1000 tasks at a time, and collapsible swimlanes group work by assignee, epic or parent, or priority. Open a ticket to inspect its description, fields, comments, subtasks and links.

Drag a card into the message input or use **Add to chat** to place a Jira mention in your draft. When you send the message, BB fetches the current ticket context for the agent. You can also find tickets through the **@** menu or open a new conversation with an issue key.

Agents receive tools to read issues, individual custom fields, comment pages, board issues, text attachments such as logs and JSON, and a one-call summary of linked issues and subtasks, plus tools to post a comment, apply a workflow transition or assign an issue to yourself when asked. The issue panel offers the same writes as explicit buttons. A CLI and bundled skill provide the whole workflow from the terminal. The token stays in BB's secret settings.

## Connection and scope

Supports Jira Server / Data Center PAT authentication and Jira Cloud classic API tokens with an account email. The BB server needs HTTPS network access to Jira.

Writes are limited to comments, workflow transitions and assigning an issue to yourself, always as your Jira account, so Jira permissions and workflow rules apply. Descriptions, other fields, assignment to anyone else and board configuration are never changed. Attachment metadata is included; agents can read text attachments up to 1 MiB on request, while binary files stay metadata only. Large context is explicitly truncated, and agents can request further field and comment pages. Dragging adds issue context to the message draft; it does not change the ticket’s Jira status.
