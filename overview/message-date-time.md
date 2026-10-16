See when every message in a thread was written. Message Date & Time puts a
small date-and-time line above each message, yours and the agent's.

## What you get

- "Today, 2:34 PM", "Yesterday, 22:10", "Oct 3, 9:15 AM" above each message;
  older messages also show the year.
- Your messages are labelled on the right, the agent's on the left.
- English or Russian, a 12-hour or 24-hour clock. By default the plugin
  follows your computer: the 24-hour time switch in macOS settings, otherwise
  the region, so an English interface in Germany shows 14:30 and in the US
  2:30 PM.
- Labels switch from "Today" to "Yesterday" after midnight without a reload.

## Settings

Settings > Plugins > Message Date & Time: Language (System, English, Русский)
and Time format (System, 12-hour, 24-hour).

## How it works

BB keeps the time of every message but shows it only in the message menu.
The plugin reads that time from the rendered chat and draws it with CSS. It
does not change messages and sends nothing anywhere. Times are shown in your
computer's time zone, and a time-zone change shows up within a minute.

A future BB update can change the chat's internal layout. The labels may then
disappear until the plugin is updated; the chat itself keeps working.
