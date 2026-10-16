## What you get

Each BB project gets its own topic in a private chat with your Telegram bot. When an agent finishes a turn, waits for your answer, or stops, a card lands in that project's topic: the project and Projects & Sections section, the thread title, the agent and the time. The agent's reply is collapsed under the card, and Telegram renders its tables, headings, code blocks and lists natively.

If you prefer short cards, switch the report to **Summary**. A BB model you pick with BB's own provider and model picker writes three to six points: what was done, the result, and what needs your attention. It runs in a hidden BB thread on the reply text only. If the summary is not ready within three minutes, the full reply is sent instead.

Under every report, **Connect here** binds that thread to the topic. Your next messages and voice notes go to that agent, and its answers come back to Telegram. In any project topic you can also start a new chat or connect an existing one with `/new`, `/chats` and `/menu`, and choose the agent, model, section and machine for a new chat.

## Events

The Events tab lists every event the plugin can send: agent finished, agent waiting, thread stopped or failed, and the BB Tasks events (new task, started, needs review, done, status change, due date, worker error). Each one can be switched on or off, play a sound or stay silent, and be limited to selected projects.

## Language

Choose Russian or English. The plugin page, the Telegram bot menu, topic introductions, cards and every bot message follow the selected language. The bot menu is built from the same list as the command reference on the Overview tab, and the plugin checks that Telegram actually serves it.

## Setup

1. Create a bot with @BotFather, turn Threaded Mode on and allow users to create topics.
2. Paste the token on the Connection tab, or keep it in Env Catalog.
3. Turn on Project sync, then send the bot the one-time `/start` code shown on the Connection tab. From then on the bot answers only your Telegram account.
4. Press Create topics on the Overview tab.

## Requirements

- Your own Telegram bot. The BB server polls Telegram, so it needs outbound access to api.telegram.org; no webhook or public port is used.
- Messages of connected chats, agent reports and task titles are sent to Telegram.
- Optional plugins: Tasks for task events, Projects & Sections for sections and hiding, CLI Agents for native agent profiles, Env Catalog for the token.
- Summaries and voice transcription use the BB providers you configured and their usage costs.
- Telegram can only delete topics in a private bot chat. Hiding a project in Projects & Sections deletes its topic with its history; showing it again creates a new topic.
