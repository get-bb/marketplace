A **My PRs** page in the bb navigation rail for every pull request (PR) you are part of, with a detail view for each.

## The list

- **Open**, **Review requested** (you or a team you are on), **Reviewed**, **Assigned**, **Merged** and **Closed** tabs with counts, grouped by repository, newest first.
- Each open PR shows +/- lines and leads with what blocks it: draft, stacked on another PR, merge conflicts, failing CI with the failing jobs named, CI running, changes requested, unresolved comments, or waiting on a review. A coloured stripe shows the worst one.
- **Reviewed** keeps open PRs you reviewed with your verdict, and turns amber when the author pushes after your review or it was dismissed, so you know to look again. A re-requested review moves back to Review requested.
- Search by title, #number, repo or author. Hide repos per tab, fold a repo, or Collapse all; all remembered.
- On Merged and Closed, search and the filter reach your whole history (up to 1,000).
- Keys: j and k move between PRs, Enter opens one, / searches; coming back keeps your place.
- A github.com PR link clicked anywhere in bb opens here, even if it is not in your lists, or on GitHub if it cannot load.

## A pull request

- A header with its state, branches (click to copy), +/- lines, reviewers, labels, place in a stack, and blockers as the headline; a pencil edits the title. [ and ] step to the previous and next PR.
- **Overview** first: the description (a pencil edits it), then comments and reviews, with a box for yours.
- **Checks** by pipeline and job, failing first, with error annotations and log links.
- **Files**: a file list beside the diff, syntax highlighting inline or side by side, and threads under their lines. Press + or select line numbers (Shift-click or drag for a range) to comment; post one comment or start a private review and finish it as Comment, Approve or Request changes. j and k move between files, n and p between unresolved comments.
- **Commits** with CI, marking those since your review.
- **Comments**: unresolved first, each with its diff, every reply, who it waits on, and Show in diff. Reply, or delete your own.
- **Fix with agent** on each unresolved thread and failed job sends the comment or job errors to the bb thread on the PR's branch, or a filled-in New thread in its project (matched by git remote or name).
- A menu to link the PR to a thread, ask about it, explain it, fix all findings, copy it or close it.
- Jira keys open in bb's My Jira plugin when it runs, else on your Jira site.
- Mark your draft Ready for review (or back), close an open PR (with a confirm step), or reopen one.

## Alerts

- Every 5 minutes (adjustable), the plugin checks your open PRs and alerts you when a CI job starts failing or someone else comments or reviews.
- Each alert shows as a toast, a count on **My PRs** and a "New since you last looked" list, plus one notification per check through bb's Push notifications plugin.
- The settings (the bell on My PRs) pick what alerts you and how, the interval and bots to ignore.

## How it works

Requests go to GitHub, from the bb server, only for what you open and for alert checks. Nothing is written to GitHub except what you send. Alerts stay on your bb server; notifications pass each alert's headline and PR title to Push notifications, which can forward them to phones.

## Requirements

- A GitHub account. By default the plugin uses the [GitHub CLI](https://cli.github.com) login on the machine running bb (`gh auth login`); with several gh accounts, pick one on My PRs.
- Or a personal access token: `repo` scope (classic), or Pull requests read and write plus Checks read (fine-grained), authorized for SAML SSO organizations. Write access is used only when you click.
- Alerts run while the bb server runs. Notifications need bb's Push notifications plugin; desktop and web banners appear while a bb window is open.
- github.com only; GitHub Enterprise Server is not supported yet.
