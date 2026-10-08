Lets your BB agents run long-lived tests, builds, servers and watchers without blocking a turn.

## Native task management

The `task` tool starts a non-interactive `/bin/sh` command on the thread's execution machine and returns immediately. Its `pid` identifies the detached supervisor and process group. Commands inherit machine variables and safe BB thread context variables. Agents can list jobs, stream output with byte cursors, read a bounded tail, stop a process group and clear finished jobs. Standard output and standard error share one ordered log, and ANSI control sequences are removed before output reaches the agent. Live tails intentionally include the unfinished current line; cursor-based reads wait for complete lines except when a line reaches the 50 KB cap. Those lines return UTF-8-safe chunks with continuation cursors.

Tasks appear in BB's own interface: native tool rows, a per-thread Tasks panel, optional live cards in assistant messages and completion toasts. An opt-in setting nudges agents to prefer Shell tasks over a provider's built-in background-task runner while retaining the provider runner for interactive commands or when `task` is unavailable. Successful and failed tasks are held for at least three seconds and until quiet for one second, then sent as one agent-only JSON follow-up that starts an idle thread or waits durably behind the active turn. Later completions merge into that waiting follow-up. A full final read, complete tail or clear suppresses a pending notice for that task; `list` and task cards do not. A detached supervisor keeps running tasks and result capture alive across plugin reloads. Pending notices, failed stops and deletion cleanup are retried from durable state. Visible running output refreshes every 2 seconds, and cards recover missed state changes after reconnecting.

## Origins

The core actions and stop behaviour come from [Pi's former task extension](https://github.com/ahkohd/dotfiles/blob/84c682fe4f7902c441f9212c3f38d2a2177ecddb/pi/.pi/agent/extensions/task.ts). BB adds a configurable tail line limit, a smaller 50-line default and clearer output metadata.
