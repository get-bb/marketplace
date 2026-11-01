Stop writing "open this link and check that". An agent hands you the build with a QR code and a checklist, you tap Works or Broken on your phone, and the answer goes straight back to the agent.

## What you get

- A card in place of the composer with a link, a QR code, and what changed.
- A checklist the agent writes, with one tap per check and an optional note.
- Localhost links are refused before they reach you, so the link always opens.

## How it works

The agent calls the `try_it` tool and carries on when you answer. Nothing leaves your BB server. Screenshots still go through the normal composer after you send.
