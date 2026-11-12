Keep what your agents learn in Lobu memory, without leaving bb.

## What you get

- Threads start with their project's Lobu brief, agents search Lobu before
  they work, and what they learn is saved to your personal Lobu workspace —
  with undo, pin, and one-click sharing to a linked team workspace in each
  thread's Lobu memory panel.
- Agents can supersede outdated memories in place, and edits or deletes made in
  Lobu sync back into your project brief.
- Works across every agent provider in bb: native `lobu_search` and
  `lobu_remember` tools plus `bb lobu search` and `bb lobu remember` CLI
  commands for ACP providers.
- **Save to Lobu** on any message, and **Save learnings to Lobu** for a whole
  thread, through a review form.
- **Open what bb saved in Lobu** opens Lobu's own page of those memories.
- A **Lobu** page in bb's sidebar shows what agents saved in bb threads (with
  the project, reuse count, and a link to the source thread), searches across
  all of Lobu, and surfaces the inbox plus the devices and connections that
  need attention. **Open in Lobu** opens the full app in your browser.
- Type `@` in any composer to reference a memory, entity, feed, automation, paired
  device or connection, or open browser tab; it resolves into fresh context
  when the message is sent.
- Your Lobu **Inbox** sits on the New thread screen when bb is connected, and
  `lobu` CLI logins you already have are reused, not duplicated.
- Memories link to the Lobu records they are about, by exact full name: Lobu
  links a name only when exactly one record carries it, and the agent is told
  which names stayed unlinked. Nothing is linked by partial or similar names,
  and no records are created from tabs or transcripts.

## Getting started

A card on the New thread screen installs the Lobu CLI with bun or npm, then,
as in the Lobu Mac app, signs you in to Lobu Cloud or runs Lobu on this
machine. Settings → Plugins → Lobu shows which Lobu bb uses and what it
saved there, and switches between them.

## How it works

The plugin uses your `lobu` CLI login. Tokens stay in the bb server. The
[README](https://github.com/lobu-ai/bb-plugin-lobu#readme) covers settings and
details, and [GitHub issues](https://github.com/lobu-ai/bb-plugin-lobu/issues)
tracks bug reports.
