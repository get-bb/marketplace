## What you get

Open a file in BB and edit it in a CodeMirror 6 editor. Save the buffer with the
toolbar button or `Cmd+S` / `Ctrl+S`; edits stay unsaved in the buffer until you
save.

If the file changed on disk since you loaded it, the save stops and asks
whether to keep the disk version or write your draft. **Undo** restores the
discarded draft and re-arms the conflict decision.

Find with `Cmd+F` / `Ctrl+F`, plus folding, bracket matching, multiple
selections, rectangular selection, and indent on input.

Colors follow your active BB code theme, including light, dark, and custom
palettes. Files that are not UTF-8 text or are larger than 8 MB open in BB's own
preview.

## How it works

The plugin registers a file opener for common code, configuration, and script
extensions such as JavaScript, TypeScript, Python, Rust, Go, JSON, YAML, TOML,
and SQL. When several openers claim the same extension, the first in slot order
wins and an installed plugin wins over a bundled one. Change the opener per
extension in Settings then File openers, or right-click a file link for Open
with.

BB renders Markdown and HTML with its own Preview/Raw toggle, so those stay with
BB unless you pick this editor through Open with. There is no language server,
so go-to-definition, find-references, and type checking are not available.

## Requirements

Install the plugin in BB 0.50 or later. The editor runs in the BB app and reads
and writes files through BB's file APIs; it makes no outside network requests.
