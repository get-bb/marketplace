Radar is a live panel of the pull requests and issues that need you, on **GitHub** and a **Delta** repo, plus optional read-only **Gitstream history**. Nothing is stored remotely: lanes are queried live from your own `gh` and `dt` (and, for history, `gs`) CLIs every 90 seconds.

## Lanes

A lane is a saved query that can hit several hosts at once. Defaults: review requests, mentions, assigned items (not parents of your sub-issues) and your open PRs. Results merge by last update, with unseen items marked and an unseen count on Radar's rail icon.

- **Describe what to track** in plain words ("PRs from my team that touch billing, not drafts") and bb's configured AI drafts a lane for you.
- **Edit a lane** in a form with per-host sections, a live summary, chip inputs, and server-side filters for Gitstream history lanes.
- **All**, **Issues**, **Pull requests** and **Reviews** views, in the Filter menu. Each lane has a category, inferred from its query or picked in the editor, that decides its view; All shows every lane.

## Focus

Hide repos across every lane ("no billing", "only the mobile app"). Type it in words or toggle scopes by hand. Point `areaRepo` at a monorepo and its `//path` labels become areas you can hide or focus too.

## Hide one item

The eye-off action on any row hides that one PR or issue from every lane, view, count and the rail badge, with a brief Undo. The eye-off count in the toolbar lists hidden items to unhide. A hide lasts until you undo it or its item has been in no lane for 30 days.

## Review and triage threads

Every row can start a bb thread through bb's own new-thread composer, with the project picked from the repo. Threads land in a **Reviews** thread section and the row links to them until archived.

Your own open GitHub and Delta PRs also get **Rebase**: an inline confirm, then a rebase onto the latest base. GitHub uses its server-side rebase update. Delta has no server-side rebase, so once you point Radar at a local checkout it uses plain git against `origin`: a clean-only `git replay` in private refs (your worktree is untouched) and a lease-guarded push. Radar re-checks on the host that you wrote the PR before touching it. Gitstream history is read-only and never written to.

Radar threads get skills attached:

- `radar-review` or `radar-triage`, Radar's own skills, describe how to read the item on each host and how to report. They never post, approve or edit until you say so.
- Optionally, one installed skill (for example a code-review skill) is invoked in the opening message; pick it per kind in settings.

## Context from Slack

Point Radar at a Slack MCP endpoint and it follows the public Slack threads that link your open GitHub issues and PRs and Delta PRs (in Focus), counting only messages by people. When a thread changes, bb's AI refreshes its short summary: decisions, owners, open questions, next steps.

The Slack icon on a row opens a popover with one row per thread: channel, who started it, replies and the summary. It shows on hover, badged with a check when threads link the item or a cross once a search finds none. Radar never updates issues by itself; hover a thread and "Post to issue/PR" (click twice) adds one comment with its context and link. Private channels and DMs are never searched.

## CLI and agent skill

`bb radar` lists lanes and items, adds or edits lanes, sets focus and hides single items, so agents can answer "what needs my review?" through the bundled `radar` skill.

## Requirements

- `gh` signed in to GitHub. For Delta, `dt` signed in plus the host and repo in settings (and a checkout path for Rebase); for Gitstream history, `gs` plus the history toggle. Lanes skip sources that are not set up.
- For drafting lanes and focus: a bb build with configured-provider AI, or the optional OpenAI-compatible fallback (base URL, the name of a bb server env var holding the key, and model, all in settings). Without either, Focus still matches repo and area names.
