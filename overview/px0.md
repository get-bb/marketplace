Open px0 beside any BB conversation and work against that thread's real workspace. The panel starts on demand, fills the full tab, and follows the thread to its environment host.

## Review and edit

Browse the file tree, search the workspace, inspect symbols and references, review Git diffs, and use px0's native editor for quick changes. Direct editing includes file and folder creation, in-buffer find, word wrap, diagnostics, and automatic Git, search, and language-server refresh after saving.

Two threads on the same working directory share one px0 process unless the optional BB agent bridge is enabled.

## BB agent bridge

The `readOnly` setting retains its historical name. Its default value, `true`, disables px0's coding-harness actions but leaves direct browser editing available. Setting it to `false` routes px0 agent prompts back to the BB thread that opened the panel instead of launching px0's built-in coding agents.

## Requirements

Install [px0](https://px0.ai/docs/) 0.1.20 or newer on every machine that owns a workspace. The plugin probes common install locations or uses the configured binary path. Remote access requires BB Connect. px0 runs with the workspace user's filesystem permissions, so direct edits write to the working directory.
