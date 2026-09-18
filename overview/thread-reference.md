Move context between BB conversations with a gesture.

## What it does

- Adds a dedicated drag handle to sidebar thread rows and temporarily disables
  the native row drag source so it cannot open split view.
- Registers an invisible bridge for every chat composer so the thread can be
  dropped directly into the composer editor.
- Inserts a native **Threads** mention instead of copying a large transcript
  into the draft.
- Makes persisted thread mentions clickable in messages so users can jump back
  to the source thread.
- Resolves the referenced thread when the message is sent, supplying a bounded
  conversation outline as agent-visible context.

## Why it is safe to use

The source thread is read-only. The mention stores only its thread id and a
display label in the draft. Resolution happens server-side at send time and
wraps the imported material as untrusted reference context, so text from the
source thread is not treated as an instruction to the destination agent.

## Install

```sh
npm install
bb plugin install .
```

After installation, drag the six-dot grip handle on a sidebar thread directly
into the chat input. You can also type `@` and select a thread from the
**Threads** mention provider. Click a persisted thread reference in a message
to return to its source thread.
