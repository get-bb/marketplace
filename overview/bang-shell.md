## Why

Keep agents away from secrets and production access without losing their help.
When an agent's sandbox or permission mode blocks a command — it needs
credentials from `.env`, a database the agent must not reach, or a tool that
runs as you — the agent proposes the command, you review it and run it with one
click, and the agent continues from the output. It never gets the credentials
or the access, only the result you chose to run. Keep secret values out of
what the command prints: the output goes to the agent.

## What you get

- Type a command in a thread's composer, such as `git status`, `!ls -la` or a
  multi-line script, and send it with **Mod+Alt+Enter** or **Send menu → Run
  in terminal**. It runs in the thread's working directory, on the machine
  where that thread's session runs.
- Highlight a command in an agent's answer and pick **Run in terminal** in the
  selection menu, next to Add to chat. The message action button runs the
  answer's first shell code block. Your unfinished draft is kept.
- Fenced `sh`/`bash`/`zsh` code blocks in an answer get a **Run** button (Python
  blocks too with `runPythonBlocks`); languages are set by `runButtonLanguages`.
- The message waits in the queue while the command runs. It then goes to the
  agent as two blocks, the command and its output (with the exit code when it
  is not zero), so the next answer starts from the real result.
- A recognizable input prompt or choice opens the command's Terminal tab
  automatically, extending the wait to give you time to answer. Without a
  recognized prompt, a still-running command opens its tab at the regular
  wait limit (30 seconds by default) and sends output so far to the agent.
  The command keeps running there.
- **Option/Alt-click** a code block's Run button, or use **Send menu → Run in
  thread shell**, to keep variables and the working folder in one persistent
  shell per thread. Its tab opens for input; a green dot marks a live shell.
  Commands wait up to 600 seconds by default, then send output so far while
  continuing to run. A busy shell refuses another command; close its tab to
  start fresh. zsh is supported; bash 4.4+ is untested live.
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
- Thread shell variables stay in that shell until you close it. Use `read -s`
  for secrets; plain `read` echoes input into the output sent to the agent.
  Programs with local bb API access can also send input to that terminal.
- The output block is marked as data, and the bundled skill tells agents not
  to follow instructions found in it.

## Settings

Turn the plugin off; change the command prefix, how long to wait, how much
output to send, the thread shell wait, the terminal size and the pager switch.
A legacy mode lets plain `!` messages run, with the risks explained in the
README.
