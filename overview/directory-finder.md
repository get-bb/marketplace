## What you get

In a thread's Info tab, the Directory path becomes a button. Click it and the thread's folder opens in Finder. The original copy-path button stays next to it as a small icon, with its normal behaviour.

## How it works

- The plugin reads the thread's environment from bb each time you click, so it uses the current path rather than a cached one.
- It opens the folder only when the environment is ready, the path is absolute and the machine that hosts the environment runs macOS. The plugin asks that machine for its platform and remembers the answer per machine.
- On that machine a host-side helper checks that it is macOS and that the path is an existing directory, then runs `/usr/bin/open -a Finder <path>` with an argument list, without a shell.
- The folder opens on the Mac that hosts the environment. If that Mac is not the one you sit at, the Finder window appears there. Environments on Linux or Windows keep bb's normal copy button, and so does any environment whose platform lookup fails.
- Errors appear as a short message under the Directory row. Disabling the plugin removes the added button.

## Requirements and limits

- macOS only.
- Requires bb 0.49 or later. It finds bb's Directory row through the `Copy directory` button label and the folder path in the button's title, so a bb update that changes that markup can break it.
- The button tooltip, accessible label and error messages are in Russian.
- It uses the experimental thread-info row and host entry APIs of the plugin SDK.
