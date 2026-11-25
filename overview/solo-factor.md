Run tickets through a pipeline of independent agents, in swimlanes, and get asked only for decisions.

## What you get

- Three pages in the navigation rail: **Inbox**, **Swimlanes** and **Agents**, plus settings for who plays each role.
- Swimlanes that work one ticket at a time per lane and run lanes side by side, up to a limit you set.
- A pipeline where every stage is a fresh thread in the ticket's own worktree, on the model chosen for that role.
- An inbox for founder decisions, stalls and failures. Answers go back to the thread that asked.
- Standing agents (Architect, Mechanic, Observer, Deployer, Integrator, Cleaner) as pinned threads with a memory file in your repo.
- Bundled, editable process skills for planning, plan review, building, code review, shipping and diagnosing bugs, and an onboarding skill that fits the factory to your project.

## How it works

Start the Mechanic and ask it to set the factory up: it reads your project and writes a `FACTORY.md` profile. Then queue a ticket in a lane. The factory starts the first stage; when the agent reports the stage done, the next stage starts. A review that requests changes sends them to the author's thread. Agents that stop without reporting are reminded once, then flagged to you.

## For agents

Factory threads get `factory_stage_done`, `factory_ask_founder`, `factory_ask_owner` and `factory_message`; standing agents also get `factory_enqueue` and `factory_status`. Everything is also available as `bb solo-factor`. Scripts installed into your project enforce the rules that matter: which plan belongs to a branch, that a review covers the exact commit being shipped, and whose turn it is to merge. The bundled `factory` skill explains the protocol.

## Requirements

bb 0.49 or later, a Git project, and at least one agent provider. Agent work uses your providers' own accounts and limits.
