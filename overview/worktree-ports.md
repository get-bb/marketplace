## What you get

A card in the sidebar footer that lists what each BB worktree is serving right now. The port you are developing leads as a named pill such as `vite :5173`. Backing services and internal listeners sit behind a one-line toggle. Click a pill to open it in the browser BB already prefers, or hover to stop whatever holds it. The footer button shows a dot while anything is listening.

The same listing is available as `bb ports list`, as the `worktree_ports` agent tool, and through the `worktree-ports` skill, so an agent can answer "which port is the dev server on" without guessing.

## How it works

Discovery is live and needs no configuration. Every few seconds the plugin reads listening TCP sockets, resolves each process's working directory, and attributes the port to the worktree that contains it. A server an agent started in the background is still found, because a working directory survives reparenting. Published Docker ports are attributed through the compose project's working directory.

Each port gets a role. A port named in `.bb/ports.json` is always an app. A Docker published port, a known database process, or a well-known service port such as 5432 or 6379 is a service. A loopback listener on an ephemeral port is internal. Everything else is an app. If the heuristic demotes your app, label the port in `ports.json` and it leads again. An existing `.superset/ports.json` is read as a fallback.

Worktrees on other enrolled machines are scanned on that machine. The listing shows their ports, but `localhost` on your machine does not reach them without a tunnel.

## Requirements

- macOS or Linux. The scanner needs `lsof`. Windows is not supported.
- Docker CLI on the path for container ports. Without it the process pass still runs.
- BB 0.42 or newer. The plugin uses experimental SDK surfaces for the host worker, sidebar footer, and thread-row status, which may change between BB releases.

## Settings

Scan interval, Docker inclusion, ignore lists for ports and process names, open target (BB browser preference or system browser, with modifier-click inverting), and the thread-row marker.
