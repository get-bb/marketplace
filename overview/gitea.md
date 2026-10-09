Gitea issues and pull requests inside BB. You can browse, comment, review, and label from a panel or from `bb gitea`, and a BB agent can fix or merge your pull requests.

## What you get

- Issue and pull request lists filtered by repository, state, and text, with a My PRs view.
- A conversation view where you comment, edit or delete your own comments, pick labels and assignees, close or reopen, review, and see checks.
- A Files changed view with a file tree, unified or split diffs, and inline line comments.
- Auto-fix (fix CI failures and address review feedback) and Auto-merge (merge when Gitea allows) controls on My PRs and Pull requests. Each starts a hidden BB agent thread. Both are off by default.

## Requirements

Install the `tea` CLI 0.15.1 or newer and sign in with `tea login add` on the BB server host and on the host of each repository checkout used by Auto-fix or Auto-merge. BB stores no Gitea token. Set `baseUrl` to your Gitea instance with `bb plugin config gitea set baseUrl https://gitea.example.com`. Repositories come from project `origin` remotes and the optional `extraRepos` setting.

## Costs and permissions

Browsing and commenting use no agent time. Auto-fix, Auto-merge, and `bb gitea send-agent` start BB agent threads, which use your configured model. Auto-fixers act on Gitea with your `tea` login's permissions. Gitea has no native auto-merge, so the merge rules are enforced by the agent's instructions.

## Commands

Run `bb gitea` for the full list. Examples: `bb gitea my-prs`, `bb gitea show pr owner/repo 12`, `bb gitea auto-fix owner/repo 12 on`.

Source and full docs: https://github.com/Nick-Motion/bb-plugin-gitea
