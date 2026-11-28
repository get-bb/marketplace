## Who it is for

People who keep several BB threads going at once and switch between the same few of them all day: the thread they are steering, the one an agent is still working through, the one waiting for an answer.

## What you get

On wide desktop windows, your pinned threads start beside the window menu, with a short separator before them. Their starting position stays fixed when you resize or collapse the sidebar. Compact windows, browsers and other split panes show the tabs in their thread headers. The tabs take no extra row from the conversation. Other header controls remain available; thread actions move to the floating capsule.

- **One click to switch.** Click a chip to open its thread. The chip of the open thread is highlighted.
- **Status at a glance.** A dot on each chip shows the most urgent state across the thread and its child threads: yellow when it waits for you, blue while it works, green when it finished and you have not opened it yet. No dot means nothing needs you.
- **Who or what it belongs to.** A colored bar on each chip marks the thread. With Chat Sidebar installed, the bar uses that thread's project color from the sidebar. Without it, the bar shows the provider's color.
- **Always know where you are.** A floating capsule over the top of the conversation names the open thread, pinned or not: provider icon on the project color, a status dot, the title, then project, model with reasoning level, branch and what the thread is doing now or when it last changed. A second capsule holds quick buttons: by default a new sub-thread and Mark finished from Chat Sidebar, pin or unpin, and the thread actions menu that the tabs replace. Right-click the main capsule for the same menu.
- **What this thread cost.** The ring around the provider icon fills with the thread's rough share of its limit, the five-hour window for Claude Code and a day's share of the week for Codex, and turns amber at 10% and red at 25%. Cache reads barely count, and subagents are included. Threads without usage data, such as Cursor, keep a plain ring.
- **On a phone.** The title capsule takes the width and the right capsule keeps only the thread menu, which holds every action.
- **Your buttons.** In the plugin settings, pick which thread menu actions sit in the capsule and what its second line shows: project, model, branch, status.
- **Unpin in place.** Hover a chip and an unpin button appears over its right end. It takes no room until you hover.

## Works best with Chat Sidebar

We recommend installing [Chat Sidebar](https://github.com/seoperin/bb-plugin-chat-sidebar) by [Evgeniy Perin](https://github.com/seoperin), from the BB Community catalog. With it, each chip wears its project's color, the same one as the thread's row in the sidebar, and clicking a chip scrolls the sidebar to that row. Header Pins works without it too: the bar then shows the thread's provider.

## How it works

The chips are the same pins as the Pinned section of the sidebar, in the same order. Pin or unpin a thread anywhere in BB and the strip follows. When nothing is pinned, the strip says so. Scroll horizontally to reach tabs that do not fit. Each split pane highlights its own open thread.

The rest of the title bar still drags the window. Only the chips take clicks.

The tabs use BB's thread title slot and the capsule a row under the thread header. Project colors match Chat Sidebar's, even when its list is filtered. BB 0.50.1 or later is required. It stores nothing outside your browser storage, needs no account, and makes no network requests. For the usage ring its server part reads only the open thread's Claude Code or Codex session logs on the machine running bb. Labels are in English, or in Russian when the system language is Russian.

## First step

Pin two or three threads you switch between often. Look at the top strip of the BB window, click a chip, then hover it and unpin one.
