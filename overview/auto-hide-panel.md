## What you get

- Close the last file or other content tab in the right panel, and the panel hides itself, so the thread gets its full width back.
- Info and Diff do not count as content tabs. Info you open yourself stays open.
- Loading the plugin or switching threads never hides the panel by itself.

## How it works

When the last closable tab disappears, the plugin presses BB’s own Hide right panel control. Tab closing is unchanged. It makes no network calls and stores nothing.

## Limits

It targets the standard single right panel. If several tab strips or more than one hide control are visible, such as in split layouts, it leaves the layout alone. It relies on attributes of BB’s interface, so a future BB layout change may need a plugin update.
