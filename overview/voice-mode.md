Talk to a thread's agent hands-free, the way ChatGPT and Codex voice work.

## What you get

- **A waveform where send is** when the composer is empty and the agent is idle. Click it to start a voice chat; type and the send arrow comes back. Or press **Ctrl+Shift+V** any time, like Codex; rebind it in Settings → Keyboard.
- **Full duplex with barge-in.** Talk over the voice and it stops at once; it knows how much you heard.
- **The agent does the work.** The voice model forwards requests to the thread's agent, answers "is it done?", stops the agent when you say stop, tells you the result when the turn ends, and tells you when the agent is waiting on you in bb.
- **A live pill** in place of the mic: waveform that follows your voice and the reply, status, mute, end.

## Setup

Install a plugin that provides realtime connections (for example a company AI proxy plugin) and leave **Connection** on auto; that plugin picks the model. Or add an OpenAI API key, which talks to OpenAI directly, and pick the model in Voice Mode's settings. The voice is always picked here.

## Notes

- While a session is on, the realtime provider gets your mic audio, the thread title, and the agent's messages (the latest one at start, then each reply, first 2,500 characters). Sessions end after 5 idle minutes (20 while the agent works) and after 30 minutes regardless.
- Agent replies are treated as data: the voice model can't act on them, and it forwards at most one instruction per thing you say, marked `[Voice Mode]`.
- bb has no plugin slot for the send button or mic, so the plugin relies on bb's composer markup; if a bb update changes that markup, the waveform falls back to sitting beside bb's buttons instead of replacing send. bb's own send and dictation are never affected.
