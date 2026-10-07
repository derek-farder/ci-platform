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
  assert.equal(result.midpoint.crcContactsAvoided, 183);
  assert.equal(result.midpoint.baselineBlockageContacts, 1633);
  assert.equal(result.midpoint.pctBlockageContactsAvoided, 11.2);
  assert.equal(result.midpoint.capsuleRevenueProtectedEur, 2311);
  assert.ok(result.ranges.crcContactsAvoided.low <= result.midpoint.crcContactsAvoided);
  assert.ok(result.ranges.crcContactsAvoided.high >= result.midpoint.crcContactsAvoided);
  assert.ok(result.ranges.capsuleRevenueProtectedEur.low < result.midpoint.capsuleRevenueProtectedEur);
  assert.ok(result.ranges.capsuleRevenueProtectedEur.high > result.midpoint.capsuleRevenueProtectedEur);
  assert.equal(result.assumptions.cohortCustomers, 3000);
  assert.equal(result.monthly.length, 12);
  assert.equal(result.monthly[0].baselineContacts, result.monthly[0].withNudgeContacts);
  assert.ok(result.monthly[2].baselineContacts > result.monthly[2].withNudgeContacts);
  assert.equal(result.nudgeDelayDays, 75);
  assert.equal(result.nudgeStartMonth, 3);
  assert.equal(result.assumptions.annualCapsuleSpendSanityCheckEur, 421.2);
  const laterNudge = demo.simulateDescaleNudge({ nudgeDelayDays: 120 });
  assert.equal(laterNudge.nudgeStartMonth, 4);
  assert.ok(laterNudge.midpoint.crcContactsAvoided < result.midpoint.crcContactsAvoided);
  assert.equal(laterNudge.midpoint.baselineBlockageContacts, result.midpoint.baselineBlockageContacts);
  const oneDayLater = demo.simulateDescaleNudge({ nudgeDelayDays: 76 });
  assert.ok(oneDayLater.midpoint.pctBlockageContactsAvoided < result.midpoint.pctBlockageContactsAvoided);
});

test("simulation rejects invalid horizon and rates", () => {
  assert.throws(() => demo.simulateDescaleNudge({ horizonMonths: 0 }), RangeError);
  assert.throws(() => demo.simulateDescaleNudge({ uptake: 1.2 }), RangeError);
  assert.throws(() => demo.simulateDescaleNudge({ nudgeDelayDays: 361 }), RangeError);
  assert.throws(() => demo.simulateDescaleNudge({ scaleToCustomers: 2999 }), RangeError);
});

test("provisional Feature Card score validates its rubric weights", () => {
  assert.equal(demo.calculatePriorityScore(), 81);
  assert.throws(() => demo.calculatePriorityScore(undefined, { impact: 0.5, feasibility: 0.5, strategicFit: 0.5 }), RangeError);
});

test("simulation scales linearly to 100,000 without changing its percentage", () => {
  const cohort = demo.simulateDescaleNudge();
  const scaled = demo.simulateDescaleNudge({ scaleToCustomers: 100000 });

  assert.equal(scaled.midpoint.crcContactsAvoided, 6096);
  assert.equal(scaled.midpoint.pctBlockageContactsAvoided, cohort.midpoint.pctBlockageContactsAvoided);
  assert.equal(scaled.assumptions.scaleFactor, 100000 / 3000);
  assert.equal(scaled.midpoint.capsuleRevenueProtectedEur, 77034);
});

test("Feature Card candidates have a strict, documented priority order", () => {
  const ranked = demo.rankFeatureCards();

  assert.deepEqual(ranked.map((feature) => feature.id), ["blockage-agent-assist", "descale-guide", "pairing-assistant", "silent-reengagement"]);
  assert.ok(ranked.every((feature, index) => index === 0 || ranked[index - 1].priorityScore > feature.priorityScore));
  assert.ok(ranked.every((feature) => feature.dataNeeded.length > 0 && feature.nessyFit));
});

test("pillar visuals are calculated from synthetic cohort assumptions", () => {
  const subscription = demo.subscriptionByCohort();
  const lapse = demo.lapseComparison();

  assert.equal(subscription.length, 5);
  assert.equal(subscription.find((cohort) => cohort.cohortId === "connected-enthusiast").subscriptionRate, 0.82);
  assert.equal(subscription.find((cohort) => cohort.cohortId === "silent-struggler").subscribedCount, 200);
  assert.equal(lapse.status, "synthetic-baseline");
  assert.equal(lapse.unresolvedRate, lapse.resolvedRate * 2);
  assert.equal(demo.answerCohortPanel("What would make support easier?").answers.length, 5);
});