## Reading the quota ring

Hover over or tap the teal ring beside the context meter in a BB thread. In the compact phone layout, look beside the send controls. The card shows each limit your Codex account reports and when it resets. If 78% of your five-hour quota and 46% of your weekly quota remain, the ring shows 46%.

Click the ring to close the card after hovering. Click again to reopen it. Tap the ring or press **Enter** or **Space** with the ring focused to open or close the card. **Esc** closes it. Usage updates every two minutes by default while the thread is visible. Hovering over or pressing the ring requests a fresh reading. Change the interval and either trigger in the plugin settings. A question mark means the plugin is waiting for current data.

## Setup

Requires BB 0.49+, Plugin SDK 0.6.132 or later in the 0.x series, and BB’s bundled Codex provider. Sign in to Codex CLI on the machine running the thread with a ChatGPT plan that includes Codex. Choose English or Russian in the plugin settings.

Quota windows come from BB’s provider. When the thread loads or its usage updates, the plugin reads the available manual reset count from Codex CLI on the thread’s machine. Hover over or tap the lightning bolt to see when your resets expire. Viewing them never uses a reset. The plugin reads no credentials and sends no telemetry.

[Installation and source code](https://github.com/ai-babai/bb-plugin-codex-quota)
