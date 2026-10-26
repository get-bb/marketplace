## What you get

Ten settings, five for the interface and five for code: font family, size, line height, bold weight, and OpenType features. Every field starts empty and keeps the theme value until you fill it. Changes apply in every open bb window as soon as they save.

## How it works

Interface size sets the base text size, and the theme's other text sizes scale by the same ratio, so headings and small labels keep their proportions. Interface line height targets chat and markdown text, and every other theme line height scales with it. Code settings reach inline code, code blocks, the source viewer, and diffs.

Features accept CSS syntax such as `"ss01", "cv11" 2` or a shorthand such as `ss01 cv11=2 liga off`. Code text does not inherit interface features.

A Preview section under the settings renders a chat message and a source file with bb's own renderers, so you see the result before you leave the page.

## Settings from the command line

The same values work with `bb plugin config typography set uiFont "Inter Display"`, and an included agent skill lets an agent change them for you.

## Requirements

The fonts must be installed on the device that displays bb; the plugin has no font picker and downloads nothing. bb's built-in Inter ships without stylistic sets, so `ss` and `cv` features need a full Inter install or another font that has them. Bold weight inside syntax-highlighted code in the source and diff viewers follows the code theme.
