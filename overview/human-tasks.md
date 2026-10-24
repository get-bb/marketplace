## What you get

- **One list of what only you can do.** When an agent hits a step it can't take itself, such as creating an API key, adding a DNS record, renewing a domain, or testing a build on your phone, it hands you a task instead of burying the request in chat. Each task has step-by-step instructions, an "open the site" link, and links to the project, thread, and bot that asked.
- **The agent resumes when you finish.** Check a task off and the thread that asked gets your note, then the task shows when the agent picked it back up. Archived or deleted threads are left alone. If the agent checks and it isn't done (the record isn't there yet), it sends the task back with a reason.
- **You notice new tasks.** The sidebar icon shows a count, red while an agent is blocked. New tasks show a toast, or a system notification when bb is in the background. The home screen lists what's waiting, and the requesting thread shows a banner.
- **Blocking tasks wait in the thread.** A task the agent can't work around opens bb's native input form in its thread, so the thread shows as waiting on you and your push notifications fire.
- **Work it your way.** Ask the agent a question without closing the task, snooze until tomorrow, see due dates, and filter by project, bot, or kind. Agents can also hide a task until it can be done, such as after DNS propagates.
- **Credentials never land in the chat.** A task can name the env vars the agent needs back. After you finish, the agent collects them through bb's secure secret form. The note box warns you if you paste something that looks like a key.

## Do it, or let the agent do it

Every task says what the agent would need to do it itself, this time and next time: an MCP server, a scoped API key, a CLI login, or permission to use your signed-in bb browser. Do it yourself and mark it done, or press **Let the agent do it**: the agent asks in its thread for exactly that access, does the work, and closes the task. It records how it got access, so the next similar task is flagged as one an agent can do. The page counts the tasks agents did for you.

## How agents use it

The plugin adds three short agent tools and a `bb human-tasks` command. A bundled skill tells agents when to hand you a task and how to write one, so you don't need to edit your AGENTS.md.

## Requirements

No account or external service. Tasks stay in this plugin's database on your bb server. Linking tasks to bots needs the Bots sidebar plugin; everything else works without it. System notifications use the browser's notification permission, which the Push notifications plugin can grant. Open **See an example** on the empty page to try it with made-up tasks.
