# Hex Voice

On-device voice dictation for BB's chat composer and `bb voice transcribe`, powered by [Hex](https://github.com/anomalyco/hex) and macOS 26's built-in Apple Speech (`SpeechTranscriber` + `SpeechAnalyzer`) or local GGUF speech models.

## Why Hex Voice

BB's composer microphone button dispatches recorded speech to the active `voice` AI service. With Hex Voice installed and selected, pressing the microphone button transcribes your speech locally on Apple Silicon in ~100ms with zero cloud calls, zero API keys, and zero recurring cost.

## How it works

1. **Registers the `hex` (`Hex (Apple Speech)`) AI service** via `bb.experimental_aiServices.register`.
2. **Adds a Voice Provider picker to the microphone right-click menu** — right-clicking the composer microphone button displays all configured voice providers right below **Input device**, so you can switch between `Hex (Apple Speech)`, `Codex`, and any other configured voice provider on the fly.
3. **Manages a warm `hex service --embedded` daemon** tied to BB's plugin lifecycle (`bb.onDispose` and a stdin pipe lease), so it starts automatically when BB loads the plugin and exits cleanly when BB quits or reloads.
4. **Transcodes browser microphone recordings** (`audio/webm`, `audio/mp4`, `audio/ogg`, etc.) to 16 kHz mono 16-bit PCM WAV via `ffmpeg` before sending them to Hex's `/transcriptions` endpoint.
5. **Supports Apple Speech and local GGUF models** — defaults to `apple_speech` (macOS 26 `SpeechTranscriber`), with support for `parakeet_unified_en`, `parakeet_v2`, `parakeet_v3`, `whisper_large_v3_turbo`, `qwen3_asr06_b`, `cohere_transcribe`, and `nemotron_3_5_asr`.

## Commands

Check service health and installed models:

```sh
bb hex status
```

Set Hex as BB's active voice service:

```sh
bb settings ai-services set voice hex
```

Transcribe an audio file from the CLI:

```sh
bb voice transcribe /path/to/audio.wav
```

## Requirements

- macOS 26+ on Apple Silicon for `apple_speech` (or macOS with a local GGUF model for Parakeet/Whisper).
- `hex` (`>=3.2.0`) installed on `PATH` (for example `/opt/homebrew/bin/hex` or `~/.local/bin/hex`) or configured via the plugin's `hexBinaryPath` setting.
- `ffmpeg` installed (for example `brew install ffmpeg`) to transcode browser `MediaRecorder` clips (`audio/webm` / `audio/mp4`) to 16 kHz mono PCM WAV.
