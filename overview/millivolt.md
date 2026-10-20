Millivolt is the self-hosted inference proxy that keeps AI traffic visible:
live requests, retained history, tokens, cost, latency and retries in one
place. This plugin installs it, keeps it current, and shows it inside bb.

## What you get

A **Millivolt page in the sidebar** with three tabs. Overview shows requests,
errors, in-flight calls, cost, tokens, time to first token, throughput,
pause/throttle/debug state and any dropped history, plus where the install
lives and when it was last updated. Requests is the retained log: time, status,
provider and model, client, tokens, time to first token, duration and retries.
Dashboard is the full millivolt dashboard, charts and Settings included.

**Provisioning without homework.** On first load the plugin looks for an
existing millivolt before creating anything: Docker labels name the compose
directory, a loopback probe names the port, and a bounded folder scan catches a
deployment that is on disk but not running. Found one? It adopts that directory
and port, and reads the operator token from its env file. Found nothing? It
writes a compose deployment, generates a long operator credential, pulls the
image and starts it, then reports the directory and port it chose.

**Updates on your schedule.** With auto-update on, each bb start pulls the
newest millivolt image and recreates the container only when the image actually
changed, and again every six hours while bb stays open. It skips the pull while
a request is in flight, so a long stream is not cut off for an update.

**A command line** for the same work: `bb millivolt status`, `setup`,
`discover`, `update`, `start`, `stop`, `restart`, `url`, `requests`, with
`--json` where a script needs it. A bundled skill tells agents how to read
traffic and control the proxy.

## How it works

The plugin runs `docker compose` with an argument array — never a shell — in the
deployment directory, then talks to millivolt over its operator API. The
operator token stays on the server: it is a secret setting or a value in the
plugin's own storage, and the sidebar never receives it. The Dashboard tab loads
through a second loopback listener that adds the credential to every request and
strips the frame-blocking header, so the store's dashboard works inside bb
without a browser tab, and without asking for a token.

## Requirements

Docker must be running: Docker Desktop on Windows (the plugin can start it) or
Docker Engine on Linux. The image is about 100 MB, and history lives in a Docker
volume. The listener binds loopback only, so the proxy is reachable from this
machine and not from the network.

## Constraints

- Durable metrics are best-effort: a nonzero dropped count means history lost
  records under load, not that inference failed.
- Millivolt has no user isolation. One operator token protects the dashboard and
  the inference listener; this plugin holds that token for you.
- The in-bb dashboard proxy adds the credential for loopback callers that arrive
  with a loopback referrer, and refuses every other origin.
- Changing millivolt's own `listen` in the dashboard requires the published port
  to match, or the port goes dark. The plugin names that mismatch when it
  happens instead of reporting a bare timeout.
