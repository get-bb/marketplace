An editor for [SOPS](https://github.com/getsops/sops)-encrypted files, inside BB.

Open **Encrypted files** in a thread's side panel to see the SOPS files in
that thread's repo. Click one to open it: the plugin decrypts it, you edit it,
and saving encrypts it again with the same keys.

## What it does

- Lists the repo's SOPS files: `.env`, YAML, JSON and INI.
- Shows `.env` files as a table of settings, other files as text.
- Hides values until you choose to show them.
- Shows what changed before saving.
- Re-encrypts only the values you changed, so git diffs stay small.
- Refuses to save if the file changed on disk after you opened it.

## Requirements

sops installed, and a key it can decrypt with: the same setup you use in a
terminal. If the repo pins sops with mise, that version is used.
