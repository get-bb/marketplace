## Use a suggested follow-up

After an agent finishes a reply with follow-up prompts, up to five appear above the composer. Click one to put it in your draft, where you can edit it before sending. On Mac, press Option+Return to pick a suggestion. On Windows or Linux, press Alt+Enter. Press the shortcut again to cycle through the options.

## Where suggestions come from

Reply Follow-ups reads suggestions already included in the reply. It supports GenUI `FollowUps` blocks and `next` HTML comments. When GenUI is installed, its in-reply follow-up buttons are hidden while Reply Follow-ups is enabled so the suggestions appear in one place. The plugin uses BB's local storage and makes no extra model requests.

## Requirements

Requires BB 0.50+ and Plugin SDK 0.6.157+. Ask your agent to include follow-up prompts in its replies if it does not already do so.
