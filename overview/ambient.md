## What you get

A GLSL scene runs behind bb's interface and reacts to your agents. Each working agent is a character in the scene, a thread waiting on you pulses, a finished turn sends out a ripple, and an error ripples red. Frosted glass sits behind the thread, the composer, the side panels, and the header, so text stays readable over any scene.

## Ten built-in scenes

Tide, Fireflies, Contour, Atomic Comics, Poppy Hill, Lighthouse Cove, Starry Fjord, Jellyfish Tidepool, Koi Pond, and Red Alarm. Your agents belong to each picture: fireflies over a meadow, poppies on a windy hill, koi circling a pond, pins on a topographic map.

## Tune the scene

Open **Ambient** in the sidebar footer to switch scenes, drag the scene's sliders, and recolor its four-color palette. Changes save as you make them, and ⌘Z undoes them. Display settings control how much of the scene shows through bb, how fast it moves, its render resolution on this device, and the glass opacity. Preview buttons show how the scene reacts when an agent starts, finishes, or errors.

## Paint your own

Choose **Create a scene** and describe one in your own words. An agent picks it up in a new thread, expands it into a concept, writes the shader with its own sliders, checks a captured frame for readability and per-frame cost, and saves the scene to your library.

**Daily scene** sets up a bb automation that paints a new scene once a day after an hour you pick. It skips the day when no bb window is open.

## For agents and the terminal

Any agent can work on the background through the `ambient` tool: read the shader contract, write a scene, get compile errors back, look at a captured frame, and save the result. When an agent looks, bb's text is drawn as bars, so none of your thread content reaches the model. In a terminal, `bb ambient` loads scenes, sets sliders and palettes, and turns the background on or off.

## Requirements

Needs WebGL 2, which current desktop browsers and the bb desktop app support. Runs entirely inside bb, with no external service or account. Creating a scene, and each daily scene, runs an agent turn on your default provider.
