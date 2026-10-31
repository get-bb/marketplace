A **My PRs** page in the bb navigation rail for every pull request you are part of, with a detail view for each one, so you stop opening GitHub tab by tab.

## The list

- **Open**, **Review requested** (from you or a team you are on), **Assigned**, **Merged** and **Closed** tabs with counts, grouped by repository, most recently updated first.
- Each open pull request leads with what blocks it: draft, stacked on another pull request, merge conflicts, failing CI with the failing jobs named, CI running, changes requested, unresolved comments, or waiting on a review. A coloured stripe shows the worst one. A pull request with nothing blocking it says so.
- Search by title, #number, repository or author. Hide repositories with a per-tab filter (Select all, Deselect all), fold a repository's group, or Collapse all. Hidden and folded repositories are remembered.
- On Merged and Closed, search and the repository filter reach your whole history, up to the 1,000 results GitHub search returns.
- Keys: j and k move between pull requests, Enter opens one, / searches. Coming back from a pull request returns you to where you were.

## A pull request

- A header with its state, branches, its place in a stack, and its blockers as the headline. Previous and Next (or [ and ]) step through the list as you left it.
- **Checks** by pipeline and job, failing first, with error annotations and log links.
- **Files**: a file list beside the diff, syntax highlighting inline or side by side, and review threads under their lines. Press + or select line numbers (Shift-click or drag for a range) to comment. Start a private review or post a single comment, then finish as Comment, Approve or Request changes, or discard it. j and k move between files, n and p between unresolved comments.
- **Comments**: unresolved first, each with its diff, every reply, who it waits on, and Show in diff. Reply right there.
- **Conversation**: the description, comments and reviews in order, as Markdown, with a box for your own comment.
- Close an open pull request (with a confirm step) or reopen a closed one.

## Alerts

- Every 5 minutes (you can change this), the plugin checks your open pull requests and alerts you when a CI job starts failing or someone else comments or reviews.
- Each alert shows as a bb toast, adds a count to the **My PRs** icon, and waits in a "New since you last looked" list. Allow desktop notifications in the plugin settings for a system banner too.
- In the plugin settings (the bell on My PRs), choose what alerts you and how, change the interval, or list review bots to ignore. GitHub bot accounts are skipped already. Hiding a repository in the list does not mute its alerts.

## How it works

Requests go to GitHub only for what you open: one GraphQL request for the tab you open (with every tab's count), one for a pull request, one REST request when you open its Files tab, the Merged or Closed history only when you search or filter it, and one per alert check. All are sent from the bb server. Nothing is written to GitHub except what you send. Alerts and their state stay in this plugin's storage on your bb server.

## Requirements

- A GitHub account. By default the plugin uses the [GitHub CLI](https://cli.github.com) login on the machine running bb (`gh auth login`), so each user sees their own pull requests.
- Or a personal access token in the plugin settings: `repo` scope for a classic token, or Pull requests read and write plus Checks read for a fine-grained one. Write access is used only when you click to comment, reply, review, close or reopen. For organizations that enforce SAML SSO, authorize the token for them, or their pull requests will be missing.
- Alerts run only while the bb server runs; desktop banners appear only while a bb window is open.
- github.com only; GitHub Enterprise Server is not supported yet.
