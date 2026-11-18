Ask a TypeSafe decision model, such as Jev, without giving every plugin the API key.

The key is a secret setting on this plugin. The model id is a normal setting and defaults to `jev-latest`. Another plugin calls the `ask` RPC method. A thread uses the `decisions_ask` tool. Both send state and typed questions, and both get probabilities back. The caller decides what to do with the answer.

`bb decisions status` shows the model and whether the key is set. It does not show the key.

The rail icon opens a usage page. A menu picks 24 hours, 7 days, or 30 days, and a chart of activity, cost, callers, or yes/no confidence. Each ask is counted after it finishes. The stored row is counts, the caller, the model, token totals, and how long it took. Cost is input tokens at $0.042 per million. Output tokens are free. Asks from before token counts were kept are left out of the cost. The first open also reads this plugin's log and the scores unified-inbox still has.

Named asks live in the plugin database. A thread adds one with `decisions_add_question`. The page edits the name and the sentences. The inbox sends the one marked in use. Renaming does not re-score a chat. Changing the sentences does, for the lines already in the current span.
