## What you get

When one section collects dozens of threads, opening it pushes every other section out of view, so you end up collapsing sections you would rather keep open. With this plugin each custom section, and the built-in **Threads** group, shows its first 10 top-level threads in the list's own order. A **Load more (n)** button at the end of the same section reveals the next batch, and **Show less** returns to 10.

- Nothing is archived, moved, renamed, or re-sorted. The threads stay in the section you put them in.
- The thread you have open always stays visible, even when it sits further down the list.
- Child threads stay under their parent and are not counted against the limit.
- Pinned threads are never capped.

## How it works

The plugin decorates bb's built-in sidebar instead of replacing it, so pinning, nesting, drag and drop, thread menus, and status indicators keep working as before. Short sections show no button at all.

## Settings

Set both numbers in Settings → Plugins → Section Load More, or from a terminal:

```sh
bb plugin config section-load-more set visibleThreads 10
bb plugin config section-load-more set loadMoreStep 10
```

How far you expanded a section is kept per window and resets when the window reloads.

## Requirements

No account or external service. The plugin reads the sidebar's markup; if a bb update changes it, the plugin stops capping and the sidebar works as it does without the plugin.
