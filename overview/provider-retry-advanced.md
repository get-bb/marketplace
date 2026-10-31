## Resume after lost connectivity

An unofficial fork of BB's bundled Provider retry plugin. It keeps the bundled overload and subscription-limit retries, and resumes failed turns after the provider or thread's machine becomes reachable again. Connectivity retries use BB's native session and dispatch checks, with a fixed 60-second scan and no attempt limit.

Requires BB 0.46.1 or later and plugin SDK 0.6.49 or later. Run only one retry plugin: disable the bundled Provider retry first. A fresh install observes until you arm it. Hold any thread that must remain paused before arming.

## Optional recovery

Each feature is off by default and needs the existing armed state:

- `workflowRecovery` asks Claude Code in the same session to inspect a recorded UltraCode `local_workflow` run and resume it with `resumeFromRunId`. It does not resume native BB Workflows or guarantee recovery. Interrupted steps can repeat side effects.
- `stallWatchdog` stops and continues a stalled turn once after the selected awake time. The default is Off.
- `continuationCheck` sends one follow-up when an automatically resumed turn only promises to continue.
- `unfinishedFollowUp` resends an eligible failed request that later notifications pushed aside.

Recovery evidence uses synthetic fixtures and historical incidents; no real BB crash test was performed. A tool call interrupted by lost connectivity can have an unknown outcome.

## Existing installations

A Git range of `^0.1.0` stays on 0.1.x. BB 0.48.0 cannot replace an existing managed source or range while preserving its state. Keep the existing installation and configuration until that is supported. Removing the plugin deletes settings and holds. Path installations can keep their existing path.

[README and commands](https://github.com/neoromantic/bb-plugin-provider-retry-advanced/blob/v0.2.1/README.md) · [Release 0.2.1](https://github.com/neoromantic/bb-plugin-provider-retry-advanced/releases/tag/v0.2.1) · [How the checks work](https://github.com/neoromantic/bb-plugin-provider-retry-advanced/blob/v0.2.1/docs/how-it-works.md)
