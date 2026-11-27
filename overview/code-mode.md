Code Mode lets you run the Claude Code threads you choose in Claude Code's experimental Code Mode, where Claude writes a short script that reads files, runs commands and calls tools in one go. It works one thread at a time, with no environment variable to set and no bb restart.

## How you use it

- **Send in Code Mode** sits in the menu beside the Send button of a new thread. It sends the first message and starts the thread in Code Mode. Where a project starts new threads in Code Mode, **Send without Code Mode** starts one with the ordinary tools instead.
- **Projects that start in Code Mode**, on the plugin's settings page, make every new Claude Code thread in a project start that way, on the machines you turn on. Projects are listed once per name, so the same repository on two machines is one switch, and Select all and Select none set a whole list at once.
- **Threads that agents and plugins start** follow the project's default, never use Code Mode, or do what the thread that started them does, as you choose. Forks keep the choice of the thread they came from.
- A Code Mode thread shows a **Code** badge on its row and a **Code Mode: on** line in its thread menu.

## What it keeps safe

- **The choice is fixed per thread.** A Claude Code session started in Code Mode can only resume in Code Mode, so the plugin decides on a thread's first message and never changes it. Threads that existed before you installed the plugin are never touched.
- **Machines are opt-in.** Code Mode runs only on the machines you turn on. Leave off a machine whose Claude Code account can't use Code Mode, such as one under a HIPAA plan.
- **Models are checked.** Code Mode works with Opus 5.5, Sonnet 5.5, Fable 5.2 and later models. A message that would move a Code Mode thread to another model is refused, with the reason.

## How it works

Claude Code takes Code Mode for the sessions bb runs only from its settings, which bb does not expose. The plugin writes a small wrapper into its own folder on each machine you turn on and gives it to bb as the Claude Code program for Code Mode threads only. The wrapper adds Code Mode to the settings bb passes and runs the real Claude Code. It needs no Python, and it logs one line per launch without arguments or environment values.

## Costs and limits

- Code Mode is experimental in Claude Code, and the plugin uses experimental bb plugin APIs. Either can change.
- If the plugin is turned off or fails, its Code Mode threads can't resume until it is back. Then stop the thread and send a new message.
- macOS and Linux machines only. Needs bb 0.50 or later.
