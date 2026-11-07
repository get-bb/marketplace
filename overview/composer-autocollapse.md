Composer Auto-collapse closes BB's prompt box when you click elsewhere or leave it idle, using BB's own collapse control so drafts, attachments and focus behaviour stay native. The draft stays in the composer and the box expands again normally.

## What it does

- Collapses on focus-out after a short delay you can set, or turns that rule off.
- Ignores clicks inside the editor, toolbar, model picker, typeaheads and portal menus.
- Collapses an idle composer only while focus is still inside it, after the idle threshold you set. By default that needs an empty draft; a hidden browser tab can also collapse when that option is enabled.
- Applies setting changes live and removes its listeners and timers when the plugin is disabled.

## What it does not do

- It does not clear, move or store drafts, and it does not change the composer layout or host styling.
- It does not read draft content beyond a trimmed emptiness check.
- It does not run while the composer is already collapsed or when the expected composer markup is absent.

## Requirements

BB 0.49.0+ (plugin SDK 0.6.132+). Rendered-visibility checks skip CSS-hidden composer trees. When the expected composer controls are absent, it makes no change.

## Privacy

Six settings stored on the BB server, no telemetry or analytics endpoint, and draft text is used only for an emptiness check, never stored or transmitted.
