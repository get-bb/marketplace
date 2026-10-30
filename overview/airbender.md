**Never get lost in vibe coding.**

Airbender keeps your project's issues in a tab beside every agent
conversation, so each agent knows what it is on and you always know what
comes next. Issues live in your tracker, beads inside the repository or
GitHub issues, never in the chat. It works with Claude Code and Codex.

## The problem

Your agent got fast. Your process is still a terminal tab and a good memory.
The work list lives somewhere else, so you stop writing things down. The
agent decides when it is done: it builds before you agreed on what to build,
and commits before you looked. And the reasons die with the chat.

## What you get

- **An issue in one line, without leaving the conversation.** The field at
  the bottom of the tab is always there. `Fix login redirect #bug #p1 $ux`
  sets the type, the priority and the category as you type.
- **A fixed path for every issue.** The agent defines, plans, builds and
  reviews its own work. You approve the definition, the plan and the result.
  Nothing closes until the work is in git.
- **Only the steps an issue needs.** A background agent sizes each issue S,
  M or L. A typo fix reaches you once, at the end; a risky change stops at
  every turn. Or choose the simple workflow and direct the agent yourself.
- **The decision where you are reading.** A line above the message box names
  the issue, its step and what is needed from you; the step's buttons sit
  inside the box.
- **Three issues, three work trees, one clean main.** Start an issue in a
  work tree and a new conversation opens for it on a branch of its own.
- **Epics on Autopilot.** Nest issues under an epic and Autopilot starts its
  ready issues one after another. Every review is still yours.
- **The issue is the record.** Intent in your words, the plan, every decision
  with its reason: written onto the issue as the agent works, so the next
  session can pick it up.
- **Two trackers, switchable.** beads for many agents writing at once, GitHub
  issues for projects that move at human pace. Switch from the tab's menu;
  your issues come with you.

## How it works

The tab and the agents read and change the tracker through `bend`, one
command that works the same on beads and on GitHub issues. Changes made
outside the tab show up in it.

## Getting started

You need BB 0.44 or later on the machine that has the repository. On Linux
and macOS, on Intel/AMD or ARM64, setup downloads the matching `bend` release
and verifies its SHA-256 checksum; Go is not required, and the download
needs `curl` and `sha256sum` or `shasum`. Other platforms can build `bend`
from source with Go 1.24 or later.

Open the Airbender tab, pick beads or GitHub issues, and say yes to setup:
it installs what is missing and adds the rules for your agent, in a terminal
you can watch. Folders on another machine are not supported yet.
