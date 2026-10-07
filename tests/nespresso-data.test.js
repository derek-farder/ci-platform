const test = require("node:test");
const assert = require("node:assert/strict");
const demo = require("../nespresso-data.js");

test("synthetic cohort shares cover the full population", () => {
  const shareTotal = demo.dataset.cohorts.reduce((sum, cohort) => sum + cohort.share, 0);
  const customerTotal = demo.summarizeCohorts().reduce((sum, cohort) => sum + cohort.count, 0);

  assert.equal(shareTotal, 1);
  assert.equal(customerTotal, demo.dataset.customerCount);
});

test("issue ranking uses volume, preventability, and retention impact", () => {
  const ranked = demo.rankIssues();

  assert.equal(ranked[0].id, "blockage");
  assert.ok(ranked.every((issue, index) => index === 0 || ranked[index - 1].priorityScore >= issue.priorityScore));
  assert.equal(ranked[0].priorityScore, ranked[0].contacts * ranked[0].preventability * ranked[0].retentionImpact);
  assert.equal(demo.dataset.rules.setupSamNeverPairsAppRate, 0.20);
  assert.equal(demo.dataset.rules.weekOnePairingFailureAppNonConnection, 0.40);
  assert.notEqual(demo.dataset.rules.setupSamNeverPairsAppRate, demo.dataset.rules.weekOnePairingFailureAppNonConnection);
  assert.equal([...demo.dataset.issues].sort((a, b) => b.voiceAhtMinutes - a.voiceAhtMinutes)[0].id, "blockage");
  assert.equal([...demo.dataset.issues].sort((a, b) => b.chatRepeatRate - a.chatRepeatRate)[0].id, "pairing");
});

test("persona voice uses cohort evidence and declines unsupported questions", () => {
  const grounded = demo.answerPersonaQuestion("overdue-descaler", "Why did you leave descaling for later?");
  const unsupported = demo.answerPersonaQuestion("overdue-descaler", "What is your household income?");

  assert.equal(grounded.kind, "illustrative persona voice");
  assert.ok(grounded.evidence.length > 0);
  assert.equal(unsupported.evidence.length, 0);
  assert.match(unsupported.text, /do not have a grounded answer/);
  assert.throws(() => demo.answerPersonaQuestion("unknown-cohort", "Why?"), RangeError);
});

test("descale what-if is bounded, reproducible, and linked to its synthetic dataset", () => {
  const result = demo.simulateDescaleNudge();
  const repeated = demo.simulateDescaleNudge();

  assert.equal(result.status, "simulated");
  assert.equal(result.datasetId, demo.dataset.id);
  assert.equal(result.datasetVersion, demo.dataset.version);
  assert.deepEqual(result.midpoint, repeated.midpoint);
  assert.ok(result.midpoint.crcContactsAvoided > 0);
  assert.ok(result.ranges.crcContactsAvoided.low <= result.midpoint.crcContactsAvoided);
  assert.ok(result.ranges.crcContactsAvoided.high >= result.midpoint.crcContactsAvoided);
  assert.equal(result.assumptions.cohortCustomers, 3000);
  assert.equal(result.monthly.length, 12);
  assert.equal(result.monthly[0].avoidedIssueEvents, 0);
  assert.ok(result.monthly[2].avoidedIssueEvents > 0);
  assert.equal(result.nudgeStartDay, 75);
});

test("simulation rejects invalid horizon and rates", () => {
  assert.throws(() => demo.simulateDescaleNudge({ horizonMonths: 0 }), RangeError);
  assert.throws(() => demo.simulateDescaleNudge({ uptake: 1.2 }), RangeError);
  assert.throws(() => demo.simulateDescaleNudge({ nudgeStartDay: 361 }), RangeError);
});

test("provisional Feature Card score validates its rubric weights", () => {
  assert.equal(demo.calculatePriorityScore(), 80);
  assert.throws(() => demo.calculatePriorityScore(undefined, { impact: 0.5, feasibility: 0.5, strategicFit: 0.5 }), RangeError);
});