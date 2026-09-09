## What you get

A speaker button appears on every message's action row. Press it and the
message starts playing, usually about a second later, because playback begins
on the first audio the voice service returns rather than waiting for the whole
message to be synthesized.

The player that appears holds pause, stop, a ten-second skip in each
direction, and a speed control from 0.75x to 2x. Speed is remembered per
browser, so the rate you like is still there next time. Speeding up does not
raise the pitch of the voice.

Stop means stop: it cancels the synthesis stream in flight instead of leaving
the rest to be generated and thrown away. Playback also ends on its own when
you switch to another thread or send a new prompt, so a message never follows
you somewhere else.

## How it works

Markdown is written to be read, not heard, so the text is flattened before it
is spoken. Fenced code becomes a short spoken marker instead of hundreds of
characters of syntax. Links keep their label and drop their target. Bare URLs
come out entirely, since a voice reads them one character at a time. Headings
gain a full stop so the voice lands before the next sentence, and table rows
become comma-separated clauses instead of a run of pipes.

Speech comes from the same online neural voices that Microsoft Edge uses for
its own read-aloud feature. The plugin speaks that protocol directly over a
web socket, so there is no Python, no command-line tool, and no other binary
to install alongside it. It also negotiates the client version the service
expects, and remembers what worked, so a service-side version bump does not
turn into a broken plugin.

Playback holds a few seconds of audio before it starts. That trades about a
second of startup for not running dry mid-sentence when the network hiccups,
which is what a phone on a slow link does.

Voice and a default speaking rate are plugin settings. `bb read-aloud status`
reports whether synthesis is reachable and which voice and client version are
in use, and `bb read-aloud voices` lists what the service offers.

## Requirements

Synthesis happens over the network, so it needs an internet connection. It
does not need an account, an API key, a subscription, or any paid service.

The source is at
[github.com/csells/bb-plugins](https://github.com/csells/bb-plugins).
