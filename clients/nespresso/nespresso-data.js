(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.nespressoDemo = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  const dataset = {
    id: "nespresso-aotp-synthetic",
    version: "0.1",
    generatedAt: "2026-10-07",
    customerCount: 10000,
    historyMonths: 24,
    marketMix: ["CH", "FR", "US"],
    marketNote: "Illustrative only; target market and language are not yet selected.",
    cohorts: [
      {
        id: "setup-sam",
        name: "Setup Sam",
        share: 0.15,
        profile: "First-time connected owner; purchased a Vertuo Pop or Next in the last 30 days.",
        signals: ["Pairing failures", "Capsule-recognition errors", "Early CRC chat contact"],
        response: "I got stuck while pairing the machine. I might try again if the next step is clear and I can see whether it worked.",
        quoteEvidence: ["Week-one pairing failure", "Early CRC chat contact"],
        baseIssueRateMonthly: 0.018,
        monthlyCapsules: 42,
      },
      {
        id: "overdue-descaler",
        name: "Overdue Descaler",
        share: 0.30,
        profile: "Vertuo owner for 1–3 years; typically makes 2–3 cups daily.",
        signals: ["Descale alert ignored for 60+ days", "Flow-rate drop", "Blockage voice contact"],
        response: "I saw the orange light, but coffee was still coming out, so I left it for later. A short reminder showing what to do would be more useful than another warning.",
        quoteEvidence: ["Descale alert ignored for 60+ days", "Flow-rate drop before blockage contact"],
        baseIssueRateMonthly: 0.012,
        monthlyCapsules: 54,
      },
      {
        id: "connected-enthusiast",
        name: "Connected Enthusiast",
        share: 0.15,
        profile: "App-active subscriber with a connected machine and high illustrative lifetime value.",
        signals: ["Responds to push", "Firmware updated", "Rarely contacts CRC"],
        response: "A timely app reminder works for me when it explains why the task matters and lets me start from the notification.",
        quoteEvidence: ["App-active", "Prior response to push notification"],
        baseIssueRateMonthly: 0.006,
        monthlyCapsules: 62,
      },
      {
        id: "silent-struggler",
        name: "Silent Struggler",
        share: 0.25,
        profile: "Gift recipient or owner of an older machine who may not have registered it.",
        signals: ["Low app use", "Unreported issue", "Quiet capsule decline"],
        response: "I did not know where to ask for help, and I do not use the app much. If the machine makes less coffee, I might just buy fewer capsules.",
        quoteEvidence: ["Low app use", "Unreported issue and capsule decline"],
        baseIssueRateMonthly: 0.010,
        monthlyCapsules: 35,
      },
      {
        id: "susie-serial-reactivator",
        name: "Susie Serial Reactivator",
        share: 0.15,
        profile: "Returned after a lapse of 90 or more days; bridges machine assistance and loyalty questions.",
        signals: ["Prior unresolved machine issue", "90+ day lapse", "Returned"],
        response: "I had an issue that never felt resolved, so I stopped ordering for a while. Getting the machine working again would make it easier to come back.",
        quoteEvidence: ["Prior unresolved machine issue", "Returned after a 90+ day lapse"],
        baseIssueRateMonthly: 0.009,
        monthlyCapsules: 47,
      },
    ],
    issues: [
      { id: "blockage", name: "Blockage / flow issue", contacts: 2680, preventability: 0.78, retentionImpact: 0.82, voiceAhtMinutes: 18.6, chatRepeatRate: 0.14 },
      { id: "pairing", name: "App pairing failure", contacts: 1540, preventability: 0.84, retentionImpact: 0.54, voiceAhtMinutes: 11.2, chatRepeatRate: 0.28 },
      { id: "capsule-recognition", name: "Capsule recognition", contacts: 1190, preventability: 0.63, retentionImpact: 0.48, voiceAhtMinutes: 13.1, chatRepeatRate: 0.19 },
      { id: "descale-guidance", name: "Descaling guidance", contacts: 980, preventability: 0.76, retentionImpact: 0.62, voiceAhtMinutes: 15.4, chatRepeatRate: 0.12 },
      { id: "first-brew", name: "First brew / setup", contacts: 720, preventability: 0.71, retentionImpact: 0.59, voiceAhtMinutes: 12.3, chatRepeatRate: 0.17 },
    ],
    rules: {
      ignoredDescaleAlertDays: 60,
      blockageRiskMultiplier: 3.5,
      unresolvedCrcLapseMultiplier: 2,
      setupSamNeverPairsAppRate: 0.20,
      weekOnePairingFailureAppNonConnection: 0.40,
      defaultNudgeUptake: 0.42,
      defaultNudgeEffect: 0.32,
      projectionRangeFraction: 0.12,
      contactsPerPreventedIssue: 1.08,
      incrementalLapseRiskAfterUnresolvedContact: 0.06,
      retainedCapsulesMonths: 6,
    },
    knowledge: [
      { id: "SYN-KB-DESC-01", title: "When a machine needs descaling", source: "Demo-authored illustrative guidance", clientContent: false },
      { id: "SYN-KB-PAIR-01", title: "Check pairing before trying again", source: "Demo-authored illustrative guidance", clientContent: false },
      { id: "SYN-KB-FLOW-01", title: "What to note when flow changes", source: "Demo-authored illustrative guidance", clientContent: false },
    ],
    featureCard: {
      title: "A short, timed descaling guide",
      problem: "Owners may defer a maintenance alert until flow changes or a blockage prompts a CRC contact.",
      cohortId: "overdue-descaler",
      productionDataNeeded: "Consent and channel eligibility; machine model and event telemetry; nudge exposure and completion; CRC reason and resolution; subscription and order outcomes.",
      nessyFit: "High (provisional)",
      priorityWeights: { impact: 0.4, feasibility: 0.3, strategicFit: 0.3 },
      priorityInputs: { impact: 0.86, feasibility: 0.72, strategicFit: 0.8 },
      priorityNote: "Provisional score for discussion; Nessy Chapter 1 rubric and weights are not yet confirmed.",
    },
  };

  function cohortCount(cohort, customerCount = dataset.customerCount) {
    return Math.round(customerCount * cohort.share);
  }

  function summarizeCohorts() {
    return dataset.cohorts.map((cohort) => ({ ...cohort, count: cohortCount(cohort) }));
  }

  function answerPersonaQuestion(cohortId, question) {
    const cohort = dataset.cohorts.find((item) => item.id === cohortId);
    if (!cohort) throw new RangeError("Unknown synthetic cohort.");

    const normalizedQuestion = String(question).toLowerCase();
    const answer = cohort.id === "overdue-descaler"
      ? normalizedQuestion.match(/why|later|ignore|orange|delay/)
        ? cohort.response
        : normalizedQuestion.match(/nudge|remind|tutorial|help|useful/)
          ? "A reminder is more useful when it gives me one short next step and tells me what to expect. I would be less likely to act on another warning with no explanation."
          : null
      : normalizedQuestion.match(/need|friction|help|why|issue|support/)
        ? cohort.response
        : null;

    return {
      kind: "illustrative persona voice",
      cohortId: cohort.id,
      text: answer || "I do not have a grounded answer to that in this synthetic cohort profile.",
      evidence: answer ? cohort.quoteEvidence : [],
      limitation: "Fictional role-play grounded only in the listed cohort signals; not a customer quote, transcript, or statistic.",
    };
  }

  function rankIssues() {
    return dataset.issues
      .map((issue) => ({
        ...issue,
        priorityScore: issue.contacts * issue.preventability * issue.retentionImpact,
      }))
      .sort((left, right) => right.priorityScore - left.priorityScore);
  }

  function calculatePriorityScore(inputs = dataset.featureCard.priorityInputs, weights = dataset.featureCard.priorityWeights) {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(totalWeight - 1) > 1e-9) throw new RangeError("Priority weights must sum to 1.");
    return Math.round(
      (inputs.impact * weights.impact + inputs.feasibility * weights.feasibility + inputs.strategicFit * weights.strategicFit) * 100,
    );
  }

  function simulateDescaleNudge(options = {}) {
    const uptake = options.uptake ?? dataset.rules.defaultNudgeUptake;
    const effect = options.effect ?? dataset.rules.defaultNudgeEffect;
    const horizonMonths = options.horizonMonths ?? 12;
    const nudgeStartDay = options.nudgeStartDay ?? 75;
    const startMonth = Math.ceil(nudgeStartDay / 30);
    const uncertainty = options.uncertainty ?? dataset.rules.projectionRangeFraction;
    const cohort = dataset.cohorts.find((item) => item.id === "overdue-descaler");

    if (![uptake, effect, uncertainty].every((value) => Number.isFinite(value) && value >= 0 && value <= 1)) {
      throw new RangeError("Uptake, effect, and uncertainty must be between 0 and 1.");
    }
    if (!Number.isInteger(horizonMonths) || horizonMonths < 1 || horizonMonths > 36) {
      throw new RangeError("Horizon must be an integer from 1 to 36 months.");
    }
    if (!Number.isInteger(nudgeStartDay) || nudgeStartDay < 1 || nudgeStartDay > horizonMonths * 30) {
      throw new RangeError("Nudge start day must fall inside the simulation horizon.");
    }

    const customers = cohortCount(cohort);
    const riskMultiplier = dataset.rules.blockageRiskMultiplier;
    const monthlyIssueRisk = cohort.baseIssueRateMonthly * riskMultiplier;
    const monthly = Array.from({ length: horizonMonths }, (_, index) => {
      const month = index + 1;
      const baselineEvents = customers * monthlyIssueRisk;
      const nudgeActive = month >= startMonth;
      const preventedEvents = nudgeActive ? baselineEvents * uptake * effect : 0;
      return { month, nudgeActive, baselineEvents, preventedEvents };
    });
    const preventedEvents = monthly.reduce((sum, step) => sum + step.preventedEvents, 0);
    const preventedContacts = preventedEvents * dataset.rules.contactsPerPreventedIssue;
    const lapsesAvoided = preventedContacts * dataset.rules.incrementalLapseRiskAfterUnresolvedContact;
    const lapseDeltaPercentagePoints = (lapsesAvoided / customers) * 100;
    const capsuleVolumeProtected = lapsesAvoided * cohort.monthlyCapsules * dataset.rules.retainedCapsulesMonths;
    const midpoint = {
      crcContactsAvoided: Math.round(preventedContacts),
      lapseRateDeltaPercentagePoints: Number(lapseDeltaPercentagePoints.toFixed(2)),
      capsuleVolumeProtected: Math.round(capsuleVolumeProtected),
    };

    function range(value) {
      return {
        low: Math.round(value * (1 - uncertainty)),
        high: Math.round(value * (1 + uncertainty)),
      };
    }

    return {
      status: "simulated",
      datasetId: dataset.id,
      datasetVersion: dataset.version,
      cohortId: cohort.id,
      horizonMonths,
      nudgeStartDay,
      nudgeStartMonth: startMonth,
      monthly: monthly.map((step) => ({
        month: step.month,
        nudgeActive: step.nudgeActive,
        baselineIssueEvents: Number(step.baselineEvents.toFixed(1)),
        avoidedIssueEvents: Number(step.preventedEvents.toFixed(1)),
      })),
      midpoint,
      ranges: {
        crcContactsAvoided: range(midpoint.crcContactsAvoided),
        lapseRateDeltaPercentagePoints: {
          low: Number((midpoint.lapseRateDeltaPercentagePoints * (1 - uncertainty)).toFixed(2)),
          high: Number((midpoint.lapseRateDeltaPercentagePoints * (1 + uncertainty)).toFixed(2)),
        },
        capsuleVolumeProtected: range(midpoint.capsuleVolumeProtected),
      },
      assumptions: {
        cohortCustomers: customers,
        monthlyBaseIssueRisk: cohort.baseIssueRateMonthly,
        ignoredDescaleAlertDays: dataset.rules.ignoredDescaleAlertDays,
        nudgeStartDay,
        blockageRiskMultiplier: riskMultiplier,
        monthlyIssueRiskAfterMultiplier: Number(monthlyIssueRisk.toFixed(4)),
        uptake,
        effect,
        contactsPerPreventedIssue: dataset.rules.contactsPerPreventedIssue,
        incrementalLapseRiskAfterUnresolvedContact: dataset.rules.incrementalLapseRiskAfterUnresolvedContact,
        monthlyCapsules: cohort.monthlyCapsules,
        retainedCapsulesMonths: dataset.rules.retainedCapsulesMonths,
        uncertaintyFraction: uncertainty,
      },
      limitation: "Illustrative cohort-level scenario. Planted synthetic relationships are not causal evidence or a forecast of Nespresso outcomes.",
    };
  }

  return {
    dataset,
    cohortCount,
    summarizeCohorts,
    answerPersonaQuestion,
    rankIssues,
    calculatePriorityScore,
    simulateDescaleNudge,
  };
});