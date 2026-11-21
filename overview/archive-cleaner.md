## Choose what expires

Set how long to keep archived threads. The default is 30 days. Select projects by name and decide separately whether future projects should inherit the rule. Run `bb archive-cleaner preview` to see which threads qualify before enabling permanent deletion.

## After downtime

When BB starts, the cleaner checks whether a daily pass is due. One pass covers the time offline. Pinned threads and threads with dependents are skipped. Run `bb archive-cleaner status` to inspect the latest pass.
