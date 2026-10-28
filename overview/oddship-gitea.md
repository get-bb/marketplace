Choose an account and repository, then read issues and pull requests without leaving BB.

## What you get

Browse open or closed items, filter the current page, read descriptions and
conversation comments, and prepare an agent task in BB's new-thread composer.
The draft is yours to review before sending. Account and repository selection,
pagination, and refresh controls stay alongside the selected item.

## Requirements

Install a current tea CLI with `tea api` on the selected BB machine and sign in
with `tea login add`. Credentials remain tea-owned. Reads run through the host
entry; no separate service is required.

Use `bb oddship-gitea` for the same read operations. The unique plugin ID is
`oddship-gitea`. Search covers the current page, and detail views include the
first 30 conversation comments. This version has no mutation controls, CI
checks, or PR review threads.
