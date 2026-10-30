Review the active BB worktree with px0, directly in the thread's side panel.

Open **Review code with px0** in the thread header. Browse files and diffs,
select code, and choose **Send to BB** to send feedback into the same thread.
BB keeps its existing conversation, model, account, and approval settings.

The plugin uses a pinned, checksum-verified build from the rhnvrm/px0 fork.
Viewers run on the workspace host and use authenticated BB Connect when
accessed remotely. Exact embedding origins and per-viewer authentication
protect the viewer. Native px0 agents, telemetry, and auto-update are disabled.
File editing and Git operations remain available.

Closed tabs expire after three minutes. Archiving/deleting the thread or
reloading/disabling the plugin stops viewers and removes their remote shares.
Agents can inspect or stop sessions with `bb px0-review status` and
`bb px0-review stop [--thread <id>]`.
