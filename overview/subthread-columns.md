# Subthread Columns

Answer the subthreads that need you without opening each one separately. Open a parent thread to see its chat beside waiting and failed descendants, at any depth. Every column has its own composer; paths and depth stripes show where it belongs.

*Synthetic example data in BB 0.47.1 with Subthread Columns alone. Sidebar marks are BB’s own.*

Reply to a waiting subthread in its column, or inspect a failure, then click outside its column to mark it seen. The default limit is eight descendant columns, with overflow shown as **+N more**. **Only this thread** returns to the parent’s normal view. Automatic opening works on desktop-width windows when you navigate to a parent with descendants needing attention.

The optional [Responsibilities](https://github.com/neoromantic/bb-plugin-responsibilities) plugin adds unread-result columns. Without it, seen marks stay in this browser; they do not sync across devices, and concurrent windows can re-show a failure. An old mark does not hide a new result. Working, hidden and archived descendants get no new column.

Requires BB 0.47.1 / SDK 0.6.79 or later. Full-trust plugin using experimental BB APIs and the standard sidebar; BB updates may affect compatibility. Install `npm:bb-plugin-subthread-columns@0.1.0` in BB. Adds no telemetry; BB and providers have their own data handling. [README](https://github.com/neoromantic/bb-plugin-subthread-columns#readme) · [Migration reference](https://github.com/neoromantic/bb-plugin-subthread-columns/blob/main/MIGRATION.md).
