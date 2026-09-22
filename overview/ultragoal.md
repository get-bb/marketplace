Turn a BB root thread into a durable, provider-neutral orchestration workspace. The root plans and coordinates while a deterministic scheduler assigns dependency-ready work to isolated worker threads. Optional independent verifiers inspect completed slices before they close.

## What it provides

- A durable objective, dependency plan, findings register, owner decisions, and completion evidence.
- Automatic one-slice-per-worker staffing with file-scope conflict avoidance and bounded concurrency.
- Provider/model/reasoning/service-tier selection for workers and verifiers, with safe worker defaults and verifiers locked to `auto` permission mode.
- Global defaults plus per-goal overrides, launch revisions, requested-versus-actual execution reporting, and controlled rolling replacement.
- Exact repository/ref validation before managed worktree allocation, pinned to an immutable commit SHA.
- Streaming audit findings that coalesce by concrete file, mint dedicated remediation work safely, and block premature completion.
- Optional squash integration, worktree cleanup, and local provider accounting, all off by default where they affect repositories or private local data.

## Typical workflow

Start an UltraGoal from the pane, `/ultragoal`, or `bb ultragoal set`. Add or update work through the `ultragoal_patch` tool. The scheduler staffs ready slices; workers report structured evidence; verifiers return `VERIFY_PASS` or actionable findings. The pane keeps current work, upcoming dependencies, execution provenance, defects, and owner decisions visible without retransmitting the full history.

UltraGoal supports Codex, Cursor, OpenCode, Claude Code, and Pi. It requires BB 0.39 or newer and Plugin SDK 0.4.8 or newer.
