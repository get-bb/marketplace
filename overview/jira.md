## What you get

- A **Jira** page with saved views for issues assigned to you, reported by you,
  and recently updated. Narrow by project, assignee (including unassigned), or
  text, or write JQL directly.
- A **List** grouped by In progress, To do, and Done, or a **Board** with one
  column per workflow status. Drag a card to another column to move the issue;
  a move the workflow does not allow snaps back with the reason.
- An issue view where you edit the title, description, status, assignee,
  priority, labels, and comments in place. Deleting asks for confirmation.
- The same browser as a thread side panel, and `@` mentions that attach an
  issue's current state to a message.

## Agents

Agents get tools to search, read, create, edit, transition, comment on, assign,
and delete issues. Descriptions and comments are written in Markdown and
converted to Jira's format.

Every kind of change asks first by default. Create, edit, status, comment,
assignee, and delete each have their own setting, **Ask every time** or
**Always allow**, and the approval card in the thread can switch one to Always
allow. A declined or timed-out approval sends nothing to Jira. Your own edits on
the Jira page never ask.

## Project links

Link a BB project to one or more Jira projects. In that project's chats, agent
searches, `@` mentions, and the side panel stay within the linked projects, and
a separate tool still searches all of Jira when you ask about something else.

**Send to agent** starts a chat in the BB project linked to the issue's Jira
project. When none is linked, pick a project and link it in the same step.

## Requirements

Jira Cloud only; Jira Server and Data Center are not supported. Enter your site
(for example `acme.atlassian.net`), your Atlassian account email, and an API
token from id.atlassian.com under Security, API tokens. The token is stored as a
secret on the BB server and used only for Jira's REST API. The plugin acts with
that account's Jira permissions.
