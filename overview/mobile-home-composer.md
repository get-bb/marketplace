## What it changes

On narrow screens, this plugin rearranges the composer on bb's project home page so that it fits a phone. The composer's frame, border and background are removed and its controls sit in one card. The text box grows to about 5.5 rem and then scrolls inside itself.

The row of controls under the text box stays on one line and fits at 320 px and wider. Project, environment, branch and machine (when bb shows it) become icon-only buttons. They keep their accessible name and their dropdowns, and the plugin adds a title such as "Environment: Project checkout" that shows the current value on hover or long-press. Environment uses a stacked-layers icon, project a folder and branch a branch icon. Permission mode keeps its short text and sits at the right edge. Every button in the row is at least 44 by 44 px with an even 4 px gap.

The list of projects above the composer is kept clear of it: the plugin measures the composer's height and sets the list's bottom offset to that height plus 8 px, and keeps the value up to date as the composer resizes.

## Limits

- It applies only below 768 px of viewport width (`max-width: 47.99rem`). On wider screens it removes its styles and changes nothing.
- The icons carry no text: folder is the project, layers is the environment, branch is the branch. The title names each one.
- It hides the **Show file tree** buttons in the composer footer and in the follow-up composer on narrow screens. If you rely on those buttons on a phone, this plugin is not for you.
- It makes the **Hide file tree** button in the file tree panel 44 by 44 px and pads the panel for the device safe areas.
- It restyles bb's current markup by data attributes and aria labels, so a bb update that renames them can break the layout. It was checked against bb 0.50.1 and declares `bb >= 0.49`. The attributes it uses are listed in the README under "Depends on".
- It has no settings, no commands and no server-side behaviour.

## Other plugins

Its footer rules also mention the `data-bui-off` attribute that the Beautiful Chat plugin sets on the page root. They apply with or without that plugin. The machine button was not visible in testing, so its icon-only layout is untested.
