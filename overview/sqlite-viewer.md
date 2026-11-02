## What you get

- **Schema tree** with row counts, column types, indexes, views and triggers.
- **Data grid** for every table and view, paged to the last row.
- **SQL tab** for read-only `SELECT` and `WITH` queries.
- **ER diagram** drawn from the declared foreign keys.
- **Integrity check** on open, with the page size, encoding and SQLite version the file was read with.

## Agents

In a Claude Code or Codex thread, the agent gets three tools: `sqlite_list_tables`, `sqlite_describe_table` and `sqlite_run_select`. They work on the file open in the viewer, read-only, and return at most 100 rows a query.

**Ask AI** puts a question about the open file into the thread's message box, for you to send.

## Where the file goes

Nowhere. bb streams the file from the machine that holds it into the panel, where SQLite compiled to WebAssembly reads it.

The plugin calls one outside service. With a DBConvert API key set, it asks the DBConvert licensing service which PRO features the account has.

## Free and PRO

Viewing, SQL and exporting up to 10,000 rows are free. DBConvert PRO ($9 a month) adds diagram export to PNG and SVG, and exporting a whole result.

To unlock PRO, enter the API key from https://streams.dbconvert.com/account in the plugin's settings.

## Also available

The same viewer runs in VS Code, in Chrome and on the web: https://streams.dbconvert.com/sqlite-viewer
