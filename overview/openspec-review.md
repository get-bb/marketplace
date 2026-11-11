Review OpenSpec proposals, designs, tasks and specs right from the chat: comment on quoted text and send the comments to the agent working in that chat.

## Review with an agent

- Select text and comment on it, or comment on the whole document.
- Comments stay drafts until you send them to the chat. Delivery waits behind active agent work.
- The agent applies the change and closes the comment with `bb openspec-review review resolve <id>`. A bundled skill explains this to the agent.
- Open, sent and closed comments stay attached to the quoted text.

## Navigate from the chat

- An OpenSpec button in the chat header opens the latest active change; a menu picks another one.
- The OpenSpec tab lists specs, active changes and the archive of the chat's checkout. A change card shows artifacts, task progress, affected specs and chats that mention the change.
- Spec documents have a table of contents and collapsible requirements and scenarios.
- Markdown links into the `openspec/` folder can open in the "OpenSpec review" file opener.

## Requirements

- OpenSpec CLI 1.9.x on the environment host, and an `openspec/` folder in the checkout.
- Interface in 10 languages (English, 简体中文, Español, Português (Brasil), 日本語, Deutsch, Français, Русский, 한국어, हिन्दी); Auto follows the browser language.

Comments live in the plugin storage of your BB, not in the repository. The plugin does not run Propose, Apply or Archive and does not edit documents.
