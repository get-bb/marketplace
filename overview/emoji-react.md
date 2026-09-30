## React to a reply

Select any text in an agent's reply. The selection menu shows one emoji button for each reaction you configured. Click one, and the composer gets a draft with the selected text quoted and your reaction below it, such as `👍 Agree`. You can send it as is or add more.

The same reactions also appear as buttons in the bar under messages. Choose which places show them: the selection menu, the bar under assistant messages, and the bar under your own messages.

## Smart reactions

Smart reactions are off by default. When you turn them on, the agent ends a reply that asks you something with a few reactions that fit it. If it asks "SQLite or Postgres?", you get SQLite, Postgres, and Clarify buttons inside the reply. It uses your own reactions when they fit. Replies that need no answer get no buttons. Click one, and it drafts that reply.

Smart reactions add a short instruction to each thread, so they use a few more tokens. They apply to threads that start or resume after you turn them on. Replies show at most 5 suggestions.

## Settings

Edit reactions as emoji and label pairs in the plugin's settings page, up to 8. The default set is 👍 Agree, 👎 Disagree, ✅ Do it, and ❓ Clarify. Choose whether a reaction quotes the selected text, and whether the quote comes before or after the reaction.

## Requirements

Requires BB 0.39 or later. It needs no account, API key, or outside service.
