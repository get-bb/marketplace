## What you get

An agent working on a task often has more to show you than chat can carry: a comparison, a diagram, a set of choices, a decision only you can make. With Thread Pages every session writes one web page for its task, and you answer from inside that page. Your answer arrives as the agent's next message.

Each page is a complete HTML document written for that one task, not a template with slots. A chart, a diagram you click, a decision sheet or a multi-step wizard: the agent writes what the task needs. The plugin supplies the host, never the design.

## How it works

- The agent runs `bb thread-page init`, writes `index.html` in the session's own storage, and saves it. Saving publishes it.
- You open one stable link in bb, in a browser or on your phone. It works over bb Connect, with no second port or public URL.
- Forms reply to the session with no code, blank answers included. A control anywhere on the page can join a form, so you answer beside what you are reading.
- Stylesheets, scripts, images and data sit beside the page, nested as you like. Other `.html` files open in place, and back, forward and reload work.
- An open page reloads when the agent saves, unless you are typing in it.
- A page can list, message, start, stop and archive sessions. Each of those effects shows a confirmation that bb words, not the page.

## Home

Every page links back to a home page that ships with the plugin. It lists your sessions by what needs you and by project, and lets you open, stop or archive a session or start work in a project. To use your own home, ask a session to build one and run `bb thread-page home` there.

## Safety

Page code runs in an opaque-origin sandbox with no bb cookie, no token, no access to the surrounding bb page and no raw API. It can reach the internet. It reaches bb only through named, validated capabilities, and anything that affects another session waits for your confirmation.

## Requirements

- bb 0.42 or later.
- From install, the plugin adds a short standing instruction to each new session so it writes a page. Turn off **Agent instructions** in the plugin's settings to stop that.
- A page's own files are carried inside the document it is served as, so page script cannot `fetch()` them as data. Other services work with a token you give the page; sign-in flows do not.
