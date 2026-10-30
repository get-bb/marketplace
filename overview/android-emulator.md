Keep the app you are building and the device it runs on side by side: the emulator screen lives in a thread panel, and agents drive the same device from the CLI.

## What you get

- Live H.264 screen of an emulator on any of your bb hosts, with touch, scroll, keyboard and system buttons.
- Unicode text paste into the focused field and clipboard sync in both directions.
- Environment checks for the Android SDK, ADB, emulator, hardware acceleration and AVDs, each with a hint when it fails.
- Start an existing AVD headless and stop a running emulator.
- Agent commands: `bb android-emulator hosts`, `list`, `start`, `stop`, `key` and `paste`.
- Interface in 12 languages.

## How it works

The plugin runs on the Android host inside the bb host worker. It talks to the emulator through ADB and the bundled scrcpy-server 3.3.3, and the browser decodes the stream with WebCodecs. Each viewer connection needs a one-time token and the panel's exact origin. You pick the host in the panel; one device stream is active per host.

## Connection

- **BB network** (default) streams through bb connect shared ports and needs bb opened at getbb.app.
- **LAN / VPN** connects the browser straight to the host over plain `ws://`, for trusted networks only. Chromium asks for local network access.

## Requirements

- A bb host on Windows or Linux with the Android SDK (`platform-tools`, `emulator`), at least one AVD and working hardware acceleration (WHPX/AEHD or KVM). macOS is untested.
- A browser with WebCodecs H.264 support.

The plugin does not install the SDK, system images or hypervisors, and does not create or change AVDs.
