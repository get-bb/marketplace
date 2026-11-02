# GitLab Interface (Notion style)

Work through GitLab issues, merge requests, pipelines and branches in a BB panel laid out like a Notion database, and hand any of them to an agent.

## Merge requests

Each merge request opens on a row of status cards: review, pipeline, open threads, conflicts and, if you set a release branch, how many of its commits are already cherry-picked there. The reason it is blocked is spelled out above the Approve and Merge buttons. Approvals and 👍 reactions both count as review, and you can react to the merge request or to any comment.

Every review thread is a card you can fold. Reply and Resolve sit at the bottom of the card, a resolved thread can be reopened, and comments that arrived since you last looked are marked. A merge is pinned to the commit you looked at, so a branch updated in the meantime is refused instead of merged.

## Lists and filters

Issues, merge requests, pipelines and branches share one layout: section tabs, a search field, views such as Review requests or Stale branches, and filter pills you remove with one click. Filter menus search every project member and label, not only the first few.

## Pipelines and branches

Open a failed pipeline to read the end of the failing job's log, then retry the failed jobs or run the pipeline again. The branches tab shows each branch's merge request and pipeline, and can start a pipeline on any branch.

## On the new-thread page

A GitLab section lists what waits for you: your blocked merge requests, the ones ready to merge, and review requests. It also shows a heatmap of the commits you authored. Hover a day to see its commits, lines added and removed, and projects. Above a thread's composer, a strip tells you what is next for the branch: commit, push, create the merge request or open it.

## For agents

The `bb gitlab-ui` command lists, shows, comments on, retries and runs pipelines for the same items, so an agent thread can do what the panel does.

## Requirements

The `glab` CLI, logged in to each GitLab host you use (gitlab.com or self-managed). The plugin talks to GitLab only through `glab`.
