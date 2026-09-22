Are you sick of every pull request landing under YOUR name? Sick of not being
able to review them, because GitHub won't let you approve your own work? Does
your software factory feel more like an echo chamber?

With bb GitHub App Auth, your agents get a GitHub identity of their own. Make
a GitHub App for free with only the scopes you choose, install this plugin,
and every agent turn in the projects you pick runs as the app. Pull requests
open under the app's name. You review them. You stay in charge.

## What you get

- A short-lived GitHub App installation token set as `GH_TOKEN` and
  `GITHUB_TOKEN` for each agent turn, so `gh` and `git` act as the app.
- Commits under the app's bot user, because the plugin sets the git author and
  committer too.
- Pushes over the token, because the plugin rewrites GitHub SSH remotes to
  HTTPS and routes credentials through `gh`.
- Scope you control. Tie one app to one project with `set-app`, or set a
  default app and choose its projects. Personal projects stay personal.

## How it works

Store a project's app with `bb github-app-auth set-app`, or set a default app
in plugin settings or the bb server environment. The plugin keeps every
credential on the bb server and never sends it to an agent. It mints a token on
the server and sends only the token to the machine that runs the thread. It
mints a new token before the one-hour expiry and keeps a recently used token
fresh in the background.

## Requirements

- A GitHub App you create and install, with the scopes you choose.
- The app's private key file on the bb server machine.
- `gh` on the machines that run threads.

The plugin never writes a token or the private key to its logs.

## Commands

`bb github-app-auth set-app`, `unset-app`, `status`, `env`, `token` and
`refresh`.

Try bb GitHub App Auth today!
