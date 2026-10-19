Talk to a thread's agent hands-free, the way ChatGPT and Codex voice work.

## What you get

- **A waveform where send is** when the composer is empty and the agent is idle. Click it to start a voice chat; type and the send arrow comes back. Or press **Ctrl+Shift+V** any time, like Codex; rebind it in Settings → Keyboard.
- **Full duplex with barge-in.** Talk over the voice and it stops at once; it knows how much you heard.
- **The agent does the work.** The voice model forwards requests to the thread's agent, answers "is it done?", stops the agent when you say stop, tells you the result when the turn ends, and tells you when the agent is waiting on you in bb.
- **A live pill** in place of the mic: waveform that follows your voice and the reply, status, mute, end. Navigate away and it keeps going in a pill at the bottom of the sidebar (with the thread's name, or a compact one-liner) with a way back to the thread.

## Setup

Install a plugin that provides realtime connections (for example Realtime Gateway, which routes sessions through the Vercel AI Gateway) and leave **Connection** on auto; that plugin picks the model. Or add an OpenAI API key, which talks to OpenAI directly, and pick the model in Voice Mode's settings. The voice is always picked here.

## Notes

- While a session is on, the realtime provider gets your mic audio, the thread title, and the agent's messages (the latest one at start, then each reply, first 2,500 characters). Sessions end after 5 idle minutes (20 while the agent works) and after 30 minutes regardless.
- By default your words reach the agent as you said them (transcribed); set **What gets sent to the agent** to rewritten to have the voice model write the request instead. Either way it forwards at most one message per thing you say. Agent replies are treated as data: the voice model can't act on them. An option marks spoken messages with `[Voice Mode]`; it's off by default.
- bb has no plugin slot for the send button or mic, so the plugin relies on bb's composer markup; if a bb update changes that markup, the waveform falls back to sitting beside bb's buttons instead of replacing send. bb's own send and dictation are never affected.
