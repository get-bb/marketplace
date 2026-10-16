Each sentence is written for the ear: which thread it is, what kind of event, and the question, the
command or the start of the reply, kept short. It is spoken on whatever page of bb you are on, so you
know which thread to go back to without watching the sidebar.

## What you get

- When an agent asks a question, waits for a plan or a permission to be approved, finishes its turn or
  fails, the bb app says one sentence about it — what is being asked and the choices, the command, or
  the start of what was done.
- A Herald page in the sidebar listing every waiting thread with its reason and sentence, and a count
  beside the sidebar entry. Tap a row to open the thread, or Read again to hear it again.
- The sentence above the waiting thread's composer, with a Read again button, until you answer.
- Settings for where to speak (desktop app, browser tab, mobile app), the voice and speed, and which
  kinds of event are announced.
- Optionally, a model writes each sentence: Claude Code, OpenAI Codex, Gemini CLI or a command of your
  own, installed on the Mac running bb, runs once per announcement with no tools or read-only. Off by
  default; the plain sentence is spoken whenever the tool fails or is slow.

## Beside bb's push notifications

bb's own push notifications tell you a thread finished, failed or waits for input, with its last words.
Herald adds a sentence to be heard, speech on every client, and one list of what is waiting. The two can run together.

## What it needs

- No account or external service for the plain sentence: it is built from the event itself. A
  model-written sentence needs the chosen command-line tool installed and logged in on the Mac running
  bb, and each announcement costs one short model turn there.
- For the default voice, bb running on a Mac, whose `say` voices render each sentence. Otherwise each
  device's own browser voice speaks.
- A browser tab speaks after you press Test voice once. The mobile app speaks only while it is open on
  screen, after one press of Test voice, and only once you switch it on.
