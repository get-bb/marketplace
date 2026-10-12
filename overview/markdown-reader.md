## Read without scanning Markdown syntax

Markdown source mixes document content with formatting syntax. In a long file, finding a section means scanning through both.

Markdown Reader provides formatted Preview, exact Raw text, and heading navigation in the same read-only BB file tab. Read the document, jump to a heading, and check its source without editing the file.

Open live `.md` and `.markdown` files from a workspace, a connected host, or thread storage. Preview shows headings, lists, tables, read-only task lists, quotes, and fenced code. A leading YAML frontmatter block stays out of Preview.

Use Outline to move between headings. It sits beside the document when the reader is wide and uses an On this page disclosure in narrower panels. Heading links and footnotes move within the open reader.

## Preview and Raw

Switch to Raw to see the complete loaded text, including frontmatter, line endings, and code spaces. Raw is read-only. Switching views does not read or write the file.

Refresh reads the file again. There is no automatic watching. If a refresh fails, the reader keeps the previous content, marks it stale, and offers Retry. Failed or unsupported reads also offer BB's built-in preview.

Supported code fences have syntax highlighting for JSON, JavaScript, TypeScript, Shell, Python, HTML/XML, and CSS. Unknown languages and code blocks over 20 KiB stay plain. Raw HTML does not run.

## Links and images

Supported file and web links use BB's native navigation. Heading and footnote links stay within this reader. Supported local images use source-confined previews. Remote images can contact their image server. Unsafe or unsupported destinations remain inactive or show a readable fallback.

## Requirements and limits

Requires BB 0.45 or newer and a compatible Plugin SDK version from 0.6.15 up to, but not including, 0.7. The plugin uses experimental BB file-opener contracts. Compatibility must be checked when those contracts change.

After installation, choose Markdown Reader with Open with or under File openers. The plugin does not change your opener preferences. It does not replace chat messages, diffs, or Git-snapshot previews.

The reader supports UTF-8 text up to 1 MiB. It does not edit files or require a paid account or a separate service. Reads use BB's SDK on the source host. The size limit bounds reader content, not the transfer from the host to BB's server.

See the [plugin README](https://github.com/koenvg/bb-plugins/blob/main/bb-plugin-markdown-reader/README.md) for installation, source access, and compatibility details.
