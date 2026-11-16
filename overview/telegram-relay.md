## What you get

A Telegram bot that relays team notifications to as many subscribers as you
have. Each team member talks to the bot themselves: `/start` subscribes them
to the default channel, `/channels` opens an inline keyboard to pick
additional channels, and the owner manages channels from the bot (`/admin`)
or the CLI.

Automations, agents, and other plugins deliver broadcasts with one call —
`broadcast({ title, body, channels, level })` over RPC, or
`bb telegram-relay broadcast --title … --body … --channels … [--level
info|warning|critical]` from a shell. Every broadcast lands in a delivery
journal (channels, title, level, sent/failed counters, per-recipient error
metadata) that you can read from the CLI (`bb telegram-relay deliveries`)
or the management panel.

The panel lives in the bb UI on every project thread: poller status,
channels with subscriber counts, the subscriber list, the delivery journal,
a test broadcast form, and the plugin settings — in Russian or English.

## How it works

The plugin runs a single outbound HTTPS long-polling bot
(`getUpdates` with a configurable timeout): no webhooks, no open ports, no
reverse proxy. Channels and subscriptions live in the plugin's own
SQLite database, so there is nothing external to set up beyond the bot
token.

Delivery is paced at roughly 30 messages per second, honours the Telegram
API's `retry_after` on HTTP 429, and retries a Markdown parse failure as
plain text. One recipient's failure (blocked user, network error) is logged
without stopping the rest of the fan-out, and a chat that fails three
consecutive deliveries is unsubscribed automatically (pure network errors
do not count toward the streak, so an outage cannot unsubscribe everyone).
The acked `update_id` offset is persisted, so a restart never redelivers or
drops updates.

## Privacy

The bot token is stored only in the plugin's secret setting — never in the
database, the frontend, tests, or logs. Bot and delivery logs carry
metadata only (chat ids, commands, outcomes, error codes); message bodies
and user names are never logged or stored.

## Languages

The panel and the bot messages are built in Russian and English; the bot
answers each user in their language.

## Requirements

- BB 0.49 or newer.
- A Telegram bot token from @BotFather (set once via
  `bb plugin config telegram-relay set botToken <token>`).
- Outbound HTTPS access to `api.telegram.org`.
