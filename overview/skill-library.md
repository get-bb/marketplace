Edit, create, and install agent skills without leaving bb.

## What you get

- A **Skill Library** page on the left rail that lists every skill bb
  discovers on the machine: provider skills, plugin skills, built-in skills,
  and your own user skills, each labeled by scope.
- A filter that narrows the list by name or description as you type.
- A markdown editor for every manageable skill, with save, revision-based
  conflict detection, a rendered preview, and Cmd/Ctrl+S to save.
- A **New skill** dialog that writes a skill folder with frontmatter under
  `~/.bb/skills`.
- A **Registry** tab that searches the skills.sh catalog and installs entries
  into your user skills, so the same skills you install in a terminal show up
  in the list.
- A `bb skill-library` terminal command to list discovered skills and create
  new ones for agent workflows.

## Why it exists

Installed skills are checked out across several folders, and the built-in
Skills page browses them but does not edit them. After installing a skill, you
usually want to adapt it to your codebase: change a step, add a project rule,
or delete advice that does not apply. Skill Library opens each skill as an
editable markdown document in one place, so you can check it out, adjust it,
and save without opening a file manager.

## How it works

Reading, saving, and deleting go through bb's own skill APIs, so revisions and
permissions match what the built-in Skills page sees. Skills that live in
plugin or built-in copies open read-only. Creating a skill writes `SKILL.md`
with `name` and `description` frontmatter. A save carries the revision you
loaded, so a file that changed on disk is refused instead of overwritten.

The Registry tab queries [skills.sh](https://skills.sh) over the network for
search and install only. Publishing your own skill to skills.sh has no API:
put the skill folder in a GitHub repository that skills.sh indexes, then
install it.

## Requirements

- bb 0.48 or newer with the plugin SDK 0.6.104 or newer.
- Network access to skills.sh for registry search and install only. The
  library, editor, and creation work offline.
