## What you get

- A **Viewed** checkbox on each file in bb's changes panel. Check a file and it collapses and dims, so the files still open are the ones you have not read.
- A count in the toolbar, such as **3/6 viewed**, across every file in the range.
- **Only unviewed** in the range dropdown, which hides the files you have viewed.
- Marks that clear themselves when a file's diff changes, so a rebase or a new hunk opens the file again.
- On a thread with an open pull request, the same mark as GitHub's Viewed box, both ways. A file with edits you have not pushed is marked **Local** and goes to GitHub once a push makes the diffs match.

## How it works

A mark is kept per thread on this machine, keyed on the file's path and its `+N -M` counts. GitHub sync uses your `gh` sign-in: one query when the panel opens or the window regains focus, and one call per mark you change.

## Requirements

bb 0.41 or later. GitHub sync needs `gh` signed in, and can be turned off with the **Sync with GitHub** setting.
