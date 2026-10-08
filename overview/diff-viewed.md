## What you get

A **Viewed** checkbox on every file header in bb's changes panel, sitting beside
that file's `+N -M` counts. Check a file and it collapses, its header dims, and
it stays folded away while you work through the rest of the diff. What is still
expanded is what you have not read yet. Uncheck it to bring it back; nothing
else about the panel changes.

The toolbar shows how far you have got, as "3/8 viewed" with a progress
ring, right-aligned above bb's line counts in place of its file count. It
counts every file in the selected range, not only the ones on screen.

To hide reviewed files entirely, pick **Only unviewed** at the bottom of the
panel's range dropdown ("All changes", "Uncommitted changes"). Pick it again to
show every file. The choice applies to every thread.

Marks are kept per thread. They survive a reload and a restart of bb, and
another open window picks them up when it regains focus.

## Sync with GitHub

When the thread has an open pull request, checking a file also marks it
viewed on GitHub, and marking or unmarking it on GitHub shows up in bb when
the window regains focus. This applies to files whose diff in bb matches the
one on GitHub. A file with unpushed edits, or one you are viewing under
Uncommitted changes, gets a small **local** tag: you can still check it, but
the mark stays in bb. Turn sync off with the **Sync with GitHub** setting.

## What clears a mark

A mark is keyed on the thread, the file path, and the file's `+N -M` counts.
Because the counts are part of the key, a mark clears itself when the file's
diff changes: rebase the branch, add a hunk, or revert the file, and it comes
back expanded and undimmed. An edit that adds and removes the same number of
lines keeps the mark, since the counts carry no other per-file signal.

Marks for files that have left the diff are pruned when the panel next loads.

## Requirements

- bb 0.41 or later.
- For GitHub sync, `gh` on PATH and signed in (`gh auth login`). Without it,
  marks stay in bb.
- Nothing is read outside the changes panel. The only thing sent anywhere is
  each synced file's Viewed state, to the thread's pull request on GitHub.
- If a later bb release reshapes the changes panel, the plugin decorates nothing
  and bb behaves exactly as it does without it.
