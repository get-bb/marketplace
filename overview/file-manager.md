## What you get

- A **File Manager** page in the sidebar and a tab beside any thread, both showing the machine the bb server runs on rather than the one your browser runs on.
- A list with sizes and dates, folders that expand in place, a gallery of thumbnails, a filter over the rows, and an address bar that takes a pasted path.
- Uploads by drag and drop, whole folders included. They go in chunks, keep running while you work elsewhere in bb, and resume after a dropped connection. Downloads stream from disk, so a 10 GB file costs the browser no memory.
- Rename, move, copy, delete and new folder, with cut and paste or drag and drop. A name clash becomes `name (1).ext` instead of an overwrite.
- Bookmarks for up to fifty folders, a start folder chosen with a folder browser, and the folder you were last in when you come back.

## Reading files

Double-click, Enter or **Open** shows a file. Beside a thread it opens in bb's own preview panel; on the full page the plugin shows it itself: images, PDF, video and audio in place, Markdown rendered, everything else with syntax highlighting. Space gives a quick look without leaving the list. **Properties** lists size, times, permissions, owner and where a symlink points, and adds up a folder's size on request.

## Archives

zip, tar, tar.gz, tar.bz2, tar.xz, 7z and rar archives open as a folder tree without being extracted: select one and press Space. Sizes, dates and encrypted members are shown. **Extract…** runs as a background job you can cancel, into a staging folder that is checked before anything is moved into place.

## Working with the agent

Type `@` in any composer to mention a file from this machine, or use **Add to chat** in the row menu. The file is read when the message is sent, so the agent never gets a stale copy. Right-click a file link in a message and **File location** opens its folder with the file selected. The tab beside a thread has a button that jumps to the folder the thread works in, and a setting makes the tab start there.

## On a phone

Tick one or more rows and an **Actions** bar appears. It opens the whole row menu as a sheet from the bottom, and a long press no longer turns a row into a drag.

## Limits and requirements

Everything stays inside the home folder of the user bb runs as, and every path is resolved and checked on the server before a byte moves. Extraction uses `tar`, `unzip` and `7z` on that machine. Looking inside tar archives needs GNU `tar`, and 7z and rar need `7z`; zip needs nothing. Extracting rar needs a `7z` build with the RAR codec, packaged as `7zip-rar` on Debian and Ubuntu.
