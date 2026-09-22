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
- Scope you control. Only the projects you enable get a token. Personal
  projects stay personal.

## How it works

Give the plugin the app id, the installation id, and the private key path,
through plugin settings or the bb server environment. Enable a project by name,
or let the plugin enable any project that defines a `GITHUB_APP_ID` environment
variable. The plugin mints a token on the bb server and sends only the token to
the machine that runs the thread. It mints a new token before the one-hour
expiry and keeps a recently used token fresh in the background.

## Requirements

- A GitHub App you create and install, with the scopes you choose.
- The app's private key file on the bb server machine.
- `gh` on the machines that run threads.

The plugin never writes a token or the private key to its logs.

## Commands

`bb github-app-auth status`, `env`, `token` and `refresh`.

Try bb GitHub App Auth today!
