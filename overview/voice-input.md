## What you get

Voice messages you record in a BB chat are transcribed on a machine you choose, which need not be the one running your BB server. Each recording is saved to disk before recognition starts, so a failed transcription never loses what you said.

- **Pick the machine.** Recognition runs where you point it: the Mac with the models, or any connected machine when the cloud engines are enough.
- **Five engines.** Whisper (MLX) and GigaAM v3 run locally, so audio never leaves your machine. Groq, OpenAI and Google run in the cloud and need only an API key. Switch engines with one click.
- **Continuous multi-tab dictation.** Recording stays active while you navigate between threads, files, or settings. An in-place waveform bar tracks your speech, and the transcript is delivered directly to the chat where recording started.
- **A term vocabulary.** List the names you use — tools, products, people. Garbled spellings are repaired by matching consonant skeletons, so "Mail X" becomes MLX without listing every variant.
- **An optional AI correction pass.** Choose strict vocabulary repair or opt-in contextual editing. Improve and Undo edit just the last dictated fragment on demand. Works with any OpenAI-compatible endpoint; Groq, OpenCode Zen and OpenAI are preset.
- **Optional dictation controls.** Stop after silence or send through the original unchanged composer. Auto-send stays off for on-demand/contextual AI editing. Live preview and native-recorder selection are deferred.
- **Text cleanup.** Removes fillers such as "uh" and "um" and fixes quotes and spacing, with rules for Russian, English, German, French, Spanish, Portuguese and Italian. Each rule can be turned off.
- **Recordings and models under control.** Set how many days recordings are kept, download a model in advance with progress, and see and delete models on disk.

## Keys

Enter an API key directly in the plugin: it is stored on the recognition machine with 0600 permissions and never sent to the page. If the Env Catalog plugin is installed, you can pick a key from the catalog in a drop-down instead. A key you enter for a provider is reused by the AI pass when both use the same API address.

## Setup

1. Install the plugin.
2. Run `bb settings ai-services set voice local-voice`.
3. Pick an engine on the plugin page, or run `bb voice-input setup` to install a local one.

`bb voice-input status`, `history`, `download` and `transcribe` cover the same tasks from the terminal. The settings page is available in eight languages.

## Requirements

- Requires BB 0.48.1+ and Plugin SDK 0.6.104+, including with optional features disabled.
- Local engines need Python 3 and ffmpeg on the recognition machine. Whisper (MLX) runs only on macOS with Apple silicon; GigaAM installs PyTorch and is built for Russian speech. Engines a machine cannot run are shown greyed out with the reason, so a Linux server still offers the cloud ones.
- Cloud engines send audio to the provider and need your own account: Groq and Google have free tiers, OpenAI bills per minute.
- Slow providers and long recordings can time out; a failed optional AI pass keeps ordinary cleanup.

## Credits

This plugin is an adaptation of [Voica](https://voica.ru/), a macOS dictation app by Ivan Ushakov, for BB. The vocabulary repair, the AI correction prompt and the cleanup approach come from Voica (MIT). Source: [github.com/Inhum/voica](https://github.com/Inhum/voica).
