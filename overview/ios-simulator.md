## What you get

Open the Simulator shortcut in a thread's header to choose a device and work
with the same screen as your agent. The iOS panel streams live video, accepts
taps, swipes, typing, and Unicode paste, and shows local Xcode device artwork
when available. A CSS device frame remains available when artwork is missing.

Agent tools can attach a simulator, install and launch a build, capture a
screenshot, inspect accessibility elements, tap, swipe, paste, press buttons,
rotate, and open URLs. The panel opens when an agent attaches a device. The
Agent control setting governs permission. Choose **Take control** to use the
screen and hardware buttons, then **Let agent drive** to hand it back. One
thread controls each iOS device; other attached threads can observe. Taking
control cancels the previous driver's pending input.

## Replay and activity

Capture up to the last 30 seconds of iOS video, then play, pause, scrub or jump
to an input or app event. Open Activity to inspect the timeline and available
app logs and crash reports. App diagnostics follow apps launched through the
plugin; their availability is shown in the panel.

Replay playback cannot send input to the live device. Captures stay in memory
and clear when the device's last attachment is removed or the plugin reloads;
download replay JSON to keep one. Bounded
buffers can hold less than 30 seconds, and playback requires WebCodecs.

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
