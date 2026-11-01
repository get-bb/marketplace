For reviewers who need to understand a change before they approve it, often one an agent wrote. The agents read, draft, and explain, and the review agent posts what you ask for, showing its exact text first; replies and comments skip that only when you say "just post it".

## What you get

- **A guide to the change.** An agent writes the PR's intent and its chapters in reading order, each with a risk level. Risky chapters list what to verify, and **Start here** points to the one to three lines most likely to hide a defect.
- **Requirements, checked.** What the PR's description and linked issues ask for, each marked covered, partial, missing, or unclear, with evidence.
- **A drafted review you edit.** Line comments with a severity (Blocking, Should fix, Question, or Nit), a summary, and a suggested verdict. Each draft says how the agent confirmed the problem.
- **Ask agent.** Ask about the whole change, a line, a selection, or a failing check, in BB's side panel.
- **Finish review.** The summary, your verdict, and exactly what will be posted. Before you approve, it flags blocking comments, unviewed files in high-risk chapters, and chapters read faster than your set pace.

## Whose turn and re-review

- **All reviews** sorts your reviews into Needs review, Waiting on author, Reviewed, and Archive. A push alone never makes a review your turn; a re-request, a question for you, or your feedback being handled does. PRs that request your review join the list from GitHub.
- After new commits, **Since your review** shows only what changed since the commit you reviewed. The review agent checks each of your earlier threads and drafts replies for you to send.

## Reading the diff

- Lockfiles, generated files, and huge diffs start folded. File chips flag code owners, tests that lose assertions or get skipped, lockfiles that add packages or download from another host, and hidden bidirectional Unicode. CI failures show under their lines.

## Local changes and agent threads

- **Review changes** above a thread's message box, or `bb review` in it, reviews that thread's folder, uncommitted and new files included.
- **Send** your comments to the thread that wrote the code. It reports each done or declined, and the review comes back **Ready to re-review** with each fix checked.
- **Push** from the review: the thread commits what you reviewed, and pushes exactly that commit. **Push and open PR** has the review agent draft the PR too.

## Trust

- What posts under your name shows its exact text with a **Post** button first, and only your own message or click in that review approves, merges or closes. Turns the plugin starts on its own only draft, and a Settings switch returns the agent to drafting only.
- Agents start on their own only on PRs from the repository's owner, members and collaborators. PR text reaches the agents fenced as untrusted data, and instruction files are read from the PR's base, never its head.

## Requirements and costs

- BB 0.48 or later, on Node 24 or later.
- `git` and GitHub CLI (`gh`) on the BB server, signed in to github.com. GitHub features support github.com only.
- A BB agent provider. Guides, reviews, and re-review checks use its usage allowance.
- At least one BB project.
- Each reviewer needs their own BB installation: a shared BB server shares its GitHub credentials and saved reviews.

## More

- Full guide, troubleshooting, and settings: [the guide](https://github.com/AndrewBird81/bb-plugin-code-review-workspace/blob/main/docs/guide.md).
- Formerly Guided Review. Moving over copies your reviews, drafts, and settings: [Moving from Guided Review](https://github.com/AndrewBird81/bb-plugin-code-review-workspace#moving-from-guided-review).
- Maintained by Andrew Bird. It began as a fork of [Pritam Sharma's Guided Review](https://github.com/notpritam/bb-plugin-guided-review).
