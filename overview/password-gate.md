Lock bb behind a password you set in bb itself.

## What you get

- A full-screen **Unlock BB** panel in every app window until the correct
  password is entered.
- **Trust this device**, so a browser asks for the password once and then
  skips the prompt until the trust window ends.
- `bb password-gate` commands to check the lock state, reset a forgotten
  password, and revoke trusted devices.

## How it works

Set the password in Settings → Installed plugins → Password Gate → **Access
password**; it applies at once, and clearing the field opens the gate again.
The value is kept in a `0600` secrets file, never in the database.

Forgot it? The unlock panel covers the Settings page, so run
`bb password-gate reset` in a terminal: that clears the password, opens the
gate, and revokes every trusted device.

Verification happens on the server — the browser sends a candidate and receives
only whether it matched, so the password itself never leaves the server.

Trusted devices get a random server-issued token; the server keeps only its
hash, expires it after the configured number of days, and invalidates every
token when the password changes.

## For agents

The bundled skill tells an agent to check the gate with
`bb password-gate status`, revoke devices with `bb password-gate revoke`, and
never to ask for, echo, or store the password.
