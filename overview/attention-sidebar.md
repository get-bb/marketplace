## What you get

A thread list for the bb sidebar that is organised around what needs you, not around which project a thread belongs to. From top to bottom:

- **Ждут вас** ("Waiting for you"): threads from every project that need a human. A `?` marks a question or an approval request, `!` marks an error or a failed queued message, and `✓` marks a finished thread you have not read yet. Questions come first, then errors, then finished threads, newest first inside each kind.
- **В работе** ("In progress"): threads whose agent is running, including starting, stopping, workflow, background agent, background command, plan mode and queued-message states.
- **Закреплённые** ("Pinned"): pinned threads in bb's own pin order.
- **Project folders**: all other threads, grouped by project with the project avatar, name and thread count. Folders are ordered by latest activity, and child threads are indented under their parent.

Each thread appears exactly once. A thread that needs attention or is running shows in the top blocks even if it is pinned or is a child thread; a child shown away from its parent carries a `↳ parent title` caption.

## How it behaves

- Rows in the top blocks show a project avatar (initials from the project name, a colour derived from the project) instead of a provider icon, so you can tell projects apart at a glance.
- The `?`, `!` and `✓` badges follow the live thread: the `?` disappears as soon as the question is answered.
- The thread you have open stays where it was when you opened it until you open another one, so the list does not jump while you read.
- Folders start collapsed except the current project's. A collapsed folder shows a dot when its project has threads waiting for you (accent colour) or running (muted, pulsing).
- Every block and folder can be collapsed. The state is kept in your browser's local storage, per browser.
- Right-click a row, or use its `⋯` button, to open bb's own thread menu (pin, rename, archive and so on). Rows show a relative time such as "5 мин", or the keyboard shortcut label when the thread has one.

## Requirements and limits

- The plugin is frontend-only: it needs no account, no external service and no separate install, and it stores nothing outside your browser's local storage.
- The interface of the plugin is in Russian: block titles, tooltips, accessibility labels, the loading and empty states, and relative times. There is no English interface and no language setting.
- It replaces bb's thread list in the sidebar. To go back, choose bb's own **Thread list** under Settings → Appearance → Sidebar thread list, or disable the plugin.
