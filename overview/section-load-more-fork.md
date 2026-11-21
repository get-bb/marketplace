## What you get

Each custom section and the built-in **Threads** group shows its first 5 top-level threads in sidebar order by default. **Load more (n)** reveals 5 more, and **Show less** restores the initial limit.

- Nothing is archived, moved, renamed, or re-sorted. The threads stay in the section you put them in.
- The thread you have open always stays visible, even when it sits further down the list.
- Child threads stay under their parent and are not counted against the limit.
- Pinned shows 8 threads by default. It has its own initial limit and uses the shared Load more step. **Limit Pinned threads** can be turned off.

## How it works

The plugin decorates bb's built-in sidebar instead of replacing it, so pinning, nesting, drag and drop, thread menus, and status indicators keep working as before. Short sections show no button at all.

## Settings

Open **Settings → Plugins → Section Load More**, or use the CLI.

```sh
bb plugin config section-load-more-fork set visibleThreads 5
bb plugin config section-load-more-fork set loadMoreStep 5
bb plugin config section-load-more-fork set limitPinnedThreads true
bb plugin config section-load-more-fork set visiblePinnedThreads 8
```

How far you expanded a section is kept per window and resets when the window reloads.

## Requirements

No account or external service. The plugin reads the sidebar's markup; if a bb update changes it, the plugin stops capping and the sidebar works as it does without the plugin.

Based on [Section Load More by siluthfi](https://github.com/siluthfi/bb-plugin-section-load-more).
