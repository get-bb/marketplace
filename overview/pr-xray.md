Understand a pull request before you review it. PR X-ray groups the diff by concern, puts it in reading order and explains it with a walkthrough and diagrams.

## What you get

- **Diff tab**: hunks grouped by concern and ordered as a reading path, with lockfiles and renames last. Viewed checkmarks, split or unified view, and GitHub-style inline comments, reviews, suggestions, replies and resolve.
- **Explain tab**: a summary, a walkthrough, spots to look at closely, and interactive diagrams. Click a diagram node to leave a design comment, which stays in bb.
- **Fix with agents**: fix one thread, your open review comments, all open comments, or redesign from your diagram comments. The redesign plans first and waits for your approval.
- **Retro feed**: tag comments yourself or with AI, then export them with `bb pr-xray comments --json`.

## How to open it

Use the command palette or the PR X-ray page in the nav rail, ask any agent to "x-ray" a PR URL (`pr_xray_review`), or run `bb pr-xray review <url>`.

## Requirements

- A GitHub login through `gh`, or a fine-grained token with Pull requests read and write, and Contents read. [The README shows how to create one](https://github.com/AlsoKnownAs-Ax/bb-plugin-pr-xray#create-a-github-token).
- An agent provider in bb. Analysis, chat and tagging use your provider's quota.
- Optional: Notion connected to that provider, so the analysis can read the ticket linked in the PR description.

## Security

**Only use agents on PRs you trust.** Analyse, chat, fix and AI tagging run agents that read PR content such as its code, description and comments. Text in a PR can try to instruct those agents. A steered agent could use your GitHub login, call PR X-ray's commands (including approving or commenting) and read local files. An image in a chat reply could also send data out, with no click needed. Viewing a diff and commenting by hand don't run agents.

PR content is untrusted, and a malicious PR can try to prompt-inject the agents that read it. Analysis and chat agents never run in your own checkout: they use a disposable copy of the PR's commit, so setup scripts on the branch don't run, or no repository for fork PRs. They are told to stay off the network, but that instruction is not a security boundary.

**With Codex, these agents have network access.** bb's Codex workspace sandbox always allows it and PR X-ray can't turn it off, so an injected agent could reach the internet, run `gh` with your login and read files on your machine. Other providers depend on their own sandbox and approval settings.

PR X-ray asks you to confirm once per PR before an agent works on someone else's PR, or chats over other people's comments.

Comments and analysis text can't load remote images or media in PR X-ray: they show as links or plain text.

Fix agents can push to the PR branch. By default they read only your own comments. Fix all open comments also sends everyone else's, and on a public repo anyone can post one, so it asks you to confirm every time.
