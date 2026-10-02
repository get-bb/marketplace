## What you get

Every icon in bb is 50% larger when you open it on a phone. Nothing changes on
a desktop, and nothing changes in a narrow window driven by a mouse.

This is for the moment you are using bb from your phone and the icons turn out
to be sized for a pointer, not a thumb. A bigger icon is easier to see, easier
to aim at, and, because the button around it grows to fit, easier to hit.

## How it works

The plugin ships one stylesheet. It applies under the same media query bb
itself uses to decide a screen is a phone, so it follows bb's judgment rather
than making its own. Under that query, the icons bb draws are scaled with CSS
`zoom`, which enlarges the icon's layout box rather than just painting it
larger. Diagrams and images inside messages are not touched.

It scales the glyphs from bb's icon set, the plugin marks and provider logos
bb draws as masks, and the few lucide glyphs in shadcn primitives. Icons
rendered by other plugins are scaled too when they use bb's icon component or
carry its `data-icon` marker.

Disable the plugin and the icons return to their normal size at once.

## Requirements

Nothing to configure. There are no settings, no commands, and no network
access. Turn it on and pick up your phone.

It works in the native bb mobile app and in a phone browser, including a
remote `getbb.app` link.

The source is at
[github.com/csells/bb-plugins](https://github.com/csells/bb-plugins).
