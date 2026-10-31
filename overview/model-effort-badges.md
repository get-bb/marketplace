# Model & Effort Badges

See each BB thread’s model family and reasoning effort without opening its composer. A compact code appears at the provider logo. Hover for the full model name and effort before sending the next turn.

*Synthetic example data in BB 0.47.1 with separate [True Colors](https://github.com/ChrBoebel/bb-plugin-provider-brand-marks) 0.1.3 by ChrBoebel. Without it, codes are gray. The tooltip shows a raw model ID because this demo has no provider catalog.*

Compare several threads at a glance. Choose a tile, a caption under the logo, or a chip beside it; tile is the default for Codex and Claude Code. Use the caption to preserve long titles. Badges show the next turn’s settings; a switch sent to an already running thread appears when it goes idle.

The separate True Colors plugin supplies provider hues and outline/fill styles. Without it, codes remain gray and different providers can show the same code; use the full-name tooltip to distinguish them.

Declared minimum: BB 0.46.1 / SDK 0.6.49; tested on BB 0.47.1. Full-trust plugin using experimental APIs and the standard sidebar. Install `npm:bb-plugin-model-effort-badges@0.7.0` in BB. Stores no server data and adds no telemetry; BB and providers have their own data handling. [README](https://github.com/neoromantic/bb-plugin-model-effort-badges#readme) · [Migration reference](https://github.com/neoromantic/bb-plugin-model-effort-badges/blob/main/MIGRATION.md).
