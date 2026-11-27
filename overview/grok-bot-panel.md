Open the **Grok Bot** tab in any BB thread to chat with an individual Bot. The plugin doesn't pick or register a model for the BB thread.

Use the action on a BB message to prepare a Grok draft; use a Bot reply’s insert action to bring it into the BB draft. Neither action sends automatically. Two panels attached to the same Bot share its Grok conversation.

The visible chat refreshes automatically and shows reported Bot activity. Search the latest 200 entries or open a message thread. Send approval and reply return are separate settings. Reply instructions target the authorized BB CLI on the connected Mac, not the Grok cloud VM.

Grok Bot Desktop must be open and signed in on the selected Mac. The host plugin reuses that session to read and send, the same way the patched gbot CLI did, without running the CLI. It never shows or stores the token.
