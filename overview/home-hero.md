# Home Hero — overview

**Greets you on BB's home screen and gets out of the way.**

Home Hero replaces the empty home composer header with a small greeting that follows the local clock — Morning, Afternoon or Evening — optionally followed by your name. An uploaded icon sits beside it; without one the greeting is just text, so nothing personal ships with the plugin.

## Who it is for

People who spend the day in BB and want the home screen to feel like theirs, without a full theme or a fork of the app shell.

## What it does

- Time-of-day greeting with the original typography (Palatino italic hello, Georgia small-caps name).
- Optional display name from settings, trimmed and limited to 80 characters.
- Optional PNG/JPEG/WebP icon up to 256 KiB, decoded in the browser and structurally validated on the plugin server.

## What it does not do

- No default artwork, no analytics, no third-party requests.
- It does not touch BB's global branding or other pages.
- It does not resize or reformat the composer itself.

## Compatibility

BB 0.49.0+ (plugin SDK 0.6.132+), Node 22.19+ for development. The hero attaches to the home composer column; a host layout change can hide it without breaking the page.

## Privacy

The icon is sent over BB's existing connection to the BB server and stored in plugin-managed storage on the server machine. Greeting text comes from plugin settings. Nothing is sent to a third party.
