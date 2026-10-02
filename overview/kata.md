## What you get

A viewer for the local [kata](https://www.katatracker.com) issue tracker that
lives inside bb, modelled on `kata tui`. You choose which kata projects appear
as tabs; each tab keeps its own selection, filter and status view, and shows the
issue list on the left with the full issue detail on the right. The detail pane
carries the body, labels, owner, parent, children, blockers, related issues and
comments. Everything stays current from the kata daemon's event log, so an issue
created in a terminal shows up in the panel about a second later.

## Keyboard

The list takes focus when you open it, and `?` lists every binding.

- Move with `j` / `k` or the arrows, `g g` / `G`, `PgUp` / `PgDn`.
- `[` and `]` switch tabs; `alt-[` / `alt-]` reorder them and save the order.
- `n` opens an inline row for a new issue, `N` makes it a child of the
  selection, and `! 0`-`! 4` sets priority. `! -` clears it.
- `e` edits the title, `b` the body, `c` adds a comment, `l` edits labels.
- `x` closes with a reason and message, `X` closes as done with no dialog,
  `r` reopens, `s` cycles open/all/closed, `/` filters, `v` toggles nested and
  flat, `y` copies the `project#abc4` ref.
- Drag the line between list and detail to resize the split; it is saved and
  follows you across reloads.

Every edit is optimistic: the list changes at once and never waits on the
network before your next key. A rejected edit rolls back and the error appears
in the footer.

## Threads

A thread is kata-bound when a `.kata.toml` is found in its environment
directory, in its bb project's source directory, or in the ancestors of either.
The nearest file wins. In a bound thread the header shows the kata project or
the linked issue, a **Kata issues** side panel holds the same viewer pinned to
that project, and `L` links the selected issue to the thread. A
`::kata-issue{ref="project#abc4"}` line in a message renders as a chip that
opens the issue in the panel.

## CLI and agent tools

`bb kata` works in any bb terminal or thread, taking its project from
`--project`, a qualified ref, or the thread's binding. It covers `projects`,
`list`, `ready`, `search`, `show`, `create`, `priority`, `edit`, `comment`,
`label`, `close`, `reopen`, `link` / `unlink` / `linked`, and
`include` / `exclude`. Most commands accept `--json`.

A bound thread also gives its agent the `kata_list`, `kata_show`, `kata_create`,
`kata_update`, `kata_comment`, `kata_close` and `kata_link_thread` tools plus a
`kata` skill. Agents may close an issue as done only with a message of 40 or
more characters and evidence, which is kata's own rule for non-TUI closes; the
skill tells them to label unverified work `needs-review` instead, and never to
delete anything.

## Requirements

- bb 0.43 or newer, with Plugin SDK 0.4.104 or newer.
- `kata` installed on the same machine, on `PATH` or at `~/.local/bin/kata`,
  with its daemon running. The plugin talks to the daemon over its unix socket.
- No account, token, or hosted service. Nothing leaves the machine.

When the daemon is down the panel shows a banner, keeps cached issues visible,
and reconnects within a few seconds of the daemon coming back. The plugin never
restarts a daemon you stopped.

## Settings

`includedProjects` holds the kata project uids shown as tabs, in order; the `+`
tab, tab drags, `alt-[` / `alt-]` and `bb kata include` / `exclude` all edit it.
`actor` is the name recorded on changes made from bb, defaulting to
`$KATA_AUTHOR` then `$USER`.
