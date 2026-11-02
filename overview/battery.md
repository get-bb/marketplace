See your laptop's charge without leaving bb: a battery icon and percentage sit at the right end of
the sidebar footer.

## What you get

- The charge of the machine running the bb server, refreshed every minute.
- A battery fill coloured by charge: red at 20% or less, yellow up to 50%, green above.
- A popup on click with each device's state (charging, on battery, charged) and charge.
- When you open bb on another device, the popup also shows that device's battery, if its browser
  reports one (Chrome on Android does; Safari doesn't).
- Red text at 20% or less while on battery.
- `bb battery status [--json]` for terminals and agents.

## Requirements

The bb server runs on macOS; the plugin reads `pmset -g batt`. On other systems it shows a dash.

## Privacy

The reading stays on your bb server and its connected clients. Nothing is sent anywhere else.
