## What you get

See the GitHub Copilot AI-credit or premium-request meter beside your other BB provider usage. The meter reports the quota displayed by your locally authenticated Copilot CLI and includes the current billing-cycle reset estimate.

## Requirements

Install and sign in to the GitHub Copilot CLI. This plugin also requires `tmux` on the BB host because Copilot renders its usage command in an interactive terminal.

## Privacy

The plugin starts the local Copilot CLI, reads its visible `/usage` output, and closes the temporary terminal session. It does not read or store Copilot credentials.
