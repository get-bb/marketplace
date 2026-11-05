A **My PRs** page in the bb navigation rail for every pull request (PR) you are part of, with a detail view for each.

## The list

- **Open**, **Review requested** (you or a team you are on), **Reviewed**, **Assigned**, **Merged** and **Closed** tabs with counts, grouped by repository, newest first.
- Each open PR leads with what blocks it: draft, stacked on another PR, merge conflicts, failing CI with the failing jobs named, CI running, changes requested, unresolved comments, or waiting on a review. A coloured stripe shows the worst one.
- **Reviewed** keeps open PRs you reviewed with your verdict, and turns amber when the author pushes after your review or it was dismissed, so you know to look again. A re-requested review moves back to Review requested.
- Search by title, #number, repository or author. Hide repositories per tab (Select all, Deselect all), fold a repository, or Collapse all; both are remembered.
- On Merged and Closed, search and the filter reach your whole history (up to GitHub search's 1,000 results).
- Keys: j and k move between PRs, Enter opens one, / searches. Coming back returns you to where you were.
- A github.com PR link clicked anywhere in bb (an agent's message, a thread's Info tab) opens here, even if it is not in your lists, or on GitHub if it cannot load.

## A pull request

- A header with its state, branches, place in a stack, and blockers as the headline. Previous and Next (or [ and ]) step through the list as you left it.
- **Checks** by pipeline and job, failing first, with error annotations and log links.
- **Files**: a file list beside the diff, syntax highlighting inline or side by side, and threads under their lines. Press + or select line numbers (Shift-click or drag for a range) to comment; post one comment or start a private review and finish it as Comment, Approve or Request changes. j and k move between files, n and p between unresolved comments.
- **Comments**: unresolved first, each with its diff, every reply, who it waits on, and Show in diff. Reply right there.
- **Fix with agent** on each unresolved thread and failed job hands the PR, its branch and the comment or job errors to the bb thread on that branch, or opens a filled-in New thread in that repository's project.
- **Conversation**: description, comments and reviews in order, as Markdown, with a box for yours.
- Close an open PR (with a confirm step) or reopen a closed one.

## Alerts

- Every 5 minutes (you can change this), the plugin checks your open PRs and alerts you when a CI job starts failing or someone else comments or reviews.
- Each alert shows as a bb toast, a count on the **My PRs** icon and a "New since you last looked" list, plus one notification per check through bb's Push notifications plugin (desktop, web, phones).
- The plugin settings (the bell on My PRs) choose what alerts you and how, the interval, review bots to ignore, and send a test. Hiding a repository does not mute its alerts.

## How it works

Requests go to GitHub only for what you open (a tab, a PR, its Files, the history when you filter it) and for alert checks, all from the bb server. Nothing is written to GitHub except what you send. Alerts stay in this plugin's storage on your bb server; notifications pass each alert's headline and PR title to the Push notifications plugin, which can forward them to phones.

## Requirements

- A GitHub account. By default the plugin uses the [GitHub CLI](https://cli.github.com) login on the machine running bb (`gh auth login`), so each user sees their own PRs.
- Or a personal access token: `repo` scope (classic), or Pull requests read and write plus Checks read (fine-grained), authorized for SAML SSO organizations. Write access is used only when you click.
- Alerts run while the bb server runs. Notifications need bb's Push notifications plugin; desktop and web banners appear while a bb window is open.
- github.com only; GitHub Enterprise Server is not supported yet.
