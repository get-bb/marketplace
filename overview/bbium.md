## What you get

Every clickable thing in bb gets a short letter label: sidebar threads, navigation, composer controls, model and project pickers, buttons in the chat. Type the label and bb clicks it. Labels near the top of the screen come first, and most stay one or two letters long. Vim-style keys scroll the chat and bring you back to the composer.

## Keys

Keys work when focus is outside a text field. While the composer has focus, it shows a colored ring and an INSERT badge: keys type text there. Press `Esc` first. bb blurs the composer and the agent keeps running.

- `f` shows hints. Type a label to click the element. Text fields get focus instead.
- `j` and `k` scroll down and up. `d` and `u` scroll half a screen.
- `gg` and `G` jump to the top and the bottom.
- `i` puts the cursor back in the composer.

In hint mode, `Backspace` removes the last letter and `Esc` closes hints. Buttons that bb shows only on hover, such as message actions and the Snooze and Settle buttons on sidebar threads, stay visible while hints are open, and an icon button gets its label on its top edge, so the icon stays visible. Hints follow their targets while the chat scrolls during an agent run. Menus and selects open as they would on a mouse click.

## Settings

- **Vim keys** - turn all keys off.
- **Hint characters** - the letters used for labels, home row first.
- **Scroll step** - pixels per `j` and `k`.
- **Hint theme** - Vimium yellow, the bb accent color that follows light and dark mode, or mono.
- **Custom CSS** - restyle labels with CSS variables for color, font, size, radius and position.

Every setting also works through `bb plugin config bbium`, and the plugin ships a skill that lists every style variable. Ask an agent in any thread to restyle the hints. Changes apply live.

## Limits

Content inside the built-in Browser panel gets no hints. Hints come from the bb page structure, so a bb update can change which elements get a label.
