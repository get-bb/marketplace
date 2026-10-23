## What you get

- A count on the **Plugin Updates** nav icon whenever an installed plugin has
  an update, and a toast the first time a new version appears. The toast can
  be turned off.
- A **Plugin Updates** page with compatible updates (one at a time, or
  Update all), newer releases outside a plugin's installed version range or
  pin, releases blocked by bb version requirements, and collapsed lists of
  ignored, up-to-date, and pinned plugins.
- Ignore a version to hide it until a newer one ships.
- Disabled plugins keep their updates listed with a Disabled tag, but don't
  count toward the badge or Update all, so you can decide whether to remove
  them instead.
- A `bb plugin-updates` command with the same checks and actions for
  terminals and agents.

## How it works

bb's own update check only offers releases inside each plugin's version
range, so a plugin installed at `^0.7.0` never hears about `0.9.0`. For
plugins installed from git, this plugin also reads the repository's release
tags with `git ls-remote` and lists newer releases outside the range or pin.

Compatible updates use bb's own in-place update. A release outside the range
can't be applied in place, so the plugin asks first, then removes the plugin
and installs the new release, keeping the range or pin style it was
installed with. Its settings are restored afterwards; its stored data and
schedules may reset. If the install fails, the old version is reinstalled.
Plugins with secret settings, which can't be read back, get the commands to
run by hand instead.

Checks run when bb starts and every 6 hours by default (1h, 6h, 24h, or
off).

## Requirements

- `git` on the machine running bb.
- Network access to each plugin's git host. Nothing else leaves the machine.
