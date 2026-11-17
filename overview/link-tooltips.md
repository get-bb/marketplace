## What you get

Pause over a link in BB to see its full destination before opening it. Web
addresses keep their query strings and fragments; file links show readable
paths with spaces and line references. An existing link description stays
above the destination.

## Where it works

The enhancement applies to ordinary links in the BB app, including earlier
messages and newly streamed replies. It runs in desktop windows and remote
browser clients. Clicking links and using their context menus works as before.

## How it works

Link Tooltips uses the browser's native tooltip. There are no settings; the
browser controls the delay before it appears. Tooltips require a mouse.
Fragment-only links, buttons, and content inside embedded browser pages are
outside its scope.

The plugin makes no network requests and stores no data. Disabling or reloading
it removes its listeners and restores the hovered link's original tooltip.
No external account or service is required.

## Updates

The marketplace source accepts all stable semantic-version release tags from
the public repository. Future releases can use new `vX.Y.Z` tags without a new
marketplace entry or a pinned version.

[Source code and MIT license](https://github.com/SergeyZh/bb-plugin-link-tooltips)
