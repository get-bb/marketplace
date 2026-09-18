## What you get

Each project's sidebar menu gains a **Recently archived** row. Turn it on and that project's newest archived threads appear as a dimmed group directly under its live thread list, styled like the rows around them. Nothing is hidden or reordered — the normal list stays as it was, and the group disappears when you turn the row off.

The group shows the newest few by default. **Show all** expands the rest, and each row carries how long ago it was archived.

## Reading without restoring

Clicking an archived row opens the thread for reading and leaves it archived. When you are looking for the one thread out of a dozen that holds the detail you need, you can open each in turn and leave the rest where they are.

## Unarchiving

Hovering an archived row reveals an **Unarchive** button. Any archived thread you open also gets an **Unarchive** button in its header, so a thread you reached from search or a link can be restored without finding it in the sidebar first.

## Settings

- How many recent archives to show: 10, 25, or 50.
- How far back to look: the last 7, 14, 30, or 90 days, or all of them.

## Command line

```
bb recent-archives list [--project <id>] [--json]
bb recent-archives unarchive <thread-id>
```

## Requirements

None beyond BB itself. Archived threads are read from BB's own thread store, so there is no external service, no account, and no separate install. The toggle is per project and lasts for the session.
