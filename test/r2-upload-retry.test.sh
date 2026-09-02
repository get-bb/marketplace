#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "$0")/../scripts/r2-upload.sh"

fake_attempts=0
fake_failures=2
observed_delays=()
fake_wrangler() {
  ((fake_attempts += 1))
  if (( fake_attempts <= fake_failures )); then
    return 1
  fi
}

sleep() {
  observed_delays+=("$1")
}

WRANGLER_BIN=fake_wrangler
r2_put_with_retry "test-bucket/test-object" --file test-file --remote

if (( fake_attempts != 3 )); then
  echo "Expected 3 attempts, but received $fake_attempts." >&2
  exit 1
fi

if [[ "${observed_delays[*]}" != "2 5" ]]; then
  echo "Expected delays 2 and 5, but received ${observed_delays[*]}." >&2
  exit 1
fi

fake_attempts=0
fake_failures=4
observed_delays=()
if r2_put_with_retry "test-bucket/test-object" --file test-file --remote; then
  echo "Expected the retry helper to fail after 4 attempts." >&2
  exit 1
fi

if (( fake_attempts != 4 )); then
  echo "Expected 4 attempts, but received $fake_attempts." >&2
  exit 1
fi

if [[ "${observed_delays[*]}" != "2 5 10" ]]; then
  echo "Expected delays 2, 5, and 10, but received ${observed_delays[*]}." >&2
  exit 1
fi

echo "The retry tests passed."
