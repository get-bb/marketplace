## Postgres inside bb

Browse schemas and tables, write SQL in a Query panel, and let agents call
`sql_query` / `sql_list_connections` against the same saved connections.

## What you get

- Connection CRUD with URI paste, SSL paths, and passwords in a local secrets file
- **Show all databases** tree (DBeaver-style), or only the connection default DB
- Schema-aware completion (keywords, tables, columns, short aliases like `trade t`)
- Query session that keeps editor SQL and result tabs across bb tab switches
- Controlled write/DDL: confirms in the UI; Agent write / Allow DDL are on by default for **new** connections
- Duplicate a connection (settings + password) from the ⋮ menu
- Run SQL from chat into the Query panel

## Safety

Admin statements (SET / VACUUM / COPY / …) stay blocked. UPDATE/DELETE without a
selective WHERE are refused for agents. Prefer a SELECT-only Postgres role when
you only need reads.
