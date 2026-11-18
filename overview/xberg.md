Agents get an `xberg_extract` tool, so you can point them at a document and ask about it. Attach a file or name one in the workspace, and the text comes back into the thread.

## What you get

- **Office files and PDFs.** PDF, Word, Excel and PowerPoint come back as Markdown or plain text. Spreadsheets arrive as Markdown tables, with each sheet under its own heading.
- **Text in images.** OCR reads text from images, and can be turned on for scanned documents. Check OCR output when numbers matter: misreads come with no warning.
- **Other formats.** Xberg's documentation lists about 100 formats, including email, HTML and EPUB. Only those above are tested with this plugin.
- **Long documents.** Each call returns up to 20,000 characters by default, and says how long the document is and which offset to read next. The agent decides how many pages to read.

## How it works

Extraction runs on the machine that holds the thread's workspace, and agents pass file paths rather than file contents. The plugin doesn't upload your files anywhere. The extracted text, with the file's path and type, goes into the thread, so it reaches whichever model provider runs the agent. No account or API key is involved.

The tool adds one line to every thread's instructions, telling agents to use it for binary documents instead of shell tools, and ships a short skill.

The first extraction on a machine downloads a pinned release of [Xberg](https://github.com/xberg-io/xberg), an MIT-licensed document extraction tool, from GitHub. The plugin checks the download against a SHA-256 digest before unpacking it. To check a machine or install ahead of time, run `bb xberg status` or `bb xberg install`.

## Limits on what it reads

The tool only reads files inside the thread's workspace, its own thread storage, or the storage of the thread it was forked or spawned from. It resolves symlinks before checking, refuses files with other hard links, and discards the text if the file is replaced while Xberg reads it. That narrows what it reads, but it isn't a security boundary. It takes local files only, not URLs, and needs the thread to have a workspace.

Each machine runs two extractions at a time, with a limit of 256 MiB per file. Xberg is stopped after 10 minutes, or sooner if the call is cancelled or the plugin reloads.

## Requirements and costs

- Apple Silicon macOS, or Linux on x86-64 or arm64. Intel Macs and Windows aren't supported. The tool has been tested through BB on macOS. On Linux x86-64, Xberg has only been run directly, and Linux arm64 hasn't been tested.
- Disk on each machine that runs extractions: about 120 MB for Xberg on macOS and 230 MB on Linux, plus its caches. Xberg 1.3.10's defaults keep extracted text for up to 30 days and 2 GB, and its OCR cache has no size limit. `bb xberg status` shows the size of the cached text, and `bb xberg cache clear` empties both caches. OCR language packs are downloaded the first time OCR runs and kept.
- `tar` on the machine, to unpack the download.
- Network access for the first download, and the first time OCR runs, when Xberg fetches a language pack from the `tesseract-ocr/tessdata_fast` repository on GitHub. That file comes from the main branch, and the plugin doesn't pin or verify it. The plugin's own download ignores proxy settings.

## Security

Xberg runs as your user and parses whatever documents you give it. The plugin passes it only `PATH`, `HOME`, `TMPDIR`, `LANG`, `LC_ALL` and proxy settings, plus its own cache directory, and turns off Xberg's config file discovery. It doesn't sandbox the process, so Xberg can still reach the network and read any file your user can.

The cached text sits in readable form in the plugin's data directory on each machine.

Extracted text is written by the document's author, so it can contain instructions aimed at the agent. The tool and its skill tell agents to treat it as data, not instructions, but treat documents from others with the same care as web pages.
