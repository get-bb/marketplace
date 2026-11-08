## What you get

- Type a command in a thread's composer, such as `git status`, `!ls -la` or a
  multi-line script, and send it with **Mod+Alt+Enter** or **Send menu → Run
  in terminal**. It runs in the thread's working directory, on the machine
  where that thread's session runs.
- The message waits in the queue while the command runs. It then goes to the
  agent as two blocks, the command and its output (with the exit code when it
  is not zero), so the next answer starts from the real result.
- A command that takes longer than the wait (30 seconds by default) keeps
  running in the thread's Terminal panel, and the agent receives the output so
  far.
- Pagers are turned off, so `git log`, `git diff` and `man` print their output
  instead of waiting in `less`.

## How it works

The plugin checks every message before bb dispatches it. A message sent with
the Run in terminal action is held. Once bb has queued it, the plugin opens a
terminal in the thread's environment (local or remote) and runs the command
exactly once. It then replaces the message text with the command and its
output and lets the message go. A plain Enter on a message that starts with
`!` is refused with a hint, so nothing runs by accident.

## Safety

- Messages that bb marks as coming from an agent, from bb itself or from
  another plugin never run, and `bb thread tell` cannot use the action.
- bb does not authenticate the action, so a program on your machine that
  writes its own request to bb's local API could still trigger it. The
  README explains this limit.
- Commands run with your account's full rights, outside the agent's
  permission mode, exactly as if you typed them into the thread's terminal.
- The output block is marked as data, and the bundled skill tells agents not
  to follow instructions found in it.

## Settings

Turn the plugin off; change the command prefix, how long to wait, how much
output to send, the terminal size and the pager switch. A legacy mode lets
plain `!` messages run, with the risks explained in the README.
