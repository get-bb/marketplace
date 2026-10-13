## Keep subprojects inside one workspace

Connect folder-based projects such as web, API and mobile under a shared workspace instead of keeping them as unrelated sidebar entries. Use **Edit workspace** in the project's native menu to choose the folders. They remain real BB projects, grouped beneath the workspace alongside its **main** chat group. Disconnecting a folder never deletes its project, chats or files.

## Chat about the whole project or one subproject

Start a chat in the workspace's **main** group for cross-project planning and work from the workspace environment. Choose a child project to keep the conversation and working environment scoped to that subproject. Both use BB's native thread creation, project selection and environment controls; the plugin does not create a separate chat system.

## Choose how many chats stay visible

Set **Threads per page** from 1 to 100; the default is 5. Each project gets its own initial limit and **Show more** button. The limit counts top-level thread families, so replies and child threads stay with their parent without taking extra slots. Collapsing a group resets its limit; collapsing a workspace also resets its child-project limits. Changing the setting updates the sidebar immediately without deleting or archiving chats.

## Repository-local Source Control

Source Control is also available through **New tab → Source Control**. A workspace lists its main repository and explicitly connected repositories in the active environment. A child project lists only its own repository. Inspect diffs, stage or unstage files, create branches, commit and push in the selected repository. Unavailable or unsafe paths remain visible without Git mutation controls.

## Requirements and native behavior

Requires **BB ≥0.46 and SDK ≥0.6.37**, with the built-in `thread-list`. BB retains native rows, menus, drag-and-drop and collapse persistence, and owns worktree lifecycle. Workspace membership is one level: a child project cannot itself own another workspace. Replacement sidebar plugins are not automatically compatible.
