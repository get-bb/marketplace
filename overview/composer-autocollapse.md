# Composer Auto-collapse — overview

**A tidier prompt box that never eats your draft.**

BB keeps the prompt box open long after you have stopped using it. Composer Auto-collapse closes it when you click elsewhere or leave it idle, using BB's own collapse control so drafts, attachments and focus behaviour stay native.

## What it does

- Collapses on focus-out after a short, configurable delay.
- Ignores clicks in the editor, toolbar, model picker, typeaheads and portal menus.
- Collapses idle composers only while focus is still inside and the draft is empty (or the tab is hidden).
- Applies setting changes live and removes all listeners and timers when disabled.

## What it does not do

- It does not clear, move or store drafts.
- It does not touch the composer layout or host styling.
- It does not run while the composer is already collapsed.

## Compatibility

BB 0.49.0+ (plugin SDK 0.6.132+), Node 22.19+ for development. Rendered-visibility checks keep CSS-hidden composer trees from being collapsed. If the composer markup changes, the plugin stays inert.

## Privacy

Six local settings, no telemetry, no prompt content read beyond an emptiness check.
