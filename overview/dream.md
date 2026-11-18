Auto-dream never runs in bb, because bb runs Claude Code as SDK sessions; Dream runs the same four-phase pass from bb, for every project with a checkout on the machine you choose.

The schedule ships off. Nothing dreams until you turn it on in the plugin's settings.

## What a dream does

Each dream is a hidden Claude Code thread given Claude Code's dream prompt: orient, gather recent signal, consolidate, and prune and index, keeping MEMORY.md an index under 200 lines and about 25 KB. It also follows Claude Code's rules for memories that contradict CLAUDE.md: it deletes or rewrites what CLAUDE.md supersedes, annotates and reports what looks newer, and never edits CLAUDE.md or AGENTS.md. The thread is stopped and archived when it ends, and its summary goes into the Dream page's history.

- The thread can read anything, but may write only .md files in that project's memory folder. Its shell is limited to ls, find, grep, cat, stat, wc, head and tail, plus rm -f of memory files. Anything else is denied without asking.
- A project's first dream is a dry run on a copy. You apply its proposal or discard it; after that, dreams edit in place, or stay dry runs for every dream with the Always dry run setting.
- The memory folder is backed up before every change, the 20 newest kept per project, and any backup can be restored.
- It checks memories against the newest copy of the project's main branch your repository already has, not a checkout that may be months old, without fetching or touching the checkout.
- When it deletes or renames a memory it fixes the links to it, and any link it leaves pointing at nothing is listed with the run.
- It uses Claude Code's own lock file, so it does not dream a memory that a native dream is working on.
- One push notification after a dream that changed files, with the project and the counts. Nothing when nothing was due or changed.

## When a project is due

Every night between 01:00 and 06:00, the most overdue project first, one at a time, until none is due or the window closes. A project is due after 72 hours and 5 sessions on at least 2 days since its last dream (a project that never dreamed counts all its sessions), and only when nobody worked in it in the last 30 minutes. Sessions are counted across the project's checkout, its bb worktrees and Claude Code's own worktrees. Projects without memory files are skipped, and each project has its own switch. Every number is a setting.

## Memory folders

Each project's memory folder is found as Claude Code finds it, custom autoMemoryDirectory settings included. Dream points out, without touching anything, an old default folder that still holds files beside a custom one, and, in a git repository, a custom folder set only in settings.local.json, which its worktrees do not see unless a .worktreeinclude copies it.

## Using it

The Dream page, whose sidebar entry counts the dry runs waiting for you, lists each project with its memory folder, last dream, sessions since, why it is or is not due, and buttons to dream now, make a dry run, or apply or discard a waiting one, plus the history of dreams with their summaries. The settings choose the window, the thresholds, the machine dreams run on and the model, with bb's own model picker. The bb dream command does the same from a shell: status, run, stop, apply, discard, restore, backups and history.

## Costs and requirements

Each dream is one model run on your Claude Code account; Opus 5.5 at high reasoning to start with. Needs bb 0.49 or newer, Claude Code signed in on the dream machine, and macOS or Linux.
