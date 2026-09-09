A sidebar row tells you a thread exists. It does not tell you that its pull
request has failing checks, that someone requested changes, or that three
follow-ups on it are still open. These badges do, without opening anything.

## What you get

Three badge types, each independently switchable, drawn on whichever sidebar
you use.

**Pull requests.** A glyph coloured by state — green for open, grey for draft,
purple for merged, red for closed. Hovering names the number, state, attention,
and title. You can show the number beside the glyph, or hide merged and closed
pull requests.

**Pull request checks.** A separate glyph for whether the pull request wants
something from you: checks running, checks failed, merge conflicts, changes
requested, merge blocked, or review requested. You can also show a tick when it
is ready to merge, or narrow the badge to problems only, so it speaks solely
when someone has to fix something.

**Follow-ups.** A ring showing how much of a thread's follow-up list is closed —
empty at none done, a visible notch at one left, full green once the list is
clear. You can show the open count beside the ring, or hide the ring once
everything is done.

## How it works

No sidebar offers a slot for a badge, and this plugin does not ask one to. Every
sidebar publishes a thread id on its rows, so the plugin hangs a mount point off
each row and portals into it. Rows stay entirely the sidebar's business. If a
sidebar stops publishing that attribute the badges disappear and nothing else
changes.

Pull request data comes from BB itself, which owns the lookup, the polling, and
the staleness. Both pull-request badges observe one query per environment, so
running them together costs no extra git-host requests. A thread with no branch,
no environment, or a git-host hiccup shows nothing at all.

Adding a badge type takes two edits and no changes to the host: an entry in the
catalog, and a component that renders nothing when it has nothing to say.

## Requirements

The pull-request badges need a thread whose environment has a branch with a pull
request on a git host BB can reach.

The follow-ups ring reads the Follow Up plugin. Without it installed, the ring
does not draw and the other badges are unaffected.
