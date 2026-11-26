Come review season you are reconstructing a year from memory. Paper Trail does the remembering as you go: it captures each workday from the tools you already use, rates it against your role, and draws it as a cell on a contribution graph. Every rating links back to the meeting, ticket, pull request, doc or chat thread it came from.

## What you get

- **A graph of rated days.** Lenses for rating, role area, meeting load, evidence volume and plan. Click a day or week for its reasoning, claims, source coverage and evidence links.
- **Zero-config setup.** Give it your name, your email and a role card. The agent infers your role areas, rubric, work split, guardrails, goals and manager, shows its reasoning, and backfills four weeks.
- **A week loop.** On Monday a scan writes the week's intent and commitments with "done when" marks. On Friday each one is marked hit, partial or missed, with a retro and a plan-accuracy trend.
- **Time and guardrails.** Your real split of time across role areas against a target, plus flags for meeting load, a neglected area, stale asks and a failing source.
- **Threads and an invisible-work radar.** Work that spans weeks gets a status and a closure note. The radar surfaces help, reviews and decisions that nothing else cites.
- **Review packets.** Ratings, claims, threads, goals and gaps for any date range as markdown with evidence links, with an optional narrative.
- **You stay in charge.** Confirm or override any AI rating with a note, edit any inferred section, and export everything as a JSON bundle.

## How it works

Capture runs as hidden agent threads that use your agent's own connectors: calendar, Granola, Fellow, Jira, Confluence, GitHub, Slack, notes and memory. Replies must pass strict validators. Rating and judgment run with no tools at all, and evidence is fenced and treated as data.

## Privacy

The plugin holds no credentials and has no network code of its own. Data lives in the bb server's plugin database; only prompts to your own agent leave the machine. A hostile ticket or chat message reaching a capture thread is the main remaining risk, and the documentation says so plainly.

## Agents

Agents can use the `bb paper-trail` command: `status`, `day`, `week`, `backfill`, `doctor`, `connectors`, `packet` and `export`.

## Requirements

bb 0.50 or later, and a bb host whose agent has the connectors you want captured. No key and no account; jobs use your agent's model quota.
