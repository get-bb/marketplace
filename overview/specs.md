Keeps living documents beside your work and puts them in front of the agents
that need them, without adding a second place to look.

## What you get

**One store, any project.** A spec links to any number of projects and lives in
the plugin's own store, so it survives branches, worktrees, and new checkouts.

**Context without flooding.** Every project thread receives a compact index of
its specs: pinned documents always, changed documents when they changed, and a
few recent documents for fresh threads. Full text is pulled with `specs_read`,
so a fifty-spec project adds a handful of lines, not fifty pages.

**Comments on the words.** Select a quote and leave a comment. Open comments
come back from `specs_read` as review feedback, and replies stay attached to
the exact text.

**Chat that can edit.** Each spec has its own BB thread. The agent reads the
spec before answering, applies agreed changes with `specs_write`, and a
revision check reports a conflicting edit instead of overwriting it.

**A calm document page.** Icon, inline project and status properties, markdown
editing with autosave, a comments rail, and highlights on annotated text.

## How agents use it

Threads expose `specs_search`, `specs_read`, `specs_write`, `specs_create`,
`specs_annotate`, `specs_attach`, `specs_detach`, and `specs_delete`, plus the
`bb specs` command line for scripts. The thread action **Spec context** shows
exactly which specs a thread receives and lets you attach or exclude one.

## Requirements

BB 0.43 or newer. Everything runs inside your BB install: no account, no
external service, no extra install.
