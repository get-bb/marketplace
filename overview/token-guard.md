Pasted an API key into a chat? It now sits in plain text in your agent history. Token Guard stops the next one before it is sent and shows you the ones already there.

## What you get

- Messages containing a credential in text or a BB-uploaded UTF-8 or BOM-marked UTF-16 text attachment are rejected before dispatch. Attachments are uploaded to BB before this check.
- A Token Guard page scans Claude Code, Codex, and BB history in one click.
- A report with the kind of each credential, a fingerprint, where and how often it appears, and a link to revoke it.

## How it works

Detection runs on your BB server. The guard does not show, log, or store matched values. BB stores an attachment when it is uploaded, before the guard checks it. Only formats with a distinctive prefix are recognized, so false blocks stay rare. The guard checks uploaded UTF-8 or BOM-marked UTF-16 text files without NUL bytes, not images, PDFs, office documents, archives, other binary files, or absolute runtime paths. It does not scan other enrolled machines. A failed attachment read blocks dispatch. BB's explicit Send-now override for queued messages bypasses dispatch hooks.
