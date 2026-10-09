A thread list you can read at a glance, for BB.

## What you get

- A **Radar thread list** in the left sidebar. Threads group by Today,
  Yesterday, Previous 7 days, Previous 30 days or Older, keyed off real
  activity rather than when you last opened them, so merely reading a thread
  never floats it to the top. Group by project or by section instead with one
  toggle, and reorder projects by dragging them.
- **Attention states you cannot miss.** Working, needs-you, failed and
  finished-but-unread each get their own icon, status word, colour and row
  treatment. Rows needing a decision wash amber or red and breathe a slow
  glow; motion is reserved for things that need action, so movement always
  means something.
- **Nested families.** Child threads sit under their parent with indent
  guides, and a family sorts by its freshest activity. Fold one and the
  summary tells you how many are hidden, how many are unseen, and the loudest
  state inside.
- **Rows that carry their context.** Provider icon, model and thinking level
  while a thread is in flight, plus a branch line you can copy and a
  pull-request badge that opens in your browser. Pause on a row for a peek
  card with the original goal and a stacked context-window meter.
- **Radar navigation** above the list: New thread, your inline destinations
  and More for the rest. It shows inline exactly what you set inline in BB's
  own "Customize sidebar", and writes back to the same store, so arranging in
  either surface carries over.
- **For working fast.** Status filter chips, saved smart views, a text
  filter, comfortable or compact density, keyboard traversal with quick
  archive and pin, multi-select bulk actions, and drag a thread onto a section
  header to file it.

## How it works

The plugin is frontend-only. It reads BB's live sidebar state and routes every
mutation through BB's own flows, so pins, archives and deletions behave exactly
as they do in the stock list, and nothing about your threads changes — only how
the sidebar presents them. It makes no network requests of its own, keeps no
database, and stores no secrets.

Pick it under **Settings → Appearance → Sidebar** and **Navigation**; choosing
BB there, or disabling the plugin, restores the stock sidebar immediately.

Two limits worth knowing: it will not move a thread between projects, because
BB's thread API exposes no project on update, and it shows model and thinking
only while a thread is actually running, because the options endpoint resolves
defaults rather than history.

## For agents

The bundled skill documents the groups, filters, folding, badges, menus,
settings and storage keys, so an agent can explain or troubleshoot the sidebar
without guessing at internals.
