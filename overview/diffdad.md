Diff Dad turns a GitHub pull request into a narrated review: a verdict, a reading plan, and reviewer concerns instead of a file-by-file diff. This plugin puts a running Diff Dad daemon inside BB and adds the one view Diff Dad lacks, the pull requests that ask for you by name.

## What you get

- A **Diff Dad** page in the sidebar. It opens on "Needs my review": only the pull requests where you personally are a requested reviewer, not the ones routed to a team you belong to. Rows show repo, branch, title, author, criticality tags, file and line counts, approvals, verdict, and age, grouped and sorted the same way Diff Dad's own queue is. A repo filter and a refresh button sit above the list. Click a row to read its narrated review.
- An **All** tab that embeds Diff Dad's command center as is, with every review request, in-flight work, and cleared pull requests.
- A **Review PR in Diff Dad** action in the thread panel. It adds the thread's pull request to the queue and opens its review beside the conversation.
- A `diffdad_review` tool and skill for agents. An agent can ask for a pull request's verdict, TL;DR, and concerns as text, or omit the argument to review the thread's own pull request.
- `bb diffdad list [--mine] [--json]` and `bb diffdad add <pr>` from a shell.

## How it works

The plugin never renders diffs itself. Diff Dad's daemon owns the narration, the GitHub polling, and the review UI. The plugin reads the daemon's queue over its local HTTP API, asks GitHub which of those pull requests request you directly, and draws that list in BB. Everything else is Diff Dad's own page in a frame.

## Requirements

- Diff Dad installed and its daemon running: `dad daemon`, or `dad daemon install` to keep it running. See https://github.com/nicknisi/diffdad for install and AI provider setup. The daemon needs a GitHub token and an AI provider of its own.
- The GitHub CLI (`gh`) logged in, for the "needs my review" split.
- The daemon URL defaults to `http://localhost:4319`. Change it in the plugin settings if you run the daemon on another port.

## Limits

- Local only. Over BB Connect the embedded page points at the remote device's localhost.
- Diff Dad reviews GitHub pull requests, not unpushed local changes.
