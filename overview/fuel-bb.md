## What you get

- A strip at the bottom of the sidebar with one button per agent provider and the share of its limit already used, plus the open thread's context fill.
- Buttons come from the usage limits bb itself reports: Claude Code, Kimi Code, Cursor, OpenCode and any provider a future bb adds. A provider that is not installed or not signed in gets no button.
- A click opens the details: every limit window, the time to its reset and, with the Usage Forecast plugin, whether the window lasts until the reset.
- The Context popover shows the open thread's tokens and compacts it after a confirmation.

## Gemini (Antigravity)

bb does not report Antigravity limits, so the plugin can read them itself through your `agy` CLI. It is off until you tick Gemini under "Read by the plugin" in the strip settings, and works on macOS only. agy runs only while Gemini is in use (every 5 minutes while an Antigravity thread works, after its turn, when you open the popover) plus a background check every 30 minutes by default for quota spent elsewhere; the popover always shows when it was measured. The strip shows `···` during the first read and `!` with a hint when agy is missing or not signed in.

Optional account switching for Antigravity is off by default. Turning it on shows exactly what it does: it copies agy's Google sign-in between macOS Keychain items and restarts Antigravity threads after a switch.

## Looks

Colors come from the active bb theme. With the Folio BB plugin installed the strip takes the sidebar accent and changes with it; a color picked in the strip settings overrides it. English and Russian.

## Requirements

bb 0.50 or newer. Gemini and account switching need macOS and the Antigravity CLI.
