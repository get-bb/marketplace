## What you get

- **Orble boxes as bb machines.** Run `bb machine create --provider orble`, or pick **Orble box** in the environment picker. bb starts a box, connects it and runs threads there. In testing, a box went from nothing to a connected runner in about 18 seconds.
- **Suspend and resume.** A runner that has had no starting or active thread for 10 minutes (you can change this) is suspended with its memory kept. Your next message resumes it. You can also suspend or remove a runner from bb.
- **The Orble page.** A sidebar page shows your plan, credit and spend, plus your boxes, snapshots and box networks. From it you can create plain boxes or bb runners, suspend, resume, snapshot, rename, resize and fork boxes. You can also share ports, set outbound allow and deny rules, and manage Orble Secrets. Deleting anything needs its name typed.
- **Keys stay off the box.** Orble Secrets reach boxes only as placeholders, which Orble swaps for the real value on HTTPS requests. On each runner, the plugin writes Pi and OpenCode provider configs that refer to those placeholders by name. Files you have edited yourself are never overwritten.

## How it works

Orble boxes have no public SSH. The plugin opens one SSH tunnel per box through Orble's connect API, so the box's bb daemon can reach your bb server. You don't need Tailscale, bb Connect or a relay. Each box's SSH host key comes from Orble and is pinned. Your API key is stored as a bb secret, reaches the tunnel process through its environment, and is never sent to the browser.

A supervisor checks every 30 seconds. It reopens dropped tunnels, applies idle suspend, and records boxes that Orble suspended on its own.

## Requirements

- An Orble account and API key (orble.tech). Boxes are billed by Orble per second while they run. Secrets need an Orble Pro plan.
- bb 0.45 or later, with `node`, `ssh` and `ssh-keygen` on the bb server's PATH.
- After installing, enter the API key in **Settings → Plugins → Orble** and set **Settings → Machines → Machine access** to **Orble tunnel**.

## Status

Experimental. It uses the same API routes as the `orble` CLI. Orble does not document them, so they can change without notice. Claude Code, Codex and Grok are not configured on runners: sign in to them on the box yourself.
