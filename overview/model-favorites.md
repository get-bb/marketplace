Stars sit on every model row in BB's desktop picker, so a favorite takes one
click to save and one click to remove. A saved favorite keeps all three parts
of the choice: the provider, the model, and the reasoning level.

## What you get

- A **Favorites** tab beside the provider tabs. Each row shows the provider
  icon, the model name, and the saved reasoning level.
- The model already selected in the composer is listed first, so the row you
  are most likely to want is at the top.
- A filled star marks rows that are already favorites. Click it again to
  remove the favorite.
- Picking a favorite applies the whole combination and closes the picker.
- The search box filters the Favorites list together with the native model
  list.
- The tab opens by itself when a composer has no model selected yet. Turn this
  off in the plugin settings if you prefer to start on the provider list.
- Settings → Plugins → Model Favorites lists saved favorites and can remove
  them.

## How it works

The plugin is a display adapter over BB's own picker. It reads the provider
tabs, model rows, and search box from the page, and it leaves the native menu
untouched when a row cannot be matched unambiguously.

A pick applies provider, model, and reasoning through the composer's own
selection API, so the composer keeps BB's normal display: provider icon and
model name. If the composer rejects the value, the adapter falls back to
clicking the host's own tabs and rows.

Favorites are stored on the BB server, so every window and machine connected to
the same server sees the same list.

## Requirements

- The desktop picker. The compact and mobile pickers keep their native
  behavior.
- Stars appear on the main model list, not inside the nested "More models"
  submenu; rows there still work natively.
- A change to BB's picker layout can disable the adapter until it is updated.
  It never guesses when labels or markers are ambiguous.
