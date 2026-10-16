Describe a plugin in a few sentences and follow it to a working, installed plugin without writing the code yourself. Each stage's agent writes its result to a file in the plugin's git repository and waits for your button.

## What you get

- A **Plugin Workshop** board in bb where each card is a plugin, from Context to In production and Retired.
- **New plugin** and **Rework** forms. A work gets a task in bb Tasks, its own branch and worktree, and a page with the stage files and a chat with the current agent.
- Seven stages: Context, Feasibility (a verdict plus a checklist of keys, accounts and decisions only you can provide), Spec (a plan with a post-rollout check), Mockup (an HTML mockup of the section in bb's look, with screenshots), Implementation (task by task with subagents), Verification (tests, typecheck, build, a report) and Rollout (install plus a live check).
- Reviews by zero to two reviewer models on the spec and on the branch, started automatically.
- A choice of provider, model and reasoning level for each group of agents, per work.
- A read-only CLI: `bb plugin-workshop list` and `bb plugin-workshop show <id|KEY>`.

## How it works

Every hand-over passes gates: blockers (a missing verdict, a red verification, too little disk) cannot be skipped, warnings can be accepted. A document edited after approval is flagged as stale. A red report sends the work back with one click.

**Roll out** records an attempt and runs it step by step under a shared build lock: a rollback point in git, the working copy's `main` moved to the work commit, dependencies, the bb install job, a check against bb's plugin list. A restart resumes from the record; an unknown outcome is not repeated automatically. **Accept** closes the work, **Roll back** restores the previous commit and enabled state (closed when the work adds data migrations), **Adopt as rolled out** brings a manual edit under the same rules.

Optional GitHub mode (setting `githubOwner`): a private `<owner>/bb-plugin-<id>` repository per plugin and a pull request from Implementation on. The work branch and, after **Accept**, `main` are pushed only there, after a key scan of the new commits.

## Autopilot

Start it on the Context stage, with notes on what matters to you. An orchestrator thread runs the work to the end through three Workshop tools, with the same gates as the buttons. It approves the mockup against the spec, sends red reports back, rolls out, accepts on a green live check and writes a report into the task. Hard stops its `force` cannot lift: an impossible verdict, open or missing owner items before Implementation, in GitHub mode a current commit not cleared by the key scan, a red live check. It also stops after a third red check in a row, 150 actions or 24 hours. Any button you press on the work pauses it.

## Requirements

- bb 0.46 or later, with the bb server on Linux: the plugin runs `git`, `flock`, `pgrep` and `npm` there.
- bb Tasks, with a project chosen in the `tasksProject` setting.
- The Claude Code provider for the default agents and the implementation subagents; Codex for the default second reviewer (or pick others, or none).
- Agent usage: each work runs several agent threads, billed to your provider plans or API keys.
- Optional: the GitHub CLI `gh`, signed in on the bb server, and git 2.31+, for GitHub mode.

## Security

A full-trust plugin. Its agents, the orchestrator included, run with full permissions on the bb server; a worktree is not a sandbox. Anyone with bb access — you, the CLI, an agent — can call its actions; other plugins can only read. Plugin code and agent replies are untrusted input to the models. The key scan is a heuristic (patterns and file names) and refuses to push when it cannot complete; key files stay out of snapshots. Mockup previews are sandboxed, with network requests blocked by CSP; a script can still navigate its frame (see the README). Your requests, documents and code go to the model providers you choose.
