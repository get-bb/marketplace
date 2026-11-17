## What you get

- One tab per visible sheet, with column letters and row numbers that stay in view while you scroll.
- Values appear the way Excel saved them: currency, percentages, and dates keep their number formats, and numbers are right-aligned.
- Merged cells, column widths from the file, and hidden rows, columns, and sheets are respected.
- Hover a cell to see its formula and any cell note. A formula with no saved result, common in files written by scripts and agents, shows its formula text instead of an empty cell.
- Right-click a column letter to freeze the columns up to it, so labels stay in view while you scroll right. Each sheet keeps its own frozen columns while the file is open.
- The grid uses your BB theme's colors and switches with light and dark mode. The file's own cell fills are not drawn.

## Formats and limits

Opens `.xlsx`, `.xlsm`, `.xlsb`, `.xls`, and `.ods`. Each sheet shows its first 2,000 rows and 200 columns, and a footer says how much was left out. Files over 25 MB show a notice instead of a preview. This is a read-only view: formulas are not recalculated, macros never run, and charts and images are not shown.

## Default opener

On install, Excel Preview becomes the opener for those five extensions in each browser, the first time BB loads there, for any of them you have not already assigned. It never replaces a choice you made. Change it under Settings → File openers, or right-click a file link and pick Open with.

## Requirements

BB 0.43 or later. No account or external service. Parsing uses SheetJS Community Edition, bundled with the plugin.
