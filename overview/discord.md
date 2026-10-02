## Conversations from Discord

Mention your bot in a server channel to start a dedicated conversation. Continue in the Discord thread without mentioning it again, answer bb questions and approvals, and receive the result where the conversation started.

Final answers are queued before sending. Failed deliveries retry while connected and after a reconnect or plugin restart. Long replies resume from the first unacknowledged chunk.

## Choose where work runs

Use the Discord plugin settings in bb to choose the project, machine, model, permission mode, channels, and server access. Pairing authorizes your Discord server and the person who pairs it; additional users can be authorized with `bb discord allow`.

With optional full server access, bb agents can also read and manage the paired Discord server through permission-gated tools. Destructive actions require a separate opt-in and explicit confirmation.

## Requirements and setup

Requires bb 0.40.0 or later, a configured bb agent provider, and a Discord bot with Message Content Intent enabled. Creating and replying in Discord threads requires the corresponding bot permissions. Server Members Intent is optional and needed for listing members.

Add the bot token in bb, invite the bot, and send the one-time pairing command in the Discord server you want to connect. bb stores the token as a secret.

See the [setup guide](https://github.com/MayankBansal12/bb-plugin-discord/blob/v0.1.2/README.md) for the full setup and available commands.
