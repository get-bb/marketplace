# Voice reactions

An unofficial BB plugin that reacts out loud to what you type to your agents. A decision model picks a reaction, or silence, and a voice model writes and speaks one short line. Ordinary questions and instructions stay silent by default.

Choose one of twelve characters, a random role per line, or your own persona. Edit the reaction options to decide when it speaks. It handles human prompts, follow-ups, steers and queued messages, while ignoring agent messages and retries. One line plays at a time, with no backlog.

## Requirements

- BB 0.49.0 or later. The plugin uses experimental BB events.
- An audio player on the server: ffplay, SoX play, aplay or paplay.
- Provider API keys. TypeSafe and Vercel AI Gateway can decide; OpenAI Realtime can speak. OpenAI Decisions and OpenRouter decision/audio paths are implemented and tested offline, without live verification.

**Sound plays on the machine running the BB server, not in the browser.** With a remote server you will not hear it on your local computer.

## Privacy and cost

For each human message, up to 800 characters plus up to 300 characters of reply context go to the decision provider. When it speaks, that text also goes to the voice provider. Provider charges apply. The plugin stores no message text or audio; its logs omit message text and keys.

The default OpenAI voice model, gpt-realtime, is scheduled for shutdown on January 20, 2027; choose a successor in voiceModel before then. See [OpenAI deprecations](https://developers.openai.com/api/docs/deprecations).

See the [README and setup guide](https://github.com/neoromantic/bb-plugin-voice-reactions#readme) and [implementation details and known gaps](https://github.com/neoromantic/bb-plugin-voice-reactions/blob/main/docs/how-it-works.md).
