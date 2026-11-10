Track BB tasks and chats on one board, prepare task descriptions with Codex, and configure new chats from the same plugin.

## What you get

- Board and list views grouped by BB project, with filters, priorities, labels and task relationships.
- A task assistant that proposes a title and plan before you launch the work.
- Integrated settings for panel placement, headers, and the provider, model, reasoning effort and speed of new chats.
- Linked worker chats, Git change review and merge workflows.
- Agent inspection tools including `kanban_snapshot`, `kanban_card_get` and `kanban_ui_snapshot`.

## How it works

The plugin runs inside your own BB installation and stores task data and settings there. Existing BB projects and chats stay in your BB. Installing the plugin does not publish them or change server access.

## Requirements

Requires BB 0.49 or later and Plugin SDK 0.6.132 or later. The task assistant requires your own installed and signed-in Codex; model use is subject to your account's limits or charges. Git workflows require Git. Browser artifacts and screenshot observation require the BB desktop app. Some desktop integration depends on the current BB frontend and should be rechecked after upgrades.

The board labels and task-assistant prompts are in Russian. The separate chat-defaults plugin is not required. Existing users can migrate its settings once before disabling it. Standard BB plugin updates are supported; the developer's workspace-deploy controller is optional.

Status-bar integration is optional. Without the separate status-bar plugin, BB retains its native footer.
