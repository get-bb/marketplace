This unofficial mirror ships the skill text from [mattpocock/skills](https://github.com/mattpocock/skills) unchanged and adds a page for choosing which skills each project gets. See the [compatibility notes](https://github.com/erikmackinnon/bb-plugin-matt-pocock-skills-for-bb/blob/main/compat/README.md) for how they are packaged for bb.

## What you get

- **33 skills as slash commands.** 20 engineering and 7 productivity skills are on by default. Matt's 6 in-progress skills are off until you opt in, and the page asks first because Matt marks them experimental.
- **A Start here card.** Run `/setup-matt-pocock-skills` once per repository to record your tracker and conventions, use `/grill-with-docs` before a code change or `/grill-me` for a plan, and ask `/ask-matt` which skill fits.
- **On by default, or only where you want it.** Turn the skills on for every project, or leave the default off and turn them on in the projects you pick. Each project can also switch individual skills.
- **Nothing breaks when you turn skills off.** Skills that other active skills need stay on, and the page shows which skill uses them. Turning one off for real asks first and tells you what else goes with it.
- **Your skills keep their names.** If you already have a skill called `tdd` or `grill-me`, yours stays in charge and the page tells you. You can keep both, with Matt's as `/matt-pocock-tdd` and so on. When nothing clashes, the page doesn't mention it.

## How it stays current

A GitHub Actions job checks [mattpocock/skills](https://github.com/mattpocock/skills) every day. When the skills change, it keeps the upstream snapshot, applies the [documented compatibility rules](https://github.com/erikmackinnon/bb-plugin-matt-pocock-skills-for-bb/blob/main/compat/README.md), validates the bundle and publishes a new plugin release. Changes to helper scripts, or anything that fails a check, wait for a human review instead. The page shows the bundled version and commit and tells you when a newer release exists. Update with `bb plugin update matt-pocock-skills-for-bb`.

## Requirements

bb 0.45 or newer, an agent provider, and npm for the Git install. Some skills use extra tools such as Git, GitHub CLI or your project's test commands, and the page flags missing ones. Update checks contact GitHub. No account or API key is needed.

## Attribution

**Skills © 2026 Matt Pocock, MIT**, from [mattpocock/skills](https://github.com/mattpocock/skills). Matt's `pr` skill credits Dex Horthy's material. Plugin code © 2026 Erik MacKinnon, MIT. Not affiliated with or endorsed by Matt Pocock or bb.
