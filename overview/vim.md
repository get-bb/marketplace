## What you get

Use Vim-style editing inside BB's chat composer and supported multiline editors. The plugin adds Insert, Normal, Visual, and Visual Line modes without replacing BB's editor, so attachments, image paste, model controls, voice input, and submission stay native.

## Editing modes

The editor starts in Insert mode for ordinary typing. Press `Escape` to enter Normal mode, then use motions, counts, operators, text objects, character search, document search, yank, paste, undo, and redo. Visual mode supports character-wise selections, and Visual Line mode selects whole lines.

## BB behavior stays intact

Terminals, search fields, command palettes, and plugin surfaces that opt out are excluded. Insert mode leaves native paste and modified Enter shortcuts to BB. The mode indicator sits beside the composer controls, and non-insert modes show a block cursor so the current mode is visible while you edit.

## Requirements

Requires BB 0.41 or newer and BB Plugin SDK 0.4.34 or newer. It does not require an external service, paid account, or separate system install.
