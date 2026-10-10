## Who it is for

People who keep several BB threads going at once and switch between the same few of them all day: the thread they are steering, the one an agent is still working through, the one waiting for an answer.

## What you get

Your pinned threads appear as chips in the title bar strip at the top of the BB window, next to the back, forward and sidebar buttons. That strip is otherwise empty, so the chips take no room from the thread, the sidebar or the preview.

- **One click to switch.** Click a chip to open its thread. The chip of the open thread is highlighted.
- **Status at a glance.** A dot on each chip shows the most urgent state across the thread and its child threads: yellow when it waits for you, blue while it works, green when it finished and you have not opened it yet. No dot means nothing needs you.
- **Who or what it belongs to.** A colored bar on each chip marks the thread. With Chat Sidebar installed, the bar uses that thread's project color from the sidebar. Without it, the bar shows the provider: orange for Claude Code, gray for Codex, black (white in dark mode) for Cursor, and its own color for Pi, opencode, omp, Grok Build and Hermes Agent.
- **Unpin in place.** Hover a chip and an unpin button appears over its right end. It takes no room until you hover.

## Works best with Chat Sidebar

We recommend installing [Chat Sidebar](https://github.com/seoperin/bb-plugin-chat-sidebar) by [Evgeniy Perin](https://github.com/seoperin), from the BB Community catalog. With it, each chip wears its project's color, the same one as the thread's row in the sidebar, and clicking a chip scrolls the sidebar to that row. Header Pins works without it too: the bar then shows the thread's provider.

## How it works

The chips are the same pins as the Pinned section of the sidebar, in the same order. Pin or unpin a thread anywhere in BB and the strip follows. When nothing is pinned, the strip says so.

The rest of the title bar still drags the window. Only the chips take clicks.

The plugin watches the title bar and the thread list, not the whole window, so a streaming reply does not make it recalculate layout. It stores nothing outside your browser storage, needs no account, and makes no network requests. Labels are in English, or in Russian when the system language is Russian.

## First step

Pin two or three threads you switch between often. Look at the top strip of the BB window, click a chip, then hover it and unpin one.
