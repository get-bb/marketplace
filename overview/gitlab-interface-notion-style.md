# GitLab Interface (Notion style)

Work through GitLab issues, merge requests, pipelines and branches in a BB panel laid out like a Notion database, and hand any of them to an agent.

## Merge requests

Each merge request opens on a readiness strip: review, pipeline, open threads and conflicts, with the reason it is blocked spelled out. Approvals and 👍 reactions both count as review. Reply to a thread or resolve it in place, read the diff, and merge from the panel. A merge is pinned to the commit you looked at, so a branch updated in the meantime is refused instead of merged.

## Lists and filters

Issues and merge requests sit in one table with assignee, reviewer and label columns. Filter menus search every project member and label, not only the first few.

## Pipelines and branches

Open a failed pipeline to read the end of the failing job's log, then retry the failed jobs or run the pipeline again. The branches tab shows each branch's merge request and pipeline, and can start a pipeline on any branch.

## For agents

The `bb gitlab-ui` command lists, shows, comments on, retries and runs pipelines for the same items, so an agent thread can do what the panel does.

## Requirements

The `glab` CLI, logged in to each GitLab host you use (gitlab.com or self-managed). The plugin talks to GitLab only through `glab`.
