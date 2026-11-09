## What you get

Everything sits under **Settings → Plugins → UI Tweaks**, in the Interface, Icons and Open With sections, and most changes apply as you toggle them.

**Clearer hierarchy.** Bolder thread titles, slightly larger chat prose, semibold bold text, and quieter page-header and side-panel icons. Headings and code stay put. On by default.

**Hide Steer labels.** Removes the Steer tag on messages that steered a running agent, including pending and failed ones. Off by default.

**Better syntax highlighting.** Richer CSS, TypeScript and JavaScript tokenizers in the File Editor. Your theme still picks the colours. Off by default.

**Prompt placement.** Put the New thread prompt at the top, center or bottom of the empty thread, and set its starting height to standard, two lines or one line. It still grows as you type.

**Icon packs.** Switch BB's interface icons between BB Default, Lucide, Iconoir and Tabler Outline. The change applies live. Provider logos and brand marks are left alone.

**Spinner.** The Loading and Spinner icons follow the icon pack or use their own style.

**Open With.** Hide workspace apps from the Open With menu and chat file-link menus, by category (Default app, File managers, Editors & IDEs, Terminals, Other applications) or one at a time. Hidden apps stay in the list so you can bring them back.

**Panel tab shortcuts.** Alt+1 to Alt+9 switch to the first nine tabs of the focused right panel. Rebind them under BB's keyboard shortcuts as **Right panel: switch to tab N**.

**Sidebar animation.** The left sidebar opens and closes with the same motion as the right panel. **Disable sidebar and panel animations** makes both instant.

**Reset to defaults.** One button restores every setting.

## How it works

Settings are saved on the BB server and shared by every device signed in to the same BB. Each client keeps a local copy so the interface applies instantly. Icon artwork ships inside the plugin, so nothing is downloaded at runtime. Workspace apps are discovered from BB's local host daemon; a client that cannot reach it keeps the last saved list. The plugin sends no data to an external service.

## Requirements

BB 0.49 or newer, with plugin SDK `>=0.6.132 <0.7`. No external service, account or separate install.

---

Not affiliated with, endorsed by or sponsored by Anysphere, Inc. Cursor is a trademark of Anysphere, Inc.
