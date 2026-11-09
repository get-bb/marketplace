Keep a phone next to your threads. Open **Emulators** in bb's navigation and the Android emulator streams into bb's left sidebar at phone size, so you can tap, scroll and type in it while an agent works on your app.

## What you get

- **Android tab.** The live emulator screen in the left sidebar, with Back, Home, Overview, volume and power buttons. It shows whether the adb device is online, booting or offline, and has Start and Stop buttons.
- **iOS tab.** Simulator state with Start and Stop, plus a screenshot mirror that refreshes about once a second. The mirror is view only, so you interact in the Simulator window on the Mac.
- **Configuration page.** Lists your bb machines, checks each one for an Android SDK, AVDs, attached devices, Xcode and simulators, and assigns a machine to each platform. You can also set SDK paths, the AVD, the adb serial, a custom start command and the viewer URL.

## How it works

Start, Stop and status checks run on the machine you pick through the plugin's host entry, so the emulator can run on a different bb machine than the server. Stop runs `adb emu kill`. The live Android view embeds a ws-scrcpy page that you run on the emulator machine.

## Requirements

- An Android SDK with at least one AVD on the chosen machine. Linux needs KVM.
- A separate install of [ws-scrcpy](https://github.com/NetrisTV/ws-scrcpy) for the live Android view. The plugin README has the setup steps. Without it, the Android tab shows state and controls only.
- For iOS, a Mac bb machine with Xcode. The plugin does not install Xcode or the Android SDK.
