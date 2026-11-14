## Plans and models

Choose **ZCode CLI** in a BB chat, then select a Coding Plan, Start Plan or personal API model. Source names stay visible in the model picker. Start Plan is ZCode's free plan; its models appear when the account has a verified, positive, unexpired balance. Coding Plan requires a paid subscription. Personal API connections use the providers and billing already configured in ZCode.

## Installation and updates

Open the plugin settings and choose the computer running the agent. The Rust ACP panel shows the current and latest stable versions, with Install, Check for updates and Update controls. Downloads come from the separate [zcode-acp releases](https://github.com/ichinya/zcode-acp/releases), with SHA-256 and version checks. You can also use an executable from PATH or a custom path.

## Quotas and permissions

Provider usage shows Coding Plan and Start Plan quotas separately for each computer. Reasoning and permissions are selected in the chat. Accept edits and Full modes map to ZCode's native permission modes, and tool approvals stay in BB.

## Requirements

Requires BB 0.49+ and ZCode Desktop installed and signed in on the agent computer. Windows and macOS are supported; the adapter reuses ZCode's bundled runtime, so a separate Node.js installation is optional. The adapter reads existing Desktop sign-in and keeps its sessions separate. It does not modify the installed ZCode application or its credential files.

This is an unofficial integration, unaffiliated with Z.ai, ZCode or BB.

[Installation and configuration](https://ichinya.github.io/bb-plugin-zcode/en/) · [Документация на русском](https://ichinya.github.io/bb-plugin-zcode/ru/)
