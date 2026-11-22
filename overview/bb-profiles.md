Choose which providers and models appear in BB's model picker for each project,
and the default model new threads start on.

## What you get

- **Profiles per project**: make a profile by copying another, assign projects
  to it, and let every other project use Default.
- **A default model**: a new-thread composer selects its project's provider,
  model and reasoning level until you pick another.
- **Provider and model control**: switch a provider off, or limit it to the
  models you select. Unselected models stay under More models, or leave the
  picker entirely.
- **Custom models**: add a model ID BB does not list, for every profile.
- **A composer button** that opens the settings page, which saves on its own.

## How it works

Profiles change the picker, not model access: CLI and API requests, automations
and workflows can still use any model, and a thread's current model always stays
selectable. Settings reach every window connected to the BB server. Picker
filtering uses a version-specific adapter; if BB changes, the settings page says
so and BB's native lists stay as they are. Custom models are written to BB's
config file, which has no plugin API.

## Requirements

BB 0.50.x. The plugin ID is `bb-profiles`. For installation and release status,
see the [project README](https://github.com/ysskrishna/bb-profiles#readme).
