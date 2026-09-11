# Antigravity

Adds Google Antigravity as a bb provider (`acp-antigravity`) using the `agy` CLI and the `agy-acp` stdio adapter.

Install from the catalog, or:

```
bb plugin install antigravity
```

On load the plugin downloads `agy-acp` if it is missing and registers the provider. You still need the official `agy` CLI installed and signed in:

```
curl -fsSL https://antigravity.google/cli/install.sh | bash
```

This listing is separate from **Google Antigravity (ACP)**, which uses Google's official `agy_acp_server.par`. This plugin talks to `agy` through [agy-acp](https://github.com/shubzkothekar/antigravity-acp), normalizes Gemini 3.x model families, and keeps a turn open when print-mode `agy` yields on background work.

Source: https://github.com/amrtawfik160/bb-plugin-antigravity
