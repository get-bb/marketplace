## What you can do

Work on code with your individual Z.ai GLM Coding Plan while ZCode handles
the native coding work. Choose models and reasoning levels from your account
catalogue; unavailable selections have no fallback.

Use files and terminal tools, continue saved sessions, stop a turn, compact
context manually and send guidance during active work. Use native ZCode
skills, bb append instructions and bb-only skills. Native agents follow
`Disable provider subagents`; tool exclusions support whole native tool names.

Configured MCP servers come from Desktop; complete their first OAuth sign-in
there. Memory follows the Desktop preference, with `ZCode memory fallback`
when that preference is unavailable.

## Attachments

Attach PNG/JPEG/GIF/WebP images up to 10 MiB and UTF-8 text files up to
256 KiB. Image interpretation depends on the native model; acceptance does
not establish direct image perception for every model or format.
PDF, binary files and remote image URLs are rejected. PDF, larger text files
and other formats are planned, with no delivery date.

## Requirements and limits

macOS on Apple silicon, bb, Git, installed ZCode Desktop and an individual paid
Z.ai Coding Plan are required. bb supplies Node and build tools; no global
npm, Python or Homebrew is needed. Browser Use is unsupported; Computer Use
is not established.

Use Full permissions. Native tools have your account's access to the real
HOME, environment and shared Desktop store. bb sessions, history and logs are
separate. Native ZCode may refresh shared tokens. The plugin does not write
Desktop settings or CLI config. Rejected sign-in requires signing in again
in Desktop; real stored-token expiry is unmeasured.

Automatic compaction can leave the rest of that turn without the full bb
instruction/skill block; the next ordinary turn restores it. New instruction
or skill metadata needs a new session. Queued guidance can be lost on
disconnect. Check an uncertain send before retrying; it is not replayed
automatically. Configured-hook behavior is not live-proven.

## Getting started

Sign in through ZCode Desktop, install ZCode Provider in bb, leave
`ZCode sign-in source` at `desktop`, then select it in a new thread.
Stop ZCode threads and background work before updating or removing.

[Compatibility, checked versions and installation](https://github.com/emlevsky777/bb-plugin-zcode#compatibility)

[Capabilities, attachment behavior and limits](https://github.com/emlevsky777/bb-plugin-zcode#capabilities-and-limits)

## Help

In a bb thread terminal, run `bb zcode-provider-report` or add `--json` for a
shareable server-local report. It excludes credentials, personal paths and
session contents and uploads nothing; it does not establish sign-in readiness
or diagnose remote hosts.

Unofficial; unaffiliated with Z.ai, ZCode or bb. Review account terms and trust
before use. Never share raw logs or credentials. Apache-2.0.

[Report an issue](https://github.com/emlevsky777/bb-plugin-zcode/issues)
