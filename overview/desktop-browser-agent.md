## What you get

Agents in any bb thread can open, read and operate the apps on the machine
that runs the thread: native windows, Electron apps and Chrome, Edge or Brave
windows. They act in the background through the accessibility tree, so your
pointer and keyboard stay yours, and they check the result before they
report.

With the optional **Browser Bridge for bb** extension, agents also work in
the tabs of the browser you are signed in to: Brave, Chrome or Edge. Tabs
they open go into a purple **Agent** group, a cursor shows where they click,
and **Pause agents** in the toolbar stops them at once. They fill whole forms
in one step, answer page dialogs and attach files without a file picker.

## You decide what agents may do

- Tools that run code, force-quit apps, record the screen or change the
  driver start off. Every tool can be turned on, off or kept out of the
  prompt until an agent asks for it.
- **Ask before sensitive actions** makes agents wait for your answer in the
  thread before they read the clipboard, capture the whole screen, upload or
  download files, attach to a signed-in browser or first use your browser
  tabs.
- Providers with their own computer use, such as Codex, keep it by default.
  You can give every provider these tools instead, set one provider apart,
  or turn them off.
- The agent skill tells agents to prepare a send, submit, delete or purchase
  and ask before they do it, and to leave CAPTCHAs and permission prompts to
  you.

## Setup

The settings page shows every machine that runs your threads, with its
driver version, service state and macOS permissions. **Install Cua Driver…**
installs the release this plugin was tested with, verified by checksum, and
**Grant macOS permissions** walks you through Accessibility and Screen
Recording. Remote machines work the same way. When Cua Driver adds tools,
agents get them without a plugin update, and the settings page lists what
changed.

Everything is also available from the terminal with `bb cua`.

## Requirements

- bb 0.39 or later.
- Cua Driver from Cua AI, open source under the MIT license, on each machine
  agents should drive. Nothing installs until you click install. It sends
  content-free telemetry to Cua by default; `cua-driver telemetry disable`
  turns it off.
- Tested on macOS 14 or later. Windows 10/11 and Linux with X11 are
  supported by Cua Driver but not yet tested with this plugin.
- The browser extension is optional and comes from the Chrome Web Store.
  It is tested on macOS; its Linux setup is untested, and it does not run on
  Windows.

A community plugin, not affiliated with Cua AI or the bb team. Source,
reference and changelog:
https://github.com/qwadrox/bb-plugin-desktop-browser-agent
