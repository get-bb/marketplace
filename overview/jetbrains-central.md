**This is an unofficial plugin developed independently by an enthusiast. It is not an official JetBrains product.**

## What are JetBrains Air and Central?

[JetBrains Air](https://www.jetbrains.com/air/) is JetBrains' platform for working with AI coding agents. It also gives organizations a way to manage access to models and agents, permissions, and AI spending across teams.

[JetBrains Central CLI](https://www.jetbrains.com/help/central-cli/quickstart.html) is a command-line proxy that connects supported coding agents through your JetBrains Account and its available AI access. You select the organization or AI license to use. This plugin brings that access into BB, so work threads can use your organization's AI allowance while personal threads keep their own providers.

## Work and personal accounts

Choose Codex JetBrains Air, Claude Code JetBrains Air, or Pi JetBrains Air when starting a work thread. Each appears alongside your personal providers with a distinct JetBrains and agent icon. Personal providers remain available, and selecting a work provider is explicit.

## Shared Central credits

See remaining Central credits in work threads, with balance details and a manual refresh action. Enable BB's built-in Provider usage plugin to see the shared allowance for each machine in the sidebar. Main and top-up balances are separate. Credits are shared across Central profiles on that machine; they are not the cost of an individual thread.

## Routing and additional agents

Agent processes launch through JetBrains Central using its active access source. Central manages authentication and organizational connection settings. A Central failure does not fall back to a personal account. Codex uses its own configuration directory.

Add ACP profiles for other agents that Central supports and whose CLI provides ACP over stdin/stdout. The plugin does not install agents or add support for arbitrary agents to Central.

## Requirements and compatibility

Requires BB 0.48 or newer with Plugin SDK 0.6.104 or newer, Node.js, JetBrains Central with an active work subscription or organization-provided AI access, and the CLI of each agent you use. Git is required on the BB server for installation from GitHub. Set up Central on every machine that runs work threads.

The plugin has been tested on macOS. It adapts BB's bundled provider bridges, so BB updates can require compatibility fixes. Built-in provider subagents and native memory are disabled for work profiles. Windows has not been verified.

[Setup and configuration](https://github.com/SergeyZh/bb-plugin-jetbrains-central#requirements-and-installation)
