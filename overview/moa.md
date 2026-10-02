## Compare two perspectives

Enable MoA in a new or existing chat. Two selected models analyze each message independently and in parallel. Your current chat model receives both answers, evaluates them and performs the task. Each participant keeps a separate session for that chat.

## Inspect each consultation

Hover a message sent through MoA and open its small workflow icon. The modal shows the request, each advisor’s input and answer, and whether the advice reached the acting model. Separate session tabs display the native BB transcripts, including retained fallback attempts.

## Control failures and waiting

Model choices, reasoning levels, fallback settings and the long-wait notice threshold are shared across chats. Enabling MoA is per chat. Choose manual retry, one reserve-model attempt, or continuation with one successful answer when the other participant fails. If neither answers, the request stays queued.

The coordinator observes BB’s native activity state. A long-wait notice does not stop an active model. Turning MoA off returns that chat to ordinary delivery; BB’s explicit Send now also bypasses consultation.

## Read relevant files

Advisors can inspect local files. If the separately installed File Gateway plugin is enabled and running, they can also read remote files through its native tools or CLI, preserving the referenced machine and path. Without File Gateway, external file access is excluded from the advisor policy.

Read-only behavior is a role instruction, not a universal sandbox. Advisors inherit the original message’s BB permission mode, and File Gateway applies its own access policy.

## Requirements and limits

This beta targets BB 0.43.1 and Plugin SDK 0.4.87. Use two different provider/model combinations available through your configured BB providers and accounts. Every consultation adds two model calls, latency and provider usage; fallback can add calls. No separate MoA API key or hosted service is required.

Recent conversation context is bounded, and image pixels are not automatically forwarded to advisors. Do not reload the plugin during a consultation: an interrupted request needs an explicit retry.

[Documentation and source](https://github.com/VKirill/bb-plugin-moa)
