## What you get

A markdown file opens the way it always did, rendered and readable. A **Raw**
segment in the tab header switches the same file to its source in an editable
textarea, and **Preview** switches back. The buffer is shared, so text you have
typed and not yet saved shows up rendered in Preview before it reaches disk.

Images the file points at render in Preview. A reference like
`screenshots/a.png` resolves against the file's own directory and is served
from the host the file lives on, so a README shows its own screenshots.

The header carries the file path, the Preview/Raw pair, a reload button, a Save
button, and one word of state: Unsaved changes, Saving, or Saved.

## Saving

Saving is explicit. Press Cmd+S or click Save; both do nothing while the file
is unchanged, so there is no way to write by accident and no autosave writing
half-finished sentences to a file an agent is watching.

Discard appears next to the save state while a file has unsaved changes and
puts the buffer back to the text last read from disk. It arms on the first click and acts on
the second, because the edits it throws away cannot be recovered.

## When something else edits the same file

Every read records the file's hash, and every save tells the host which hash it
expects to find. If the bytes on disk are no longer the bytes that were read —
an agent edited the file while you were typing — the write is refused before it
happens and a banner offers the two honest choices: reload and discard your
edits, or overwrite and discard theirs. Until you pick, your text stays exactly
as you typed it. Nothing is merged, and nothing is lost quietly.

## Where it works

Registers for md, mdx, markdown, and txt. Files in a project workspace, in a
thread's storage, and anywhere on a host you have connected all open the same
way.

bb chooses one opener per extension under Settings, Files, and a tab's Open
with menu overrides that choice for a single file. bb's read-only preview stays
available in the same menu.

## Limits

Reads UTF-8 text up to 2 MB. A binary file that happens to end in .md is
refused rather than mangled. A preview image is read up to 4 MB, in the
formats a browser shows inline.

Saves to a path whose parent directory is missing fail instead of creating it:
this edits files, it does not make them.

A file viewed as of a git commit always uses bb's preview, because a snapshot
of history has nothing to save to.

Closing a tab with unsaved changes cannot be intercepted, since a bb tab is not
a browser navigation. Quitting or reloading bb does prompt.

## Requirements

bb 0.42 or later. No account, no external service, no separate install, and no
network access: the plugin reads and writes through bb's own file API on the
host the file already lives on.
