## What you get

- A **Scoped Skills** page in the BB sidebar that lists every skill with its scope: the agents that receive it and, optionally, model globs such as `gpt-5*` and project globs such as `*my-org/*`.
- A **page per skill** to change who gets it. Pick agents by logo, add model and project globs, and see live which of your projects a glob matches. The skill's SKILL.md is rendered below.
- A **preview**: pick an agent, a model and a project and see which scoped skills a new thread there would get, and which it would not.
- **Import** from any skill folder on the BB machine, such as `~/.claude/skills/brandkit`. The plugin copies the folder and leaves the original alone.
- A `bb scoped-skills` command with `list`, `import`, `scope`, `remove`, `preview` and `agents`.
- Three agent tools, so you can ask a thread to "make brandkit Codex-only" or "why don't you have brandkit?" and it can check or change the scope itself.

## How it works

BB gives every skill in `~/.bb/skills` to every thread, whatever agent runs it. Scoped Skills keeps its own library instead. When a thread starts, BB tells the plugin which agent, model and project it uses, and the plugin hands over only the skills whose scope matches. Project globs match a project's name, id or git remote, so work-only skills can stay out of personal projects. A Claude Code thread never sees an image-generation skill that only Codex can run, and a Codex thread still gets it.

The library lives in the plugin's own database and is written back to disk each time the plugin loads, so updating the plugin never loses your skills. Import checks each `SKILL.md` with the same strict YAML parsing BB uses and tells you what to fix. It also rejects unknown agent ids, so a typo can't silently hide a skill.

## Good to know

- Scope changes apply to new sessions. A running thread keeps its skills until its session restarts.
- A skill that also sits in `~/.bb/skills`, `~/.claude/skills` or `~/.codex/skills` still reaches every agent from there. Delete those copies after importing.
- Works with every agent BB lists, including Claude Code, Codex and Cursor. It needs no account, API key or network access.
