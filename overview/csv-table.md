## What you get

- A **CSV table** file opener for files with the `csv` extension.
- The first row becomes the header. Click a heading to sort ascending, click again for descending.
- A filter box that requires every word you type to appear somewhere in the row.
- A **Columns** button that adds a filter under each heading. Row and column filters combine, and **Clear** resets them.
- Pages of 100 rows with Previous and Next buttons, a row count, and the detected delimiter shown in the toolbar.
- A **Built-in preview** button that switches to BB's own preview of the same file, and **Show table** to come back.

## How it works

The file is read through BB's file API from a workspace, a host path, or thread storage. Paths inside a workspace or thread storage must stay inside their folder. The table is read-only: it never edits or saves the file.

The delimiter is picked from the header line only. Commas, semicolons and tabs are counted outside quotes, and the most frequent one wins (comma on a tie). Quoted fields may contain delimiters and line breaks. Blank lines are skipped, short rows are padded with empty cells, and a row longer than the header adds columns named `Column N`.

## Limits

- Files larger than 2,000,000 bytes are not opened as a table.
- Text must be UTF-8. A file with null bytes or invalid UTF-8 is refused.
- The table shows at most 5,000 data rows and 100 columns, and a note says when it stopped early.
- Duplicate or empty headings are renamed, for example `Name (2)` or `Column 3`.

## Requirements

- bb 0.49 or newer.
- The interface text is in English.

## First step

Open a `.csv` file from the file panel. If another opener is pinned for `csv`, choose **CSV table** under Settings → File openers or in the file link's **Open with** menu.
