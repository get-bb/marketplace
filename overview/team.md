## Organize work by role

Create a lead and executors from a reusable template, select installed providers
and models, and address each employee by role. Team keeps the current thread,
environment and execution history when a session changes.

## What you get

- Beads as the project task tracker, or the built-in tracker for small projects.
  Teams share the selected tracker; there is no silent fallback or duplicate list.
- English/Russian settings, a default-template list, a shared model picker and
  starter prompts. Built-in templates are read-only; duplicate them to customize.
- Structured review reports and acceptance grounds. Executors cannot accept their
  own work; the lead accepts or returns it with a concrete remark.
- Saved checkpoints and safe session replacement that reuses the environment and
  unfinished files. Context-triggered rotation uses reliable reported metrics.
- Finite task attempts and team start budgets, including helpers and retries.
  The Resources panel shows holds, outcomes and available cumulative usage.
- Explicitly approved backup models for confirmed quota errors. Automatic handoff
  requires a refused next input and a verified checkpoint/history; uncertain state
  stops for inspection instead of repeating work.

## Requirements and limits

Requires BB 0.49 and SDK 0.6.132 or newer. Beads mode requires the `bd` CLI
(tested with 1.3.1) on the project's source host. Team prepares a missing database
in the canonical checkout. Existing built-in tasks are not migrated automatically.
Models run through your configured providers and may use their credits or plan.
A model catalog entry does not prove that it is free.

Budgets gate subsequent starts; active operations are not interrupted. Unknown
usage is not zero, and Team does not guarantee a hard monetary limit or control
provider-internal retries and BB's explicit policy overrides.

## Getting started

Open Team, select a project and create a team from a template. Give its lead a
normal goal; its persistent instructions cover planning, delegation and review.
Use `bb team report` for a digest and `bb team doctor` for configuration checks.
AI prompt generation is deferred until BB provides a suitable text-only API.
