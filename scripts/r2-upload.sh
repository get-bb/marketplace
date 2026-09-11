#!/usr/bin/env bash

r2_put_with_retry() {
  local attempt=1
  local max_attempts=4
  local wrangler_bin="${WRANGLER_BIN:-wrangler}"
  local -a delays=(2 5 10)

  while true; do
    if "$wrangler_bin" r2 object put "$@"; then
      return 0
    fi

    if (( attempt >= max_attempts )); then
      echo "R2 upload failed after $max_attempts attempts." >&2
      return 1
    fi

    local delay="${delays[$((attempt - 1))]}"
    echo "R2 upload attempt $attempt failed. Retry in $delay seconds." >&2
    sleep "$delay"
    ((attempt += 1))
  done
}
