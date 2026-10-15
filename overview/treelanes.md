Each task gets one Git worktree, one card on the board, and its own agents. You agree on the design, the agents build and review, and you merge a pull request that is ready.

## What you get

- **Board**: one card per Git worktree, with its unsettled threads. Cards move through Tickets, Design, TDD, Quality Loop, Simplify and PR Watch to Done. Code Review has its own lane.
- **Sidebar**: one Main Thread per worktree, with the worktree's other threads below it. Settle a thread to take it off the board, or snooze it until later.
- **Task map**: a Settings section that sets the harness, model and effort for each step of each task kind. The board rejects a plan that differs from a saved choice.
- **Delivery skills**: `/delivery`, `/grilling`, `/tdd`, `/simplify`, `/babysit-pr` and the skills they use ship with the plugin.

## How it works

```text
/delivery Add a CSV export to the notes list
  Design        the agent asks until the plan is clear; you accept it
  TDD           tests first, then the code
  Quality Loop  strict review and fixes, until no findings
  Simplify      remove needless code
  PR Watch      open the pull request, fix checks, answer reviews
  Done          you merge
```

A stage moves on only when its worker sends a Completion Receipt: passing checks bound to the task revision and the current files. A failed turn retries in the same thread, at most twice. The board keeps every step through a bb restart.

## Agent tools

Agents use `treelanes_deliver`, `treelanes_get_context`, `treelanes_complete_stage`, `treelanes_move_card` and the other `treelanes_*` tools. People use `bb treelanes`; `bb treelanes help` lists every command.

## Requirements

- bb 0.43 or later, and Git.
- At least one agent harness, such as Claude Code or Codex. Agent work counts against that harness's account and usage limits.
- The GitHub CLI (`gh`), signed in, for PR Watch.

Source, docs and issues: https://github.com/ahmedhesham6/bb-plugin-treelanes
