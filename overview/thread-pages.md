## What you get

An agent working on a task often has more to show you than chat can carry: a comparison, a diagram, a set of choices,
a decision only you can make. With Thread Pages every session writes one web page for its task, and you answer from
inside that page. Your answer arrives as the agent's next message.

Each page is a complete HTML document written for that one task, not a template with slots. A chart, a diagram you
click, a decision sheet or a multi-step wizard: the agent writes what the task needs. The plugin supplies the host,
never the design.

## How it works

- The agent runs `bb pages init`, writes `index.html` in the session's own storage, and saves it. Saving publishes it.
- You open one stable link in bb, in a browser or on your phone. It works over bb Connect, with no second port or
  public URL. The page fills the window with nothing drawn around it.
- Forms reply to the session with no code, blank answers included. A control anywhere on the page can join a form, so
  you answer beside what you are reading. Every text field takes dictation and files.
- Stylesheets, scripts, images and data sit beside the page, nested as you like. Other `.html` files open in place.
- When the agent rewrites the page while you are typing, the new version waits until you pause and keeps your text.
- A page can list, message, start and stop sessions, answer an agent's question or a permission request, and show
  another session's page inside it. Anything that reaches another session asks you once.

## Home

A home page ships with the plugin. It lists your sessions by what needs you and by workspace, with unsent drafts and
the pages you let answer other sessions, and lets you open, stop or archive a session or start work in a workspace.
To use your own home, ask a session to build one and run `bb pages home` there.

## Safety

Page code runs in an opaque-origin sandbox with no bb cookie, no token, no access to the surrounding bb page and no raw
API. It can reach the internet. It reaches bb only through named, validated capabilities, and anything that affects
another session waits for your confirmation.

## Requirements

- bb 0.42 or later.
- From install, the plugin adds a short standing instruction to each new session so it writes a page. Turn off
  **Agent instructions** in the plugin's settings to stop that.
- A page's own files are carried inside the document it is served as; the page's script reads them through the shell.
  Other services work with a token you give the page; sign-in flows do not.
- Updating from 1.9: the command is `bb pages` (was `bb thread-page`), the bar is gone, and 1.9's stored grants,
  page storage and offline copies are removed once on the first start. Pages themselves are kept.
