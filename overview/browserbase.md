## What you get

Give your BB agents access to the whole web with Browserbase and Stagehand. Browse websites, interact with pages using natural language, and extract structured data. End to end browser tasks become possible for BB when leveraging the Browserbase plugin.

## How it works

Each BB thread uses its own Browserbase session. The plugin forwards browser operations to Browserbase's hosted MCP server and returns bounded text results. A bundled skill guides inspection, action verification, and session cleanup. Configure the API key in BB's built-in plugin settings; no custom plugin page is required.

## Requirements

Requires a Browserbase account, a Browserbase API key, internet access, BB 0.43 or later, and a compatible Plugin SDK. Browserbase usage is billed under your Browserbase plan. Enter credentials only in the plugin's secret setting.

## Limits

This version returns text, not screenshot or download artifacts. Sessions are held in memory and cleanup is best effort on reload or shutdown. After a crash or interrupted session creation, check active sessions in the Browserbase dashboard. Website account login can require additional user interaction.

If you're curious about our MCP, visit the [Browserbase MCP documentation](https://docs.browserbase.com/integrations/mcp/setup).
