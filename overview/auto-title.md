# Auto Title

Auto Title rechecks each thread after ten human messages. If the title still fits, it stays. If the conversation has moved to a different goal, Auto Title writes a new one. It leaves titles you set by hand alone when BB can distinguish them from generated titles.

## Getting started

1. Open **Settings → Plugins → Auto Title** and pick a model source. The default is **Automatic**; you can also change the ten-message interval.
2. Under **Settings → AI services**, choose **Auto Title** for thread titles. This lets the plugin recognize first titles and new titles written by BB’s **Regenerate title** action.

Automatic tries your custom OpenAI-compatible endpoint, BB Cloud, installed plugins that publish compatible completion RPCs, and then a small model on the thread’s own provider. You can pick one source instead. Model calls use that source’s billing or quota.

## What gets renamed

The plugin looks at the conversation’s overall goal, not just the last request. A debugging detour or a more specific follow-up doesn’t need a new title. If a source doesn’t answer, Auto Title leaves the current title in place. A new thread without a fast model gets shortened task text while it waits for its first check.

Existing titles are not changed on install. To replace a protected title on purpose, use BB’s **Regenerate title** action or run `bb auto-title retitle <thread-id>`. BB does not identify the thread in AI service calls, so a hand title identical to a recent generated title cannot always be distinguished.
