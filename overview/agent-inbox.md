## What you get

The sidebar gets two tabs. **Inbox** lists only the threads that need you. **Threads** keeps bb's full list: pinned threads, custom sections, projects, machines, worktrees and nested child threads.

Each Inbox item carries one word for what it needs:

- **answer**: the agent ended its turn with a question for you, or is waiting on a question form.
- **approve**: the agent is waiting for you to approve a command, a file change, a tool call or a plan.
- **failed**: the turn ended in an error.
- **verify**: the agent finished with a diff or a pull request to check.
- **fyi**: the agent finished with a report and nothing to check.

Items sit under **New for you** until you open them, then move to **Seen**. Threads that are still working collapse into one running count at the bottom, so they stay out of the list until they need you.

## Clearing items

- Tap a **verify** item to see its diffstat and pull request checks. **Verify** records your sign-off on the bb server, which clears the item on every device you use bb on.
- **Later** hides an item without verifying it. It comes back when the thread has something new.
- Opening an **fyi** item clears it.
- When a child thread asks you something, it gets its own item that names its parent. A child that only reports folds into its parent's item.

## Spotting questions

By default a plain rule decides whether a turn ended with a question for you, and no tokens are spent. In Settings → Installed plugins → Agent Inbox you can pick a model instead. That model reads each turn end through a provider you already signed in to, which spends tokens on that provider. If the model fails or times out, the plain rule decides.

## Setup

Agent Inbox replaces bb's built-in thread list. After you install it, choose **Agent Inbox** under Settings → Appearance → Sidebar. Its layout preferences are kept apart from the built-in list's, so switching back leaves those as they were.
