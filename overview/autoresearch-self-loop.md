## What you get

- **An agent loop on one metric.** The agent edits the code, the plugin runs your benchmark and checks, and every run is appended to a session log in `.auto/`. The log lets a loop survive restarts and context resets.
- **Keep rules the plugin enforces.** A kept run is committed with a `Result:` trailer, and its commit is logged. A keep is refused when the last benchmark or its checks failed, or when nothing outside the session files changed.
- **Reverts for discarded runs.** A discarded, crashed, or checks-failed run reverts every change outside the session files and deletes new untracked files that Git does not ignore. The session files stay.
- **A thread panel.** It shows the metric, the baseline, the best kept run, and the confidence, with the run table and the Start/Resume, Stop, Finalize, and Export buttons.
- **A port of pi-autoresearch.** This is a close BB port of [pi-autoresearch](https://pi.dev/packages/pi-autoresearch) v1.9.0 (MIT License) by Tobi Lutke and David Cortés. After setup, the loop runs without a sequence of manual approval steps. BB permissions and repository protections still apply.

## How it works

1. During setup, the agent writes the benchmark script and the session brief into `.auto/`. The first run of a segment is the baseline.
2. Each run executes the benchmark and reads its `METRIC name=value` lines. If the benchmark passes and `.auto/checks.sh` exists, the checks run next. The agent then logs the run as keep, discard, crash, or checks_failed.
3. The loop stops when you press Stop, or when the `maxIterations` limit in `.auto/config.json` is reached.

## Requirements

- BB 0.46 or later.
- A Git checkout with at least one commit. Starting a session needs a clean working tree. The session files do not count as changes.
- A committer identity (`user.name` and `user.email`) in the checkout, because each keep makes a commit.
- A benchmark that prints `METRIC name=value` lines. The benchmark and checks are your repository's own commands, and the plugin runs them as written.
- On a remote environment host, the plugin works through the BB server, so the server must be running. The host needs POSIX with `sh`, `bash`, and `git`.
