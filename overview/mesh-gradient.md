## Start from the thread

Open Mesh Gradient from a thread's right panel and it sits beside the conversation. Choose **Ask the agent** and the thread's agent proposes a few gradients that fit the project, each with its name and a one-line reason. They appear under **For this thread**, and a fresh panel opens on the one whose text reads best. Once you start editing, new proposals wait in the row instead of replacing your work.

## Edit on the canvas

Drag points to move them, click one to recolor it or change its falloff, double-click to add one, and press ⌘Z to undo. You can also start from a seed, one of six style palettes, or your own base color.

## Check it where it will live

A badge on the canvas names the text color that reads best, such as White text · Readable, Black text · Large text only, or Text is hard to read, using WCAG contrast. Switch the preview between Canvas, a 1200×630 OG card, a hero, and an avatar. The OG card and hero draw sample copy so you can see whether a headline holds up.

## Hand it back

- **Send to agent** saves the gradient and writes the request into the composer with the exact values attached. On an OG card, hero, or avatar it also names the surface and the readable text color, or asks for a scrim when neither color works.
- Mention a saved gradient in any thread with `@gradient`.
- **Export PNG** renders the current surface at full size and attaches it to the project.
- **Write token file** writes your library into the thread's checkout as CSS custom properties, Tailwind, or TypeScript tokens.
- Agents can propose, generate, and read gradients with the `mesh_gradient` tool or `bb mesh-gradient` commands.

The six palettes also ship as bb themes in Settings → Appearance.
