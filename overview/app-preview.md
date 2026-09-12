App Preview finds startable apps in the current thread worktree, runs the
detected recipe in a BB terminal, and can open the result in the in-app
browser. A Ports list can share a listener over BB Connect or signal it.

## Trust and machine effects

This is a full-trust plugin. After you install it:

- **Dependency installation.** Start can run the detected package manager
  install (`npm` / `pnpm` / `yarn` / `bun` / `uv` / `pip` / `bundle` /
  `composer`) when that setting is on.
- **Repository-script execution.** Start runs the detected dev/start recipe
  from the worktree in a BB terminal. Agents can only start that detected
  recipe. They cannot pass an arbitrary command. The Preview panel and
  `bb preview start --command` may override with a plain argv (no
  substitutions, quotes, or shell operators).
- **Process signaling.** Ports can send SIGTERM or SIGKILL to a listener by
  port or PID. Agent share, unshare, and kill wait for an in-app confirmation
  that echoes a plugin-issued token. The Ports panel still asks before kill.
- **BB Connect exposure.** Share publishes a listening port as
  `https://<handle>--<port>.getbb.app`. That URL is reachable from other
  machines and phones while the share exists.

Preview state lives in the plugin SQLite database. It does not call a
third-party API or store credentials.

## Launch safety (0.2.9)

Start is a working directory plus argv recipe. The worktree path is not
interpolated into the shell command string. Nested apps `cd -- ./dir` so
`CDPATH` cannot redirect them.

## Install

```
bb plugin install git:github.com/hungv47/bb-plugin-app-preview@semver:^0.2.9
```
