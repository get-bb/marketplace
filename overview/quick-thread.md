## What you get

Open a new thread from anywhere without leaving the one you are on. Press
Ctrl/Cmd+N and a floating dialog appears over the current thread, embedding
BB's real new-thread composer. Every selection you already use is there:
project, environment, provider/model, mentions, and attachments.

## Two ways to dispatch

Press **Enter** (or click **Create & open**) to create the thread and navigate
to it. Press **Ctrl/Cmd+Enter** (or click **Run in background**) to create it
and stay where you are — a toast appears with an Open action so you can jump
to the new thread when you are ready.

## A fallback for every keyboard

Where the operating system reserves Cmd/Ctrl+N, use the command-palette row
"Quick Thread: new thread". It opens the same dialog.

## How it works

The dialog is an app overlay, mounted once per window and available on every
screen. The backend forwards the composer's request to BB's thread spawner, so
quick-created threads stay attributed to this plugin. Nothing leaves the
machine, and the plugin needs no account, API key, or external service.
