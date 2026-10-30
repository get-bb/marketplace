## What you get

Follow commit history beside the thread you are working in. Colored lanes show how commits connect, with labels for branches and tags. Each row includes the commit message, author, and relative time.

The graph loads 50 commits at a time as you scroll, up to the newest 200 commits across local and remote refs. Refresh the panel to read the repository again.

## How it works

Open a thread backed by a Git repository and select **Graph** in the thread header. Git runs in that thread's environment, including environments on another connected machine.

When additional repositories are configured for the workspace, use the repository selector to switch between them.

Agents and terminals can inspect the same history with `bb git-graph show`.

## Requirements

Requires BB 0.47.1 or newer, Git in the thread's environment, and npm for installation from Git. No external account, API key, or paid service is required. The graph reads repository history without changing commits, branches, or files.
