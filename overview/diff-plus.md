Diff Plus improves BB's Diff tab with a folder tree beside the file list, plus a few views that make a large change quicker to find your way around. It adds to the tab: nothing of BB's is replaced, and it doesn't rebuild features BB already has.

## Features

- **Folder tree** beside the file list
  - File count and +/- per folder, so you see where a change lands
  - Click a folder or file to show only it; click again, or **Changes**, for everything
  - Click a folder's icon to open or close it; one button opens or closes them all
- **Sticky folders:** open folders stay pinned at the top as you scroll through them
- **File icons and git letters:** A added, M modified, D deleted, R renamed; a coloured dot per folder
- **Tree or Flat view:** folders, or every file on one row with its folder beside it
- **Compact folders:** a folder holding only one folder shares its row
- **Synced view:** the tree in the same order as the file list
  - **Scroll sync:** the tree follows the list as you scroll
  - **Visible indicator lines:** a bar beside the files on screen
- **Recent commits:** your last 10, 20 or 50 commits in the scope picker, even merged ones (see below)
- **Follows the tab:** its scope and its **Filter files** menu; rows the path filter matches are tinted
- **Remembers your place:** open folders, the picked row and your place in the list come back after you open a file
- **Fits any width:** drag the tree's edge to resize it; in a narrow panel or the phone drawer it sits above the list

Every option is configurable, from the folder button in the tab's toolbar and the view button beside **Changes**.

## Works with BB's Diff tab

- Clicks filter through the tab's own filter box
- BB's search, filters, Viewed checkboxes, split view and "Add to chat" work as before
- The folder button in the tab's toolbar turns the tree off

## Recent commits and the merge base

BB's scope picker only lists commits made since the checkout's merge base, so commits that are already merged never show. Diff Plus works around that:

- Picking a recent commit moves the checkout's merge base back far enough for BB to list that commit
- The merge base is BB's own setting for the checkout, the one its base branch picker sets; git itself is never changed
- While it is moved, every thread on that checkout sees it: **All changes**, **Committed** and the branch's git status count those commits too
- It is put back when you pick any other scope, close the picker without picking, or the plugin stops or starts
- Each move and restore is logged (`bb plugin logs diff-plus`)
- Don't want this? Set **Recent commits** to Off in the folder button's menu

## Inspiration

VS Code: the Explorer tree, sticky scroll, compact folders, file icons and git decoration letters.

## Requirements

- BB 0.48 or later
- BB has no plugin slot in the Diff tab yet, so the tree finds it by its page structure; a BB update may need a plugin update

## Maintenance

- Releases follow semver
- Kept up to date with BB releases until BB supports these features natively
- Feature requests and bug reports are welcome: [open an issue](https://github.com/nfour/bb-plugins/issues)

## Credits

File icons from [vscode-icons](https://github.com/vscode-icons/vscode-icons), CC BY-SA 4.0.
