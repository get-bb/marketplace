## What you get

- **Shell.** A flat gray frame with the thread as one raised, rounded panel, a card-style page header, and the right panel as a card. On phones the sidebar drawer stays gray while the pushed thread turns into the raised panel.
- **Sidebar.** Quiet navigation rows, New thread as the raised pill, the open thread highlighted as a pill, and a light / dark / system switch in the sidebar footer that drives BB's own appearance setting.
- **Composer.** A white card with a pink-violet gradient send button. Project, machine, branch and access mode show as even chips that wrap to two lines on a phone. A thin line along the composer's bottom edge fills with context use (grey, then orange past 60%, red past 85%); hover it for the number, click it for BB's details.
- **Chat.** Soft user bubbles, code as hairline chips, expanded work groups as one card on a single grid (status dot, monospace command, right-aligned duration), red chips for errors, a gradient ring loader, and the time of a message on hover with the exact date in its tooltip.
- **Pickers and menus.** The model picker as one card with segmented provider tabs and a sparkle for favorites; menus and popovers as frosted cards.
- **Integrations.** BB's changed-files view gets file cards with a quiet folder and a strong file name. If you install [Git History](https://github.com/yusuf8834/bb-git-history), it picks up the same accent graph and chips.

## How it works

Pick **Pokecut** in Settings → Appearance, or run `bb theme set plugin:pokecut-theme:pokecut`. Everything visual ships in the theme stylesheet, so choosing another theme removes it at once; the plugin's small DOM helpers (message times, error marks, path splitting) also run only while Pokecut is the active theme.

Settings → Plugins → Pokecut Theme → **Chat appearance** turns each chat feature on or off and picks the loader and tool-row style. The section is in English and Russian.

## Credits

The visual language follows the [Pokecut](https://pokecut.rakibulism.space) admin design; no Pokecut source, images or fonts are bundled. The chat layer is adapted from [Beautiful Chat](https://github.com/diip3sh/bb-plugin-beautiful-chat) and message times from [Chat Timestamps](https://github.com/pixexid/bb-plugin-chat-timestamps), both MIT. Keep Beautiful Chat disabled while this theme is active.

## Requirements

BB 0.44 or newer. No accounts or external services.
