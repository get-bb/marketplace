Talk to a thread's agent hands-free, the way ChatGPT and Codex voice work.

## What you get

- **A waveform where send is** when the composer is empty. Click it to start a voice chat; type and the send arrow comes back.
- **Full duplex with barge-in.** Talk over the voice and it stops at once; it knows how much you heard.
- **The agent does the work.** The voice model forwards requests to the thread's agent, answers "is it done?", stops the agent when you say stop, and tells you the result when the turn ends.
- **A live pill** in place of the mic: waveform that follows your voice and the reply, status, mute, end.

## Setup

Add an OpenAI API key in the plugin settings, or install a plugin that provides realtime connections (for example a company AI proxy plugin) and leave **Connection** on auto. Pick the model and voice in settings.

## Notes

- Mic audio, the thread title and the agent's latest message go to the realtime provider you configure, only while a session is on.
- bb has no plugin slot for the send button or mic, so the plugin relies on bb's composer markup; a bb update can hide the waveform until the plugin is updated. bb's own send and dictation are never affected.
