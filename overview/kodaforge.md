## What you get

- **A code editor in BB.** Monaco with tabs, up to four split editor groups, a minimap, and find and replace. A save checks that the file did not change on disk first, so you never overwrite an agent's edit.
- **Search everything.** ⌘P finds files, symbols, text in files and commands from one box. ⌘⇧F searches across files with regex and globs, and Replace All previews every change first.
- **Language servers.** Python (pyright or basedpyright) and TypeScript/JavaScript give completion, hover, go to definition, find references, rename across files, a Problems panel, and format on save with ruff or prettier.
- **Run and debug Python.** Breakpoints, step over/in/out, variables, call stack and a debug console, through debugpy.
- **Python environments.** KodaForge finds venv, uv, Poetry, conda and pyenv interpreters. The one you pick is used by the language server, debugger, terminals and tasks.
- **Tasks and terminals.** Run Makefile targets and package.json scripts in one click. Terminals split up to four side by side and reattach after you leave or restart BB.
- **Source control.** Stage, diff, commit, stash, pull, push and switch branches, with git colours in the explorer.
- **Agents beside your code.** Agent chat, the project's threads and workflow runs sit in a right-hand panel, and a workflow's agents show as a live graph.
- **Agent Network.** A solar system around Koda the bear. In Coding mode it shows the agents, workflow runs and MCP servers working on the project. In App mode it maps the AI architecture your own code builds: agents and their tools, MCP servers, models and skills. Click anything to open it.

## How it works

Files, git, search, language servers and terminals run on the machine that holds the workspace, inside the workspace root. Chat and threads are BB's own components. The plugin opens no ports. Several workspaces can be open at once as tabs, and switching keeps files, terminals and a paused debugger alive.

App mode reads the source and never runs it. It recognises pydantic-ai, OpenAI Agents, LangChain, CrewAI, Agno, Mastra, the Vercel AI SDK, the Claude Agent SDK and direct model calls, and links things by name and file, so it is a map rather than a proof.

## Requirements

Install the tools you want KodaForge to use: pyright or basedpyright for Python, typescript-language-server for TypeScript, debugpy for the debugger, and ruff or prettier for formatting. KodaForge finds them in the project or on PATH. JavaScript debugging is not available yet.

Source and issues: https://github.com/Kodaks94/bb-plugin-kodaforge
