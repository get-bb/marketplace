Bring assigned and project tasks beside the BB thread doing the work.

## What you get

Search, filter, and sort complete task lists before pagination. Inspect task
details, descriptions, priorities, assignees, labels, and workflow information.
Create tasks, edit supported fields, post comments, or prepare an agent draft.
Writes require an explicit form submission or CLI confirmation.

## Requirements

Install and authenticate the Bureaucat CLI on the selected BB machine. Configure
your service URL and CLI path; credentials remain CLI-owned. The optional CLI
installer uses a pinned official release and verifies SHA-256 digests.

Filtered or sorted scans are limited to 5,000 source tasks and fail explicitly
above that limit. Default pagination does not require a complete scan. Some
filters require a project because assigned-task responses omit fields. Features
not exposed by the upstream CLI, including attachments and existing-comment
reads, are not included.
