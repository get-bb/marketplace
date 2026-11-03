## What you get

- **A real database from the dump**: the file is replayed into PostgreSQL compiled to WebAssembly, so every `CREATE` and `COPY` runs as it would on a server.
- **Tables** with row counts and their PostgreSQL types, and a data grid paged to the last row.
- **ER diagram** from the foreign keys the dump declares.
- **SQL tab** for read-only PostgreSQL `SELECT` and `WITH` queries.
- **Extensions from the dump**: PostGIS, pgvector, pg_trgm, hstore and PostgreSQL's contrib set load when the dump asks for them.

## Which files open

- `.dump`, `.backup` and `.pgdump` always open in the viewer.
- `.sql.gz`, `.sql.zst` and `.sql.lz4` open in the viewer. Other `.gz`, `.zst` and `.lz4` files keep bb's own preview.
- `.sql` and `.tar` open in the viewer only when they are pg_dump output: a plain dump's header, or a tar dump's `toc.dat`. Any other `.sql` script or archive keeps bb's own preview.

A custom-format dump (`pg_dump -Fc`) only `pg_restore` can read. The viewer says so and gives the command that turns it into a plain dump.

If another plugin opens these files instead, choose this viewer under Settings → File openers in bb.

## Agents

In a Claude Code or Codex thread, the agent gets three tools: `postgres_list_tables`, `postgres_describe_table` and `postgres_run_select`. They work on the file open in the viewer, read-only, and return at most 100 rows a query.

**Ask AI** puts a question about the open file into the thread's message box, for you to send.

## Where the file goes

Nowhere. bb streams the file from the machine that holds it into the panel, where PostgreSQL compiled to WebAssembly reads it.

The plugin calls one outside service. With a DBConvert API key set, it asks the DBConvert licensing service which PRO features the account has.

The dump runs in a throwaway database with no network, no file system and no shell, and the file is never written to.

## Free and PRO

Viewing, SQL and exporting up to 10,000 rows as CSV or JSON are free. DBConvert PRO ($9 a month) adds diagram export to PNG and SVG, and exporting a whole result.

To unlock PRO, enter the API key from https://streams.dbconvert.com/account in the plugin's settings.

## Also available

The same viewer runs in VS Code, in Chrome and on the web: https://streams.dbconvert.com/postgresql-dump-viewer
