# Factory Droid in bb

This plugin registers [Factory Droid](https://docs.factory.ai/) as a first-class agent provider in bb. Droid runs as a local ACP server, so bb gets everything Droid advertises natively: the live model catalog, reasoning effort controls, and per-session permission handling.

## What you get

- **Every Droid model, always current.** The model picker reads Droid's live catalog over ACP. No hard-coded model list to go stale. Custom BYOK models you configure in Droid appear too.
- **Reasoning controls.** Pick reasoning effort per thread; the plugin maps it to Droid's native reasoning settings.
- **Autonomy that means something.** bb's permission mode picker drives Droid's autonomy tiers: accept-edits and auto use `--auto medium`, full uses `--auto high`, and read-only contexts stay read-only.
- **Self-healing setup.** On every bb start the plugin verifies its config entry against your Droid install and repairs moved binaries or stale fields automatically.
- **Droid keeps your credentials.** Authentication stays owned by the Droid CLI. The plugin never stores or copies Factory credentials.

## Install

Install the [Droid CLI](https://docs.factory.ai/droid-cli/quickstart) and sign in once:

```sh
curl -fsSL https://app.factory.ai/cli | sh
droid
```

Then install this plugin from the bb marketplace and run:

```sh
bb factory-droid setup
```

`setup` is safe to rerun. Check the integration any time with `bb factory-droid status`.

## Requirements

- bb 0.35 or newer
- Factory Droid CLI with ACP support (tested with 0.186.0 and newer)
- A Factory account
