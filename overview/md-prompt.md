Read a long prompt while you write it: headings stand out, inline code gets a
chip, and code fences gain syntax colours before the closing fence is typed.
The Markdown markers stay visible and the text sent to your agent stays
exactly as typed.

## What you get

- Live styling for headings, emphasis, lists, tasks, quotes, tables and links.
- Syntax colours for fenced and indented code, including unfinished fences.
- A Markdown button beside the composer controls to turn highlighting on or off.
- A saved preference shared by open composers and kept across sessions.

## Controls

Use the composer button, the plugin's Markdown highlighting setting, or
`bb md-prompt on`, `bb md-prompt off`, `bb md-prompt toggle` and
`bb md-prompt status`. Each command accepts `--json`.

## How it works

The client paints the draft through BB's public composer decoration API.
It keeps BB's editor, selection, mentions, attachments and send controls.
The backend stores only the enabled preference. Based on the MIT-licensed
[md-prompt parser](https://github.com/nogu66/md-prompt).

## Requirements and limits

Requires BB 0.47 or later with Plugin SDK 0.6.79 or later in the 0.6 series.
Works with BB's native composer across agent providers. No external service,
paid account, API key or separate Claude Code installation is required.
Drafts longer than 60,000 UTF-16 code units remain plain. Code cards use a
fixed dark background and have gaps on empty lines.
