## Who it is for

People who review an agent's work in a BB thread. The answer names a few files, you open them in the preview one by one, and after reading them the tab strip is full. Closing each one means finding a small × that appears only on hover, and ⌘W closes the whole window instead of the tab.

## What you get

Close a tab the way a browser taught you: double-click it, or click it with the middle button. On a Mac trackpad a three-finger click works too, and a click that misses the tab and lands on the page still closes the tab under the cursor.

Control+W closes the active tab, and the command palette has the same action. ⌘W stays with the window.

When you are done with the files, the × at the right of the preview header hides the whole panel, the same way the × closes the side panels next to it.

## How it works

BB has no API for closing a preview tab, so the plugin presses the tab's own close control. The panel × presses BB's own "Hide right panel" button. Where BB shows no such button, for example in the browser, this × does not appear. If BB renames these controls, the gestures stop and nothing else in BB breaks.

## First step

Open two or three files from a chat answer in the preview. Double-click the tab of the one you have read: it leaves the strip, the other files stay open, and the thread stays where it was.
