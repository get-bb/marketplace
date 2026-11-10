## What you get

Minimap is a scrollbar you can read. It puts a strip along the right edge of each thread, drawn like VS Code's minimap: one rectangle per message, as tall as the message, coloured by who wrote it. A slider marks the part you are reading.

- Drag the slider to scrub through the thread, click anywhere on the strip to jump there, or scroll the wheel over it.
- Your messages are light grey and right-aligned, as wide as the bubble. Agent replies are grey, work is amber, errors are red and system notes are faint, so a long thread shows where you asked something, where the agent worked for a while and where something failed.
- Hover a rectangle to see the start of its message in a note beside the strip, which slides from row to row and points at the rectangle, outlined in its own colour.
- The strip is drawn to scale, so its slider sits where the scrollbar's thumb would. On a very long thread your messages and errors are painted on top and stay at least two device pixels tall.

## The scrollbar

BB's scrollbar fades out and is thin to grab, so Minimap switches it off while the strip is there. Turn off **Replace the scrollbar** to keep both, and **Always show the scrollbar** stops BB fading it. BB's thread-index button is removed by default; turn **Hide the thread-index button** off and it sits just left of the strip. A thread with nothing to scroll gets no strip.

## Settings

Pick **Minimap** in a thread's actions menu. A settings panel opens over the chat, so you can watch the strip change as you edit, with four tabs:

- **Behaviour**: showing the strip, the thread-index button, the hover preview, short threads, and loading the whole history.
- **Strip**: the scrollbar, width (6 to 120px), opacity, fading when the pointer is elsewhere, and narrow windows.
- **Blocks**: a colour and an on/off switch for each kind of rectangle.
- **Slider**: the slider's corners, thickness, opacity and colour.

Sliders and colours preview on the strip as you drag. **Reset all** asks twice before it puts everything back.

## Narrow windows

The full strip needs about 920px of thread width. On a narrower window it drops to a narrow width (12px by default) and may overlap the edge of the message column; turn off **Keep on narrow windows** to get BB's scrollbar back there instead.

## Requirements and costs

- BB 0.49 or later.
- It reads the thread's timeline through BB's plugin SDK: the newest page first, older pages only as BB loads them, and only what changed while a turn is working. It reads nothing while the strip is not shown or the tab is in the background. **Load the whole history** fetches every older page up front and is off by default.
- No external service or account is used.
- It relies on BB's timeline layout, which is not a documented interface, so a future BB release may need a plugin update.
