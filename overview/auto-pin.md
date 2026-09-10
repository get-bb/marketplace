## What you get

Every thread you start arrives already pinned to the top of the sidebar. The
thread you are working on stays where you can find it, and it stays there
until you unpin it yourself.

This is for the habit of starting a thread, getting pulled away, and then
hunting for it in a list that has since grown by ten entries. Pinning is
something you would have done by hand a moment later anyway.

## How it works

The plugin listens for thread creation and pins the new thread. It pins only
threads you would want pinned: a thread has to be visible and top-level.
Child threads spawned by an agent are left alone, hidden threads are left
alone, and a thread that already carries a pin is not touched again.

Nothing else about pinning changes. Unpinning works exactly as it did, from
the same place in the sidebar, and the plugin will not pin that thread again.
Pin state stays yours to edit.

If BB ever refuses a pin, the plugin logs a warning rather than failing
quietly, so a thread that did not get pinned leaves something to look at.

## Requirements

Nothing to configure. There are no settings, no commands, and no network
access. Turn it on and new threads start showing up pinned.

The source is at
[github.com/csells/bb-plugins](https://github.com/csells/bb-plugins).
