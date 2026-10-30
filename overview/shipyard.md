## What you get

- A **Shipyard** page with six columns: Ideas, Brainstorm, Queue,
  In Progress, Human Review, and Done. Switch to a List view at any time.
  Moving a card is a command: drop it in Brainstorm to shape it, in Queue to
  schedule it, or in In Progress to run it now.
- Quick capture. Type an idea at the top of Ideas and press Enter.
- Brainstorms. An agent asks you questions in its thread and writes the spec
  with you. Then you choose "Queue it" or "Save for later".
- One bb thread and git worktree for each task. You can open the thread to
  watch the agent or type to it at any time.
- A short triage turn for each task. It picks the model tier, the effort, and
  whether the agent plans first. On Claude Code, a one-line fix runs on Haiku
  and a cross-module change runs on Opus.
- An optional plan stage. Set it per task (Auto, Always, or Skip) or per
  project. Turn on plan approval to approve or change each plan before any
  code.
- Skills by stage. For example, load `ce-plan` in Plan or `hallmark` in Build.
  Set defaults, override them per project, and add skills to one task.
- Agents that ask when they are stuck. An agent that needs a secret or a
  decision stops the task with its question, and your answer continues the
  same stage.
- A validation step before your review. The agent runs the project's checks,
  reviews its own diff with fresh eyes, and fixes correctness problems. The
  task panel shows the checks, the findings, and a summary for you.
- Review actions in the task panel: request changes (the same session
  continues), create a pull request, merge it, or mark the task done.
- Settings on the page, for one project or for all projects.
- Project lessons. When your feedback shows a lasting preference, the agent
  records it, and every later task follows it. You can add lessons yourself.

## How it works

Shipyard runs up to three tasks per project at once by default. The others
wait in Queue. Each running agent sees the files that the project's other open
tasks change, so it avoids edits that would conflict at merge time.

A rate-limited turn retries when the provider's limit resets. If a merge has
conflicts, the agent merges the base branch into its branch, resolves the
conflicts, pushes, and Shipyard merges again.

Any thread in the project can drive the board with the `bb shipyard` command,
for example `bb shipyard create "Add CSV export" --start` or
`bb shipyard idea "Dark mode"`. A bundled skill
teaches agents these commands.

Tasks are stored on your bb server. Agents run through the providers and
accounts you already use in bb, so each task spends tokens on your plans.

## Requirements

- A bb project with a git repository.
- Pull requests and merges need a GitHub remote and the GitHub CLI (`gh`) on
  the machine that holds the project.
- Model selection by tier works on Claude Code. Other providers keep their
  default model, and triage changes only the effort.
