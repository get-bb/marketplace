Keep an eye on GitHub Actions for every project, without leaving BB.

## What you get

- A **GitHub Actions** page in the sidebar, and the same view as a tab beside any thread. It shows a summary (running, queued, failed, success rate) and Active / Failed / All runs, filtered by repository.
- **Run workflow**: start any workflow that has a `workflow_dispatch` trigger, on any branch. Its inputs (text, number, boolean, choice, environment) turn into a form, and values are checked before GitHub sees them.
- **Live job view**: step progress refreshes every few seconds while a job runs. The full log appears as soon as GitHub publishes it, with line numbers, error highlighting, a filter, and copy. A failed job opens at its error line, not at the cleanup steps after it.
- **Rerun** failed jobs or the whole run, and **cancel** a run in progress.
- **Ask agent**: opens a thread in the repository's project with the error excerpt and a brief to find the root cause. You can also open the same prompt in the composer to pick another model.
- **Send to threads**: post a report on any run to the BB threads you pick, and subscribe them to future failures of that repository.
- A `bb github-actions` command for agents and terminals.

## Requirements

- A GitHub account with access to the repositories. The plugin reads the token of the [GitHub CLI](https://cli.github.com) (`gh auth token`) on the machine running the BB server, or a token you set in the plugin settings.
- Rerun, cancel, and manual runs need write access to Actions in that repository.
- GitHub publishes a job's full log only after the job ends; until then the plugin shows live step progress.

## Setup

Repositories come from the git remotes of your BB projects; list extra ones in the plugin settings.
