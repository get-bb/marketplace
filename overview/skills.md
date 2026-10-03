A skill's name in the `/` menu says little: which copy will the agent load, where does it live, and
what does it tell the agent to do? Skills answers that for one thread at a time, next to the
conversation.

## What you get

- A **Skills** tab in each thread's side panel, listing every skill that thread's agent can use,
  grouped by origin: the project, the repository, your personal folder, an admin folder, a Claude Code
  or Codex plugin, or bb itself.
- Each skill's `SKILL.md`, rendered, with its path on disk and a button to copy it.
- **Add to chat**: puts the skill at the start of the thread's message box as the same pill bb's own
  `/` menu inserts, with the cursor after it for any arguments. Nothing is sent until you send it.
- A **Skills** button in the composer with a live count, opening the same list in bb's own pop-up
  above the message box (a sheet on a narrow window), and a command palette entry for the tab.
- A command to open that list from the keyboard, in whichever message box has the cursor. Give it a
  key in bb's keyboard settings.

## How it finds them

- Claude Code, Codex and Hermes threads have their skill folders read the way each agent reads them:
  from the thread's directory up to the repository root, then your home folders, plugins last. A name
  defined twice is listed once, under the copy the agent uses.
- Claude Code plugins installed for a repository are listed in its worktrees too, as Claude Code
  applies them there.
- Hermes's archived and organisation-mirror folders are left out, as Hermes leaves them out.
- Every thread also lists the skills bb adds to all threads, and what bb's `/` menu offers that has no
  file, such as an agent's built-in commands.
- The files are read on the machine the thread runs on, including another enrolled machine.

## What it needs

- bb 0.45 or later. No account, key or network access.

## Limits

- Built-in skills that live inside an agent's program have a description but no file to show.
- Skills on other providers come only from bb's own list and bb's `/` menu.
- Codex skills switched off in Codex's settings, and Claude Code plugins switched off for a project,
  are still listed.
- Hermes profiles, and Hermes or Codex homes moved by a setting the agent alone sees, are not followed.
