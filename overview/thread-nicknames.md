## Numbers that stay with threads

New threads receive sequential title prefixes such as @27. A thread keeps its number when its title changes or the plugin reloads. Forks receive their own number; deleted numbers are not reused.

## Find a numbered thread

Browse saved numbers from the sidebar or Settings page, 100 per page, then select a row to open its thread. Refresh reloads thread details. Browsing does not allocate new numbers. Older threads stay unchanged unless explicitly numbered through the plugin's CLI.

## Data and requirements

Requires bb 0.42+. The plugin changes actual thread titles. Disabling it stops future updates but leaves existing prefixes in place. Number mappings live in bb-managed plugin storage; preserve that data across reinstalls to retain numbering. No external service or account is required.
