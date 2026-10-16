## What you get

- A **GigaAM v3** service in Settings → AI services → Voice input.
- Punctuated, normalized Russian text, about 1 s for a short phrase on a modern CPU.
- Long voice notes: recordings over 20 seconds are split at pauses, so multi-minute dictation works.
- A `bb gigaam` command to check status, read logs, restart, or reinstall.

## How it works

On first load the plugin downloads everything it needs into its own data directory: the uv package manager, Python 3.12, CPU-only PyTorch, GigaAM, and the model. This is about 1.2 GB. It needs no root access, Docker, GPU, or API key. The plugin then keeps a small recognition server running on `127.0.0.1` and restarts it when needed. Your audio never leaves the machine.

You can also send recordings to your own OpenAI-compatible transcription server, for example GigaAM on a GPU machine.

## Requirements

Linux (x86-64 or arm64) or macOS on Apple silicon, about 2 GB of disk, and 1.5 GB of free RAM. GigaAM v3 recognizes Russian only.
