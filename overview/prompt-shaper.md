## How it works

Write as roughly as you like, then choose **Improve prompt** in the composer. The plugin sends only the current draft to a hidden helper thread. The helper never reads the transcript of the thread you are in. It rewrites the draft into one paste-ready prompt and puts the result back in the composer for you to review. Nothing is sent until you send it.

While the rewrite runs, the composer is locked so edits cannot conflict, and the same button cancels the request.

## Write your own instructions

The helper follows the **Rewrite instructions** setting. It comes with the default guidance written out in full, so you can read exactly what the helper is told, then edit it in the plugin's settings or with `bb plugin config prompt-shaper set instructions`. Clear it to restore the default. The output format and the rule against running your draft stay fixed, so custom instructions cannot break the in-place replacement.

When the composer targets Claude Fable 5.1, the helper also applies bundled Fable prompting guidance.

## Requirements

The helper runs one turn on the source thread's provider and execution settings, or on a fixed provider and model you pick in settings. It uses that provider's normal quota.
