## What you get

- **A Factory page in the left navigation rail.** The top row shows every agent in the factory with its live status: working, needs you, idle or error. Below it is a board with Backlog, To do, In progress, In review, Done and Blocked columns. Move cards between columns, add tasks, or open a task to read its activity, see its pull request, and assign it to an agent.
- **A Lead you talk to.** Tell it what you want built. It reads the repository, writes tasks with acceptance criteria, and starts specialists: Builder, QA and Designer. Each specialist is a child thread of the Lead, so the Lead hears when it finishes.
- **Automatic pull request review.** When a builder is done, the Lead opens a draft PR. Within about two minutes the factory starts Reviewer 1 and a Security reviewer, plus Reviewer 2 when the diff is large or touches sensitive paths. Each posts an APPROVE or REQUEST CHANGES comment on the PR. New commits re-run only the reviewers who asked for changes. When every verdict is APPROVE, the factory marks the PR ready for review, which runs your full CI. After you merge, the card moves to Done.
- **Optional Rafter security scans.** With a Rafter API key, each PR branch is scanned. The Security reviewer gets the findings for the files the PR changes, plus the full report.
- **An optional shadow reviewer trial.** Run a second Security reviewer on another model next to the incumbent, with no vote. It covers the next N PRs or every sensitive PR. Afterwards a comparison thread checks both reviewers' findings against the code and recommends which to keep.

## How it works

A factory ties one bb project to one project in bb's Tasks tracker, so tasks also appear on the Tasks page. Builders and designers each get their own Git worktree, and QA and reviewers work in the builder's worktree for the same task. Choose Claude Code, Codex or Cursor for each role in the plugin settings. The defaults mix Claude Code and Codex, so independent reviewers run on different models.

Agents use the `bb factory` command: `create`, `start`, `assign`, `verdict`, `block`, `status`, `rafter check` and `shadow compare`. A bundled skill teaches them the flow.

## Requirements

- A Git repository added to bb as a project.
- Accounts for the agent CLIs you pick per role, such as Claude Code, Codex or Cursor. Each agent uses its own subscription or API quota, and a factory runs several at once.
- For PR review: a GitHub remote and the `gh` CLI signed in on the machine that holds the project. The factory only reviews same-repository PRs that your `gh` account opened.
- Optional: a Rafter account (https://rafter.so). Scans send the PR branch to Rafter's servers and use your scan quota, two scans per PR.

## Safety

- Agents never merge. Merging stays your decision.
- New agents start in bb's auto permission mode, so commands outside the sandbox ask for your approval. Setting Agent permissions to full removes every approval: agents can then run any command on the machine.
- A verdict counts only when the reviewer thread the factory started for that PR records it, so a builder can't approve its own work.
- The plugin's host worker runs only `gh pr list`, `view`, `ready` and `comment`.
- Rafter output and PR content are passed to reviewers as untrusted data.

## Credits

The role prompts and team culture are adapted from OpenRig (https://github.com/mvschwarz/openrig), under the Apache License 2.0.
