Run a software project with agents. A planner turns your goal into a spec and a ticket board, workers build each ticket in its own git worktree, separate reviewers approve the work or send it back, and approved work merges into an integration branch or opens as pull requests. You follow and steer it from the Loom page in bb's left navigation, or with `bb loom`.

## What you get

- Planning from any thread with the `loom-plan` skill, or from New project on the Loom page. The planner asks its questions (Ask User Question rounds, one question at a time on its page) and proposes a spec: tickets with acceptance criteria, check commands, a review policy and a merge plan.
- A spec review before you see it: a separate agent checks the spec against your request and for work the goal does not need.
- Spec review without reading TOML: how it runs, the tickets by wave and the goal, opening on what changed since the last version. Click any part to comment on it or suggest a value ("+ note" on files), and the planner gets every comment in one message.
- Workers that start by themselves, one per ready ticket in its own worktree, once its dependencies are done and its files clear the work in flight. Loom, not the agent, commits, runs your checks and decides whether the work passed.
- Reviewers on their own model that approve or send numbered findings back. A ticket merges only after the review you asked for and the `after_merge` checks on the merged result.
- Two ways to ship: an integration branch you read on the Changes tab and land as one pull request, or straight onto the base with `--direct`; or one pull request per ticket that the worker writes and Loom follows through CI and review. A dependent ticket stacks on its dependency's open pull request instead of waiting for the merge.
- Projects across repos: list bb projects as `[[repo]]` tables, and each ticket runs in one, with that repo's checks and integration branch.
- A Loom page: a home table that puts what needs you first, a next-step bar with the one button you need now, a board with a row per stage, a ticket page with every attempt, check, review and merge, an Agents tab, and an Insights tab that says how the project went, when its work happened and what happened to each ticket, with the numbers beside the story.
- A timeline on every project: rewind the page to any moment or play it back.
- Blocked tickets go to the planner in a triage round, and your reply on one reaches it at once. The Loom icon in the navigation rail counts what needs you.
- `bb loom metrics`, `feed` and `report` print the numbers, the events and a finished project's record. A done hook sends that record, or an agent's summary of it, to a command you choose.

## How it works

Every change appends an event, in the same transaction, to a log that refuses edits, so the metrics computed from it are exact. Agents get narrow tools for their role and never merge or push. On the integration strategy the branch stays local until you land it; on the pull request strategy Loom pushes the reviewed work, never with force, and you merge. A worker's pull request comments come from your account, so each ends with a signature line, "Posted by Loom" unless you change it in Loom's settings. Every button that changes something asks for a second click and is logged as your action.

## Requirements

- `git` on the machine that has the project's checkouts.
- `gh`, signed in, for GitHub pull requests; for another server, the commands you set in the spec's `[merge.forge]`.
- Provider usage: every planner, worker and reviewer is an ordinary bb thread, so your providers' limits apply to them. A token budget or a deadline in the spec has Loom pause the project for you.
