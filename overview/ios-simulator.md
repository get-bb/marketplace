## What you get

Open the Simulator shortcut in a thread's header to choose a device and work
with the same screen as your agent. The iOS panel streams live video, accepts
taps, swipes, typing, and Unicode paste, and shows local Xcode device artwork
when available. A CSS device frame remains available when artwork is missing.

Agent tools can attach a simulator, install and launch a build, capture a
screenshot, inspect accessibility elements, tap, swipe, paste, press buttons,
rotate, and open URLs. The panel opens when an agent attaches a device. The
first control request asks for permission; you can change Agent control in
settings.

## Android preview

An initial emulator-only path supports Android AVDs from an existing SDK.
The panel polls screenshots about once per second and supports taps, swipes,
ASCII typing, buttons, APK installation, and package launch. The
`android_sim_*` tools expose the same workflow to agents. Physical devices,
Unicode text entry, video streaming, and Android accessibility inspection are
not part of this initial path.

## Requirements

For iOS, use an Apple Silicon Mac with Xcode, the iOS platform, and Node.js 20
or newer. BB's server must run on that Mac. For Android, supply an installed
Android SDK with adb, emulator, and a configured AVD. BB 0.46 and Plugin SDK
0.6.37 or newer are required. No external service or additional account is
needed.

The plugin runs local capture and input helpers and proxies the panel through
BB. It shuts down devices it booted when their owning thread is archived or
deleted. Xcode Device Hub may capture iOS input; Repair input restarts
SpringBoard and closes running apps so control can resume.
