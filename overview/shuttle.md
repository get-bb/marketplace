Shuttle puts every pull request that needs you in one place, whatever server hosts it: GitHub out of the box, and Delta, GitLab or any other server you describe with a few shell commands that print JSON.

**Four places**

- **Inbox:** only the decisions waiting on you. Each card says why it is there, has one main button, and says when it leaves: your PR is approved and green, feedback on your PR has nobody on it, an agent asked you something, an AI review draft is ready to post, a PR changed after your review, or a new request asks for you by name or mentions you. Snooze hides a card until tomorrow, or until something new happens.
- **My PRs:** your open PRs grouped by what happens next, each showing its checks, its reviews and its agent; then your merged and closed ones.
- **Reviews:** other people's PRs that ask you or your teams, mention you, or that you track, grouped by where your review stands. Teams read the same on every server, and bots and PRs quiet for a month are hidden unless you show them.
- **Insights:** how long your PRs wait and take to merge, how fast you review, what agents did with feedback, how many AI findings you post, and ideas that come with the button that acts on them. The automation log lives here too.

**Agents**

- A PR's agent is one thread that gets its new reviews, comments and failed checks: Fix it asks the thread to fix them, Just tell it only sends them, Off stops. Give a PR an agent, change it, or start a new thread for it; the earlier one stays linked for reference.
- Auto agent (off by default) makes the bb thread that opened your PR its agent, found by the thread id in the branch name or by its branch. Otherwise Shuttle suggests it.
- Agents report what they did with each item, so the conversation shows "Fixed in 7c41d2e" or "Agent replied" beside each comment.

**Acting from Shuttle**

- Merge your PRs (squash, merge or rebase, as the repository allows), only at the head you saw, or turn on auto-merge. Comment, reply in review threads, resolve them, approve or request changes, as yourself.
- Start an AI review with a preset. The review thread hands its findings back as a draft: tick the ones to post, edit their text, pick a verdict and post one review with inline comments.
- Track any PR by pasting its link, whether or not you are part of it.

**Settings** live on Shuttle's page in bb's Settings: servers (with a Test button), review presets, automations and agents, the sidebar section review threads go to, auto agent, whether new requests come to the Inbox, bot authors, and import or export as TOML. Agents get the `shuttle_link`, `shuttle_unlink`, `shuttle_prs`, `shuttle_review_draft` and `shuttle_feedback_done` tools, and `bb shuttle` covers the same from the command line.
