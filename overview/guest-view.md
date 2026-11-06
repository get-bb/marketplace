## What you get

Guest View lets someone with no BB account follow one of your threads live in their browser and suggest prompts, while you stay in control. You start it from the thread's menu and send the link. The guest opens a page laid out like BB's own thread: your messages, the agent's replies, a "Working..." line while it runs, and a composer at the bottom.

A guest cannot change anything. They can only write a suggestion, and it waits in a card above your composer until you act on it.

## Sharing a thread

- Pick **Share with guest** in the thread's menu (⋯ in its header). The link is copied. The guest picks a name or keeps a suggested one such as "Quiet Otter".
- The card above your composer shows how many guests are connected, how long the link has been live out of how long it lasts, and how many suggestions are waiting.
- **Stop sharing** ends the link at once. It also ends when it expires (4 hours by default, 1 to 168), when the thread is archived or deleted, or when BB or the plugin stops.

## Prompt approval

- A suggestion never reaches the agent by itself. Open the card, read it, then choose **Use** (puts it in your composer for you to edit and send), **Use with the name** (adds "Lydia says:" so the agent knows who said it), **Copy** or **Dismiss**.
- Used and dismissed suggestions move to a collapsed history in the card.
- A guest only sees a small tick on each of their own prompts, never what you did with it.
- Guest text is reduced to plain text, and names cannot pass for the owner or the system.

## What a guest sees

- Your messages and the agent's replies, live, with Markdown and code.
- The agent's tool work only as counts, such as "Ran 3 commands, edited 2 files". No commands, paths, output, diffs or reasoning.
- Common secret shapes (API keys, tokens, private keys, passwords in URLs) are replaced before text leaves BB. This cannot catch everything, so share only threads you would be comfortable showing in full.

## Settings

The card's settings panel lists who is connected, with a **Kick** button for each guest, and sets when this link expires. It also holds switches for whether new guests see earlier messages, whether guests know about each other and see each other's prompts, and whether they see the model.

## Requirements and costs

- BB 0.48 or later.
- The link is a [Cloudflare quick tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/do-more-with-tunnels/trycloudflare/): a random trycloudflare.com address that needs no Cloudflare account. The shared text passes through Cloudflare, and anyone with the link can watch until it ends.
- It needs the separate cloudflared program. The plugin never installs it on its own: it shows the install command, and on Linux it can download one pinned release and check its SHA-256 first.
- Limits keep a link small: 10 pages watching at once, a few prompts a minute, and 200 prompts kept per share.
- Everything is held in memory. Reloading the plugin ends every share, and each new share gets a new address.

## Maintenance

- Releases follow semver.
- Feature requests and bug reports are welcome: [open an issue](https://github.com/nfour/bb-plugins/issues).

## Inspiration

T3 Code's [guest links](https://github.com/pingdotgg/t3code/blob/main/docs/user/guest-links.md).
