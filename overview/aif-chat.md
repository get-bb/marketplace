## What you get

- Open the persistent AI Factory panel from the thread header to choose a plan, see completed tasks and launch the next step.
- Follow AI Factory or AIFHub classic, OpenSpec and legacy ultra workflows with separate task progress and check results.
- Without a project installation, use the bundled research → Markdown plan → implementation → verification → commit flow. Install AI Factory through a separate button when you want its full workflow.
- Run rules, security, review, QA, quality and CI actions beside their check rows. Optional navigation preserves project-required gates.
- Launch commands suggested in the last agent reply. Both `$aif…` and `/aif…` are recognized, the fixed `aif-mode sync` subcommand is retained, and each suggestion can be dismissed independently.
- Inspect CLI, project, Git and extension versions. Matching versions move update buttons into the version details; version probes use a daily cache.

## How it works

Opening a panel reads status. Each action sends one scoped request to the agent in the same thread, using its ordinary permissions and provider quota or billing. Busy threads and pending questions prevent another launch. Draft text is preserved.

Gate results show PASS, WARN or FAIL, blockers and the suggested next action. Historical results and report files remain distinct from current verification. The helper does not manufacture evidence, mark tasks complete or run the next stage automatically.

Basic plans live in `.bb-aif-helper/plans/`. Installation reuses an existing CLI where available and preserves these files; it does not automatically migrate plans or add extensions.

## Requirements

Requires BB 0.48+ and a compatible Plugin SDK runtime, 0.6.104+. The interface is currently in Russian. Verified on Windows; other operating systems have not been separately qualified.

The bundled workflow needs no AI Factory installation. Full AI Factory/AIFHub actions require their separately installed project skills. Actions use your configured BB agent; its provider may require an account or payment. Git-backed commit actions require Git.

[Documentation and source](https://github.com/ichinya/bb-aif-helper)
