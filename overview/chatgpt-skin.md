Light and dark palettes that reproduce the ChatGPT desktop app's surface ramp, text ladder, and accent, each with a matching code theme for syntax highlighting.

## What you get

Every interaction state is themed, not only the resting look: hover, active, focus-visible, and disabled across buttons, menu rows, tabs, switches, chips, and icon buttons.

Menus, dialogs, popovers, tooltips, and the command palette share one surface ramp, so an overlay opened from anywhere in bb lands on the same material.

## How it works

bb's interface is token-driven. A button renders `hover:bg-state-hover`, an input `border-input`, a dialog `bg-background`, so setting the token restyles every component that consumes it, including components added after the theme was written.

The palette is declarative: bb reads the stylesheet straight from the plugin directory. There is no runtime script, no injected code, and no network request.

Every value was measured from the real application rather than eyeballed. Computed custom properties, component styles, and each component's interaction states were read out of the running app. The few ChatGPT details bb's token set cannot express are a short, explicit list of narrow rules at the end of the stylesheet, each carrying the measurement that justifies it.

## Requirements

bb 0.43 or newer. Install the plugin, then choose **ChatGPT** in the theme picker and pick light or dark.

[Source and installation](https://github.com/euanguo/bb-plugin-chatgpt-skin)

