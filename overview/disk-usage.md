## Find what is using disk space

Inspect allocated disk usage on the machine hosting the BB server. Each scan lists a directory's immediate children largest-first, with sizes, percentage bars, and entry counts.

Use breadcrumbs or click a directory to drill down, enter any server-host path directly, and rescan when you need a fresh snapshot. Progress updates show the entries visited, bytes counted, and current directory while a scan runs.

## How sizes are measured

Disk Usage counts allocated blocks instead of apparent file size. It does not follow symlinks, counts hard-linked files once per scan, and reports skipped entries without failing the scan. Results are cached by path so navigating back to a previous directory is immediate.

## Command line

Agents and scripts can run the same scanner with `bb disk-usage`. Pass a path, limit the number of results, request JSON output, or bypass the cache with `--refresh`.
