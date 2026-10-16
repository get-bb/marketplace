Click a markdown table in a thread to read it full width.

bb widens markdown tables past the message column so wide ones have room. This plugin adds the other half: any table can open in a dialog sized to the window, the same way images and Mermaid diagrams already expand.

## What you get

- **Click to expand.** Click anywhere on a table, or the expand button that appears in its top-right corner on hover. The dialog shows a copy of the table at the window width, with cells wrapping and both axes scrolling when it is still too big.
- **Gets out of the way.** Clicks on links, buttons and inputs inside a table do what they normally do, and selecting text doesn't open the dialog. Cmd-, Ctrl- and Shift-clicks are ignored too.
- **Easy to close.** Esc, the close button or a click on the backdrop.

## Keep tables in the column (optional)

If you'd rather tables never break out of the message column, add this to your theme or **Settings → Appearance → Custom CSS**. Wide tables then scroll sideways in the column, and the dialog gives them full room:

```css
[data-markdown-preview] div.my-2.flex.justify-center:has(> div.overflow-x-auto > table) {
  width: 100% !important;
  margin-inline: 0 !important;
  justify-content: flex-start;
}
```

## Caveats

This is a content script that finds tables by bb's markdown markup (`[data-markdown-preview] div.overflow-x-auto > table`), so a bb release that changes that markup can break it until the plugin is updated. Upstream request: [get-bb/bb#1705](https://github.com/get-bb/bb/issues/1705).
