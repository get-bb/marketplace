Choosing which model to point an agent at usually means opening five vendor pricing pages and doing
arithmetic. The Model pricing page puts every model from the providers you follow in one table, with
the numbers that decide the choice side by side.

## What you get

- A **Model pricing** page in the sidebar listing each model's price per million tokens in and out,
  its context window, its longest reply, and whether it can reason, call tools, return structured
  output and take a temperature.
- A **Relative** column that ranks every model against the cheapest one on screen, so the cheapest
  reads 1.0× and the rest say how many times more they cost. How much of that blend is input is your
  choice: 80/20 suits an agent reading a repository, 25/75 a chat drafting prose.
- Sorting by any column, search by name, and coloured provider dots that hide a provider's models for
  a moment without fetching anything.
- Every row opens that model's own page on the provider's site.
- A card per model in a narrow window, and palette commands for the page and its settings.

## Where the prices come from

Anthropic, OpenAI and Fireworks AI publish no pricing API, so those three and Ollama Cloud are read
from the community catalog at https://models.dev, and OpenRouter from its own public list. The bb
server fetches them, keeps them for twelve hours, and refreshes on request; an unchanged catalog costs
one round trip. If a source cannot be reached, its last prices stay on screen with a note saying how
old they are.

## Settings

- One switch per provider: a provider switched off is neither fetched nor shown.
- The input/output blend used by the Relative column.
- Whether to list only models that can call tools (on by default). Models whose provider does not say
  are always shown.

## What it needs

- No account, key or login: only public price lists are read.
- Network access from the machine running the bb server to models.dev and openrouter.ai.

## Limits

- Prices are as current as their source; the vendor's own pricing page remains the authority.
- Only per-token prices are shown: no cached-input, batch, image or audio pricing.
- With OpenRouter on, a model sold both directly and through the gateway appears twice, once per price.
