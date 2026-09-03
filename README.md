# BB Community plugin marketplace

BB registers this repository as the reserved `bb-community` marketplace.
Each merge to `main` publishes two marketplace documents.

- [The v1 document](https://getbb.app/marketplace/v1/marketplace.json) has the frozen contract for older BB versions.
- [The v2 document](https://getbb.app/marketplace/v2/marketplace.json) adds discovery data for newer BB versions.

Newer BB versions can use the v1 document as a fallback.
One entry file supplies data to both documents.

## Layout

- `entries/<plugin-id>.json` contains one marketplace entry.
- `icons/` contains local icon files.
- `screenshots/<plugin-id>/` contains local screenshot files.
- `bb-official-screenshots.json` lists CDN images for bundled BB plugins.
- `marketplace.base.json` contains the marketplace identity, categories, and collections.
- `schema/marketplace.schema.json` defines the v1 document.
- `schema/marketplace-v2.schema.json` defines the v2 document.
- `scripts/build.mjs` validates the source and builds both documents.
- `scripts/check-v1-gate.mjs` compares the v1 entries with the live document.
- `scripts/build-stats.mjs` builds the install-count document.

The build writes `dist/marketplace.json` and `dist/v2/marketplace.json`.
The base file carries the v1 identity and keeps `schemaVersion` set to `1`.
The build sets `schemaVersion` to `2` in the v2 output.

## Submit a plugin

1. Fork this repository.
2. Add `entries/<your-plugin-id>.json`.
3. Make the file name equal to the entry `id`.
4. Set `source` to a public Git repository or an npm package.
5. Set `category` to an ID from `marketplace.base.json`.
6. Add screenshots if they help users review the plugin.
7. Open a pull request.

CI validates the entry and its remote source.
A maintainer reviews the source and the plugin behavior.
The `author.github` value identifies the owner for later entry changes.

A semver `range` source uses release tags from the plugin repository.
Use a new marketplace pull request for a source, name, or brand change.

BB installs nothing automatically.
A catalog refresh does not install a plugin.
A user controls each plugin installation and update.

## Categories

The `categories` array defines the available category IDs and their display text.
An entry can use one category ID from this array.

The v2 schema permits an entry without a category.
This repository requires a category for each new or changed entry.
CI reports a warning when unchanged entries have no category.

## Collections

The `collections` array defines ordered plugin shelves.
Each `pluginIds` value must name an entry and must occur only once.

The first collection has the ID `new-and-notable`.
An empty `pluginIds` array tells the build to select eight entries.
The v2 document has a `publishedAt` value for each entry.
The build derives this value from the first commit that added the entry file.
The registry does not emit an `updatedAt` value.
The empty collection fallback orders entries by the emitted `publishedAt` value.

## Screenshots and icons

An entry can reference a maximum of six screenshots.
Put each local file in `screenshots/<plugin-id>/`.
Use this form in the entry:

```json
{
  "screenshots": ["./screenshots/example-plugin/overview.png"]
}
```

Each referenced screenshot file must exist.
The file must use PNG, JPEG, or WebP image data.
The file size must not exceed 2 MiB.
The image width must be at least 1200 pixels.

The `bb-official-screenshots.json` file lists images for bundled plugins.
These plugins have no community entry file.
The build validates these images and excludes them from the community manifest.
BB Official images can use a narrow width for a compact plugin surface.
Their minimum width is 320 pixels.

The build changes each local screenshot path to a v2 CDN URL.
The build changes each local icon path to a v1 CDN URL.
An absolute screenshot or icon URL must use HTTPS on `getbb.app`.
The build rejects all other image hosts.

## Frozen v1 document

The build selects only the seven v1 entry fields for the v1 document.
These fields are `id`, `displayName`, `description`, `icon`, `tags`, `author`, and `source`.
The v2 fields never enter the v1 document.

CI compares each generated v1 entry with the live v1 entry.
A new entry passes this gate.
A changed or removed entry needs the `v1-change` pull request label.
A push to `main` only reports a warning after such a change.

## Install counts

[The install-count document](https://getbb.app/marketplace/v1/stats.json) reports public plugin installations.
BB reads this document during each catalog refresh.
The document stays separate because the v1 marketplace schema is strict.
Bundled BB plugins also appear in this document.
They do not need files under `entries/`.
BB ignores `stats.json` documents from third-party marketplaces.
Install counts are BB measurements, not publisher claims.

The scheduled workflow gets counts from the `plugin_installed` PostHog event.
The workflow publishes no update when PostHog returns no counts.
This rule keeps the last valid document available.
Set `POSTHOG_HOST` when the PostHog project does not use the US cloud.

Use this command to print the document without publication:

```sh
POSTHOG_API_KEY=… POSTHOG_PROJECT_ID=… node scripts/build-stats.mjs --print
```

## Local validation

Run these commands before you open a pull request:

```sh
npm ci
npm run build
npm test
npm run gate:v1
npm run check
```

The `check` command also checks each Git or npm source.
