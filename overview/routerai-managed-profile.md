Picks RouterAI models for bb and runs threads on them through OpenCode, without
touching the OpenCode config you already use.

## What you get

A second provider, `routerai-managed`, appears in the bb model picker. It holds
only the models you enabled, each with its context size, its price in rubles per
1M tokens and its reasoning levels. The provider page in the sidebar filters the
whole RouterAI catalog, toggles models on and off, and puts a reasoning level
selector on the right of every enabled model. A single config line under the
list shows how large the generated OpenCode config is, so you can see when you
are close to the 24 KiB cap.

## How it works

The plugin downloads the RouterAI model catalog once and caches it on the bb
server. Opening the page, filtering, sorting, toggling a model and changing a
reasoning level never touch the network. From the cached catalog the plugin
builds an inline OpenCode config and hands it to an `opencode acp` process that
bb starts through its own ACP bridge. The list in the picker and the model in the
thread come from the same config, and your `~/.config/opencode/opencode.json` is
never read or written.

## Approvals

By default bb keeps managing tool approvals for these threads, exactly as it
does for its built-in agents. If the approval prompts get in the way, one
setting switches the provider to the generic ACP dialect, where the agent
follows OpenCode's own permissions and bb's thread permission switch no longer
applies. The choice affects new threads only.

## Costs and requirements

You need a RouterAI account and API key from [routerai.ru](https://routerai.ru),
and OpenCode installed on the machine that runs threads. RouterAI bills your
balance for the tokens the threads use. The plugin adds no subscription and no
telemetry.

## Limits

An inline config is a single environment variable, and Windows caps the process
environment block at 32767 characters. The plugin therefore refuses a config
above 24 KiB, which is about 59 models, and keeps serving the last config that
fit until you remove a few. Only text models that support tool calls are listed,
and reasoning levels appear only where RouterAI declares them.

## Alongside the official plugin

The official RouterAI plugin uses the provider `routerai` and the command
`bb routerai`. This plugin uses `routerai-managed` for both, so installing one
does not disturb the other.
