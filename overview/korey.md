## Your Korey connectors, in bb

Use any connector available in your Korey workspace from your coding conversations in bb. Give Korey the outcome and relevant context; it works with your connected services using your workspace's conventions.

For example, ask Korey to summarize Sentry errors, explain LaunchDarkly flags, or compare an implementation plan with existing Shortcut Stories. These are examples, not an exhaustive list of the connectors you can use.

When you ask to create or update a Shortcut Story, Korey handles the request through its Shortcut connector using your workspace's conventions.

## Keep the conversation going

Each bb thread can continue a linked private Korey conversation, including when you switch coding harnesses. Attach up to five supported workspace files to add context, or link an existing private Korey conversation.

## Get started

1. Connect your services in [Korey](https://korey.ai). Connector setup and reauthentication stay in Korey.
2. Create a [personal access token](https://app.korey.ai/settings/api-tokens) with `threads:read` and `threads:write` scopes.
3. Add the token under **Settings → Installed plugins → Korey** in bb.
4. Start a request with “Ask Korey…” or use `bb korey ask` from the CLI.

Requires a Korey account and access to the relevant connected services. Available data and actions depend on your Korey workspace's connectors and permissions. This version supports research, analysis, and drafts across connected services, plus Shortcut Story creation and updates.

See the [connector guides](https://korey.ai/docs/connectors/overview) and [plugin documentation](https://github.com/useshortcut/bb-plugin-korey) for more details.
