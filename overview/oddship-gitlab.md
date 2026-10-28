Browse issues and merge requests beside your code, using the glab account you already use.

## What you get

Filter tracked repositories and cached items, open descriptions and discussions,
and inspect branches, reviewers, and pipeline status. Create issues, post
comments, close or reopen items, and change assignees or reviewers through
explicit controls. Start agent work or a review in a matching BB project.

## Requirements

Install and authenticate glab on the BB server. Self-hosted GitLab is supported.
Credentials remain glab-owned. The plugin keeps a bounded SQLite cache and
shows refresh errors while preserving previous results. Agent actions create
BB threads; select a project with the correct checkout before using them.

Use `bb oddship-gitlab` for cached lists and fresh detail reads. This plugin has
the unique ID `oddship-gitlab`, distinct from other marketplace integrations.
Repository diffs and merge controls are not included.
