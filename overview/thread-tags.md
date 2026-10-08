Mark threads with a small colored badge, an emoji or short text, that shows
left of each thread's title in the sidebar.

## What you get

- A **tag button** in each sidebar row's hover controls, beside Archive and
  the ⋯ menu. Click it to pick a tag, remove one, or create a new tag with an
  emoji or text (up to 12 characters) and a color.
- An **emoji picker** next to the label field. Browse every emoji by category,
  or search by name in English or Russian. The emoji list ships with the
  plugin, so the picker works offline.
- A **Tags** editor, opened from the gear in the tag picker or from this
  plugin's settings page. Rename, recolor, or delete tags there. Deleting a tag
  asks for confirmation and removes it from every thread.
- A `bb thread-tags` command, so agents can tag the thread they work in.

## How it works

Each thread has at most one tag. Tags and assignments are stored in this
plugin's storage on the bb server. Every client sees the same tags, and a
change reaches every open window at once. When you delete a thread, its tag
assignment is removed too.

The badge and the tag button attach to the sidebar rows of bb's built-in
thread list. A bb update that changes that markup can hide them until this
plugin is updated.
