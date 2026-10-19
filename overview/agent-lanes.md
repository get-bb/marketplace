Lanes shows where every agent is right now. Each bb thread gets a lane, and
each agent turn is a block that grows towards "now" while it runs. Lines
between lanes show when one agent started or messaged another.

## What you get

- A **Lanes** page in the sidebar with a live timeline of your threads. The
  sidebar row shows how many agents are running, and an amber count when one
  of them needs you.
- A summary in the title bar: how many agents are running, how many need you,
  the time window (15 minutes up to 7 days), and a button to jump back to now.
- Groups that match the sidebar: by project, section, environment, machine,
  provider, or team. Sub-threads sit under the thread that started them.
- Filters for all lanes, active lanes, lanes that need you, and lanes that
  failed, plus search by title, project, model, or branch.
- Approvals on the block itself. When an agent asks for approval, you can
  approve or reject it from the timeline.
- A **Team lanes** tab beside any thread, showing that thread, the agents
  around it, and the threads it handed work to or from.
- A `bb lanes now` command that prints what is running and waiting, for you or
  for an agent.

## How it works

The plugin's server reads bb's thread events and keeps a history of turns in
the plugin's own storage on your bb server. The page combines that history with
bb's live thread list, so a lane changes the moment the thread does. Nothing
leaves your machine, and the plugin needs no account or API key.
