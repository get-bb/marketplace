# GitLab Interface (Notion style)

Your whole GitLab review loop, inside BB. Open a merge request, see in one line why it can't merge yet, answer the threads, approve and merge without switching to a browser tab. When something needs real work, hand it to an agent in one click.

## Know why a merge request is stuck

Every merge request opens on five status cards: review, pipeline, open threads, conflicts and cherry-picks. The blocker is written out next to the Merge button, so "why is this still open?" takes a glance. Approvals and 👍 reactions both count as review. A merge is pinned to the commit you looked at; if someone pushes in the meantime, GitLab refuses it instead of merging code you never saw.

## Finish review threads where you read them

Each thread is a card you can fold. Reply, resolve or reopen it at the bottom of the card. New comments since your last visit are marked, and you can react with an emoji to the merge request or to any comment.

## Never lose a hotfix on the way to release

Set your release branch (stage, release/2.8, anything) and the Commits tab shows which commits of a merge request already reached it, as a cherry-pick, a copy or the same SHA, and which did not. Select the missing ones and an agent opens the cherry-pick merge request for you.

## Fix red pipelines fast

A failed pipeline opens on the last lines of the failing job's log, where the error usually is. Retry the failed jobs or run the pipeline again from the same page. The branches tab shows every branch with its merge request and pipeline, and finds the stale ones for you.

## Start the day with what waits for you

The new-thread page gets a GitLab section: your merge requests that need action, the ones ready to merge, and review requests. A heatmap of your own commits switches between week, month and year. Hover a day to see its commits, lines added and removed, and projects.

## Agents do the rest

Send any issue or merge request to an agent thread. Above the composer of a thread working on a branch, a strip shows what is next: commit, push, create the merge request or open it. The `bb gitlab-ui` command gives agents the same lists, comments, retries and pipelines the panel has.

## Looks like the rest of your workspace

Issues, merge requests, pipelines and branches are Notion-style databases with one search field, saved views and filter pills you remove with one click. Light and dark themes follow BB.

## Requirements

The `glab` CLI, logged in to each GitLab host you use (gitlab.com or self-managed). The plugin talks to GitLab only through `glab`.
