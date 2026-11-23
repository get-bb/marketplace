Press Command–Option–S or the Spot Chat button in the sidebar footer to get a blank composer for a quick question, then get back to the thread you were in.

## What you get

- **A blank draft on every launch.** Sending the first message creates a hidden BB thread with the project, environment and model picked in the composer. Hidden threads stay out of the sidebar thread list.
- **Two ways to open it.** Inside BB, the default, opens a floating panel at the right, below the title bar. Press the same button or shortcut again to close it; drag its left edge, bottom edge or corner to resize it. Separate Window (macOS only for now) opens a resizable macOS window inside the BB window, at its right edge below the title bar, and remembers its size.
- **All past conversations in one list.** The Spot Chats panel in the navigation rail, and the clock button in the Spot Chat header, list every Spot Chat conversation. Continue one in place or open it as a regular thread.
- **Cleanup.** Delete one conversation, everything older than 7, 30 or 90 days, or all of them. Every delete needs a second click.
- **A model of your choice.** By default Spot Chat uses what BB would pick for a new chat without a project: the provider and model you last used there, otherwise BB's default provider and its default model. Pick a fixed provider, model and reasoning level under Settings → Spot Chat → Default model, or with Save default above the composer. The composer's own model picker changes only the current conversation.
- **Your own icon.** Choose one from BB's built-in set for the footer button, the rail and the header.

## Settings

Find these under Settings → Spot Chat: Open Spot Chat in (Separate Window or Inside BB), Icon, and Default model. Change the shortcut under Settings → Keyboard → Spot Chat: new window.

## Requirements and limits

- Separate Window works only in the BB desktop app on the Mac that runs the BB server. Web browsers, the mobile app and desktop apps connected to another machine always open Inside BB.
- The native window is a prebuilt universal app (Apple silicon and Intel, macOS 12 or later) with an ad-hoc signature, shipped in the plugin repository. You can rebuild it from source with the Xcode Command Line Tools.
- Spot Chat uses experimental Plugin SDK APIs, and it detects the desktop app through an undocumented property. A BB update can break either one until the plugin is updated.
