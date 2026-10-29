## What you get

Hide Models keeps the main model picker short while leaving every model reachable.

- Hide individual model IDs per enabled provider.
- Hide all models for one provider with one action, then restore them with Show all.
- Open the settings page from `Configure...` at the top of More models.
- Keep hidden models available in More models and in picker search.
- Leave new models visible until you hide them.

Hidden IDs are saved per provider. Disabling a provider keeps its choices, and re-enabling it restores them.

## How it works

The settings page reads the live provider catalogs and lists the models each enabled provider offers. Checked models move out of the main list; unchecked models stay in place. A model ID that is already an extra in More models is not duplicated.

The desktop picker is changed in place. The selected model, reasoning level, service tier, and provider catalogs are not changed. Hidden rows keep their original selection callbacks, and the picker keyboard skips them. Search still covers all models, including hidden ones.

The plugin validates the open picker against the current catalog. If the active provider, a row label, or the native More menu cannot be matched unambiguously, it leaves the native menu untouched instead of guessing.

## Requirements and limits

Experimental. Requires BB 0.47.1 on desktop. The compact and mobile picker fails open: the native menu is used unchanged.

This is a DOM adapter over BB's picker markup, not a provider or catalog change. A future BB picker layout change can disable hiding until the plugin is updated. When the More menu cannot be validated, the plugin fails open.

No external service, account, or API key is required.
