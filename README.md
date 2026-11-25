# BB Community plugin marketplace

BB registers this repository as the reserved `bb-community` marketplace.
Plugin authors list a plugin themselves: they add a GitHub topic or an npm keyword and publish a release.
A crawler finds these plugins every 30 minutes.

**Listings are not reviewed by BB.**
Review a plugin's source before you install it.
To report a listing, [open a report](https://github.com/get-bb/marketplace/issues/new?template=report-plugin.yml).

The publish workflow builds two marketplace documents.

- [The v1 document](https://getbb.app/marketplace/v1/marketplace.json) has the frozen contract for older BB versions.
- [The v2 document](https://getbb.app/marketplace/v2/marketplace.json) adds discovery data for newer BB versions.

Newer BB versions can use the v1 document as a fallback.
One entry file supplies data to both documents.

## Layout

- `entries/<plugin-id>.json` contains one legacy marketplace entry.
- `blocked.json` lists sources that the crawler never lists.
- `icons/` contains local icon files.
- `screenshots/<plugin-id>/` contains local screenshot files.
- `overview/<plugin-id>.md` contains an optional long-form description.
- `bb-official-screenshots.json` lists CDN images for bundled BB plugins.
- `marketplace.base.json` contains the marketplace identity, categories, and collections.
- `schema/marketplace.schema.json` defines the v1 document.
- `schema/marketplace-v2.schema.json` defines the v2 document.
- `scripts/crawl.mjs` finds self-published plugins on GitHub and npm.
- `scripts/build.mjs` validates the source and builds both documents.
- `scripts/check-v1-gate.mjs` compares the v1 entries with the live document.
- `scripts/build-stats.mjs` builds the install-count document.

The build writes `dist/marketplace.json` and `dist/v2/marketplace.json`.
The base file carries the v1 identity and keeps `schemaVersion` set to `1`.
The build sets `schemaVersion` to `2` in the v2 output.

## Get listed

A listing comes from the plugin's own repository or package.
No pull request to this repository is needed.

1. Add `bbMarketplace` to the plugin's `package.json`.
   Set `category` to a category ID from `marketplace.base.json`.
   A plugin without a category is listed, but it does not appear under any category.

   ```json
   {
     "name": "bb-plugin-example",
     "keywords": ["bb-plugin", "notes", "markdown"],
     "bb": {
       "name": "Example",
       "description": "One sentence about what the plugin does.",
       "branding": { "icon": "./icon.svg" }
     },
     "bbMarketplace": {
       "category": "utilities",
       "secondaryCategories": ["thread-content"],
       "screenshots": ["./screenshots/overview.png"]
     }
   }
   ```

2. Add `PLUGIN_OVERVIEW.md` beside `package.json` if the plugin needs a long-form description.
3. Run `bb plugin publish --check` in the plugin directory.
   It runs the crawler's checks locally.
4. Opt in and release:
   - **GitHub:** add the topic `bb-plugin` to a public repository, then push a release tag.
     A plugin at the repository root uses tags like `v1.2.3`.
     A plugin in a subdirectory listed in `.bb/plugins.json` uses tags like `<directory name>/v1.2.3`, for example `notes/v1.2.3`.
   - **npm:** add the keyword `bb-plugin` to `keywords`, then run `npm publish`.
     The overview, the icon, and the screenshots must be in the package, so list them in `files`.
5. Wait for the next crawl, at most 30 minutes, and check the plugin's verdict in [report.json](https://getbb.app/marketplace/v1/index/v1/report.json).

The crawler reads all listing data from the newest release, never from the default branch.
A new release updates the listing.
The listing installs with the range `>=<first release>`, so users get each new release that their BB version supports.

### Listing rules

| Listing field | Comes from |
|---|---|
| `id` | `package.json` `name`, without a scope and without a `bb-plugin-` prefix |
| `displayName`, `description` | `bb.name`, `bb.description` (both required) |
| `icon` | `bb.branding.icon`: a BB icon name, or a relative `.svg`, `.png`, or `.webp` file of at most 256 KiB; when missing, a replaced legacy entry's icon, otherwise `Puzzle` |
| `tags` | `keywords`, in kebab case, at most 32 characters each, at most 10; `bb-plugin`, `bb`, and `bb-plugins` are dropped |
| `category`, `secondaryCategories` | `bbMarketplace` (optional; at most three secondary IDs, used only with `category`) |
| `screenshots` | `bbMarketplace.screenshots`: at most six relative paths |
| `overview` | `PLUGIN_OVERVIEW.md` |
| `author` | the GitHub owner; for npm, the owner of a GitHub `repository`, otherwise the first maintainer |
| `publishedAt` | the date of the first release |

- Screenshots and overviews follow the rules in the sections below.
  A screenshot that breaks a rule stops the listing.
  An overview that breaks a rule, for example one over 4000 characters, is left out; the listing stays.
- An unknown key in `bbMarketplace` is an error, to catch typos.
- Forks, archived repositories, and deprecated npm versions are not listed.
- A plugin on both npm and GitHub, where the package `repository` names the repository and directory, is listed once, from npm.
- A plugin ID belongs to the first source that claims it.
  A later source with the same ID is not listed.
- An ID from `entries/` belongs to that entry.
  A self-published plugin replaces the entry when it has the same source, or when its GitHub owner is the entry's `author.github`.
  Authors of existing entries update their listing this way.
  See [Legacy entries](#legacy-entries) for what the replacement keeps.
- IDs in `reserved-plugin-ids.json` and IDs that start with `bb--` belong to plugins bundled with BB.

### The crawl report

[report.json](https://getbb.app/marketplace/v1/index/v1/report.json) has one verdict for each source the crawler found:

```json
{
  "generatedAt": "2026-11-25T12:00:00.000Z",
  "sources": {
    "github:owner/repo": { "status": "listed", "id": "example", "version": "1.2.3", "checkedAt": "…" },
    "github:owner/monorepo/plugins/notes": { "status": "skipped", "reason": "no-release-tag", "detail": "…", "checkedAt": "…" },
    "npm:@scope/bb-plugin-x": {
      "status": "listed",
      "id": "x",
      "version": "2.0.0",
      "replaces": "legacy",
      "fromLegacy": ["category", "icon", "screenshots"],
      "warnings": [{ "reason": "missing-category", "detail": "…" }],
      "checkedAt": "…"
    }
  }
}
```

A skipped source has one reason: `no-release-tag`, `no-manifest`, `invalid-manifest`, `unknown-category`, `invalid-screenshot`, `invalid-icon`, `id-claimed`, `id-reserved`, `blocked`, `fork`, `archived`, `deprecated`, or `npm-preferred`.
A listed source can have warnings: `missing-category` (the listing has no category of its own) and `invalid-overview` (the overview is left out).
`fromLegacy` names the fields a replaced legacy entry supplied.
`bb plugin publish --check` uses the same reasons and warnings.

### Report a plugin

The Report link on getbb.app opens a [plugin report](https://github.com/get-bb/marketplace/issues/new?template=report-plugin.yml).
Maintainers remove a listing by adding its source to `blocked.json`.
`blocked.json` takes GitHub repository IDs, GitHub owners, and npm package names.

## Legacy entries

The files in `entries/` are the listings from before the crawler.
They stay published in both documents.
A legacy entry uses the fields of the v2 schema.

1. Make the file name equal to the entry `id`.
2. Set `source` to a public Git repository or an npm package.
3. Set `category` to an ID from `marketplace.base.json`.
4. Put screenshots in `screenshots/<plugin-id>/` and an overview in `overview/<plugin-id>.md`.

CI validates each entry and its remote source.
The `author.github` value identifies the owner for later entry changes.

A self-published release replaces a legacy entry when it has the same ID and either the same source or a GitHub owner equal to `author.github`.
The release supplies the listing, with these exceptions:

- Without `bbMarketplace.category`, the listing keeps the entry's `category` and `secondaryCategories`.
- Without `bb.branding.icon`, the listing keeps the entry's icon.
  A new plugin without an icon gets the `Puzzle` icon.
- Without `bbMarketplace.screenshots`, the listing keeps the entry's screenshots.
  Screenshots in the release replace all of the entry's screenshots.
- Without a valid `PLUGIN_OVERVIEW.md`, the listing keeps the entry's overview.
- The listing always keeps the entry's `publishedAt`, so an old plugin does not show as new.
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

The publish workflow reads recent install counts from PostHog with `npm run build:ranking` once a day.
It keeps the counts in the bucket at `index/ranking.json` and uses them for each publish that day.
When those counts are unavailable, the workflow still publishes.
Computed spots then use the newest entries, and categories keep the base order.

## Crawl and publish

The publish workflow runs on each merge to `main`, every 30 minutes, and on demand.
Each run crawls GitHub and npm, then builds and uploads both documents.

- The crawl is incremental.
  A repository is processed again only when its tags change, and a package only when its `latest` version changes.
- The crawl state is in the bucket at `index/state.json`, not in Git.
  It holds ETags, releases, the built entries, and the claims ledger.
- A source that fails for a network reason or a rate limit keeps its last listing.
  When the whole crawl fails, the run publishes the entries of the last good crawl.
- Crawled icons and screenshots are uploaded to `assets/<content hash>.<ext>` and served from `https://getbb.app/marketplace/v1/assets/`.
- Crawled entries go into the v2 document only, never into the frozen v1 document.

The repository variable `CRAWL_MODE` selects what the live v2 document holds:

- `shadow` (the default): the live v2 document has the legacy entries only.
  The merged document goes to [index/shadow/marketplace.json](https://getbb.app/marketplace/v1/index/shadow/marketplace.json), with a copy of the report.
- `live`: the live v2 document has the legacy and crawled entries.

The report is always published to `index/v1/report.json`.

The workflow uses these settings:

| Name | Kind | Use |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | secret | R2 uploads |
| `CLOUDFLARE_ACCOUNT_ID` | variable | R2 uploads |
| `POSTHOG_API_KEY` | secret | daily ranking |
| `POSTHOG_PROJECT_ID`, `POSTHOG_HOST` | variables | daily ranking |
| `CRAWL_MODE` | variable, optional | `shadow` or `live` |
| `CRAWLER_GITHUB_TOKEN` | secret, optional | a token with a larger GitHub API budget than the built-in `GITHUB_TOKEN` |

Run a crawl locally without an upload:

```sh
GITHUB_TOKEN=$(gh auth token) node scripts/crawl.mjs --out /tmp/crawl
node scripts/build.mjs --crawled /tmp/crawl/entries.json --v2-out /tmp/crawl/marketplace.json
```

Pass `--state /tmp/crawl/state.json` to a later run to make it incremental.

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

Run these commands before you open a pull request to this repository:

```sh
npm ci
npm run build
npm test
npm run gate:v1
npm run check
```

The `check` command also checks each Git or npm source.
