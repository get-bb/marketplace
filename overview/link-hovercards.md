## What you get

- **Pull request cards.** Shows whether a PR is open, a draft, merged or closed,
  with its title and the start of its description. It also shows the branches,
  CI results ("2 of 14 checks failed"), the review decision, merge conflicts,
  labels, lines added and removed, and files changed.
- **Issue cards.** Shows whether a GitHub issue is open, closed or not planned,
  with its labels, comment count and assignees.
- **Linear cards.** Shows a Linear issue's workflow state in Linear's own
  colors, with its priority, project, cycle, due date, labels, assignee and the
  number of linked pull requests.
- **Touch support.** On a phone or tablet, long-press a link to open its card.
  A normal tap still opens the link.

Cards open on any matching link in BB: agent replies, plans, panels and
everywhere else. Moving the pointer into a card keeps it open, so you can
click through to the item. Scrolling moves the card with its link.

## How it works

The cards read GitHub through the GitHub CLI (`gh`) on the machine that runs
the BB server. They show whatever that signed-in account can see, including
private repositories. Linear cards call the Linear API with personal API keys
that you add in the plugin's settings. The keys stay on the server. Each
answer is cached for a minute, so hovering the same link again costs nothing.

## Requirements

- The GitHub CLI installed and signed in on the BB server's machine:
  https://cli.github.com
- For Linear previews, one personal API key per workspace, from Linear →
  Settings → Security & access. Without a key, GitHub cards still work.
