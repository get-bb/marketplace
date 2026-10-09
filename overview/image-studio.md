## What you get

A gallery of photos generated for the current BB project, in their real aspect ratios. People profiles with reference selfies so a named person stays recognizable. A generate form in the plugin panel, and in chat a Send form with model, frame, and size already filled from last time.

## How it works

Open **Image Studio** in BB's sidebar. The gallery is the home screen: WebP thumbnails, click to preview, prompt plus generate at the bottom. Profiles hold body details and up to three selfies plus an optional manicure photo used when hands are in frame. Settings turn models on and off through a searchable list, pick English or Russian, and store API keys (a typed key wins over Env Catalog).

Nano Banana 2 and Nano Banana Pro default to kie.ai; fal.ai remains available with `--gateway fal`. Size defaults to 2K. Muse Image runs on fal.ai only. GPT Image 2.5 (Flare/Sunburst), FLUX.2 Pro, Seedream 5.0 Pro, and Grok Imagine are opt-in in settings and run on both gateways. Generated files stay with the project; profiles are shared across projects.

In a thread, ask for a photo. The agent fills the prompt from the bundled skill template for that model, then calls `image_studio_generate` (not the CLI) so you can change model, aspect ratio, and size, then press Send.

## Requirements

BB 0.43 or later. A paid [fal.ai](https://fal.ai/) and/or [kie.ai](https://kie.ai/) API key. Muse Image needs fal.ai. The Env Catalog plugin is optional for storing those keys. Generation is billed by those providers, not by this plugin.
