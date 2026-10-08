## What you get

Type `/` in a BB thread running on the Pi provider and Pi's own commands are in
the menu: extension commands, prompt templates, and the session controls this
addon adds. The commands run in the thread you are already in.

## How it works

A launcher and a Pi extension publish the Pi session's command registry into
`~/.pi/bb-commands` every time a session starts or you run `/reload`. BB's Pi
provider reads that catalog, so the composer menu offers what the session
actually has instead of a fixed list.

`/session`, `/thinking`, `/model`, `/name`, and `/reload` answer from the addon
itself, with no model request. `/compact` is the one command here that calls a
model.

Terminal-only controls such as `/login`, `/tree`, `/resume`, and `/export`
reply that BB cannot safely forward them, rather than falling through to the
model and billing a turn to say nothing.

## Requirements

- BB 0.45.0 with plugin SDK 0.6.15.
- Node 22 or newer, and Pi installed on the host that runs the thread.
- The provider-pi adapter, applied once with the script in the repository.
  BB 0.45.0 offers no API for one plugin to register command roots for another
  plugin's provider, so the read side is a checked patch to the installed Pi
  provider bundle. Read [the adapter notes](https://github.com/Diffuzmetall/bb-plugin-pi-command-sync/blob/main/docs/compatibility.md) before applying it.
- A Linux host. macOS is untested, and Windows is refused.

## Boundaries

A Pi process that was already running keeps the launcher it started with, so
restart the thread once after installation; the thread and its history stay.
Project trust is respected and no workspace is approved automatically.
Terminal Pi keeps its native interface, and this addon registers no provider.
