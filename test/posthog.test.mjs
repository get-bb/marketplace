import assert from "node:assert/strict";
import test from "node:test";
import { queryHogQL } from "../scripts/posthog.mjs";

const TIMEOUT_BODY = JSON.stringify({
  type: "server_error",
  detail:
    "Query has hit the max execution time before completing. See our docs for how to improve your query performance.",
});

function stubFetch(t, answers) {
  process.env.POSTHOG_PROJECT_ID = "1";
  process.env.POSTHOG_API_KEY = "test-key";
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, init) => {
    calls.push({ url, init });
    const [status, body] = answers[Math.min(calls.length, answers.length) - 1];
    return new Response(body, { status });
  });
  t.mock.method(console, "error", () => {});
  return calls;
}

const ok = [200, JSON.stringify({ results: [["a", 1, 0]] })];

test("retries a query that hit PostHog's execution limit", async (t) => {
  const calls = stubFetch(t, [[504, TIMEOUT_BODY], ok]);
  assert.deepEqual(await queryHogQL("SELECT 1", { backoffMs: 0 }), [
    ["a", 1, 0],
  ]);
  assert.equal(calls.length, 2);
});

test("gives up after three execution-limit timeouts", async (t) => {
  const calls = stubFetch(t, [[504, TIMEOUT_BODY]]);
  await assert.rejects(queryHogQL("SELECT 1", { backoffMs: 0 }), /HTTP 504/);
  assert.equal(calls.length, 3);
});

test("does not retry other failures", async (t) => {
  for (const answer of [
    [401, '{"detail":"Invalid API key"}'],
    [504, "Gateway Timeout"],
    [500, TIMEOUT_BODY],
  ]) {
    const calls = stubFetch(t, [answer]);
    await assert.rejects(queryHogQL("SELECT 1", { backoffMs: 0 }));
    assert.equal(calls.length, 1, `retried HTTP ${answer[0]}`);
    t.mock.restoreAll();
  }
});
