Radar is a live panel of the pull requests and issues that need you, on **GitHub** and, if you set them up, a **Gitstream** repo and a **Delta** repo. Nothing is stored remotely: lanes are queried live from your own `gh` (and `gs`, `dt`) CLIs every 90 seconds, and only your configuration lives in bb.

## Lanes

A lane is a saved query that can hit several hosts at once. The defaults cover reviews requested from you, mentions, assigned items and your own open PRs. Results merge by last update, with unseen items marked and an unseen count on Radar's rail icon.

- **Describe what to track** in plain words ("PRs from my team that touch billing, not drafts") and an OpenAI-compatible model drafts a lane for you.
- **Edit a lane** in a form with per-host sections, a live summary, chip inputs and Gitstream's server-side filters (review requested, author, labels, and more).
- **All**, **Issues**, **Pull requests** and **Reviews** views, switched from the panel title bar. Each lane has a category, inferred from its query or picked in the editor, that decides its view; All shows every lane.

## Focus

Hide repos across every lane ("no billing", "only the mobile app"). Type it in words or toggle scopes by hand. Point `areaRepo` at a monorepo and its `//path` labels become areas you can hide or focus too.

## Review and triage threads

Every row can start a bb thread through bb's own new-thread composer, with the project picked from the repo. Threads land in a **Reviews** thread section and the row links to them until archived.

Your own open GitHub and Gitstream PRs also get **Rebase**: an inline confirm, then a server-side rebase onto the latest base (GitHub's rebase update, Gitstream's clean-only rebase). Radar re-checks on the host that you wrote the PR before touching it. Delta has no server-side rebase, so it is not offered there.

Radar threads get skills attached:

- `radar-review` or `radar-triage`, Radar's own skills, describe how to read the item on each host and how to report. They never post, approve or edit until you say so.
- Optionally, one installed skill (for example a code-review skill) is invoked in the opening message; pick it per kind in settings.

## CLI and agent skill

`bb radar` lists lanes and items, adds or edits lanes, and sets focus, so agents can answer "what needs my review?" through the bundled `radar` skill.

## Requirements

- `gh` signed in to GitHub. For Gitstream or Delta, `gs` or `dt` signed in, plus the repo and host in settings; lanes skip sources that are not set up.
- An OpenAI-compatible API key in the bb server environment (`OPENAI_API_KEY` by default; base URL, key variable and model are settings) for drafting lanes and focus.
