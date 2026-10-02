## Keep your checkout ready to work

New thread environments carry the checkout's Git history, installed dependencies, build caches, and uncommitted files. Each copy has its own Git metadata and working files, while unchanged file data shares disk space with the source.

## Choose an environment

Select **Btrfs Cow** in BB's environment picker. The plugin checks the selected machine and project before offering the environment. A Btrfs subvolume uses a snapshot; a regular directory on a compatible filesystem uses a reflink copy. BB removes the copy when the environment is destroyed.

## Requirements

Requires BB 0.42 or later, Plugin SDK 0.4.53 or later, Linux, Git, and GNU cp with reflink support. The checkout and copy destination must support reflinks between them, such as on the same Btrfs or XFS filesystem. Snapshot mode also needs the btrfs command. Linked Git worktrees are not supported as source checkouts.

The plugin copies local files and removes its managed copies. It requires no external service or account.
