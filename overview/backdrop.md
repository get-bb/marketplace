## What you get

- **Reads the project, then draws.** Codex skims the project's README and manifest, picks 3–6 motifs (a restaurant guide gets cups and menus, a pet-portrait shop gets paws and cameras), and generates one seamless black-on-white pattern with its image tool.
- **One image, both themes.** The pattern is stored as a transparent mask and painted with the theme's text colour, so it shows as dark lines in day mode and light lines in night mode. Day and night opacity are set separately.
- **Behind every thread of the project.** Threads and subthreads of a project share its background; projects without one stay plain.
- **Tiles cleanly.** Uneven margins are evened out automatically so the repeat has no visible seam, and "Force seamless" mirrors the tile for a guaranteed join.

## Where to find it

- **Settings → Backdrop → Project backgrounds**: generate or regenerate with an optional direction ("botanical", "constellations"), tune day/night opacity, pattern size and tint, hide or remove.
- **Thread menu → Project background**: regenerate, hide or remove for that thread's project.
- **`bb backdrop`**: `generate`, `set`, `import`, `remove`, `list`. A bundled skill teaches agents these commands.

## Requirements

- The [Codex CLI](https://github.com/openai/codex), signed in, on the machine running the bb server, with image generation available. Each background uses one Codex run (about a minute). If Codex is not on the server's PATH, set it with `bb plugin config backdrop set codexPath /path/to/codex`.
- Codex reads up to four files from the project's local checkout (README, manifest, AGENTS.md) to choose motifs, so that text is sent to your Codex provider.
- Without Codex you can still use your own art: `bb backdrop import pattern.png`.

Images stay in the plugin's local database on your bb server. Other wallpaper plugins also paint behind the main pane; use one at a time.
