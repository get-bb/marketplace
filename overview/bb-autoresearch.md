## What you get

- **Studies.** A study optimizes one number: test runtime, render time, request latency, bundle size, instruction counts. You describe the goal in a thread; the `study-create` skill reads the code and drafts the spec: the metric, the benchmark command, the tests that must keep passing, the files agents may edit, and optional guardrail metrics.
- **An orchestrated loop.** Short-lived worker agents each take one idea, edit in their own git worktree and submit a candidate. A strategist agent in the study thread keeps the idea queue full and maintains a map of what has been learned. The plugin schedules everything, so there is no prompt telling an agent to never stop.
- **Verdicts the plugin decides.** Agents never run the benchmark or choose what to keep. The plugin runs tests in parallel (on a single machine they take turns with measurements, so they never add noise to a timing run), measures one candidate at a time per bench machine, alternates baseline and candidate runs, and keeps a change only when its confidence interval clears the smallest effect calibration says it can detect. Wins are re-measured with fresh runs before they land.
- **Guardrails.** Secondary metrics have a per-change limit and a limit against the starting point, both judged on a confidence interval, so small regressions cannot pile up across many kept changes.
- **Live view and replay.** A Live tab, and a panel beside the study thread, show workers picking up ideas, candidates moving through tests, the bench and verdicts, and each measurement's confidence band narrowing pair by pair. Any study can be replayed from its recorded events at up to 600×.
- **Harvest.** Kept changes become draft PRs. Each PR's contribution is measured by reverting it from the final result; changes that depend on each other are stacked. Publishing to GitHub is a separate, confirmed step.

## How it works

1. Describe what to make faster or smaller. The skill drafts the spec and you approve it on the Oracle tab.
2. Calibration runs the benchmark against itself to measure noise and the smallest change it can detect.
3. Start the study. Workers and the strategist run until the budget you set (candidates, bench hours, deadline) is used.
4. Steer from the Ideas tab: add, pin, reorder or veto ideas. Approvals and publishing happen in the app or with `bb study`.
5. Harvest the result into reviewable PRs.

Every candidate is kept as a git ref, wins and losses alike, so nothing an agent tried is lost.

## Requirements

- BB 0.45 or newer, and git 2.38 or newer on every machine a study uses.
- The build, test and benchmark commands are your repository's own and run with full trust on the bench machine. Timing-sensitive studies want a quiet, dedicated machine; another BB machine can serve as the bench host. On a laptop, single-machine mode keeps tests out of the way of measurements.
- The GitHub CLI (`gh`) only if you publish harvested PRs.
- Early release (0.2). Beyond toy repositories, it was evaluated blindly against another autoresearch loop on a real-world CLI performance task, from the same starting commit: it reached a 5.4× speedup on that benchmark against the other loop's 3.9×, in about 3.6× the wall time. That is one run of each, so the gap is likely as much the probabilistic nature of LLMs as the loop itself.

## Credits

Inspired by [karpathy/autoresearch](https://github.com/karpathy/autoresearch) and [pi-autoresearch](https://github.com/davebcn87/pi-autoresearch).
