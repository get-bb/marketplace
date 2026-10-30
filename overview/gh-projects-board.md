BB can already show your GitHub issues and pull requests. It cannot show your
**project**. Everything assigned to you arrives in one column, with no status
and no order, which is enough to notice work and not enough to manage it.

This plugin reads the Projects v2 board itself.

## Columns from the project, not from guesswork

The columns are the options of the project's Status field, in the order the
project defines, each carrying its own description under the heading. A board
whose columns are `Icebox::Eng`, `Icebox::Product`, `Todo`, `In Progress` and
`QA` appears with exactly those columns, in that order. Items with no status
collect into a `No Status` column, which you can hide.

Group by any single-select field instead, not only Status.

## The filters you already use

GitHub's filter syntax works as it does on github.com:

- `assignee:@me -status:Done!` — the saved view this plugin opens on
- `label:bug status:QA` — combine any fields
- `iteration:"Sprint 4"` — quote a multi-word value
- bare words match the title

`@me` resolves to the signed-in account. An unknown key matches nothing rather
than everything, so a typo shows an empty board instead of quietly ignoring the
term.

A **My Tasks** toggle opens the board on your own unfinished work, with an
**All items** toggle beside it.

## Cards

Each card shows the `repo #number` reference, the title, labels in their GitHub
colors, and assignee avatars. Clicking one opens it in BB's own browser.

## What it costs you

- The [GitHub CLI](https://cli.github.com) installed and signed in on the
  machine running the BB server. The plugin stores no token of its own.
- A token that can read Projects. A **classic** token with the `read:project`
  scope is the reliable choice: fine-grained tokens cannot read user-owned
  projects at all, and reach organization projects only under some
  configurations.
- Projects v2 offers no server-side filtering on field values, so the plugin
  reads every item once and filters locally. A project of a few thousand items
  is a handful of sequential requests, cached between refreshes.

Read-only in this release. Changing a card's status needs a write scope and
comes later.

[Source and issues](https://github.com/kleinjm/bb-plugin-gh-projects-board)
