## What you get

A **Viewed** checkbox on every file header in bb's changes panel, sitting beside
that file's `+N -M` counts. Check a file and it collapses, its header dims, and
it stays folded away while you work through the rest of the diff. What is still
expanded is what you have not read yet. Uncheck it to bring it back; nothing
else about the panel changes.

Marks are kept per thread. They survive a reload and a restart of bb, and
another open window picks them up when it regains focus.

## What clears a mark

A mark is keyed on the thread, the file path, and the file's `+N -M` counts.
Because the counts are part of the key, a mark clears itself when the file's
diff changes: rebase the branch, add a hunk, or revert the file, and it comes
back expanded and undimmed. An edit that adds and removes the same number of
lines keeps the mark, since the counts carry no other per-file signal.

Marks for files that have left the diff are pruned when the panel next loads.

## Requirements

- bb 0.41 or later.
- No account, external service, or separate install.
- Nothing is read outside the changes panel, and nothing is sent anywhere.
- If a later bb release reshapes the changes panel, the plugin decorates nothing
  and bb behaves exactly as it does without it.
