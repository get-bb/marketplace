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
- `overview/<plugin-id>.md` contains an optional long-form description.
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

**This repository no longer accepts new entries by pull request.**
CI fails a pull request that adds a file under `entries/`.
A plugin is listed automatically when its author publishes it:

1. Add `bbMarketplace` to the plugin's `package.json`.
   `category` is required and must be a category ID from `marketplace.base.json`.
   `secondaryCategories` and `screenshots` (relative paths) are optional.
2. Add `PLUGIN_OVERVIEW.md` beside `package.json` if the plugin needs a long-form description.
3. Opt in and release:
   - **GitHub:** add the topic `bb-plugin` to a public repository, then push a release tag.
     A plugin at the repository root uses tags like `v1.2.3`.
     A plugin in a subdirectory listed in `.bb/plugins.json` uses tags like `<directory name>/v1.2.3`.
   - **npm:** add the keyword `bb-plugin` to `keywords`, then run `npm publish`.
4. A crawler lists the plugin within 30 minutes.
   Its verdict is in [report.json](https://getbb.app/marketplace/v1/index/v1/report.json).

Listings are not reviewed by BB.

### Existing entries

The entries in `entries/` stay published.
Authors of existing entries can update their listing the same way.
A self-published release replaces the entry when it has the same source, or when its GitHub owner is the entry's `author.github`.
The listing keeps its original `publishedAt`.

A pull request can still edit or remove an existing entry.
CI accepts it only when its author is the entry's `author.github` on `main` or a maintainer of this repository.
A semver `range` source uses release tags from the plugin repository.

BB installs nothing automatically.
A catalog refresh does not install a plugin.
A user controls each plugin installation and update.

## Categories

The `categories` array defines the available category IDs and their display text.
An entry has one primary `category` ID. Add up to three `secondaryCategories`
to place the same plugin in other category shelves in bb versions that support
them. Older bb versions display the primary category only. Secondary IDs must
be distinct from the primary ID and from each other.

The v2 schema permits an entry without a category.
This repository requires a category for each new or changed entry.
CI reports a warning when unchanged entries have no category.

## Collections

The `collections` array defines ordered plugin shelves.
Each `pluginIds` value must name an entry and must occur only once.

The first collection has the ID `new-and-notable`.
The v2 document has a `publishedAt` value for each entry.
The build derives this value from the first commit that added the entry file.
The registry does not emit an `updatedAt` value.

An empty `pluginIds` array tells the build to select eight entries at each publish:

1. The build picks entries by trending score.
   The score is distinct installs in the last 14 days divided by
   `(days since publishedAt + 2) ^ 1.5`.
   An entry needs at least five installs in the last 14 days to qualify.
2. If spots remain, the build fills them with the newest entries.

## Category order

The build orders the published `categories` array at each publish.
Categories are sorted by the summed installs of their entries in the last 30 days.
Ties keep the order of the `categories` array.

The publish workflow runs on each merge and once a day.
It reads recent install counts from PostHog with `npm run build:ranking`.
When those counts are unavailable, a merge still publishes.
Computed spots then use the newest entries, and categories keep the base order.

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

## Long-form description

An entry can reference one markdown file with the `overview` field.
Put the file at `overview/<plugin-id>.md`.
Use this form in the entry:

```json
{
  "overview": "./overview/example-plugin.md"
}
```

The store detail page renders the file below the short description.
The file must be UTF-8 text with a maximum of 4000 characters.
The file can use headings, paragraphs, emphasis, strong text, strikethrough, inline code, code blocks, blockquotes, lists, thematic breaks, and links.
Each link must be an absolute `https` URL.
The build rejects raw HTML, images, tables, footnotes, task lists, and control characters.
The build rejects a file in `overview/` that no entry references.
The build replaces the path with the file text in the v2 document.
The v1 document never holds the `overview` field.

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

Each plugin has `installs`, the distinct installations of all time.
Each plugin also has `recentInstalls`, the distinct installations in the last 14 days.
BB ranks the BB Official shelf by `recentInstalls` and the publish date.
Older BB versions ignore `recentInstalls`.

The scheduled workflow gets counts from the `plugin_installed` PostHog event.
The workflow publishes no update when PostHog returns no counts.
This rule keeps the last valid document available.
Set `POSTHOG_HOST` when the PostHog project does not use the US cloud.

Use this command to print the document without publication:

```sh
POSTHOG_API_KEY=… POSTHOG_PROJECT_ID=… node scripts/build-stats.mjs --print
```

## Local validation

Run these commands before you open a pull request that changes an existing entry:

```sh
npm ci
npm run build
npm test
npm run gate:v1
npm run check
```

The `check` command also checks each Git or npm source.
