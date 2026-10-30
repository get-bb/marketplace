## What you get

A Lobu page in the bb sidebar covering every workspace your `lobu` CLI logins reach. Workspace chips at the top narrow it to one workspace. Five cards, grouped by workspace:

- **Needs you**: pending approvals and Automations that are due. Identical requests collapse into one row ("36 approvals waiting") that links to all of them.
- **Failed runs**: Automation and feed failures from the last 24 hours. Failed ad-hoc agent tool calls are left out.
- **Connections & devices**: connections and feeds that need attention, and paired devices that are offline, erroring, or need an update.
- **Activity**: agent briefings, the busiest feeds by items synced, and Automation runs over the last 24 hours.
- **Metrics**: metric queries you pin, plus the measures each workspace declares.

Every row links to Lobu. **Ask an agent** opens New thread with a prompt about the row; you pick the project and send. A one-line summary also appears on the New thread screen when something needs you.

## Save to Lobu

Agents forget everything when a thread ends. Save to Lobu keeps the useful parts in your Lobu workspace memory, where any agent connected to Lobu can find them later.

- **The agent offers.** Agents get a `lobu_remember` tool and propose a few short memories when a task leaves something worth keeping.
- **Save a message.** Hover a message, or highlight part of one, and choose **Save to Lobu**.
- **Ask for a recap.** **Save learnings to Lobu** in the thread menu asks the agent what is worth keeping.
- **Recap on archive.** Optionally, archiving a thread starts a hidden agent (you can pick a cheap model) that proposes memories from it. They wait in **Memories to review** on the Lobu page.

Nothing is saved until you review it: a form, in place of the message box or on the Lobu page, lets you untick, edit, and pick the kind and workspace, then save or skip.

## How it reads Lobu

The plugin reuses your `lobu` CLI login and makes one read-only `query_sdk` call per workspace. The summary is computed inside Lobu. Tokens stay in the bb server process. The only write is Save to Lobu, which calls Lobu's `save_memory` for the memories you approve.

## Requirements

Install the Lobu CLI with `npm install -g @lobu/cli` and run `lobu login`. Every login appears automatically and covers the workspaces you approved; to add more, run `lobu login` again, or `lobu context add <name> --url https://app.lobu.ai/api/v1` then `lobu login --context <name>`.

## Source

The [README](https://github.com/lobu-ai/bb-plugin-lobu#readme) covers settings and limits. Report problems in [GitHub issues](https://github.com/lobu-ai/bb-plugin-lobu/issues).
