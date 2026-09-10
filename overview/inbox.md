## Know when BB needs you

Needs You gathers questions, approvals, failed runs, and finished work in one inbox. Open the right thread or review directly. Finished items remain until you dismiss them, and a newer update can bring them back.

- One popup per thread or activity. Later updates replace it, and the popup stays quiet while you are viewing that work.
- Close a popup without losing the inbox item, or dismiss an item until its next update.
- Receive Guided Review completion and failure alerts, with an **Open review** action. Other extensions can use the documented activity API.
- Choose alert types, quiet hours, channels, and completion cooldown in Settings.
- Check for compatible updates and install them explicitly from the plugin.

## Start with your inbox

Requires BB 0.41 or later and Node 24 or later on the BB host. Install Needs You and open it in the sidebar. The welcome offers **Use inbox** or **Set up Telegram**. The inbox needs no account, credentials, or other extension.

Questions, failures, and extension activity alerts are enabled by default. **Completed turns** is an opt-in setting; finished threads still appear in the inbox. Settings are always available inside Needs You.

## Optional Telegram alerts

Use your own dedicated bot and private chat. In **Needs You → Settings → Telegram**, follow the BotFather instructions, connect the bot, press Start in Telegram, confirm your private chat, then request a test notification. No manual chat-ID lookup is needed.

The bot token stays in this BB installation’s server-side secret settings. Connecting and checking updates send no test automatically. Phone replies and approvals are unavailable; respond inside BB. BB Connect provides links that can open from a phone.

## Delivery and privacy

The inbox works on desktop and compact screens. Bottom popups currently need BB’s desktop sidebar accessory. Native desktop notifications require macOS on the BB server host; they are not browser push notifications on a remote laptop. Quiet hours use the server’s timezone. Delivery is best effort, with the inbox as the durable record.

Optional Telegram alerts share titles and request context with Telegram. Settings, dismissal history, and activity receipts stay in the local BB installation. No author-operated relay or analytics integration is required. Each person connects their own bot to their own trusted BB installation.

The screenshots use explicitly labeled demo activity.

[Setup guide](https://github.com/notpritam/bb-plugin-inbox#install) · [Extension activity API](https://github.com/notpritam/bb-plugin-inbox/blob/main/docs/extension-activity.md) · [Release notes](https://github.com/notpritam/bb-plugin-inbox/releases) · [Report an issue](https://github.com/notpritam/bb-plugin-inbox/issues)
