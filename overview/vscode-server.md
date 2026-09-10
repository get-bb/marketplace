## What you get

Your own VS Code, inside BB. Point the plugin at a code-server or VS Code Server you already run and
each thread gets a panel that opens that editor at the thread's workspace — the same files the agent
is working on, in the editor you already know, without leaving the app.

## How it works

- **One panel per thread.** In any thread, open the right panel, choose **Open new tab**, then
  **VS Code**. Reopening focuses the panel you already have instead of stacking another one.
- **It opens where the thread works.** The panel loads the server at the thread environment's
  workspace folder. A thread with no environment opens at its BB thread-storage folder instead.
- **It follows your setting.** The panel re-reads its configuration when it opens; after changing the
  URL while a panel is open, use **Reload configuration** to apply it.

## Setting the server URL

Set it in BB settings, or from the CLI:

```sh
bb plugin config vscode-server set serverUrl https://code.example.com
```

`VSCODE_SERVER_URL` in BB's server environment works too, and the plugin setting takes precedence. An
empty setting and an empty variable both leave the panel unconfigured. The URL must be absolute HTTP
or HTTPS, must not contain credentials, and loses a trailing slash before it is embedded.

## Bringing your profile across

For a code-server running on the same machine, the plugin can copy your desktop VS Code profile and
extensions into it, so the embedded editor has your settings, keybindings, and extensions:

- Saving a loopback URL in the setting, or using **Detect local server**, imports the configured
  desktop profile and extensions into the code-server target directories.
- **Capture local server** restores the standard profile paths, then looks for code-server or VS Code
  Server on ports 8080 and 8000 and saves the first healthy endpoint. Turning the switch off clears
  every plugin setting.
- Start code-server with matching `--user-data-dir` and `--extensions-dir` options so it reads what
  was imported.

A remote URL embeds normally but cannot receive files from this machine, because the copy runs
locally.

## The panel header

The panel's compact header expands when clicked to show the server URL, the profile import status,
and **Open in Browser**.

## Requirements

- BB desktop 0.41 or later.
- A reachable HTTP or HTTPS code-server or VS Code Server.
- That server's own authentication and network controls have to allow the BB client loading it. The
  plugin does not proxy requests or weaken the server's authentication, so configure code-server with
  HTTPS and its normal auth when it is reachable beyond a trusted network.

## Worth knowing

- **The plugin does not ship a server.** You bring the code-server; the plugin embeds it.
- **Local profile import copies files, and only for loopback URLs.** Point it at a remote host and
  nothing is copied from this machine.
- **Embedding is an iframe.** Whatever the server sends is what the panel shows, so the server's own
  security settings are the ones that matter.
