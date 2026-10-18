See everything an agent did in a thread without opening nested chat rows.

## What you get

- One flat side-panel log in bb's timeline order: your messages and steers, child reports, agent replies, thinking, commands, tool calls, file diffs and subagent steps.
- Timestamps, status, exit codes and duration beside each step. Replies appear in full, long output previews its first and last lines, failed commands and tools open by default, and `x` expands every row.
- Filters for Messages, Thinking, Tools and Errors, plus whole-session search. The log follows new output, including outputs that open up as they finish, until you scroll up or move to an older row; “↓ Latest” or `G` takes you back.
- Keyboard navigation (`j/k`, `n/N` for replies, `e/E` for errors), copy (`c`), a message link back to chat (`s`), and Mod+Shift+L to open the tab. The thread header has an open button too. bb's Maximize pane button gives the log the whole window.
- Settings for preview sizes, whether failures open by themselves, which rows show when the log opens, and a 12- or 24-hour clock. Changes reach open panels straight away.

## How it works

The plugin loads bb's public timeline API, including nested rows, when you open the tab. It applies live deltas afterward, with at most two refresh requests a second. It does not change bb's chat markup or store thread data; only the expanded-view choice is saved on this device. If you also want bb's chat itself to stop folding finished turns, use `bb settings completed-turns <provider> flat`.

## Limits

bb truncates output above 32,000 characters and the log keeps its truncation note. Search finds text inside Markdown messages but does not highlight it there. The whole session is fetched on opening, including large threads.
