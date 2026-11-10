## Keep subprojects inside one workspace

Connect folder-based projects such as web, API and mobile under a shared workspace instead of keeping them as unrelated sidebar entries. Use **Edit workspace** in the project's native menu to choose the folders. They remain real BB projects, grouped beneath the workspace alongside its **main** chat group. Disconnecting a folder never deletes its project, chats or files.

## Chat about the whole project or one subproject

Start a chat in the workspace's **main** group for cross-project planning and work from the workspace environment. Choose a child project to keep the conversation and working environment scoped to that subproject. Both use BB's native thread creation, project selection and environment controls; the plugin does not create a separate chat system.

## Choose how many chats stay visible

Set **Threads per page** from 1 to 100; the default is 5. Each project gets its own initial limit and **Show more** button. The limit counts top-level thread families, so replies and child threads stay with their parent without taking extra slots. Collapsing a group resets its limit; collapsing a workspace also resets its child-project limits. Changing the setting updates the sidebar immediately without deleting or archiving chats.

## Find recent conversations across projects

Use **Workspaces | Recent** above the sidebar to switch from the native tree to visible, non-archived conversations across all projects. Recent starts with 50 chats and loads another 50 as you scroll down. Chats are ordered by saved user/assistant messages and edits, not by opening, reading or renaming them. Search titles and project names across all active, visible chats with saved messages—not just loaded pages—with paged results and no message-history download. Native chat actions stay available, and switching modes preserves the open chat and draft.

Work reported in BB's live metadata is reflected in the chat and its ancestors, including children outside the loaded pages. Work and unread status remain visible together: busy unread chats show the work indicator on the left and an unread badge beside the bold title. Only visible rows and a small overscan are mounted. Refresh keeps rows, search and the loaded extent in place. A failed older-page request offers an explicit retry while keeping verified pages; a refresh error or lost connection hides data that cannot be verified.

## Repository-local Source Control

Source Control is also available through **New tab → Actions → Source Control**. A workspace lists its main repository and explicitly connected repositories in the active environment. A child project lists only its own repository. Inspect diffs, stage or unstage files, create branches, commit and push in the selected repository. Unavailable or unsafe paths remain visible without Git mutation controls.

## Requirements and native behavior

Requires **BB ≥0.48.1, SDK ≥0.6.104 and Node ≥24.20.0**, with the built-in `thread-list`. No external service or paid account is required. BB retains native tree rows, menus, drag-and-drop and collapse persistence, and owns worktree lifecycle. Workspace membership is one level: a child project cannot itself own another workspace.

Recent reads metadata with read-only SQL in a separate OS process; it never opens its SQLite implementation inside BB's process. The query and top switch depend on BB's internal schema/indexes and sidebar DOM, verified on BB 0.48.1. Unsupported schemas fail explicitly. Other replacement sidebars require separate verification. If the separate `recent-chats` plugin is installed, disable it to avoid duplicate controls.
