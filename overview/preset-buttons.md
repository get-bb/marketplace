Four one-click buttons sit in the composer's bottom action row on the New thread
screen. Each one applies a saved provider, model, and reasoning level, so a new
thread opens on the harness you meant to use instead of whatever the last thread
happened to leave behind.

## What you get

- **Four preset buttons** in the composer's bottom action row, between the
  provider/model button and the Prompt Enhancer plugin's icon when that plugin
  is installed. Each applies one provider, model, and reasoning combination in a
  single click.
- **A settings editor.** Pick a built-in starting set, then choose each
  provider, model, and reasoning level from BB's live catalogue. Rename,
  reorder, add, and remove buttons to hold between one and eight. No JSON and no
  reload; saving activates the new set at once.
- **An icon picker.** Every button's icon comes from a searchable, browsable
  pool of MIT-licensed HugeIcons that this plugin registers with BB.
- **A command** to read the active presets and switch sets from a terminal or an
  agent.

## What a preset can set

`providerId` and `model` are required. Any of these can be added:

- `reasoningLevel`: `none`, `low`, `medium`, `high`, `xhigh`, `max`, `ultra`,
  `ultracode`
- `serviceTier`: `default`, `fast`
- `permissionMode`: `accept-edits`, `auto`, `full`

Values are reconciled against the live provider catalogue when a button is
pressed. A model the provider no longer lists lands on that provider's default,
and the plugin says so instead of reporting a success it did not have.

## How it works

The buttons are a composer customization scoped to the New thread composer.
Applying a preset uses BB's own selection API, so the result is identical to
picking the same values by hand, including every reconciliation the pickers
normally apply.

The strip sits right after the provider/model button and right before the Prompt
Enhancer plugin's icon when that plugin is installed. It holds one row, pinned
flush right, so it keeps a stable position no matter how long the provider and
model label grows. The model button is the one that gives way under pressure.

## For agents

The bundled skill tells an agent to read the active presets with
`bb preset-buttons list` and switch sets with `bb preset-buttons use`.

## Requirements

BB 0.43 or later and plugin SDK 0.4.104 or later. No account, service, or
separate install is needed; the presets use the providers you already
configured in BB.
