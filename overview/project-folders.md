## What you get

A sidebar tree of projects, sections and subsections that are real folders on your devices, with the chats of each folder inside it. A chat started from a section runs with that folder as its working directory. Every heading has a new-chat button and a menu for new sections, rules, appearance, sorting, rename, change path and archive. Names turn bold when a chat below them is unread, inactive sections collapse after a set time (2 hours by default), and each list shows its newest chats up to a limit you choose.

## Rules beside the work

Projects and first- and second-level sections get AGENTS.md from a project or sections template when they are created. The plugin writes only between its own markers at the end of the file and never touches your text above them. Each project or section can use the shared template, its own template, or its own hand-written file. Custom rules can go into AGENTS.md and CLAUDE.md, into the instructions of chats started from BB, or both. A startup instruction adds a one-shot request to the first message of every new chat. Apply to existing sections rewrites every managed block at once.

## Your own look

Four ready-made styles: Standard, Monochrome, By level and By project. Per level, pick one of 118 icons in 7 groups or any emoji, one of 12 theme-aware colors or a custom color, and a fill: none, icon badge, left stripe or row background. Colors follow the level or the project. Any project or section can have its own icon, color, fill, chat sorting and chat limit, optionally inherited by nested sections. List density and nesting indent are adjustable.

## Archive and restore

Archive a section with nested sections, files and chats into a hidden folder inside the project. Restore returns everything to the original path and reopens the chats. Running chats block archiving, and restore never overwrites an occupied folder.

## Devices and moves

Keep a working copy of one project on several connected machines and switch between them with device tabs. Move a whole project folder, move a section, or re-link a section whose folder was renamed outside BB; the old path stays as a link so existing chats keep working. Moves work within one device and disk volume. Moving a chat between sections needs a BB core patch.

## Settings

The management page and the plugin page in BB settings show the same settings: Chat list, Appearance, AGENTS.md rules, Section archive, Import & export and Language. Settings are stored on the BB server and shared by every device; export and import them as JSON. The interface comes in 11 languages with English by default, chosen per browser.

## Requirements

BB 0.43 or later and connected macOS or Linux devices with local-path project sources. Windows paths are not supported. No account, API key or external service is needed. Chat history stays in BB; the plugin also exports it to a hidden .bb/chats folder inside each section, which is not a full backup. Some BB interfaces this plugin uses are experimental.
