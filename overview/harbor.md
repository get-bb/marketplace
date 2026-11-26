## Multi-repo Features & Feature Hub

Harbor replaces bb's flat scrolling thread list with a project-first sidebar and a multi-repository Feature cockpit built for parallel agent workflows.

At the top of the sidebar, **Features | Projects** cleanly separates multi-repo Features from standard repository workspaces so feature folders and feature-owned worktrees never clutter `Projects -> All`.

- **Draft-first creation**: Start a Feature quickly without naming friction (auto-generated draft name when left blank), attach writable worktrees plus read-only `ref` links, discuss requirements first, and initialize branches once the plan is settled.
- **Canonical Feature Hub**: Open `Overview`, `Changes` (cross-repo **Delivery Matrix** with insertions/deletions, dirty counts, upstream ahead/behind status, PR badges, and one-click push for clean repos), `Repos`, and `Decisions` (draft decisions awaiting human confirmation) either in a docked right-side panel tab or a full Feature Hub dialog.
- **Park & Wake**: Pause multi-repo Features with a reason, note, wake schedule, or automatic wake-on-activity, and resume them cleanly later.

## Projects, Groups, Workspaces & Workspace Tabs

Under `Projects`, organize repositories into color-coded groups and inspect everything in one consistent tree hierarchy (`group -> project -> worktree -> thread`).

- **Threads and Workspaces modes**: Switch between expanded conversation families (`Threads`) or compact per-workspace cards (`Workspaces`) paired with the header **WorkspaceTabStrip** (adaptive overflow dropdown, unread/working badges, close-to-settle, and batch idle settlement).
- **Attention rolled up**: Every row surfaces **Working**, **Needs you**, **Failed**, **Unread**, **Inactive**, or **Stale** status with accessible shapes, tooltips, and three semantic palettes (**Default**, **High contrast**, and **Colorblind-friendly**).
- **Snooze & Settled shelves**: Park conversations until a wake time or clear finished threads out of the active tree while keeping workspaces ready for the next chat.
- **Diagnostics**: Automatically detect unregistered worktrees, ownership mismatches, and prunable stale worktrees on connected hosts.

## Configurable Feature Row Icons & Settings

Harbor Settings organizes every preference into **Sidebar & Layout**, **Agent & Features**, and **Diagnostics** using native `@bb-ui/*` components so host themes and third-party skins match seamlessly. Under **Agent & Features**, preview and toggle which trailing icons appear inline on Feature rows (**Repository count**, **New conversation (+)**, **Feature Hub**, **Expand / collapse arrow**); hidden actions remain available in the right-click context menu.

## Migration from Nest

Upgrading from `nested-sidebar`? Harbor keeps separate storage so nothing is overwritten unexpectedly. Click the dismissible bottom migration prompt—or open Harbor Settings—to preview groups, project badge colors, parked shelves, features, and decisions, then import them in one click.

## Agent Access & CLI

Control how much context and tooling agents receive via a single three-tier **Agent Access** selector (`agentAccess:v1`, defaulting to **`read-only`**):

- **`off`**: Registers zero Harbor tools and injects zero Harbor system instructions.
- **`read-only`** *(default)*: Exposes read-only inspection (`harbor_sidebar_map`, `harbor_feature_list`, `harbor_feature_brief`, `harbor_feature_git_status`) with a compact sidebar summary capped under 1,000 tokens.
- **`full`**: Unlocks all 10 consolidated tools including coordinated `update_info`, worktree/repo management, thread spawning, and two-step confirmed cleanup (`acknowledged: true`).

Run `bb harbor status` or `bb harbor status --json` in a terminal to inspect active access tiers and indexed counts.

## Requirements

bb 0.48 or newer and Plugin SDK 0.6.157 or newer. Zero external accounts, API keys, or network services required.
