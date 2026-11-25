Each thread shows the GitLab merge request for its branch, where you already
look: above the composer, in the thread list and in chat.

## What you get

- A **status bar above the composer** with the MR's title, pipeline, approvals
  and what needs attention, plus Mark ready, Draft and Merge (merge, squash or
  rebase).
- **Rows in the thread context card** (the `threadContextCard` experiment) and
  the Info tab: the MR, its state and its pipeline.
- A **`!12` badge on thread rows** in bb's thread list, colored by state with a
  marker while the pipeline runs or fails. Turn on Organize → Rows → Metadata.
- **MR chips in chat messages**: a chip for each merge request a message
  mentions (a full MR URL on any GitLab host glab knows, or `!12` for the
  thread's project), with a hover card showing title, state, pipeline,
  approvals, branches and author. Agents can also write
  `::gitlab-mr{ref="!12"}` to place a chip in a reply. Choose chips, directive,
  both or off in the plugin's settings.
- A `bb merge-request` command for agents and terminals.

## How it works

The plugin runs `glab` on the environment's own machine, in its workspace,
and looks up the merge request for the current branch, so every GitLab host
`glab auth login` knows works, self-hosted ones included. Environments whose
remote is not a GitLab host show nothing; an offline machine or a missing
`glab` login is shown as unavailable.
