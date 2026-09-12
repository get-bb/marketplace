## What you get

One button in a thread's header copies what you point at in a BB Browser tab. Click
**Copy Browser Element**, pick an element in the page, and its details or picture land on
your clipboard — ready to paste into a message, an issue, or an agent.

## How it works

- **Element text.** Pick an element and get a structured markdown block: heading, the page
  URL and viewport, a CSS selector, ARIA role and accessible name, bounds, link, and text.
  This is the shape an agent reads best — it names the element and where it lives.
- **Element image.** Pick an element and get a PNG of just that element, clipped to its box.
- **Screenshot.** Copy the visible Browser tab as a PNG.

Pick a mode from the dropdown and click the element in the page. While the picker is armed
the page draws a hover highlight and a label over whatever is under the cursor, so you can
see the target before committing. Picking never activates the element — the click is
consumed, so buttons and links do not fire.

When the thread has more than one Browser tab open, the dropdown lists them above the three
modes so you can choose which tab to pick from. With one tab it goes straight to the modes.

## What lands on the clipboard

Element text is written as markdown:

```markdown
### a "Learn more"

**URL:** https://example.com/
**Viewport:** 1280x720
**Selector:** `html > body > p:nth-of-type(2) > a`
**Role:** link
**Name:** "Learn more"
**Bounds:** x=256, y=186, 82x18
**Link:** https://iana.org/domains/example
**Text:** "Learn more"
```

Only the fields that apply to the element are emitted, and free-form text keeps its full
length — only the heading is trimmed for scannability.

## What redaction does and does not cover

Redaction is a heuristic applied to form fields only. An `<input>` or `<textarea>` whose type
is `password`, or whose name, id, or autocomplete attribute matches
password/credential/secret/token/api-key/auth, contributes no text and no value. That covers
more than passwords — a field named `api_key` or `auth_token` is caught too.

It does not cover anything that is not a form field. A token, key, or secret rendered in a
`<code>` block, a `<div>`, or any other non-input element matches nothing and is copied
verbatim into the markdown block, which may then go to an agent. Treat a picked element the
way you would treat anything else you paste.

Images are not redacted at all: **Element image** and **Screenshot** capture whatever is on
screen, so an image of a secret field is possible. Pick deliberately.

## Requirements

- BB desktop with the native Browser and Plugin SDK 0.4.48 or newer. The plugin needs
  `experimental_desktopBrowsers` to attach to a tab. The header button appears only in the
  desktop app: picking an element means clicking it in the native Browser view, which a
  browser client cannot do, so the control is not offered on the web client.
- A Browser tab open in the thread you are copying from. With none open, the modes are
  disabled and the dropdown says so; it re-checks the thread's tabs every time you open it,
  so open the tab and reopen the menu.
- The clipboard is written by the page itself, so the copy needs an ordinary click with user
  activation — a scripted or synthetic click will be refused by the browser.

## Behaviour worth knowing

- **The plugin holds the tab only while you pick.** It takes a short exclusive lease, refuses
  to interrupt automation that already controls that tab, and releases it immediately after
  the pick.
- **Stopping control stops the pick.** If you press Stop or Take over in the tab's control
  bar mid-pick, the pending copy ends at once, the picker stops swallowing clicks, and the
  button returns to its idle state.
- **No side panel, no settings.** The plugin contributes one header button and nothing else.
- Text and image copies are read from the page you are already looking at; nothing is
  uploaded, and no page content leaves the machine through this plugin.
