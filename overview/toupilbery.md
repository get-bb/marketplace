## What you get

A sidebar page that surfaces every Fibery work item whose public ID is a round number — one non-zero digit followed by at least three zeros (1000, 5000, 10 000, 100 000, …). Four work item types and Internal Goals are covered: Technical Tasks, Studies, Bugs, Actions, and Internal Goals.

The page includes an all-time podium that ranks the assignees who own the most matching items, displayed in classic 🥇 🥈 🥉 order with their avatar and item count.

## Filters

Three independent filters sit above the list:

- **Type** — narrow to one work item type or show all five.
- **Date** — limit to items created in the last 24 hours, last week, last month, or all time.
- **Owner** — narrow to one assignee. The owner bar lists every person who appears in the current result set.

## Requirements

A Fibery workspace and a Fibery API token are required. Set them once with `bb plugin config toupilbery`:

- `workspace` — the Fibery subdomain (e.g. `airnity`).
- `apiToken` — a Fibery API token with read access to Work items.
