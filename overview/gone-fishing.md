## Fish while your agent works

When an agent starts a turn, a pixel-art pond opens on top of the thread's chat input and joins it as one box. The pond fishes by itself: it casts, waits for a bite, and reels the fish in. Click the pond, or focus it and hold Space, to take the rod. Click when a fish bites to hook it, hold to reel, and let go while the fish runs, or the line snaps. After 15 seconds without input, the pond goes back to fishing by itself.

When the turn ends, a fish already on the line still lands. Then a row above the chat input sums up the catch until the next turn or until you dismiss it.

## A flooded chat input

While the pond is open, water rises into the chat input, and the fish swimming behind your text are the pond's fish, in their own colors. Every bite is one of them swimming up to the hook, and the status line names it on the way. Rare and legendary fish glint, and a fish that gets away goes back into the pond, so you can try again.

Typing works as usual. The water sits behind the text and ignores clicks, and clicking the pond never takes focus from the chat input. Hide the pond with its chevron to keep a one-line status and a dry chat input.

## Maps, seasons, and the tackle box

**Pine Lake**, **Birch River**, and **Cattail Marsh** each have their own fish, 28 species in all, with rarities, size tiers from S to XL, and fish that only show up at dawn, dusk, or night. Legendary fish only land if you reel them in yourself. Seasons follow your calendar: spring blossoms, summer fireflies, autumn leaves, and winter snow and ice.

Open the **Tackle box** from the pond's toolbar to pick the map, pin a season, and dress your angler, boat, and dog. Birch River, Cattail Marsh, and most gear unlock from fish book milestones, such as 6 species for Birch River or a first legendary for a golden boat. Skin tones are always available.

## Fish book

The **Fish book** lists every species, the maps it lives in, how many you caught, and your best size. Open it from the pond's toolbar, the summary row, or the thread panel's new-tab menu.

## Data

Catches are stored in the plugin's own SQLite database on the bb server, and your look in its key-value storage, so both follow you between the desktop app and the browser. The plugin uses no account or external service.

bb has no plugin API for placing UI next to the chat input, so the pond finds it through bb's markup. If a bb update changes that markup, the pond falls back to bb's banner position. The pond honors reduced-motion settings and slows down when it is hidden or off screen. Requires bb 0.45 or newer.

Gone Fishing is inspired by Cast n Chill, a cozy pixel-art fishing game by Wombat Brawler. See it in motion in the [README](https://github.com/charpeni/bb-plugins/tree/main/plugins/gone-fishing#readme).
