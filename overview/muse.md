## What you get

Muse appears in BB's provider picker. Pick it in a chat and your prompt runs in a Muse side chat on one of your signed-in muse.ai accounts; the reply streams back into BB.

- Local tools (read, write and edit files, grep, glob, patches, bash) run on the machine of the chat, inside its workspace.
- MCP servers the chat passes and your skills (`SKILL.md` folders) are available to Muse.
- Several Muse accounts, each serving several chats at once; the connector spreads parallel work across them.
- The settings screen shows each account's plan, the share of its weekly limit used and when it resets.
- Muse Image: a model that returns generated pictures into the chat.

## How it works

A Muse account runs on its own cloud VM. The connector signs in once per account in a Chrome window it opens, keeps the account's cookies on your machines (never on the hub), and talks to the VM over the same encrypted channel the muse.ai web app uses. BB starts the `muse-acp` agent on each machine; it maps BB sessions to Muse chats and runs Muse's tool calls locally.

On each connected machine the plugin installs its own runtime under `~/.muse-bridge` in the background. Chrome is needed only on the machine where you sign in; the cookies are then copied to every other connected machine, headless servers included.

## Quick start

1. Install the plugin and open Settings → Plugins → Muse.
2. Wait until each machine row shows the connector installed.
3. On a machine with Google Chrome, type a label, press Add account and sign in to Muse in the window that opens.
4. Pick Muse in any chat.

## Good to know

- Unofficial connector: Meta can change the web app or its protocol at any time.
- Needs Node 22+ and npm on each machine; macOS and Linux (no Windows).
- This is not the Muse Code plugin (Meta's Muse Code CLI agent). Both register the provider id `muse`, so install only one of them.

Source, full guide and CLI: https://github.com/VKirill/muse-ai-connector
