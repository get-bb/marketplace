# Provider Usage

See how much coding quota remains, what is using tokens now, and how usage changes over time.

## Remaining quota

Provider headlines use the most restrictive subscription window. If Muse has 100% of its five-hour allowance but no weekly allowance, its headline shows 0%. The number on BB's far-left navigation rail averages the same provider figures, counting each provider once.

Open a provider to see its individual windows, reset times, and available account details. Pooled Claude and Codex accounts show their routing availability separately from local logins. Unknown quota stays unknown.

## Gemini and Antigravity

On the primary machine, Google Antigravity reports separate five-hour and weekly quotas for Gemini and Claude/GPT models. Register the provider as `acp-antigravity`, install Google's `agy` CLI, and sign in with the Google account carrying your subscription. The plugin reads the CLI's `/usage` report without starting a model turn; the CLI manages authentication and token refresh. Remote machines need their own quota collector.

## Live and historical usage

The live chart shows the current token rate and the threads doing the work. Historical charts cover 7, 30, or 90 days using local transcripts and BB's usage events, including providers without a dedicated transcript scanner.

Existing provider accounts and installations are required. The plugin adds no paid service of its own. It does not include credentials in dashboard output.
