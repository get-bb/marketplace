## What you get

Compare usage from Claude Code, Codex, Hermes Agent, OpenCode, Pi and optional
Cursor in the Usage sidebar panel. Switch between 7, 30 and 90 days, inspect
daily cost or token charts, and break totals down by model, project or day.

## Cost meaning

Costs are API-equivalent estimates where a source does not report them.
They are not subscription invoices. OpenCode uses its recorded cost, including
zero for free or included models. Cursor reports account-level usage and cannot
attribute it to projects. The dashboard distinguishes provider-reported,
model-priced and unpriced usage.

## Data and requirements

Requires bb 0.41 or newer. Git installs need npm. Reads usage from the machine
running the bb server; enrolled remote hosts are not scanned. Hermes and
OpenCode databases are opened read-only. Parsed usage is cached locally.

Cursor is opt-in in plugin settings and requires a signed-in Cursor desktop
installation plus access to Cursor's dashboard service. Its dashboard endpoint
is undocumented and can change. The plugin does not persist the access token.

## Feedback and source

Share a workflow or report a problem using the
[feedback form](https://github.com/ChrBoebel/bb-plugin-receipts/issues/new?template=feedback.yml).
Feedback is voluntary and public; omit private paths, transcripts and credentials.

Receipts builds on [bb-usage-page](https://github.com/iamEvanYT/bb-usage-page).
This fork adds Hermes Agent and OpenCode data sources and provider brand marks.
The [README](https://github.com/ChrBoebel/bb-plugin-receipts#readme)
describes source paths, caches and attribution details.
