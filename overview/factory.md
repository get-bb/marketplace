## What you get

- **A Factory page in the navigation rail.** See agent status, project alignment and board health, and a task board with PR verdicts. Open cards to read activity and assign specialists; archive, restore or delete factories from the page.
- **Greenfield and Brownfield onboarding.** The factory detects whether the repository is new or existing, scaffolds missing alignment files (`AGENTS.md`, a constitution, architecture and roadmap docs) without overwriting existing ones, and gives the Lead the matching playbook.
- **A Lead you talk to.** Tell it what you want built. It starts specialists: Planner, Builder, QA and Designer. The on-demand Planner writes acceptance criteria and an implementation plan for a task, and no Builder starts on it until the Planner signs off.
- **Automatic pull request review.** When a builder is done, the Lead opens a draft PR. Within about two minutes the factory starts Reviewer 1 and a Security reviewer, plus Reviewer 2 when the diff is large or touches sensitive paths. Each posts an APPROVE or REQUEST CHANGES comment on the PR. The Lead sends all findings to the builder in one message, so fixes land in one push; new commits re-run the Security reviewer and any reviewer who asked for changes, over just the new delta. When every verdict is APPROVE, the factory marks the PR ready for review, which runs your full CI, and warns the Lead if another open factory PR touches the same files. After you merge, the card moves to Done.
- **Optional Rafter security scans.** With a Rafter API key, each PR branch is scanned. The Security reviewer gets the findings for the files the PR changes, plus the full report.
- **An optional shadow reviewer.** Run a second Security reviewer on another model next to the incumbent, for the next N PRs or every sensitive PR. A comparison thread evaluates both against the code.

## How it works

A factory ties one bb project to one project in bb's Tasks tracker, so tasks also appear on the Tasks page. Builders and designers each get their own Git worktree, and QA and reviewers work in the builder's worktree for the same task. In the Agents section of the plugin settings, pick each role's provider (Claude Code, Codex or Cursor), model and reasoning level on one line. The defaults mix Claude Code and Codex, so independent reviewers run on different models.

Agents use the `bb factory` command: `create`, `start`, `doctor`, `init-specs`, `reconcile`, `assign`, `plan-ready`, `verdict`, `block`, `status`, `agents`, `archive`, `restore`, `rafter check` and `shadow compare`. Deleting a factory is only possible from the Factory page. A bundled skill teaches them the flow.

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
