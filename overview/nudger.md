Your agents stop halfway. “Want me to continue?” “Next I'll wire up the tests.” Then the thread sits idle until you come back and type “go on”. Nudger types it for you, but only when the work is really unfinished.

## What it does

Nudger watches every thread. When an agent stops, [Jev](https://typesafe.ai) reads the last reply and judges what kind of stop it is:

- **Unfinished work** the agent can do itself: Nudger sends `please continue` after a 20-second countdown you can cancel.
- **A real blocker**, like a missing credential or a broken service: no nudge, it goes on your list.
- **A request for you**: permission, a decision, a review. Never continued, always shown to you.
- **Done**: left alone.

Only the first gets a nudge. Each thread's banner shows what Nudger decided, and the Nudger page lists every thread that needs you, so you see at a glance where to look. When Jev isn't sure, Nudger doesn't guess: the thread lands on that list. If the agent handed the work to a subthread, a workflow or a running build, Nudger waits for it, and checks in after 30 minutes only if nothing reports back.

## How it uses Jev

Jev is TypeSafe's System One model. It writes no text: it answers typed questions with a probability for every option and a confidence score. Nudger sends the last reply with five fixed questions: is anything blocking, is the work finished, does the reply ask you for something, who acts next, and what's at stake.

Nudger acts only when Jev is confident. A nudge needs at least 90% confidence that the work is unfinished and nothing blocks it, and a reply that asks you for anything is never continued. A failed call, a rejected key or an unreadable answer never becomes a blind nudge. Every decision is kept for up to 30 days with Jev's answers and the reason, so you can see why Nudger nudged or held back (`bb nudger decisions` exports them).

## Set up

1. Get an API key at [console.typesafe.ai](https://console.typesafe.ai/keys).
2. Paste it in **Settings → Installed plugins → Nudger → Jev API key**.
3. Done. Nudger checks the key with Jev and turns itself on.

## Your controls

- The eye in a thread's composer turns nudges off for that thread; **Cancel** stops one countdown.
- Pressing Stop holds a thread's nudges until your next message.
- **Pause** stops all checks for a while. **Automatic continuation** turns Nudger off; it stays off until you turn it back on or save a new key.

## Privacy and cost

Jev sees only the last reply of a stopped thread, sent over HTTPS to TypeSafe, never the rest of the conversation. A reply can still quote code or secrets, so use Nudger only for work you may share with TypeSafe. TypeSafe bills Jev per input token ($0.042 per million); the Nudger page shows your estimated spend. Decisions stay in BB's local plugin storage on your machine.

Requires BB 0.46 or newer. Source and details: [github.com/ComicBit/bb-plugin-nudger](https://github.com/ComicBit/bb-plugin-nudger). More about Jev: [docs.typesafe.ai](https://docs.typesafe.ai/introduction).
