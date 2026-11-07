## What you get

Triage Sidebar replaces the scrolling thread list in BB's sidebar. BB keeps its New thread button, search, navigation rows and footer. Turn it on in **Settings > Appearance > Sidebar**; switching back restores BB's own list at once.

- **An inbox sorted by attention.** A thread with a question on screen comes first, then failures, raised hands and finished turns, then idle work. Pinned threads keep their own shelf at the top.
- **Status you can read from across the room.** Blue means an agent is working, green a finished turn, red a failure, amber a thread waiting on you. Every card shows how long the thread has been idle, and that age turns amber as the agent's prompt cache nears expiry.
- **Snooze and settle.** Snooze hides a thread for an hour, until this evening, tomorrow morning or next Monday. A snoozed thread comes back early if it starts working or asks you something. Settle files a finished thread on its own shelf.
- **Cleanup when you settle.** Settling closes the thread's terminals and stops the processes left under its worktree. A settled thread that stays untouched is archived after the number of days you set.
- **Ports behind a plug icon.** Hover the icon on a card to see each port its worktree is serving and the process behind it. Click a port to open it in BB's browser, or Command-click to open your default browser. A port's process can be stopped from the same card, after a confirming second click.
- **Project commands.** Save up to 12 commands such as `pnpm dev` or `npm test` per project in Settings, then run or stop them from a thread's row or its header, where the dev server gets a play button. Each runs in a BB terminal on the thread.
- **A coloured square per project.** Each card starts with the project's avatar: one you set, the project's own favicon, the git host's owner image, or a generated monogram.
- **Child threads in the header.** Children leave the list while their parent is visible. A header chip lists a parent's children, and a child's chip leads back to its parent.

## How it works

The list re-sorts itself, but never under your cursor. While the pointer is over the list, a row has keyboard focus or a row menu is open, the order holds. When you move away, each row that changed rank slides once to its new place. A reduced-motion preference makes the moves instant.

A thread that is working can never be snoozed or settled. That covers a running turn, a child thread, a background agent, a workflow, plan mode and a goal. A dev server left running after a turn does not block settling, since stopping it is the point.

Settle and snooze state lives in the plugin's own database. Uninstalling the plugin removes it.

## Requirements

- BB 0.43.4 or later.
- Port listing uses `lsof`, so it works on macOS and Linux only.
- Project avatars can request the owner's image from GitHub, GitLab or your own git host. Turn this off in Settings to make no such request.

Triage Sidebar is a fork of [T3 Sidebar](https://github.com/SawyerHood/bb-plugin-t3sidebar) by Sawyer Hood.
