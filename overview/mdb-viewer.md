## What you get

- **Tables** with row counts, and every column with its Access type: Short Text, Number, Currency, Date/Time, Yes/No, AutoNumber, OLE Object, Attachment and the rest.
- **Exact values**: Currency and Decimal as exact decimals, multi-value fields as lists.
- **ER diagram** of the relationships defined in Access.
- **Saved queries** with their SQL, shown rather than run.
- **SQL tab** for read-only `SELECT` and `WITH` queries in DuckDB's SQL.

Files from Access 97 to Access 2024 and Microsoft 365 open. A database encrypted with a password asks for it in the tab and does not store it. Forms, reports, macros and VBA modules are not shown.

If another plugin opens these files instead, choose this viewer under Settings → File openers in bb.

## Agents

In a Claude Code or Codex thread, the agent gets three tools: `mdb_list_tables`, `mdb_describe_table` and `mdb_run_select`. They work on the file open in the viewer, read-only, and return at most 100 rows a query.

**Ask AI** puts a question about the open file into the thread's message box, for you to send.

## Where the file goes

Nowhere. bb streams the file from the machine that holds it into the panel, where the viewer reads it and DuckDB, compiled to WebAssembly, runs the SQL.

The plugin calls one outside service. With a DBConvert API key set, it asks the DBConvert licensing service which PRO features the account has.

## Free and PRO

Viewing, SQL and exporting up to 10,000 rows as CSV, JSON or Parquet are free. DBConvert PRO ($9 a month) adds diagram export to PNG and SVG, and exporting a whole result.

To unlock PRO, enter the API key from https://streams.dbconvert.com/account in the plugin's settings.

## Also available

The same viewer runs in VS Code, in Chrome and on the web: https://streams.dbconvert.com/mdb-viewer
