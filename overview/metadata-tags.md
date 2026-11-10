## What you get

- A colored tag under every thread's title in the sidebar, showing the project the thread belongs to.
- One stable dot color per project, so threads from the same project read as a group at a glance.
- A colored pull request glyph beside the tag: bb's own git icons (draft, open, checks passing or failing, conflicts, merged, closed), tinted by state — no new icon vocabulary, and the shape reads even without the color.
- A changed-files tag on threads whose environment holds uncommitted edits: bb's file-diff glyph with green insertions and red deletions, GitHub-style. Untracked files count too. The tooltip lists each file with its git status.
- All appear in every sidebar organization — chronological, project, section, or machine — next to other row metadata such as bb's built-in pull request badge.

## When to use it

Switch the sidebar to the chronological list and you lose the project group headers: with many projects, rows stop identifying their project. This plugin puts the project back on each row, so a flat list stays readable. It also tells apart same-named threads that belong to different projects.

## How it works

The plugin registers three thread-row metadata items. Project names come from the sidebar's own live project state; pull request states come from the GitHub PR Status plugin that ships with bb, and working-tree changes from the git plugin that ships with bb, both through their public data interfaces. There is no extra fetch of your repositories and no network request beyond what bb already makes; the only stored data is your hidden-project list, in bb's local plugin storage. Rows whose project cannot be resolved, or whose environment has no pull request and a clean working tree, draw nothing.

The pull request glyph needs the GitHub PR Status plugin enabled; it is on by default. The changed-files tag shows the same working tree the Git panel inside a thread shows — uncommitted and untracked files — and clears once those changes are committed or stashed.

## Settings

Every item is optional and configurable in Settings → Plugins (or `bb plugin config metadata-tags`):

- `showProjectTag`, `showPrState`, `showChanges` toggle each item.
- `projectDotColors` picks a stable per-project color or one fixed color.
- A *Hidden project tags* section lists every project with a checkbox — check any number of them, the personal project included, to hide their tags.
- `prColorScheme` and `changesColorScheme` switch between state colors and a muted, theme-following look.
- `changesIcon` picks the changed-files glyph from bb's icon set.

## Requirements

The thread-row metadata line is experimental in bb 0.48+. Turn both of these on:

```sh
bb settings experiment threadRowMetadata true
bb thread-list prefs set showRowMetadata true
```

Organize → Rows → Metadata in the sidebar is the same toggle as the second command. No external services and no accounts are needed.
