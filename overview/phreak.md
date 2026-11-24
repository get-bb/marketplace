Phreak sits in a panel beside a thread. You talk; it answers from the chat, keeps track of what you decide, and messages the agent when you say so.

## What you get

- **A voice partner that knows the thread.** It reads the recent messages and question cards, catches up each time the agent finishes a turn, and reads the agent's work when it needs to.
- **The agent does the work.** Ask for a check or a change and Phreak sends it to the agent; when it thinks something needs the agent, it asks first. Say "check it yourself" and it looks quietly through a hidden fork of the thread instead, which runs an agent turn on the thread's provider.
- **Actions in your own words.** "Send that", "tell it now", "stop it", "take that back" (while it is still queued), "put it in the chat box" or "start a new thread". Each shows as a card with the result and the text.
- **News in one line.** Phreak tells you when the agent finishes, fails or asks you something, and can answer the agent's question cards by voice.
- **What is happening, at a glance.** A state chip (Listening, Thinking, Speaking, Muted), a mic level meter, live captions, and errors that lead with the fix.
- **A shortcut.** `Ctrl+Shift+Space` starts or ends a session; the palette lists it as "Phreak: start or end voice".

## Requirements

- bb 0.50 or later.
- The ChatGPT Realtime Connection plugin (`codex-realtime`), with `phreak` added to its allowed plugins.
- The Codex CLI signed in with ChatGPT on the machine running bb, on a plan that includes Codex. Voice use counts against that plan.
- A headset is recommended: Phreak's noise filtering is tuned for a close mic.

## Know before you install

OpenAI does not document this use of the ChatGPT sign-in, so it may stop working at any time, and nobody has checked whether the ChatGPT or Codex terms allow it. While a session runs, OpenAI receives your mic audio and what Phreak reads from the thread: recent messages, new replies, question cards, and any older messages or agent work it pages through. Nothing goes out before you press Start. Phreak keeps no audio or transcript; each lookup leaves an archived hidden thread, and lookups are read-only by instruction, not enforcement.

Source and setup: [github.com/hellno/bb-plugin-phreak](https://github.com/hellno/bb-plugin-phreak)
