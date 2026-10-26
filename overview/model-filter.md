## A shorter model list in the original picker

Choose visible models separately for each provider in Settings. Providers keep their full lists until configured. Selected mode hides new model IDs until you choose them, while each picker's existing current model stays available with its native metadata.

Switch to All models to restore the full catalog and keep the remembered selection. Reset a provider or all preferences when you want to start again. Saved preferences are shared by connected clients of the same BB server, with revision checks for concurrent edits.

The `bb model-filter` CLI reads and changes the same server-stored preferences. The plugin adds no external service or credential setting. It changes picker choices rather than provider permissions, billing, or CLI/API model access.

## Compatibility boundary

The integration target is BB 0.47.1 with Plugin SDK 0.6.79. Native filtering uses a version-scoped private React/TanStack runtime adapter in addition to public SDK features. If that adapter is unavailable, native choices remain usable and Settings reports filtering as inactive. BB updates require renewed compatibility checks.

No separate service, API key, or paid account is required. Provider access remains configured in BB.
