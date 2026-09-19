Peek answers the question the plugin store cannot: what would this actually do
to my bb? Hover any card in the store, click Preview, and get a report of the
plugin's impact — before it runs a single line of code on your machine.

## What you get

- **Interface changes.** Every place the plugin would appear: a page in the
  sidebar, a tab in the thread panel, a button in the thread header, a section
  on your settings page, a renderer for files or diffs, a customized composer.
  Each one names the plugin's own title for it.
- **Settings it adds.** The controls that would show up on its settings page,
  with their type, and which ones are stored as secrets.
- **What it can do.** Background services, schedules, agent tools, HTTP
  endpoints, its own database. Wide-access capabilities are called out: a
  full-trust daemon, a content script that can rewrite any part of the bb UI,
  a provider or machine registration, running commands, reading your files.
- **CLI commands, agent skills and themes**, with real color swatches read from
  the theme files themselves.
- **The author's own overview and screenshots**, without leaving the store.

## How it works

Peek resolves the store entry to the exact release an install would fetch, then
reads that release's files as text — from the bb app for bundled plugins, from
the published npm tarball, or from the repository archive on GitHub. It never
installs, never enables, and never executes plugin code.

Every fact is labelled with where it came from. `declared` is read from the
plugin's own manifest and is authoritative. `detected` is found by scanning the
plugin's entry sources or built bundle for SDK call sites — strong signal, but
a plugin can register a surface in a way the scan misses. Whatever Peek could
not determine is listed in the report instead of being left out.

The same report is available in the terminal and to your agents:

```sh
bb peek list
bb peek show <entry> [--json] [--refresh]
```

## Requirements

- Git-hosted plugins are readable only when they live on GitHub. npm-hosted and
  bundled plugins always work.
- No account or token is needed. A repository is read through one archive
  request, which GitHub does not meter hourly. A read-only token in Peek's
  settings only matters for the fallback path, used when an archive is
  unavailable or larger than 24 MB.
- Reports are cached per resolved release; an entry bb cannot pin to a release
  is read from the repository's default branch, and the report says so.
- A request that fails degrades that section of the report and is listed in its
  notes, rather than failing the whole preview.
