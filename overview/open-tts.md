## Listen with your own speech service

A speaker button on each message reads the full message or a selected passage.
The floating player provides pause, stop, ten-second skips and playback speeds
from 0.75× to 2×. Playback stops when you switch threads or send a new prompt.

## Choose the server and voice

Connect an OpenAI-compatible TTS endpoint, including Piper behind a compatible
adapter. Set the server URL, API key, model and voice in the plugin settings.
Speech requests run on the BB server, and the API key stays there as a secret
setting. Markdown is prepared for speech; code blocks are skipped by default.
An elapsed-seconds timer shows waiting during preparation and buffering.
Optional timing logs distinguish synthesis, response delivery and the client's
playback event, without message text or API keys.
Short opening chunks reduce the initial wait, and a shared queue keeps small
self-hosted servers from receiving parallel synthesis requests.

## Requirements and data

Requires BB 0.49.0 or newer and an accessible speech endpoint that returns MP3.
Your configured provider receives the text being read; its account, retention
policy and usage charges apply. The plugin does not install a speech model.
There is no default server and no Microsoft service dependency.

Use `bb open-tts status` to synthesize a short test; this may incur a charge.
Use `bb open-tts voices` if your server supports the optional voices endpoint,
or enter a voice manually. Browsers without MP3 MediaSource use native progressive MP3 playback;
seeking depends on the browser and the audio already buffered. Mobile background playback depends on the OS.

Based on the MIT-licensed
[Read Aloud](https://github.com/csells/bb-plugins/tree/main/plugins/read-aloud)
player by Chris Sells, with a new OpenAI-compatible synthesis backend.
