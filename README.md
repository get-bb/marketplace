# BB Community plugin marketplace

The registry for the BB Community plugin marketplace, which BB registers
under the reserved name `bb-community`. Merges to `main`
publish `https://getbb.app/marketplace/v1/marketplace.json`, which every BB
installation refreshes.

## Layout

- `entries/<plugin-id>.json` — one marketplace entry per plugin. The
  filename must equal the entry `id`. One file per plugin keeps submission
  pull requests conflict-free.
- `icons/` — optional icon files referenced relatively from entries.
- `marketplace.base.json` — marketplace identity (name, display name).
- `schema/marketplace.schema.json` — the entry contract. Canonical URL:
  <https://getbb.app/schemas/marketplace.schema.json>.
- `scripts/build.mjs` — validates everything and composes
  `dist/marketplace.json` deterministically.
- `scripts/build-stats.mjs` — composes `dist/stats.json`, the install-count
  sidecar, from BB's `plugin_installed` telemetry.

## Submit a plugin

1. Fork this repository.
2. Add `entries/<your-plugin-id>.json`. The `id` must match the plugin id
   that your plugin package manifest derives. Point `source` at your public
   git repository (with an optional `subdir` for multi-plugin repositories)
   or your npm package.
3. Open a pull request. CI validates the entry; a maintainer reviews the
   plugin itself, including its source and behavior.

Approval covers the listing. With a semver `range` source you release
updates by tagging your own repository; changing the entry itself (source
location, name, or branding) needs a new reviewed pull request.
The account that opens the listing pull request is recorded as the owner in
`author.github` and gates later entry changes.

BB installs nothing automatically: a catalog refresh only surfaces
`bb plugin outdated`, and applying an update is a manual, staged,
rollback-protected action.

## Install counts

`https://getbb.app/marketplace/v1/stats.json` publishes how many distinct BB
installations reported installing each public plugin. BB fetches it beside the
manifest on every catalog refresh and shows the number on the store card, the
mobile browse row, and `bb plugin search`.

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-08-21T06:17:00.000Z",
  "plugins": { "thread-hover-cards": { "installs": 4210 } }
}
```

- The counts come from the `plugin_installed` event that BB servers already
  send to PostHog. Telemetry is opt-out and only reports from production
  builds, so a count is "installs BB heard about", not a true total.
- It is a separate document, not a field in `marketplace.json`. That schema is
  strict, so an unknown field there rejects the whole catalog on an older
  desktop, and the numbers move daily while the manifest sits unchanged behind
  a 304.
- Bundled BB plugins appear here too, even though they have no entry in
  `entries/`: BB looks their counts up in this same document.
- Only this marketplace publishes counts. BB ignores a `stats.json` beside a
  third-party manifest, because the number is BB's measurement, not the
  publisher's claim.
- `.github/workflows/stats.yml` rebuilds and uploads it daily. It needs the
  `POSTHOG_API_KEY` secret (a personal API key with project read access) and
  the `POSTHOG_PROJECT_ID` variable, alongside the Cloudflare credentials the
  manifest publish already uses. Set `POSTHOG_HOST` when the project is not on
  US cloud.
- A run that finds no counts fails without uploading, so an outage or a
  rotated key leaves the last published sidecar in place instead of zeroing
  every counter in the store.

Print the document without publishing it:

```sh
POSTHOG_API_KEY=… POSTHOG_PROJECT_ID=… node scripts/build-stats.mjs --print
```

## Local validation

```sh
npm ci
npm run build   # validate + compose dist/marketplace.json
npm run check   # also verify sources exist (git ls-remote / npm view)
```
