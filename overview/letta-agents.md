## Local Letta agents in your sidebar

Browse a local Letta roster with avatars and activity indicators, then start or resume chats through BB's ACP adapter. This plugin connects existing infrastructure; it does not install Letta or provision workspaces.

## Setup you must supply

Requires BB **>=0.46**, Plugin SDK **>=0.6.49** (development pin **0.6.49**), and the enabled ACP adapter **`bb--provider-acp-next`**. These are declared version constraints, not a tested-version matrix.

Set **`projectId`**, **`hostId`**, and **`environmentProviderId`** to existing IDs in your installation. All three default to empty and are required for a new chat. `personal-workspace` is only an example provider where installed.

The plugin backend needs local Docker access and a running letta-code container with Node. The default container is `letta`; `dockerExecutable` defaults to `docker` and accepts an executable, not a shell command. The container paths are fixed:

- `/root/.letta/lc-local-backend/agents/*.json` for roster records.
- `/root/.letta/app-server.token` for authentication.
- `/root/.letta/lc-local-backend/avatars/<agent-id>-128.png` for optional avatars.

The ACP execution host needs Node/npm with `npx` and access to the Letta app-server. `appServerUrl` defaults to `ws://127.0.0.1:4500`, interpreted from that host. Roster reads still require local Docker even if the endpoint is remote.

Generated entries run **`npx -y @letta-ai/letta-acp@0.1.10`**, pinned because **0.1.11 has a known stream hang**. Modern versions have not been established as tested; the pin is not a claim that every newer version fails.

## Trust and permissions

**Docker socket/daemon access is administrator-level trust.** Use trusted containers and operators. The token is stored **in plaintext in ACP `customAgents` settings**, passed through the process environment, not process argv. Plugin logs and surfaced command errors withhold credentials; this is not encrypted secret storage. Protect settings, backups, and host access.

Use `ws://` only on a trusted local network; use `wss://` outside it. TLS is not enforced by the plugin.

Defaults are Letta **`standard`** and BB **`auto`** approvals. `allowUnrestricted` explicitly opts into Letta **`unrestricted`** and **`full`** permissions for new BB threads. Existing threads preserve their BB permissions. Providers absent from the roster retain their settings, including unrestricted permissions, until explicit cleanup; toggling the setting is not global revocation.

## Stable identity and conservative updates

Immutable roster IDs determine identity. A persisted historical provider-ID mapping preserves existing providers, including older name-based IDs; agent renames do not force provider renames. Unrelated ACP entries are never intentionally removed. Providers for removed agents are deliberately retained for **manual cleanup** after checking thread dependencies.

Syncs re-read settings before writing and reject detected changes, but the public API has **no compare-and-swap (CAS)**. Cross-plugin or manual edits can still race between the final read and write; avoid simultaneous adapter-settings changes. Failed refreshes can show a cached roster with a warning, not a guarantee of chat readiness.

## Compatibility and current limits

Provider-picker hiding is a **DOM/CSS compatibility workaround**, not an upstream supported hide API or an access-control mechanism. Display-name collisions with unrelated providers fail open, leaving entries visible. BB markup changes may break hiding. `showAgentsInProviderPicker` disables the workaround while providers stay enabled.

The implementation depends on the local container layout, adapter settings, and experimental BB sidebar surfaces. **Exact clean-install and end-to-end live chat/streaming checks are still pending.** No release, publication, or fully tested compatibility claim is made here.
