// PostHog HogQL access shared by the stats and ranking builds.
//
// Environment:
//   POSTHOG_API_KEY     personal API key with project read access (secret)
//   POSTHOG_PROJECT_ID  numeric project id
//   POSTHOG_HOST        defaults to https://us.posthog.com

function required(name) {
  const value = process.env[name];
  if (value === undefined || value.trim().length === 0) {
    console.error(`error: ${name} is not set`);
    process.exit(1);
  }
  return value.trim();
}

export async function queryHogQL(query) {
  const host = (process.env.POSTHOG_HOST ?? "https://us.posthog.com").replace(
    /\/+$/,
    "",
  );
  const projectId = required("POSTHOG_PROJECT_ID");
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${required("POSTHOG_API_KEY")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: { kind: "HogQLQuery", query },
    }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    // The body names the real problem (bad key, wrong project, HogQL error).
    const detail = await response.text().catch(() => "");
    throw new Error(
      `PostHog query failed with HTTP ${response.status}: ${detail.slice(0, 500)}`,
    );
  }
  const body = await response.json();
  if (!Array.isArray(body?.results)) {
    throw new Error("PostHog answer has no results array");
  }
  return body.results;
}
