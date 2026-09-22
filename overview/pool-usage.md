Keep the whole Account Pooler visible without opening a settings page.

## One account, one row

Open **Account usage** from the sidebar footer to see a single flat list. Every
row contains the Claude or Codex mark, the provider's subscription tier, one flat
usage bar, the percentage, and a tiny window/reset line. There are no cards,
provider group headings, separators, hover states, or status-dot clutter; the
disclosure itself is transparent and borderless.

The bar shows the window that actually limits the account right now. When a
window is spent, the row reports the spent window that clears last and its
reset, so an account with an empty 5-hour window but a spent weekly quota reads
`Weekly` and not an empty bar. When every window still has room, the row reports
the one closest to its limit. The bar remains neutral below 75%, changes to
warning yellow at 75%, and turns critical red at 90%; a row the pool cannot
route to is red with a red window/reset line regardless of the percentage.

## Live and local

The list refreshes every 30 seconds while open. Account Pooler continues to own
authentication, secret storage, routing, and upstream quota refreshes. Pool
Usage reads only the redacted account status already exposed by Account
Pooler's typed RPC. For a Codex account whose tier is missing there, it can
match the plan label from BB's official provider usage by account email;
credentials and tokens never enter the plugin or frontend.

Disabled, held, and unavailable accounts stay in place with quiet inline
states, preserving the pool's stable order without expanding the interface.
