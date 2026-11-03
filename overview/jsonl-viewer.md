## What you get

- **Types inferred across every line**, so each column has a name and a type before you write a query.
- **Broken lines named**: the file still opens, and each line that fails to parse is listed by number with the parser's message and its text.
- **Data grid**, paged to the last row, with nested objects shown as structs.
- **SQL tab** for read-only `SELECT` and `WITH` queries in DuckDB's SQL.
- **Several files at once**: add more `.jsonl` files with **Choose files**, and each becomes a named view you can join.

If another plugin opens these files instead, choose this viewer under Settings → File openers in bb.

## Agents

In a Claude Code or Codex thread, the agent gets three tools: `jsonl_list_tables`, `jsonl_describe_table` and `jsonl_run_select`. They work on the file open in the viewer, read-only, and return at most 100 rows a query.

**Ask AI** puts a question about the open file into the thread's message box, for you to send.

## Where the file goes

Nowhere. bb streams the file from the machine that holds it into the panel, where DuckDB compiled to WebAssembly reads it.

The plugin calls one outside service. With a DBConvert API key set, it asks the DBConvert licensing service which PRO features the account has.

## Free and PRO

Viewing, SQL and exporting up to 10,000 rows as CSV, JSON or Parquet are free. DBConvert PRO ($9 a month) adds exporting a whole result.

To unlock PRO, enter the API key from https://streams.dbconvert.com/account in the plugin's settings.

## Also available

The same viewer runs in VS Code, in Chrome and on the web: https://streams.dbconvert.com/jsonl-viewer
