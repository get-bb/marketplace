## The actions file

The list lives in the project, in `.bb/actions.json`, committed like any other file. Each action has a name and a command, and optionally a folder to run in (relative to the repository's root) and a description for the menu. Because the file is read from the thread's own workspace, every worktree sees its own branch's version, and a thread on another bb machine reads that machine's copy. Edits show up the next time the menu opens.

## Editing actions

Edit actions… in the menu opens an editor beside the thread: add, change, reorder and delete actions in a form, or edit the file as JSON. It checks each change the way the menu does and will not save a file with a mistake. Saving writes the thread's own copy of the file, creating it when there is none, without committing it, and it will not overwrite a file that changed on disk since you opened it.

## Running an action

Picking an action starts a terminal titled with its name. The command runs in your shell after its startup files, such as ~/.zshrc, as in a terminal you opened yourself, so your PATH, aliases and shell syntax work there too.

- An action that is still running is marked Running; picking it again shows its terminal instead of starting a second copy.
- A finished action keeps its output and a line with its exit code until you run it again, which starts a fresh run in its place.
- Ctrl+C stops a command; closing the terminal's tab ends it.

Runs are per thread, so two threads in two worktrees can each run their own dev server.

## When something is wrong

A project without the file gets a short explanation of how to add one. A file with a mistake, such as a misspelt field or a missing comma, shows the problem with its line, column and the action it is in, rather than a broken menu.

## Requirements

bb 0.49 or newer. Actions run on macOS and Linux machines. Nothing to configure, and nothing is sent anywhere: the plugin runs only the commands in the project's file, in folders inside the workspace, and writes only that file. Starting an action and saving the file are the plugin's RPCs, which the menu and the editor call and which other clients you trust with your bb (plugins, scripts) can call too, as with any bb plugin.
