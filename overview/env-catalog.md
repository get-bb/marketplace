## Keep credentials in one place across all sessions and machines

Store external API keys, service tokens, and secrets in a single encrypted catalog. When agents need a key for an API call, script, or framework, they check the catalog instead of stopping the turn to ask for credentials. Newly provided keys can be saved automatically for future sessions.

## Encrypted storage with instant synchronization

All values are encrypted at rest using AES-256-GCM. Because data is stored in SQLite on the BB server, every session on every connected machine (primary host, remote Mac, or Linux servers) has immediate, synchronized access to the same credentials without manually copying `.env` files around.

## Dedicated agent tools and automatic instructions

The plugin equips every BB agent with four native tools:
- `env_list`: Discovers available variable names and services while omitting raw values to preserve context tokens.
- `env_get`: Retrieves a decrypted secret value on demand.
- `env_set`: Stores newly provided keys with optional service tags and usage notes.
- `env_delete`: Removes obsolete secrets.

A lightweight system instruction (~50 tokens) is automatically provided to agents at the start of each session, ensuring they check the catalog before prompting the user for credentials.

## Visual management and bulk operations

Open **Env Catalog** in the BB left sidebar to inspect and manage your stored secrets:
- Search and filter keys by name, service tag, or note.
- Masked display (`••••••••`) with one-click reveal and clipboard copy.
- Clean modals for adding or editing credentials.
- One-click bulk export and import in standard `.env` format.
- "Sync Machine Env" button to decrypt and migrate existing BB Machine Environment variables in one step.

## Command-line access

Manage credentials from your terminal on any enrolled host:
- `bb env-catalog list`: Print all stored keys with masked values.
- `bb env-catalog get <NAME> --raw`: Output the decrypted secret for shell pipelines.
- `bb env-catalog set <NAME> <VALUE>`: Create or update a secret.
- `bb env-catalog export --format env`: Export secrets directly to `.env`.

[Documentation and source](https://github.com/VKirill/bb-plugin-env-catalog)
