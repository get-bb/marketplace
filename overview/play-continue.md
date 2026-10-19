## What you get

- **Double Escape to stop.** Press Escape twice within 400 ms and the running thread stops through BB's own Stop button, the same as clicking it. After the first press the Stop icon shows `Esc`, so you can see the shortcut is armed. A single press, a held key or a press with a modifier never stops anything.
- **Play to continue.** After a turn was stopped, failed or was cut off by a restart, a Play button takes the place of the disabled Send button. One click sends a visible message asking the agent to continue from where it stopped and to check the current state before repeating any action whose outcome is uncertain.

## How it works

Play appears only when the thread is idle or errored, the composer is empty and nothing is queued. Typing restores the normal Send button, and a running thread keeps the native Stop. Before sending, the plugin checks the thread again, so a stale click does nothing. Continuing starts a new turn with your thread's current settings; it does not replay the original prompt.

The shortcut stays out of the way: it does nothing while a menu or dialog is open or while you type in another field. With several composers on screen, it stops the one you are focused in.

## Requirements

No account, service or settings. It works in thread composers in the regular (expanded) layout. Composer action slots are limited to three plugins, so it may not load if you already use three or more plugins that add composer buttons.
