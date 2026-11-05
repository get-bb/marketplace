See what each PR is waiting on and act without leaving bb. GitHub works out of the box; GitLab and other servers use command adapters.

## Five areas

- **Inbox:** the decisions waiting on you, one row per PR under what to do with it, with what changed since you last opened it marked. Search, group and sort it. Snooze a PR until later today, tomorrow, next week or until it changes, dismiss it for good, or keep out every PR by an author, from a repo, or mentions where you are not asked; the Snoozed and Dismissed tabs list them, with the way back. The Reviewing tab lists your reviews on their way to their servers and the PRs an AI review is running on, with the way to each thread.
- **My PRs:** your open PRs grouped by their next step or shown in a sortable list, followed by merged and closed PRs. Checks, reviews and agents stay beside each PR.
- **Reviews:** requests from people and teams, mentions and tracked PRs, grouped by where your review stands, plus every PR you reviewed, even merged. Filter by team, hide bots and quiet PRs.
- **Boards:** saved PR sets for a release, project or handoff, across repositories and servers.
- **Insights:** review and merge times, feedback handled by agents, AI review results, auto post's shadow record and the automation log. Sync explains failed steps.

## Saved PR boards

Create a board or save selected PRs from a list. Add members by searching Shuttle or pasting links and keys, filter the set, duplicate it, or remove members with confirmation and Undo. A PR can belong to several boards. Status stays live; merged and closed PRs remain until removed.

Archive a board without losing its PRs, then restore it before editing membership. Its activity log folds to its heading. Board membership never assigns agents or changes review tracking or feedback delivery.

## Work with agents

A PR's agent thread gets new reviews, comments and failed checks. Choose Fix it, Just tell it or Off. Auto agent, off by default, can find the thread on your PR's branch. Threads report which feedback they fixed, replied to or declined.

Start reviews from presets for the skill, model and workspace, or enable auto review. Reviewers hand back a draft and notes only you see; choose its findings and verdict before posting. A review stays open while its critics work. Auto post, in shadow mode for repos you pick, records which drafts it would post, checked against critic votes, quoted code and a fast verifier. Finished review threads are archived and revived for the next review.

## Act on PRs

Each PR's view says what it is, where it stands and what happens next in one card, then shows the rest in tabs: an overview, your review, the conversation with open threads first, every check, a summary of its commits and files, and its history. Open it as a full page, or put it on boards from there.

Git links in thread messages show what they point at on hover: a PR, a comment with its code, a commit, a check, or an issue with the PRs that close it. Open the PR in Shuttle on the right tab from there. Shuttle draws with your bb theme's own colours.

Merge, comment, reply, resolve, request reviewers, manage labels and post reviews as yourself. Merges and reviews run in the background, in order on each server, so a slow server never keeps you waiting; My PRs and the Inbox's Reviewing tab list them until done. A thread's Shuttle tab shows its PRs in full. Search cached PRs or paste a link. Layouts adapt to phones and narrow windows; lists remember their scroll, sort, filters and folds.

## Setup and tools

GitHub uses your authenticated `gh` CLI. Configure other servers with commands that print JSON. Settings cover servers, review machines, presets, automations, agents and TOML import/export.

Agents use `shuttle_link`, `shuttle_prs`, `shuttle_review_draft`, `shuttle_review_done` and `shuttle_feedback_done` for PR work, and the six `shuttle_board*` tools for saved sets. `bb shuttle` offers the same operations from the command line.
