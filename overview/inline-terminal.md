Agents often answer with a command for you to run. This plugin turns that
code block into a terminal you can use on the spot, and hands the outcome
back to the agent the way `!command` does in Claude Code.

## What you get

- A **Run** button under every `bash`, `sh`, `shell`, `zsh`, `console`,
  `shell-session` and `terminal` code block in agent replies. It becomes
  active once the block has finished streaming.
- A live, interactive terminal right under the block that grows with its
  output: answer prompts, type passwords, press Ctrl-C, run follow-ups in the
  same session. Type `exit` to end it, then **Run again** to start fresh.
- When the block finishes, its exit code and output go to the agent as hidden
  context and the agent replies right away. You see the output in the
  terminal; nothing extra is posted to the chat. If the agent is still busy,
  the result waits until its current reply ends.
- The terminal icon in the terminal's top-right corner opens the same
  session in bb's terminal panel.
- To keep results to yourself, turn off *Send command results to the agent*
  in the plugin settings.

## How it works

The shell starts in the thread's workspace on the thread's machine, with your
own shell startup files loaded, and runs the block inside that interactive
shell. `cd`, activated virtualenvs, aliases and variables set by the block stay
in the session, and the block lands in your shell history. Ctrl-C reports exit
code 130 and keeps the shell open; `exit` and `set -e` still report their
status.

In `console` and `shell-session` transcripts, only lines that start with `$ `
or `% ` run; the output lines are skipped.

Only the block's own run is reported to the agent. Commands you type
afterwards in the same terminal stay between you and the shell.

## Requirements

- A macOS or Linux machine for the thread. zsh and bash get full support;
  other shells fall back to `/bin/sh`.
- No account, API key or external service.

## Privacy

Nothing runs until you click **Run**. The output of a run you start, up to
the last 20,000 characters, is sent to the thread's agent. Leave auto-send off
for commands that print secrets.
