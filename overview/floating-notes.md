## What you get

A real notes app lives inside bb, one keystroke away. `Ctrl+'` opens a
draggable window that floats over whatever you are reading; `Ctrl+Shift+'`
opens a one-line capture bar that saves a thought and disappears. Any note can
pop out as a sticky card that stays on screen while you work.

## Every note knows where it lives

The list is grouped by scope, not by one flat pile. Notes you wrote inside a
project sit under that project's name; the rest sit under Global notes, thread
scratchpads, and daily notes. Each row carries a glyph and a tinted edge for
its scope, and its sticky card wears the same colour, so a card on screen and
its row in the list read as the same object. Filter chips narrow the list to
one project, to global notes, or to threads.

## Notes that follow the work

Every thread gets a scratchpad, reachable from the thread header and from the
thread's side panel. A sticky can be pinned to a thread or to a whole project,
and then it only appears while you are looking at that work. Saving a message
from the timeline keeps a link back to the conversation it came from, and the
scope chip in the editor footer jumps you there.

## A markdown editor, not a textarea

Formatting marks hide as you leave a line, headings size themselves, and
checkboxes are clickable with a progress ring on the row. Code fences get real
syntax highlighting, tables stay readable, and `[[wiki links]]` autocomplete
across your notes — following a link to a note that does not exist creates it.
Paste an image and it is stored with the note. Type `#tag` anywhere and it
becomes a filterable tag.

## Agents and the command line

Agents can search, read, append, and keep the thread scratchpad current
through five tools, so findings land on the pad you are already watching.
`@note` mentions pull a note into a prompt, and the `+` menu inserts one into
the draft. The `bb notes` command covers the same ground from a shell,
including `bb notes export` and `bb notes import`, which round-trip every note
as a markdown file with front matter.

## Safety net

Edits keep a revision history you can restore from the editor footer, trash
holds deleted notes for 30 days, and images that lose their last reference are
collected automatically.

## Requirements

Requires bb 0.42 or newer. No account, no API key, and no external service —
notes live in a SQLite database inside bb's own data directory, and nothing
leaves the machine. Stickies are a desktop surface; on a phone the window
becomes a full-height sheet instead.
