## What you get

- A **Skiff VM** entry in the environment picker: a fresh Ubuntu 24.04 VM with a checkout of the
  project, booted by [skiff](https://github.com/sovyn-eu/skiff) and enrolled as a bb machine.
  Agent, shell, package installs, git and the bb daemon all run inside the VM.
- Credentials that stay on the Mac. Claude Code and git in the VM talk to the skiff broker,
  which swaps placeholder tokens for the real ones from the macOS Keychain.
- Suspend and resume through bb, and a `bb skiff` command to inspect the VMs.

## How it works

The plugin is a bb machine provider on top of the skiff CLI: `skiff new` boots the VM, a
provision script installs Node, the GitHub CLI and Claude Code (pinned versions, checked against
the publishers' SHA-256 sums), bb enrolls its daemon over `skiff exec`, and `skiff tunnel` keeps
the broker reachable. Archiving the thread removes the VM. A periodic sweep collects VMs that a
failed launch left behind; VMs you create by hand are never touched.

## About skiff

[skiff](https://github.com/sovyn-eu/skiff) is an open-source (Apache-2.0) command-line tool
for throwaway Linux VMs on Apple Silicon, one per task or coding agent. Each VM is its own
Virtualization.framework VM, driven by Apple's `container` CLI, with its own kernel, disk, IP and
root SSH; the boot itself takes about half a second. Its broker keeps credentials on the Mac,
serves MCP servers to the VMs and writes an audit log. skiff also works on its own, outside bb:
see the [skiff website](https://sovyn-eu.github.io/skiff/).

## Requirements

- Apple Silicon and macOS 26.
- [skiff](https://github.com/sovyn-eu/skiff), prepared once with `skiff prepare`, plus
  `skiff secret set claude-token` and `skiff secret set github-token`. Use a fine-grained GitHub
  token limited to the repositories agents should work on.
- A project with a Git remote the VM can clone.
- A bb server access the VM can reach, such as bb Connect. The VM cannot reach the Mac over the
  local network.
- bb's own GitHub forwarding turned off with
  `bb settings general machineGitCredentialsEnabled false`. Skiff VM refuses to boot a VM while
  it is on, so no real token reaches the guest.
