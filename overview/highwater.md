Open a Pi, Claude Code or Codex thread's right panel and choose **Context** from New tab. Inspect the session summary, Context River, Composition, individual calls and items, and context lifespans without leaving the conversation.

## Live context view

The view refreshes when the thread advances. A Latest call panel above the chart summarises the newest call. Follow latest pins each new call; pinning another call or selecting the toggle again stops it. Updates to the same session preserve selections. An edited message or cleared context is resolved again. The view follows bb's light or dark theme, and hidden tabs pause requests.

## Compact summary

The summary above the composer shows bb's current context-window percentage beside a coloured bar. The bar shows how the latest recorded model call's estimated input tokens break down by item type. Hover over the bar or focus it with the keyboard to see each type's share and token count.

The wider thread card also shows call and compaction counts, recent input growth per call and a small chart of input against the context window. Select either summary to open the Context tab. Turn off **Show context summary** in Highwater's plugin settings to hide both summaries.

## Requirements

No separate Highwater installation is required. On first use, the plugin downloads a pinned binary from GitHub on the agent machine, verifies its archive and executable checksums, and caches it privately. First use requires internet access; verified cached binaries work offline. The Highwater binary setting can select an existing executable instead. Errors explain what happened and provide Retry.

Release downloads cover macOS arm64/x64, Linux arm64/x64 with glibc 2.35 or newer, and Windows x64. Interactive use is verified locally on macOS arm64, and automated host checks pass in Linux and macOS CI. Other-machine operation, Windows plugin execution and remote access remain unvalidated. Large sessions update less frequently because refreshes are limited by analysis time. The bb integration is experimental.

## Session content

The plugin runs a private Highwater process on the agent's machine. Analyses include previews of session content and travel through the bb server to your client. They are not sent to another service. No agent instructions, tools or skills are added.
