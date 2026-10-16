A GitHub board inside bb: your issues, draft pull requests, open pull requests and discussions in four
columns, beside the threads that work on them.

## What you get

- The work you wrote, whatever is open on repositories you own, and what is assigned to you, on one
  board. On a narrow window the columns become tabs.
- Issues fold into the pull request that closes them, so one piece of work is one card.
- Open pull requests show their CI checks, and an out-of-date or conflicting branch says so, with an
  Update branch button wherever you can push to the repository.
- A detail panel with the body, comments and images. Images from outside GitHub load only when you ask.
- Labels added and removed from a right-click menu.
- Send to chat opens bb's new-thread composer on a card, with a prompt you can set per column and per
  project, in the bb project that has the repository checked out.
- Add to chat puts the same prompt at the end of a chat's draft, using that chat's project's prompt,
  without sending it. Pick a chat on screen or a recent thread, which opens beside the board.

## What it needs

bb 0.46 or later, and the GitHub CLI, `gh`, installed and signed in on the machine running the bb
server. The board uses that login and stores no token of its own.
