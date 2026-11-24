## What you get

- Project folders turn into cards. The card header stays pinned while its threads scroll underneath.
- Threads inside a project are ordered by their last real turn, children included, and the age label shows that time: `now` only while a thread works, then `<1m`, `5m`, `3h`, `2d`. Recent Activity keeps working threads on top, then the same order.
- Each card shows its 5 most recently active threads, then *Show N more* and *Show less*. The open thread and running threads are never folded away.
- Every thread row shows the icon of the AI it runs on with a status badge on its corner: a spinner while it works, yellow when it waits for you, red when it failed, green when it finished unread.
- Each folder shows a rollup left of its count, also when collapsed: a spinner if anything inside works (with a red dot if something failed too), otherwise failed, waiting for you or finished. Children and folded threads count.
- The folder of the open thread is outlined in the accent color, so you can find it at once.
- New thread becomes a full-width outlined button, Needs you becomes a card in the theme's attention color, and the status counters and static key hints under the search field are hidden.

## Follows your theme

Every color comes from the active bb theme: the accent is the theme's primary color, surfaces and borders are mixed from the sidebar colors. The pack works in all built-in palettes (default, Nord, Dracula, Solarized, Gruvbox, Catppuccin) and in light and dark mode. To use another accent, pick a color on the plugin's settings page; the first circle goes back to the theme.

## Settings

- Language of the labels: auto, English or Russian.
- Threads per card before *Show N more*; 0 shows every thread.
- A switch for each part: cards, activity sort and ages, provider icons, status badges, the open folder highlight, the New thread button, hidden counters.
- Needs you in the theme accent instead of its attention color.

## Requirements

Cards, sorting, ages, provider icons and the Needs you styling restyle the Thread Tree plugin's sidebar, so install Thread Tree first. Without it only the New thread button changes.

## Privacy

The plugin reads the time of each thread's latest turn through the bb plugin SDK and keeps one timestamp per thread in its own storage. It makes no network requests and touches no files, accounts or credentials.
