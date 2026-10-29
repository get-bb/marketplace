## What you get

While you scroll a thread, a bar stays pinned to the top of the timeline. The right half shows the message you are reading under, and the left half shows the latest agent reply above that point. Click either half to scroll to that message, which lands just below the bar. Blank halves fade out when there is nothing above them.

Long threads stay oriented: you always see which question you are in the middle of and what the agent last answered, without scrolling back up to check.

## Turn status and counter

- While a turn is running, your message and its reply pulse. A dot on the reply marks a turn that failed or was interrupted.
- A counter such as `7/23` hangs just outside your message, showing which turn you are on. It is left out when the thread view is under 840px wide.
- Hovering a message the bar cut short shows its full text in a tooltip, on devices with a pointer that can hover.

## Settings

**Pinned turns** in a thread's actions menu (⋯ in the thread header, or a sidebar row's menu) holds a switch for the bar and for each option above, plus a debug log for the plugin log; a check marks the ones that are on. You can hide it from thread menus on the plugin's page in BB settings.

## Requirements

- BB 0.48 or later.
- It reads BB's timeline layout, which is not a documented interface, so a future BB release may need a plugin update.
- Jumping never changes the page URL or the back button's history.
- No external service or account is used.
