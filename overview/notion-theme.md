## What you get

Light mode uses Notion's white page and warm grey text. Dark mode uses Notion's `#191919` page. Both keep the same blue for primary actions.

Settings → Appearance lists a **Notion** palette. The three Ag tiles on this plugin's settings page switch messages and the composer between Default, Serif and Mono. The rest of the chrome stays on Notion's default stack.

Menus, popovers, dialogs and switches pick up Notion's shadow, 14–15px rows and grey-off switches. Your own messages sit on Notion grey with no border. Markdown in the thread uses Notion inline code, quotes, headings and tables.

Hover cards close when the pointer leaves the button and the card. A click pins the card until a second click, a click outside, or Escape.

When a provider window is exhausted, a notice sits on the prompt box and can retry at the reset time. Dismiss hides it.

## Setup

```sh
bb theme set plugin:notion-theme:notion
```

Back to BB's look: `bb theme reset`. Font: the Ag tiles, or `bb plugin config notion-theme set font serif` (`default`, `serif`, `mono`).

## Requirements

BB 0.47 or later, Plugin SDK 0.6.79 or later. No account and no network call. Notion's licensed fonts are named first; the theme falls back to system fonts when they are not installed.

A BB update that renames a `data-*` hook can drop the extra restyling. The palette tokens still apply.
