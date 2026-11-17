## What you get

- **Reads the project, then draws.** The project's README and manifest decide the motifs (a restaurant guide gets cups and menus, a pet-portrait shop gets paws and cameras), and an image model draws one seamless black-on-white pattern from them.
- **Your choice of image provider.** Codex CLI, the OpenAI Images API, the Google Gemini API, or any command you write (ComfyUI, fal, Replicate, a local model). Pick a default in settings, or a different one per generation.
- **One image, both themes.** The pattern is stored as a transparent mask and painted with the theme's text colour, so it shows as dark lines in day mode and light lines in night mode. Day and night opacity are set separately.
- **Behind every thread of the project.** Threads and subthreads of a project share its background; projects without one stay plain.
- **Tiles cleanly.** Uneven margins are evened out automatically so the repeat has no visible seam, and "Force seamless" mirrors the tile for a guaranteed join.

## Where to find it

- **Settings → Backdrop → Project backgrounds**: generate or regenerate with an optional direction ("botanical", "constellations"), tune day/night opacity, pattern size and tint, hide or remove.
- **Thread menu → Project background**: regenerate, hide or remove for that thread's project.
- **`bb backdrop`**: `generate [--provider …]`, `providers`, `set`, `import`, `remove`, `list`. A bundled skill teaches agents these commands.

## Requirements

One image provider, set up on the machine running the bb server:

- **Codex CLI** (default): the [Codex CLI](https://github.com/openai/codex), signed in, with image generation. Codex reads up to four files from the project's checkout to choose motifs. About a minute per background.
- **OpenAI**: an OpenAI API key (paid per image). Model `gpt-image-2` by default; any OpenAI-compatible endpoint works.
- **Gemini**: a Google AI Studio API key (paid per image). Model `gemini-3.1-flash-image` by default.
- **Custom command**: a shell command that reads `$BACKDROP_PROMPT` and writes a PNG or JPEG to `$BACKDROP_OUTPUT`.

With OpenAI, Gemini or a command, the plugin sends a short prose excerpt of the README (no code, tables or URLs) inside the prompt. With Codex, Codex reads the files itself. Either way that text goes to the provider you chose. Without any provider you can still use your own art: `bb backdrop import pattern.png`.

Images stay in the plugin's local database on your bb server. Other wallpaper plugins also paint behind the main pane; use one at a time.
