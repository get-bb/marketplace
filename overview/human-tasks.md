## What you get

- **One list of what only you can do.** When an agent hits a step it can't take, such as creating an API key, adding a DNS record, or testing a build on your phone, it hands you a task with step-by-step instructions and links to the project, thread, and bot that asked.
- **The agent resumes when you finish.** Check a task off and the thread that asked gets your note. If it isn't actually done, the agent sends the task back with a reason.
- **You notice new tasks.** A sidebar count (red while an agent is blocked), toasts, system notifications, and a banner in the requesting thread. Blocking tasks wait in their thread as bb's input form, so push notifications fire.
- **Work it your way.** Ask the agent a question, snooze, see due dates, and filter by project, bot, or kind.
- **Credentials never land in the chat.** The agent collects them through bb's secure secret form.

## Do it, or let the agent do it

Every task says what the agent would need to do it itself: an MCP server, a scoped API key, a CLI login, or your signed-in bb browser. Do it yourself, or press **Let the agent do it** and grant that access in the agent's thread.

## How agents use it

Three agent tools, a `bb human-tasks` command, and a bundled skill that tells agents when and how to hand you a task, so you don't need to edit your AGENTS.md.

## Requirements

No account or external service. Tasks stay in this plugin's database on your bb server. Linking tasks to bots needs the Bots sidebar plugin; everything else works without it. System notifications use the browser's notification permission, which the Push notifications plugin can grant. Open **See an example** on the empty page to try it with made-up tasks.
