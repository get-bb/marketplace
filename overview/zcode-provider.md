## What you can do

Bring your individual Z.ai GLM Coding Plan into bb while ZCode handles the
native coding work. Choose GLM-5.3 or GLM-5.3-Flash and the reasoning levels
offered by your account catalogue; unavailable selections have no fallback.

Work with files and terminal tools, continue saved sessions, stop a turn,
compact context manually and send guidance during an active turn, including
a long-running command. Use native ZCode skills, bb append instructions and
bb-only skills. Native agents are available; `Disable provider subagents`
controls them. Tool exclusions support whole native tool names.

Configured MCP servers come from Desktop; complete their first OAuth sign-in
there. Memory follows the Desktop preference, with `ZCode memory fallback`
when that preference is unavailable.

## Attachments

Available: PNG/JPEG/GIF/WebP images up to 10 MiB and UTF-8 text files up to
256 KiB. Flash read an attached table directly in the checked combination;
GLM-5.3 reported only its path in bb and Desktop. A checked GLM-5.3 workflow
used native Read and ZCode's image analyzer. Acceptance does not establish
direct image perception for every model or format.

Rejected: PDF, binary files and remote image URLs. Planned, not yet available:
PDF attachments, larger text files and other formats; no delivery date.

## Requirements and limits

macOS on Apple silicon, bb 0.47.1+, Git (Xcode Command Line Tools), installed
ZCode Desktop and an individual Z.ai Coding Plan sign-in are required.
Checked native runtime: bb 0.48.0 / installed SDK 0.6.94 / host Node 24.22.0 /
Desktop 3.16.3 / CLI 0.17.0, retained from v0.1.x; also bb 0.47.1 / SDK 0.6.79 / host Node 24.22.0 / Desktop 3.15.1 /
CLI 0.16.9, individual Lite plan. Other combinations need verification.
bb supplies Node and build tools; no global npm, Python or Homebrew is needed.
Browser Use is unsupported; Computer Use is not established.

Use Full permissions. Native tools have your account's access to the real
HOME, environment and shared Desktop store; bb sessions/history/logs are
separate. Native ZCode may refresh shared tokens. The plugin does not write
Desktop settings or CLI config. Rejected sign-in requires signing in again
in Desktop; real stored-token expiry is unmeasured.

After automatic compaction, the rest of that turn can lack the full bb
instruction/skill block; the next ordinary turn restores it. New instruction
or skill metadata needs a new session. Queued guidance can be lost on
disconnect. Check an uncertain send before retrying; it is not replayed
automatically. Configured-hook behavior is not live-proven.

## Getting started

Version: `v0.2.0`, ZCode Provider (ID `zcode-provider`). In Settings → Installed
plugins → New plugin options → Install from source, paste
`git:https://github.com/emlevsky777/bb-plugin-zcode.git@^0.2.0` and confirm.
The CLI uses `bb plugin install` with the same source. Complete sign-in in
Desktop, leave `ZCode sign-in source` at `desktop`, then select ZCode Provider in a
new thread. Our v0.1.x users need a fresh install and new threads; settings
and sessions are not migrated. Verify the new install, then disable the old
`zcode` installation. Old threads are unsupported by the new provider.
Stop all ZCode threads and background work before updates/removal.

## Help

Open new tab → Start terminal in a bb thread and run `bb zcode-provider-report`,
`bb zcode-provider-report --json` or `bb zcode-provider-report --help`. Reports are server-local,
exclude secrets/session contents/personal paths and upload nothing; they do
not prove sign-in readiness or diagnose remote hosts.

Unofficial; unaffiliated with Z.ai, ZCode or bb. Review account terms and trust
before use. Never share raw logs or credentials. Apache-2.0.

[Installation, update, removal and limits](https://github.com/emlevsky777/bb-plugin-zcode#readme)

[Report an issue](https://github.com/emlevsky777/bb-plugin-zcode/issues)
