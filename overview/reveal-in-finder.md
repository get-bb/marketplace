When an agent builds an app, exports a report or saves a screenshot, the path usually ends up as
plain text in its reply. This plugin turns that path into a card you can click.

## What you get

- A card for each file or folder the agent hands over: an icon for its type, the name, and the
  format and size (`APK · 48 MB`, `Folder`). A path that doesn't exist shows "Not found".
- A click on a file card opens it in bb's preview; a click on a folder card reveals it in Finder.
- **Open in ▾** with three choices: reveal in Finder, open in the file's default app (a new Finder
  window for a folder), or bb's preview.
- A skill that tells agents when to hand over a file this way.
- `bb reveal-in-finder show <path>` reveals a path in Finder from a terminal or an agent.

## How it works

The agent writes the card on its own line in its reply:

```
::file{path="~/Downloads/app-release.apk"}
```

`path` takes an absolute path, a `~/` path, a `file://` URL, or a path relative to the thread's
workspace. **Default app** opens the file the way a double-click in Finder does.

## Requirements

Finder and the default app open on the Mac that runs the bb server. On other systems the card and
bb's preview still work, and the open actions report "Needs macOS".

## Privacy

The plugin reads only the name, type and size of the path in the card. Nothing leaves your bb
server.
