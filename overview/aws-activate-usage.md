Keep the official AWS promotional-credit balance visible while you work in BB.

## What you get

- An **AWS credits** page with the estimated balance, amount used, expiration dates, and each active promotional credit.
- A compact footer card so the balance is one click away from every thread.
- Current-month credit allocation totals straight from AWS Billing.
- A reconnect button for AWS SSO or an executable authentication helper selected by the user.
- A cached last-known balance when an AWS session expires.

## Security

The plugin does not store access keys or session tokens. It invokes the local
AWS CLI with the configured profile and requests read-only Billing data. It
detects the account through AWS STS unless the user supplies a 12-digit account
ID. Reconnect uses `aws sso login` by default, or an optional executable helper
selected by the user.

## Requirements

- BB 0.46 or newer.
- AWS CLI v2 and a configured local profile.
- Permission to read AWS Billing credits and call STS GetCallerIdentity.
- An AWS account with promotional credits; AWS Activate is supported.

## Data timing

AWS marks the current bill as estimated and refreshes credit estimates on its
own schedule, normally daily. Marketplace model SKUs can temporarily appear as
AWS product identifiers until a bill is finalized.

## Terminal access

Use `bb aws-activate-usage summary`, `refresh`, or `login` for the same data
and actions outside the BB interface.
