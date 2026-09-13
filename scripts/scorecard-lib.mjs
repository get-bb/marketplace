// Pure scorecard logic: repository health scoring, release code scanning, and
// document assembly. Everything here is a function of its arguments so the
// unit tests can cover the scoring rules without a network.
//
// Two independent scores, kept separate on purpose:
//
//   health  what the repository around the plugin looks like — is anyone home.
//   review  what the published release code does — automated scans only.
//
// A plugin can be actively maintained and still ship something the review
// flags, and a dormant repository can hold blameless code. Averaging the two
// into one number would hide both cases.

/** Grades run worst to best; the store renders one filled bar per level. */
export const GRADES = Object.freeze(["failing", "poor", "fair", "good", "excellent"]);
export const GRADE_BARS = Object.freeze({
  failing: 1,
  poor: 1,
  fair: 2,
  good: 3,
  excellent: 4,
});

/** Review verdicts. `pending` means the scan could not run, not that it passed. */
export const REVIEW_VERDICTS = Object.freeze(["failed", "flagged", "passed", "pending"]);

const DAY = 24 * 60 * 60 * 1000;

/** A finding severity decides the verdict; the labels are what users read. */
export const SEVERITIES = Object.freeze(["pass", "info", "warn", "fail"]);

function severityRank(severity) {
  return SEVERITIES.indexOf(severity);
}

export function finding(severity, check, message) {
  return { severity, check, message };
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

/**
 * Score the four health sections from repository signals.
 *
 * `signals` carries only values a caller can read from a forge API:
 *   hasReadme, hasLicense, hasContributing, hasDescription  booleans
 *   lastCommitAt, lastReleaseAt                             ISO strings or null
 *   commitsPastYear, contributors                           numbers
 *   openIssues, closedIssues                                numbers
 *   installs, stars                                         numbers
 *
 * `now` is injected so the tests do not drift with the clock.
 */
export function scoreHealth(signals, now = Date.now()) {
  const sections = [
    scoreHygiene(signals),
    scoreMaintenance(signals, now),
    scoreResponsiveness(signals),
    scoreAdoption(signals),
  ];

  // Maintenance is the section that decides whether a plugin is a risk to
  // install, so it caps the overall grade: a beautifully documented plugin
  // last touched three years ago is not "excellent".
  const maintenance = sections.find((section) => section.id === "maintenance");
  const mean =
    sections.reduce((total, section) => total + section.points, 0) / sections.length;
  const grade = capGrade(gradeFromPoints(mean), maintenance.grade);

  return {
    grade,
    bars: GRADE_BARS[grade],
    summary: healthSummary(grade, maintenance),
    sections,
  };
}

function scoreHygiene({ hasReadme, hasLicense, hasContributing, hasDescription }) {
  const present = [];
  const missing = [];
  for (const [label, value] of [
    ["readme", hasReadme],
    ["license", hasLicense],
    ["contributing guide", hasContributing],
    ["description", hasDescription],
  ]) {
    (value ? present : missing).push(label);
  }
  // A readme and a license are the two a user actually depends on; the other
  // two are nice to have, so they cannot on their own drag the section down.
  const weighted =
    (hasReadme ? 2 : 0) +
    (hasLicense ? 2 : 0) +
    (hasContributing ? 1 : 0) +
    (hasDescription ? 1 : 0);
  return {
    id: "hygiene",
    label: "Hygiene",
    points: weighted / 6,
    grade: gradeFromPoints(weighted / 6),
    detail:
      missing.length === 0
        ? "Readme, license, contributing guide, and description all present."
        : `Present: ${present.join(", ") || "nothing"}. Missing: ${missing.join(", ")}.`,
  };
}

function scoreMaintenance({ lastCommitAt, lastReleaseAt, commitsPastYear }, now) {
  const commitAge = ageInDays(lastCommitAt, now);
  const releaseAge = ageInDays(lastReleaseAt, now);
  const recency = commitAge === null ? 0 : decay(commitAge, 30, 540);
  const releaseRecency = releaseAge === null ? 0 : decay(releaseAge, 60, 730);
  const volume = clamp((commitsPastYear ?? 0) / 24, 0, 1);
  const points = recency * 0.5 + releaseRecency * 0.3 + volume * 0.2;
  return {
    id: "maintenance",
    label: "Maintenance",
    points,
    grade: gradeFromPoints(points),
    detail: [
      commitAge === null ? "No commit date available." : `Last commit ${describeAge(commitAge)}.`,
      `${commitsPastYear ?? 0} ${commitsPastYear === 1 ? "commit" : "commits"} in the past year.`,
      releaseAge === null ? "No release found." : `Last release ${describeAge(releaseAge)}.`,
    ].join(" "),
  };
}

function scoreResponsiveness({ openIssues, closedIssues, contributors }) {
  const total = (openIssues ?? 0) + (closedIssues ?? 0);
  // With almost no issue history there is nothing to be responsive to, so the
  // ratio is neutral rather than a zero that would punish a young plugin.
  const ratio = total < 5 ? 0.6 : (closedIssues ?? 0) / total;
  const bus = clamp((contributors ?? 0) / 3, 0, 1);
  const points = ratio * 0.7 + bus * 0.3;
  return {
    id: "responsiveness",
    label: "Responsiveness",
    points,
    grade: gradeFromPoints(points),
    detail:
      total === 0
        ? `No issues yet. ${contributors ?? 0} contributors.`
        : `Closed ${Math.round(ratio * 100)}% of ${total} issues. ` +
          `${contributors ?? 0} ${contributors === 1 ? "contributor" : "contributors"}.`,
  };
}

function scoreAdoption({ installs, stars }) {
  // Log scale: the gap between 10 and 100 installs says far more about a
  // plugin than the gap between 10k and 100k.
  const installPoints = clamp(Math.log10((installs ?? 0) + 1) / 3, 0, 1);
  const starPoints = clamp(Math.log10((stars ?? 0) + 1) / 3, 0, 1);
  const points = installPoints * 0.7 + starPoints * 0.3;
  return {
    id: "adoption",
    label: "Adoption",
    points,
    grade: gradeFromPoints(points),
    detail: `${formatCount(installs ?? 0)} installations, ${formatCount(stars ?? 0)} stars.`,
  };
}

function healthSummary(grade, maintenance) {
  if (grade === "excellent" || grade === "good") return "This plugin is actively maintained.";
  if (maintenance.grade === "failing") return "This plugin looks dormant.";
  if (grade === "fair") return "This plugin is maintained irregularly.";
  return "This plugin shows little recent activity.";
}

// ---------------------------------------------------------------------------
// Review scans
// ---------------------------------------------------------------------------

/**
 * Capability probes. Each maps a call surface in the release sources to a
 * label a user can reason about before installing. BB has no declared plugin
 * permission manifest yet, so these are derived, not verified: they say what
 * the code can reach, not what a manifest promised.
 */
export const CAPABILITY_PROBES = Object.freeze([
  {
    id: "shell",
    label: "Shell Execution",
    severity: "warn",
    description:
      "Runs commands on the host (`child_process`, `execFile`, `spawn`). A plugin with this can do anything the user can.",
    patterns: [/\bnode:child_process\b/, /from\s+["']child_process["']/, /\b(?:execFile|execFileSync|spawnSync)\s*\(/],
  },
  {
    id: "filesystem",
    label: "Filesystem Access",
    severity: "info",
    description: "Reads or writes files through `node:fs` beyond the plugin's own data directory.",
    patterns: [/\bnode:fs\b/, /from\s+["']fs(?:\/promises)?["']/],
  },
  {
    id: "network",
    label: "Network Access",
    severity: "info",
    description: "Makes outbound requests (`fetch`, `http`, `WebSocket`).",
    patterns: [/\bfetch\s*\(/, /\bnode:https?\b/, /\bnew\s+WebSocket\s*\(/, /\bnode:net\b/],
  },
  {
    id: "secrets",
    label: "Secrets Access",
    severity: "warn",
    description: "Reads stored plugin secrets or process environment variables.",
    patterns: [/\.secrets\b/, /\bsecretRef\b/, /\bprocess\.env\b/],
  },
  {
    id: "http-routes",
    label: "HTTP Routes",
    severity: "info",
    description: "Registers HTTP routes on the BB daemon that other software on the machine can call.",
    patterns: [/registerRoute\s*\(/, /\broutes\s*:\s*\[/, /addRoute\s*\(/],
  },
  {
    id: "host-daemon",
    label: "Host Daemon",
    severity: "warn",
    description:
      "Ships a `bb.host` bundle, so part of the plugin runs as its own process on the user's machine rather than inside BB.",
    patterns: [],
  },
  {
    id: "thread-content",
    label: "Thread Content",
    severity: "info",
    description: "Reads thread messages, agent output, or file diffs.",
    patterns: [/\bthreads?\.(?:get|list|events|messages)\b/, /\bonThreadEvent\b/, /\bsubscribeThread\b/],
  },
  {
    id: "terminal",
    label: "Terminal Control",
    severity: "warn",
    description: "Opens or writes to terminal sessions on the machine.",
    patterns: [/\bterminals?\.(?:create|write|send)\b/, /\bnode-pty\b/],
  },
  {
    id: "clipboard",
    label: "Clipboard Access",
    severity: "info",
    description: "Reads or writes the system clipboard.",
    patterns: [/\bnavigator\.clipboard\b/, /\bclipboard\.(?:read|write)/],
  },
]);

/** Hosts that exist to receive data anonymously. A plugin has no honest use for one. */
const EXFIL_HOSTS = Object.freeze([
  "pastebin.com",
  "paste.ee",
  "hastebin.com",
  "transfer.sh",
  "requestbin.com",
  "pipedream.net",
  "webhook.site",
  "ngrok.io",
  "trycloudflare.com",
  "discord.com/api/webhooks",
  "telegram.org",
  "api.telegram.org",
]);

const URL_PATTERN = /\bhttps?:\/\/([A-Za-z0-9._-]+(?::\d+)?)(\/[^\s"'`)]*)?/g;
const IP_HOST_PATTERN = /^\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?$/;
const OBFUSCATED_NAME_PATTERN = /_0x[0-9a-f]{4,}/;
const LONG_LITERAL_PATTERN = /["'`][A-Za-z0-9+/=]{1200,}["'`]/;
const DYNAMIC_EVAL_PATTERN = /\b(?:eval|new\s+Function)\s*\(\s*(?!["'`])/;
/**
 * Decoding a payload is ordinary; evaluating one is ordinary in a REPL. A
 * file that does both is the shape a dropper takes, so the pair is the
 * signal, not either half.
 */
const DECODE_PATTERN = /\b(?:atob|fromCharCode)\s*\(|Buffer\.from\s*\([^)]*["']base64["']/;

/**
 * Scan the extracted release sources.
 *
 * `files` is an array of `{ path, text }`. The caller decides what counts as a
 * source file; this function assumes the list already excludes build output,
 * dependencies, and binary content.
 *
 * `manifest` is the plugin's package.json, used for the declared `bb` surface.
 */
export function scanRelease(files, manifest = {}) {
  const findings = [];
  const capabilities = [];
  const hosts = new Set();

  const hits = new Map(CAPABILITY_PROBES.map((probe) => [probe.id, []]));
  const obfuscation = [];
  const generated = [];

  for (const { path, text } of files) {
    // Data files legitimately hold long lines and encoded blobs; running the
    // obfuscation heuristics over them only produces false positives.
    const isData = path.endsWith(".json");
    if (!isData) {
      if (OBFUSCATED_NAME_PATTERN.test(text)) {
        obfuscation.push(`${path}: hexadecimal identifier names typical of a code obfuscator.`);
      }
      if (DECODE_PATTERN.test(text) && DYNAMIC_EVAL_PATTERN.test(text)) {
        obfuscation.push(`${path}: decodes a payload and evaluates a non-literal value.`);
      }

      // A long line or a dynamic eval is what a bundler produces as often as
      // an obfuscator, so it is reported and not treated as a verdict.
      if (DYNAMIC_EVAL_PATTERN.test(text)) {
        generated.push(`${path}: evaluates a value that is not a literal.`);
      }
      if (LONG_LITERAL_PATTERN.test(text)) {
        // Real code carries long literals too — an inlined SVG, a prompt, a
        // data URL — so this is worth showing and not worth failing over.
        generated.push(`${path}: an encoded string literal longer than 1200 characters.`);
      }
      if (longestLineLength(text) > 5000) {
        generated.push(`${path}: a source line longer than 5000 characters.`);
      }
    }

    for (const probe of CAPABILITY_PROBES) {
      if (probe.patterns.some((pattern) => pattern.test(text))) hits.get(probe.id).push(path);
    }

    for (const match of text.matchAll(URL_PATTERN)) {
      hosts.add(`${match[1]}${match[2]?.startsWith("/api/webhooks") ? match[2] : ""}`);
    }
  }

  // A declared bb.host bundle is a manifest fact, not a code pattern.
  if (manifest?.bb?.host !== undefined) hits.get("host-daemon").push("package.json");

  for (const probe of CAPABILITY_PROBES) {
    const paths = hits.get(probe.id);
    if (paths.length === 0) continue;
    capabilities.push({
      id: probe.id,
      label: probe.label,
      severity: probe.severity,
      description: probe.description,
      evidence: paths.slice(0, 5),
    });
  }

  findings.push(
    obfuscation.length === 0
      ? finding("pass", "obfuscation", "No obfuscated code detected.")
      : finding(
          "fail",
          "obfuscation",
          `Obfuscated code in the published sources. ${obfuscation.slice(0, 3).join(" ")}`,
        ),
  );
  if (generated.length > 0) {
    findings.push(
      finding(
        "warn",
        "generated",
        `Minified or generated code committed to the sources, which no one can review. ${generated.slice(0, 3).join(" ")}`,
      ),
    );
  }

  const suspicious = [...hosts].filter((host) =>
    EXFIL_HOSTS.some((bad) => host === bad || host.startsWith(`${bad}/`) || host.endsWith(`.${bad}`)),
  );
  const rawIps = [...hosts].filter((host) => IP_HOST_PATTERN.test(host) && !host.startsWith("127."));
  if (suspicious.length > 0) {
    findings.push(
      finding("fail", "network", `Contacts an anonymous drop host: ${suspicious.join(", ")}.`),
    );
  } else if (rawIps.length > 0) {
    findings.push(
      finding("warn", "network", `Contacts a hardcoded IP address: ${rawIps.join(", ")}.`),
    );
  } else {
    findings.push(finding("pass", "network", "No suspicious network patterns found."));
  }

  return { findings, capabilities, hosts: [...hosts].sort() };
}

/** OSV answers per queried package; turn them into one dependency finding. */
export function dependencyFinding(vulnerabilities) {
  if (vulnerabilities === null || vulnerabilities === undefined) {
    return finding("info", "dependencies", "Dependency scan not available: the release ships no lockfile.");
  }
  if (vulnerabilities.length === 0) {
    return finding("pass", "dependencies", "No vulnerable dependencies found.");
  }
  const named = vulnerabilities
    .slice(0, 3)
    .map((item) => `${item.package}@${item.version} (${item.id})`)
    .join(", ");
  const severity = vulnerabilities.some((item) => item.critical) ? "fail" : "warn";
  return finding(
    severity,
    "dependencies",
    `${vulnerabilities.length} vulnerable ${vulnerabilities.length === 1 ? "dependency" : "dependencies"}: ${named}.`,
  );
}

export function licenseFinding(license) {
  if (!license) return finding("warn", "license", "No license found. The plugin has no stated terms of use.");
  if (/^(?:GPL|AGPL|LGPL)/i.test(license)) {
    return finding("info", "license", `License \`${license}\` is a copyleft license.`);
  }
  return finding("pass", "license", `License \`${license}\`.`);
}

export function provenanceFinding(source, attested) {
  if (source?.npm !== undefined) {
    return attested
      ? finding("pass", "provenance", "The published npm package carries a verified provenance attestation.")
      : finding("info", "provenance", "The npm package has no provenance attestation.");
  }
  return finding(
    "info",
    "provenance",
    "Provenance not available: the release is a Git tag, so nothing links the tag to a build.",
  );
}

/** Every review finding rolls into one verdict, worst severity wins. */
export function scoreReview(findings) {
  if (findings.length === 0) {
    return { verdict: "pending", bars: 0, summary: "The release has not been scanned yet.", findings };
  }
  const worst = findings.reduce(
    (rank, item) => Math.max(rank, severityRank(item.severity)),
    0,
  );
  const counted = findings.filter((item) => item.severity !== "pass").length;
  const verdict = worst === severityRank("fail") ? "failed" : worst === severityRank("warn") ? "flagged" : "passed";
  return {
    verdict,
    bars: verdict === "failed" ? 1 : verdict === "flagged" ? 3 : 4,
    summary:
      counted === 0
        ? "No issues found by automated scans of the latest release."
        : `${counted} ${counted === 1 ? "issue" : "issues"} found by automated scans of the latest release.`,
    findings: [...findings].sort((a, b) => severityRank(b.severity) - severityRank(a.severity)),
  };
}

// ---------------------------------------------------------------------------
// Document
// ---------------------------------------------------------------------------

/**
 * Compose the published sidecar. Like stats.json this is a separate document:
 * the v1 and v2 marketplace schemas are strict, scores move on their own
 * cadence, and a rescan must not rewrite the catalog every night.
 */
export function scorecardDocument(scorecards, generatedAt = new Date().toISOString()) {
  const plugins = {};
  for (const id of Object.keys(scorecards).sort()) plugins[id] = scorecards[id];
  return { schemaVersion: 1, generatedAt, plugins };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function gradeFromPoints(points) {
  if (points >= 0.85) return "excellent";
  if (points >= 0.65) return "good";
  if (points >= 0.45) return "fair";
  if (points >= 0.25) return "poor";
  return "failing";
}

function capGrade(grade, cap) {
  return GRADES.indexOf(grade) <= GRADES.indexOf(cap) ? grade : cap;
}

function clamp(value, low, high) {
  return Math.min(high, Math.max(low, value));
}

/** 1 until `fresh` days old, then straight down to 0 at `stale` days. */
function decay(days, fresh, stale) {
  if (days <= fresh) return 1;
  if (days >= stale) return 0;
  return 1 - (days - fresh) / (stale - fresh);
}

function ageInDays(iso, now) {
  if (!iso) return null;
  const time = Date.parse(iso);
  if (Number.isNaN(time)) return null;
  return Math.max(0, (now - time) / DAY);
}

function describeAge(days) {
  const whole = Math.round(days);
  if (whole <= 1) return "today";
  if (whole < 45) return `${whole} days ago`;
  if (whole < 365) return `${Math.round(whole / 30)} months ago`;
  const years = whole / 365;
  return `${years < 2 ? "over a year" : `${Math.round(years)} years`} ago`;
}

function longestLineLength(text) {
  let longest = 0;
  let start = 0;
  for (let index = 0; index <= text.length; index += 1) {
    if (index === text.length || text[index] === "\n") {
      longest = Math.max(longest, index - start);
      start = index + 1;
    }
  }
  return longest;
}

function formatCount(value) {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${value}`;
}
