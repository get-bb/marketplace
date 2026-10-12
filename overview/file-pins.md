## What you get

- **A strip above the composer.** Pinned files and links sit in order as quiet raised chips. Each chip is as wide as its label; labels truncate only when the strip runs out of room, and the rest wait in the **⋯** list.
- **Files and links together.** Files show bb's file icons. Links show their site's icon and the page title, with a globe for sites that have none, such as a localhost dev server.
- **Agent-assisted pinning.** The pin button adds a **Pin** pill to the composer. Type paths, file names or URLs after it and send; the agent finds each file, asks about any that are ambiguous, and pins them.
- **Key links pinned for you.** Agents pin the PR they open, the issue or ticket, the spec they follow, and a dev site or preview they hand you, and remove a dev site's pin when its server stops.

## How it works

Click a pin to open it the way bb opens files and links. Right-click a file for **Open preview**, **Open externally**, **Copy file path** and **Copy file name**, then **Unpin** to move it to the ⋯ list or **Remove**, which offers **Undo**. Pin a file back from the ⋯ list while the strip has room. Missing files stay visible with a light red tint.

With Moss Viewer installed, a pinned Moss note opens in its panel, even when the note lives on another machine, and **Open in Moss** there opens it for editing.

Pins persist per thread across clients and restarts. Agents and scripts can also run `bb file-pins pin`, `list` and `remove`.

## Privacy

Files stay on their machine; pins store only the path, and no file contents are copied or sent to the agent. Link icons are looked up by the link's public HTTPS origin only, never its path or query.
