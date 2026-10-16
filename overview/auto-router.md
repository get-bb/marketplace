## Model Pilot for BB

Model Pilot adds AI model routing and automatic model selection to coding agents in BB.
It chooses a main model, assigns focused helper work, and shows token usage with cost estimates.
It supports Codex and Claude Code through your existing agent sign-ins.

Version 0.4.0 is experimental and targets BB 0.46 on macOS.
It uses internal BB provider bridges, so a BB update can break compatibility.
Other platforms and BB versions do not have verified support.
Coding model availability depends on your provider accounts.

## Connect and start

Sign in to Codex or Claude Code through BB.
Open Model Pilot in the BB navigation, then open Connection.
If a connection already exists, select Change connection.
Choose a Classification model and select Connect and test.
After a successful connection, create a BB thread and select Model Pilot.

A classifier is the model that selects how the task runs.
Native BB classification uses your existing agent sign-ins without a separate API key.
The model list comes from BB's Codex and Claude Code provider catalogs.
Catalog availability does not guarantee account access or quota.
Connection tests and classification consume provider usage.
Your provider subscription limits still apply.
The plugin includes no extra credits and does not bypass those limits.

Existing Jev configuration remains an advanced mode through BB plugin settings with a separate TypeSafe API key.
Legacy direct OpenAI and Anthropic API modes also use separate API keys and billing.
Native BB models do not need those keys.

## How it works

The first message determines the main coding model, reasoning effort, and context window.
Later messages keep that main conversation.
The classifier then chooses direct work, a helper, or a plan.
Helpers receive focused task briefs in separate contexts and return results to the main agent.
The main agent remains responsible for the final result.

Jev retains the original TypeSafe classification policy.
Other classifiers return choices for the same routing categories.
Those choices do not reproduce Jev's calibrated probabilities or prove equivalent routing quality.

## Understand usage and costs

Usage shows token breakdowns, cost trends, model shares, helper activity, and classifier overhead.
Its baseline applies another model's price to the same recorded agent tokens.
That comparison is a price scenario, not measured token savings or a quality comparison.
Unknown prices suppress the savings estimate.
Native classifier cost remains unknown in this release.
Retained history, bundled price snapshots, and subscription billing can limit the comparison.
Model Pilot does not guarantee lower costs or fewer tokens.

## Privacy and contributions

The classifier receives task text, routing questions, and relevant plan text or helper briefs.
BB manages native provider sign-ins.
Optional API modes use BB secret settings and private host provisioning.
Host credential files use owner-only permissions.
The page receives connection status rather than saved secrets.
The coding agent processes its task through BB's existing provider integration.

The source uses the MIT license and accepts contributions.
Read the Guide tab for setup and troubleshooting.
Read the [README and contribution guide](https://github.com/MahmoudElsayad/bb-model-pilot) for development instructions.
Read the [privacy notice](https://github.com/MahmoudElsayad/bb-model-pilot/blob/main/PRIVACY.md) before confidential work.
