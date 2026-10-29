## Jira tickets, next to your conversation

Choose Jira boards in the plugin settings, browse horizontal Kanban columns beside the conversation, and filter with JQL. A compact toolbar provides issue lookup and refresh; all task pages load automatically, and collapsible swimlanes group work by assignee. Open a ticket to inspect its description, fields, comments, subtasks and links.

Drag a card into the message input or use **Add to chat** to place a Jira mention in your draft. When you send the message, BB fetches the current ticket context for the agent. You can also find tickets through the **@** menu or open a new conversation with an issue key.

Agents receive tools to read issues, individual custom fields, comment pages and board issues, plus tools to post a comment or apply a workflow transition when asked. The issue panel offers the same two writes as explicit buttons. A CLI and bundled skill provide the whole workflow from the terminal. The token stays in BB's secret settings.

## Connection and scope

Supports Jira Server / Data Center PAT authentication and Jira Cloud classic API tokens with an account email. The BB server needs HTTPS network access to Jira.

Writes are limited to comments and workflow transitions, always as your Jira account, so Jira permissions and workflow rules apply. Descriptions, fields, assignees and board configuration are never changed. Attachment metadata is included but attachment contents are not downloaded. Large context is explicitly truncated, and agents can request further field and comment pages. Dragging adds issue context to the message draft; it does not change the ticket’s Jira status.
