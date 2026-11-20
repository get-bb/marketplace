Codex Quota shows how much of your OpenAI Codex quota is left and when each limit resets. Select Codex and an existing machine in BB to check your quota before sending the first message.

## Check your limits

The teal ring sits beside the context meter in Codex chats and side chats, and above Settings in the left sidebar. On a phone, tap the ring in the chat composer or above Settings in the open sidebar. Hover over or tap the ring for each reported limit and its reset countdown. In the Plus screenshot, 78% of the five-hour quota and 46% of the weekly quota remain. The ring shows **46%**. A **?** means it is waiting for current data.

Click to close the preview or click again to reopen it. **Enter** or **Space** toggles the card with the ring focused. **Esc** closes it.

The lightning bolt shows how many manual resets are available. Hover over it or tap it to see their expiry dates without using a reset.

## Settings and setup

The gear beside the plan name opens the refresh interval and the **In chat** and **In sidebar** switches. By default, usage refreshes every two minutes on a visible page and when you hover over or press the ring. In **Settings → Installed plugins → Codex Quota**, you can change those triggers or choose **English** or **Русский**.

Requires BB 0.49+, Plugin SDK 0.6.132 or later in the 0.x series, and BB’s built-in Codex provider. Sign in to Codex CLI on the chat’s machine with a ChatGPT plan that includes Codex.

Quota data comes from BB’s Codex provider. The plugin reads the number of manual resets from Codex CLI on the same machine when quota loads or refreshes. It reads no credentials and sends no telemetry.

[Source and installation](https://github.com/ai-babai/bb-plugin-codex-quota) · [Codex Quota on popkov.dev](https://popkov.dev/en/apps/#codex-quota)
