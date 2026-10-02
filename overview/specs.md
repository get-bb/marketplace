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
spec before answering. One Send action continues the conversation; proposed
changes are reviewed before applying. Revision checks protect intervening edits.

**Research that returns to the document.** Reports sit beneath their parent.
Settling their questions automatically prepares a parent update to review;
applying it links the report to the resulting parent revision.

**Diagrams in the spec.** Mermaid blocks render in place. Edit their source with
a live preview or discuss a diagram in the spec chat to iterate on it.

**Draft at your cursor.** Type `@agent` in the editor, describe what belongs
there, and review the proposed insertion. Existing text and revision checks
keep the document under your control.

**One editable document.** Click and type with autosave; no Edit/Done step.
Formatting, comments, agent requests, and diagram previews share the same
document, with revision checks and draft recovery.

## How agents use it

Threads expose `specs_search`, `specs_read`, `specs_write`, `specs_create`,
`specs_annotate`, `specs_attach`, `specs_detach`, and `specs_delete`, plus the
`bb specs` command line for scripts. The thread action **Spec context** shows
exactly which specs a thread receives and lets you attach or exclude one.

## Requirements

BB 0.43 or newer. Everything runs inside your BB install: no account, no
external service, no extra install.
