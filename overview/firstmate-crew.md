You tell the first mate what you want done; it sends each task to a worker, a bb thread in its own git worktree, so parallel work on one repository never collides. It writes the worker's instructions, supervises it to the end, and brings back finished branches and pull requests, investigation findings, and only the decisions that are really yours. You are the captain.

## What you get

- **A first mate in bb's own chat.** It is an ordinary pinned thread, so you read its tool calls and talk to it like any other thread. Its workers appear under it in the sidebar.
- **A board of the crew.** A FirstMate tab on the first mate's thread sorts every worker into Queued, Working, Blocked, Parked, Done, Failed and Idle, with its last word on what it is doing and a link to its pull request.
- **Control from each card.** Steer a worker with a word, interrupt its turn, relaunch it in the same worktree, or end it. Ending a worker whose task is not done asks first.
- **Where things stand, on demand.** Bearings gives the state of everything; Ahoy gives what happened since you last spoke, then each open decision in turn. Both are buttons on the board and entries in the command palette.
- **Next steps as buttons.** The first mate offers what you will probably want next; pressing one sends it as if you had typed it.
- **Compact and Restart on the board.** Compact frees room in the first mate's conversation. Restart starts it afresh on the same thread; its records and the workers already running carry over. A gear beside them opens the plugin's settings.

## How it works

The first mate never merges without your word unless you have said a project may. It writes only in its own home folder, by default ~/FirstMate: its charter, your standing orders, its backlog and its records, all plain files you can read and edit in bb's file panel. Your projects are read-only to it; every change is a worker's job. When the plugin's charter improves and you have edited yours, the new one is put beside it for you to compare.

Watches are small scripts in the home that run on a schedule while bb is running and tell the first mate when they have something to say. A pull request watch is built in: within about five minutes the first mate hears that a pull request on its backlog was merged or closed, got a review or a comment, or had its checks turn red or green. You can add watches of your own, or ask the first mate to write one and approve it first.

## Requirements

- bb 0.44 or newer.
- A capable model for the first mate, such as Claude Sonnet or better. Workers use the provider and model you set in the settings, or the first mate chooses.
- `git` for your projects, and for the pull request watch the `gh` command, logged in.

## Good to know

- The home and the watches live on the machine running the bb server, and watches run only while bb does.
- Ending a worker removes its worktree after bb's grace period, so only committed work can be restored.
- A worker waiting on a permission or question shows as Blocked, and bb tells the first mate it needs attention.
- There is no slash command in the composer, because bb offers plugins none; the command palette and `bb firstmate-crew tell` reach the first mate instead.
