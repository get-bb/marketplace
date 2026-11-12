# MCP Hub

MCP Hub keeps MCP server definitions in one host or project file and writes the
configuration each harness already reads. A server is authored once, then
materialized for Kimi Code, Claude Code, OpenCode, Cursor and Codex.

## One source of truth

- `~/.bb/mcp.json` holds servers available in every project on a machine.
- `<repo>/.bb/mcp.json` holds servers for one repository, overriding host entries
  with the same name.
- `"enabled": false` removes an entry from every generated file without deleting
  it from the hub.
- Generated files record their SHA-256, so a hand-edited file is reported as
  `foreign` and left alone until you take it over. Taking over keeps a backup.

## Editing

The MCP page in the sidebar lists host and project servers, edits URL or command,
arguments, request headers and environment variables, and applies every change
immediately. Headers and variables are key/value rows, not free text; pasted
`.env`, header lists and full command lines merge into those rows. A remote
server chooses HTTP or SSE, and SSE survives into `.mcp.json`.

The composer carries an MCP counter for the current thread's workspace. Its menu
toggles individual servers for that project.

## Secrets

Values referenced as `${NAME}` live in `~/.bb/mcp.local.json` or
`<repo>/.bb/mcp.local.json`; both files are mode `0600`, and the project one sits
behind a generated `.bb/.gitignore`. Values are expanded when a harness file is
written, using `mcp.local.json` first and the target host's environment second.
The Secrets card lists every name, including unused ones, with its scope and the
servers that use it; values are shown only when you open a secret. A server that
uses a local or environment value is left out of the committed project
`.mcp.json` unless `bb mcp-hub apply --embed-secrets` is passed.

## Import

When a project already configures servers in `.mcp.json`, `opencode.json`,
`.opencode/opencode.json`, `.cursor/mcp.json` or `.vscode/mcp.json`, the page
shows a banner with the count and a review dialog. Imported entries are written
to `<repo>/.bb/mcp.json`; values are copied verbatim, and the dialog warns when a
header or variable name looks like a literal token.

## Remote hosts

The page follows the machine of the current thread and remembers the last host
and project you picked. Hub files, secrets and generated files are read and
written on the selected host, and `${VAR}` environment values come from that
host rather than from the bb server.

## What each harness gets

- Kimi Code: `~/.kimi-code/mcp.json` and the project `.mcp.json`.
- Claude Code: the project `.mcp.json` and `~/.bb/mcp/export/claude-user-mcp.json`.
- OpenCode: `~/.bb/mcp/opencode.json` in the v2 shape, and a project file under `.bb/mcp/`.
- Cursor: `~/.bb/mcp/export/cursor-mcp.json`.
- Codex: `~/.bb/mcp/export/codex-config.toml`.

Claude Code user scope lives in `~/.claude.json`, which also holds session state,
so MCP Hub writes an export instead of merging. Cursor and Codex exports are
copies you place in the harness settings. Harness selection is per plugin
settings; a disabled harness gets no file, and a previously written file is
removed.

## Requirements

bb 0.49 or newer, the harness CLIs you enable, and a host that can write the
paths above. No external service or account is added. Secrets are stored as
plain text in the local JSON files, protected by file mode and git ignore.
