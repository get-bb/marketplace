## Keep a pane in place

Native pane locks protect content from closing, replacement and rearrangement. Pinned proportions survive adding and removing neighbors; manual resizing remains available. Uses existing compatible native controls without duplicates.

## Optional initialization

If your BB build lacks the feature, an explicit initializer can apply the bundled native enhancement to a clean source checkout, run its tests, build the frontend and back up the existing installation before deployment.

The initializer currently supports BB 0.43.1 at the documented source commit only. It requires Node, pnpm, installed source dependencies and explicit host and installation paths. It never runs automatically after installation. Other versions need native support or a tested adapter.

## Restore and limits

A restore command uses the saved backup and refuses to overwrite a newer installation. Disabling the plugin does not undo a native frontend enhancement. BB updates can replace it. Wide layouts only; thread deletion or archiving still removes unavailable content. This is a layout convenience, not a security boundary.
