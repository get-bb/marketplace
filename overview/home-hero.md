Home Hero adds a small greeting above the home composer. It follows the local browser clock and says Morning, Afternoon or Evening, optionally followed by a name you set. Nothing personal ships with the plugin: no name and no icon still gives a plain greeting.

## What it does

- Shows a time-of-day greeting in BB's home composer column, using Palatino italic for the hello and Georgia small caps for the name.
- Reads an optional display name from settings, trims it and caps it at 80 characters.
- Accepts an optional PNG, JPEG or WebP icon up to 256 KiB. The browser decodes it before upload and the plugin server checks the bytes again.
- Keeps the text readable with reduced motion, showing the full greeting immediately instead of typing it.

## What it does not do

- It ships no default artwork and no personal mark.
- It does not change BB's global branding, other pages, or the composer itself.
- It does not collect analytics or send anything to a third party.

## Requirements

BB 0.49.0+ (plugin SDK 0.6.132+). The hero attaches to the home composer column. Host layout changes can stop the greeting from appearing.

## Privacy

Greeting text comes from plugin settings and the time from the local browser clock. An uploaded icon travels over BB's existing connection to the BB server and is stored in plugin-managed storage on the server machine, never in the repository. The content script observes page structure to locate the home composer and renders the greeting only on the home screen; it does not read conversation text, and there is no analytics or third-party transmission.
