## Your files, across your BB machines

Working on a server while your document is on a Mac? File Gateway lets your agent list a shared folder, read text, or copy a file to another enrolled machine without setting up SSH or publishing a download link.

## What it provides

- A native tree in the chat side panel, including before the first message. Add files or folders as mentions that identify their source and path.
- FTP, FTPS and SFTP website accounts alongside BB machines; passwords stay in BB secret storage.
- An agent tool and `bb file-gateway` commands to discover machines, browse folders, read text and transfer files.
- Private transfers over BB's existing host connection, with chunked delivery and SHA-256 verification.
- Native settings cards for each machine: Off, Selected folders, or Full computer. Choose remote folders without editing JSON.
- Unique destination files: existing files are never overwritten.

Nothing is shared until you configure it. Selected folders mode excludes common credential paths and symbolic links. Full computer mode opens all files readable by BB, including hidden files and credentials, and follows links. Operating-system permissions still apply.

## Beta limits

Requires BB 0.43 or newer and Plugin SDK 0.4.87 or newer. Supports macOS and Linux, files up to 256 MiB, and single-file transfers. No Windows support, recursive folder copies, resumable transfers or arbitrary remote editing yet. Copies persist in the receiving machine's plugin imports folder until you remove them locally.

Website transfers are read-only, up to 32 MiB, and originate from the BB server. FTPS verifies certificates; SFTP verifies a configured SHA-256 host-key fingerprint and supports password authentication. No website uploads or edits. Initial UI labels are Russian.
