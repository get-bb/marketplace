See every merge or pull request the current thread created, with live state,
pipeline status and a clickable link, in the thread context card and the Info
tab, and from the `bb session-mrs` command.

## What you get

- A **Merge requests** section listing each GitLab MR or GitHub PR the thread created,
  with a Draft / Open / Merged / Closed chip and a pipeline result.
- `bb session-mrs list` and `bb session-mrs status <url>` for agents.

## How it works

Status comes from the `glab` and `gh` logins already on the machine that runs
the BB server. The plugin is read-only and stores nothing.
