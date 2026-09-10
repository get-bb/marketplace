## What you get

Every ordinary BB Browser tab — the ones you open from threads and windows — stays signed in to one session you imported once. Log in to the sites you work with in one go, and they are already authenticated when BB opens a browser anywhere else.

## How imports work

- **Import once.** Pick a local Chrome, Edge, Arc, Brave, Comet, Helium, or Firefox profile on the host machine, or upload a JSON cookie export, and BB writes those cookies into the shared Browser session.
- **Applies everywhere.** Existing ordinary tabs and every future ordinary tab use the same session. Import again at any time to replace it with a different one.
- **Remove when done.** One button clears the imported session from the Browser so no logins remain.

The controls live entirely in **Settings → Browser Session Import**. The plugin adds no side panel, no thread-header buttons, and no browser chrome.

## What is copied

Only cookies are copied — not extensions, passwords, bookmarks, local storage, or IndexedDB. Cookie values are read and written on the machine running the Browser and never leave it through this plugin. Each import takes a short exclusive hold on one shared tab, refuses to interrupt automation that is already controlling it, and restores the previous cookies if a write fails partway.

## Requirements

- BB desktop with the native Browser and Plugin SDK 0.4.48 or newer (BB desktop v0.42.1 ships SDK 0.4.47 and is not supported).
- At least one ordinary Browser tab open when you import — the import applies through that shared session.
- Native local-profile discovery runs on macOS and Linux; JSON cookie exports work on any platform the BB desktop runs on.
- General page automation is not included — use BB's official Browser Automation plugin for that.
