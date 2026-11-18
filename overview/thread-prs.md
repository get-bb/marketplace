## See which PRs need attention

Open the PR count beside the composer to see the pull requests from this thread and its child threads. Each PR appears once, with its checks, review state and unresolved review count. The same list appears in the thread context card. When the current branch has the only PR, BB's branch status bar shows it.

The list includes PRs from environment branches and Focus Board links. Link PRs from provider subagents through Focus Board to include them. Choose whether to show completed PRs and where links open.

## Act from the list

The three-dot menu opens diffs, retries eligible GitHub Actions jobs, requests Copilot review and marks open PRs as drafts. Drafts have a **Mark ready** button. Choose which menu actions appear in settings.

A retry applies to the current commit when GitHub Actions associates the run with that PR alone. For other runs, open GitHub Actions. Merge shows the source branch, target branch, commit and method before you confirm. GitHub checks repository rules again and the branch is kept. Use the repository's usual workflow if it requires a merge queue.

## Auto-fix when you choose

Auto-fix starts off. Turn it on for a PR to let failed checks, new review feedback or a confirmed conflict send a request to the agent in the thread that owns the PR. Auto-fix waits until the agent is idle and stops after three requests. Merge still requires your confirmation.

Enabling Auto-fix checks the PR immediately and then every two minutes. Hover or focus its button to see the target thread, waiting reason and request history. Turning it off stops future requests. Work already sent continues.

## Setup and data

Requires BB 0.49.0 or later, Plugin SDK 0.6.132–0.6.x and an authenticated GitHub CLI on each thread machine. It supports github.com. BB's bundled GitHub PR Status supplies branch PRs. Install Focus Board separately to include explicit PR links.

CI retries can use GitHub Actions minutes. Copilot review requires an eligible account and uses Copilot quota. Auto-fix uses the owning agent's provider quota or billing. PR details and review excerpts sent to that agent reach its configured provider. The status list shows unresolved counts and keeps comment bodies out of its output.

GitHub credentials stay in the machine's GitHub CLI configuration. Settings and Auto-fix history stay in BB storage. Thread PR Manager adds no telemetry or external backend.

The list shows up to 200 threads and 50 PRs and tells you when results are cut off. Auto-fix inspects the first 50 review threads and skips CI triggers when a check rollup exceeds 100 contexts.
