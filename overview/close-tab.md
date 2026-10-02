Closes preview tabs in the thread without aiming at the ×.

## Who it is for

People already in a BB thread who opened files in the preview and now cannot close those tabs except by hitting a small close button. The next step is still in the thread: another file, another glance, not a trip to a window menu.

Not a file manager and not a way to close threads. It only closes document tabs in the preview.

## What you get

Close the tab you are done with the way a browser does: double-click, middle-click, or right-click for Close / Close others / Close tabs to the right. On a Mac, Control+W closes the active tab (⌘W is taken by the window). The command palette has the same action.

A three-finger click that lands on the page instead of the pill still closes the tab under the cursor.

## How it works

BB has no API for closing a preview tab, so the plugin clicks the tab's own close control. If BB renames that control, the gestures stop; nothing else in BB breaks.

## First step

Open a file in the preview, then double-click its tab. The file is gone from the strip; the thread is still there.
