## What you get

- **The whole set from one file**: a `.dbf` brings its memo (`.fpt` or `.dbt`) and index (`.cdx`); a `.dbc` brings its `.dct`, `.dcx` and every table it names, each with its own memo and index.
- **Tables** from dBase III and IV, FoxPro 2 and Visual FoxPro, with every column's FoxPro type.
- **From a `.dbc`**: long table and column names, primary keys, and relations drawn on the **Diagram** tab.
- **Index tags** from the `.cdx`, with their expressions.
- **SQL tab** for read-only `SELECT` and `WITH` queries in DuckDB's SQL.

Deleted rows are hidden, as FoxPro hides them. A missing memo file does not stop the table: its memo columns load empty and are named.

If another plugin opens these files instead, choose this viewer under Settings → File openers in bb.

## Agents

In a Claude Code or Codex thread, the agent gets three tools: `dbf_list_tables`, `dbf_describe_table` and `dbf_run_select`. They work on the file open in the viewer, read-only, and return at most 100 rows a query.

**Ask AI** puts a question about the open file into the thread's message box, for you to send.

## Where the file goes

Nowhere. bb streams the file from the machine that holds it into the panel, where the viewer reads it and DuckDB, compiled to WebAssembly, runs the SQL.

The plugin calls one outside service. With a DBConvert API key set, it asks the DBConvert licensing service which PRO features the account has.

## Free and PRO

Viewing, SQL and exporting up to 10,000 rows as CSV, JSON or Parquet are free. DBConvert PRO ($9 a month) adds diagram export to PNG and SVG, and exporting a whole result.

To unlock PRO, enter the API key from https://streams.dbconvert.com/account in the plugin's settings.

## Also available

The same viewer runs in VS Code, in Chrome and on the web: https://streams.dbconvert.com/dbf-viewer
