## What you get

- Rows above the composer, one per item an agent wants you to act on, such as issues to triage or a Dependabot pull request to merge.
- A side panel for each item, with its details, a draft you can edit, and buttons that post the draft, start a thread, run a command once you confirm it, or open a link.
- A film strip for picking a design: screenshots of the original and its alternatives, a note on each, and **Send feedback**, which sends your pick and notes to the thread.

## How it works

A skill writes its results as a view file and publishes it from the thread. Done and dismissed items sink to the bottom, and the agent reads back what you did. Views are stored in the plugin's own database on this machine.

## For agents

Agents get the `impromptu-ui` skill and the `bb impromptu-ui` command: `publish`, `state`, `hide`, and `list`. The `refine-impromptu-ui` skill files an anonymized issue when a view falls short.

## Requirements

Nothing to configure. A command button runs with your permissions, so read the command before you confirm it.
