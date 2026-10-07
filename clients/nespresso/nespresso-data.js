(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.nespressoDemo = api;
})(typeof globalThis === "object" ? globalThis : this, function () {
  const dataset = {
    id: "nespresso-aotp-synthetic",
    version: "0.3",
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
        subscriptionRate: 0.12,
        engagement: { appReach: 0.45, emailReach: 0.80, notice: 0.75, baseAct: 0.40, clarityLift: 0.60, incentiveLift: 0.20 },
        engagementVoice: { likely: "If the next step is clear, I can finish setup while I am still getting started.", maybe: "I would try it if the instructions match the screen I see.", unlikely: "If the app is not paired, I may not see the prompt." },
      },
      {
        id: "overdue-descaler",
        name: "Overdue Descaler",
        share: 0.30,
        profile: "Vertuo owner for 1–3 years; typically makes about 2 cups daily.",
        signals: ["Descale alert ignored for 60+ days", "Flow-rate drop", "Blockage voice contact"],
        response: "I saw the orange light, but coffee was still coming out, so I left it for later. A short reminder showing what to do would be more useful than another warning.",
        quoteEvidence: ["Descale alert ignored for 60+ days", "Flow-rate drop before blockage contact"],
        baseIssueRateMonthly: 0.012,
        monthlyCapsules: 54,
        subscriptionRate: 0.34,
        engagement: { appReach: 0.55, emailReach: 0.70, notice: 0.65, baseAct: 0.30, clarityLift: 0.50, incentiveLift: 0.40 },
        engagementVoice: { likely: "A short guide would help me take care of it before the machine slows down.", maybe: "I might act if I can see how quick it is and what I need.", unlikely: "If coffee still comes out, I may leave the alert for later." },
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
        subscriptionRate: 0.82,
        engagement: { appReach: 0.90, emailReach: 0.75, notice: 0.85, baseAct: 0.55, clarityLift: 0.20, incentiveLift: 0.20 },
        engagementVoice: { likely: "I would use a prompt that opens a clear action from the app.", maybe: "It depends on whether it adds anything to the reminders I already use.", unlikely: "I usually keep up with maintenance without another prompt." },
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
        subscriptionRate: 0.08,
        engagement: { appReach: 0.10, emailReach: 0.25, notice: 0.40, baseAct: 0.20, clarityLift: 0.30, incentiveLift: 0.50 },
        engagementVoice: { likely: "If it arrives somewhere I already check, I can decide whether to act.", maybe: "A useful offer might get my attention if I can find the details.", unlikely: "I do not use the app much, so I could miss this entirely." },
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
        subscriptionRate: 0.21,
        engagement: { appReach: 0.40, emailReach: 0.60, notice: 0.60, baseAct: 0.30, clarityLift: 0.30, incentiveLift: 0.60 },
        engagementVoice: { likely: "A practical reason to return would help me give it another try.", maybe: "I would consider it if the earlier issue really feels resolved.", unlikely: "An offer would not help if I still expect the same machine problem." },
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
      defaultNudgeDelayDays: 75,
      projectionRangeFraction: 0.12,
      contactsPerPreventedIssue: 1.08,
      incrementalLapseRiskAfterUnresolvedContact: 0.06,
      retainedCapsulesMonths: 6,
      illustrativeCapsulePriceEur: 0.65,
      capsulePriceRangeEur: { low: 0.50, high: 0.85 },
      resolvedContactLapseRate: 0.08,
      descalingKitCostEur: 12,
    },
    conceptVariants: [
      { id: "A", name: "Reminder", channel: "App push", tutorial: false, incentive: false, effectIfActed: 0.20 },
      { id: "B", name: "Guided", channel: "App push", tutorial: true, incentive: false, effectIfActed: 0.32 },
      { id: "C", name: "Guided + kit", channel: "App push + email", tutorial: true, incentive: true, incentiveDescription: "Descaling kit offered with next capsule order", effectIfActed: 0.45 },
    ],
    knowledge: [
      { id: "SYN-KB-DESC-01", title: "When a machine needs descaling", source: "Demo-authored illustrative guidance", clientContent: false },
      { id: "SYN-KB-PAIR-01", title: "Check pairing before trying again", source: "Demo-authored illustrative guidance", clientContent: false },
      { id: "SYN-KB-FLOW-01", title: "What to note when flow changes", source: "Demo-authored illustrative guidance", clientContent: false },
    ],
    priorityWeights: { impact: 0.4, feasibility: 0.3, strategicFit: 0.3 },
    featureCards: [
      {
        id: "blockage-agent-assist",
        title: "Blockage agent-assist for CRC voice",
        problem: "Help CRC agents resolve high-handle-time blockage calls with grounded next steps.",
        cohortId: "overdue-descaler",
        nessyFit: "High",
        effort: "Medium",
        dataNeeded: ["CRC reason + AHT", "Resolution codes", "Approved troubleshooting content"],
        productionDataNeeded: "CRC contact reason and resolution; AHT; machine model and event telemetry; approved knowledge sources.",
        priorityInputs: { impact: 0.91, feasibility: 0.62, strategicFit: 0.85 },
      },
      {
        id: "descale-guide",
        title: "A short, timed descaling guide",
        problem: "Owners may defer a maintenance alert until flow changes or a blockage prompts a CRC contact.",
        cohortId: "overdue-descaler",
        nessyFit: "High",
        effort: "Medium",
        dataNeeded: ["Descale events", "Nudge exposure + action", "CRC reasons"],
        productionDataNeeded: "Consent and channel eligibility; machine model and event telemetry; nudge exposure and completion; CRC reason and resolution; subscription and order outcomes.",
        priorityInputs: { impact: 0.86, feasibility: 0.72, strategicFit: 0.8 },
      },
      {
        id: "pairing-assistant",
        title: "Pairing assistant",
        problem: "New connected owners can stall during app pairing and never reach a connected setup.",
        cohortId: "setup-sam",
        nessyFit: "High",
        effort: "Medium",
        dataNeeded: ["Pairing errors", "Device + app state", "Setup completion"],
        productionDataNeeded: "Machine and app pairing events; model/firmware; consent and channel eligibility; support contact outcomes.",
        priorityInputs: { impact: 0.78, feasibility: 0.82, strategicFit: 0.78 },
      },
      {
        id: "silent-reengagement",
        title: "Silent Struggler re-engagement",
        problem: "Owners with unreported issues may quietly reduce capsule orders without entering a support journey.",
        cohortId: "silent-struggler",
        nessyFit: "Medium",
        effort: "High",
        dataNeeded: ["Registration status", "Order cadence", "Consent + eligibility"],
        productionDataNeeded: "Registration and machine ownership; order cadence; consent, eligibility, and suppression rules; support history where available.",
        priorityInputs: { impact: 0.70, feasibility: 0.68, strategicFit: 0.72 },
      },
    ],
    featureCardNotes: {
      priorityNote: "Provisional score for discussion; Nessy Chapter 1 rubric and weights are not yet confirmed.",
    },
  };

  function cohortCount(cohort, customerCount = dataset.customerCount) {
    return Math.round(customerCount * cohort.share);
  }

  function summarizeCohorts() {
    return dataset.cohorts.map((cohort) => ({ ...cohort, count: cohortCount(cohort) }));
  }

  function subscriptionByCohort() {
    return summarizeCohorts().map((cohort) => ({
      cohortId: cohort.id,
      cohortName: cohort.name,
      subscriptionRate: cohort.subscriptionRate,
      subscribedCount: Math.round(cohort.count * cohort.subscriptionRate),
      cohortCount: cohort.count,
    }));
  }

  function lapseComparison() {
    const resolvedRate = dataset.rules.resolvedContactLapseRate;
    return {
      status: "synthetic-baseline",
      resolvedRate,
      unresolvedRate: resolvedRate * dataset.rules.unresolvedCrcLapseMultiplier,
      multiplier: dataset.rules.unresolvedCrcLapseMultiplier,
    };
  }

  function answerCohortPanel(question) {
    return {
      question,
      answers: dataset.cohorts.map((cohort) => ({
        cohortId: cohort.id,
        cohortName: cohort.name,
        kind: "illustrative persona voice",
        text: cohort.response,
        evidence: cohort.quoteEvidence,
      })),
      synthesis: "Across cohorts, people value clear next steps and useful support. They differ on how that help should arrive: some want a guided setup, some a timely nudge, and others low-effort service recovery. This is qualitative synthesis, not a measured preference ranking.",
      limitation: "Five fictional cohort-grounded voices; no generated metrics or customer quotations.",
    };
  }

  function runConceptStudy({ variantId, delayDays = dataset.rules.defaultNudgeDelayDays, targetCohortId = "overdue-descaler" } = {}) {
    const targetCohort = dataset.cohorts.find((cohort) => cohort.id === targetCohortId);
    if (!targetCohort) throw new RangeError("Unknown synthetic cohort.");
    if (!Number.isInteger(delayDays) || delayDays < 0 || delayDays > 360) {
      throw new RangeError("Concept delay must be an integer from 0 to 360 days.");
    }

    const variants = dataset.conceptVariants;
    if (variantId && !variants.some((variant) => variant.id === variantId)) throw new RangeError("Unknown concept variant.");

    function score(cohort, variant) {
      const reach = variant.channel === "App push + email"
        ? 1 - (1 - cohort.engagement.appReach) * (1 - cohort.engagement.emailReach)
        : cohort.engagement.appReach;
      const notice = cohort.engagement.notice;
      const actRate = Math.min(0.95,
        cohort.engagement.baseAct
        * (1 + cohort.engagement.clarityLift * Number(variant.tutorial))
        * (1 + cohort.engagement.incentiveLift * Number(variant.incentive)));
      const expectedUptake = reach * notice * actRate;
      const stance = expectedUptake >= 0.30 ? "Likely" : expectedUptake >= 0.15 ? "Maybe" : "Unlikely";
      const losses = [
        { key: "reach", value: 1 - reach },
        { key: "notice", value: reach * (1 - notice) },
        { key: "act", value: reach * notice * (1 - actRate) },
      ];
      const barrierKey = losses.reduce((largest, current) => current.value > largest.value ? current : largest).key;
      const barriers = {
        reach: "I may not see it",
        notice: "I may ignore the alert",
        act: "It may feel like a chore or lack a reason to act now",
      };
      const changes = {
        reach: "Reach me through a channel I use",
        notice: "Make the reason to open it clear",
        act: variant.tutorial ? "Show me the two-minute steps" : variant.incentive ? "Offer a useful reason to act now" : "Show me what changes if I act",
      };
      return {
        cohortId: cohort.id,
        cohortName: cohort.name,
        stance,
        expectedUptake,
        funnel: { reach, notice, act: actRate },
        barrierKey,
        mainBarrier: barriers[barrierKey],
        whatWouldChangeMyMind: changes[barrierKey],
        why: cohort.engagementVoice[stance.toLowerCase()],
        driver: cohort.engagement.driver,
      };
    }

    const reactions = variants.map((variant) => {
      const cohorts = dataset.cohorts.map((cohort) => score(cohort, variant));
      const target = cohorts.find((item) => item.cohortId === targetCohortId);
      const impact = simulateDescaleNudge({
        uptake: target.expectedUptake,
        effect: variant.effectIfActed,
        nudgeDelayDays: delayDays,
      });
      return {
        variantId: variant.id,
        variantName: variant.name,
        variant,
        cohorts,
        targetCohort: target,
        targetUptake: target.expectedUptake,
        effectIfActed: variant.effectIfActed,
        avoidedContacts: impact.midpoint.crcContactsAvoided,
        pctContactsAvoided: impact.midpoint.pctBlockageContactsAvoided,
      };
    });
    const selected = reactions.find((item) => item.variantId === (variantId || "B")) || reactions[0];
    const recommended = reactions.reduce((best, item) => item.avoidedContacts > best.avoidedContacts ? item : best);
    const barrierCounts = selected.cohorts.reduce((counts, reaction) => {
      counts[reaction.mainBarrier] = (counts[reaction.mainBarrier] || 0) + 1;
      return counts;
    }, {});
    const topBarriers = Object.entries(barrierCounts).sort((left, right) => right[1] - left[1]).slice(0, 3).map(([barrier]) => barrier);

    return {
      status: "simulated",
      datasetId: dataset.id,
      datasetVersion: dataset.version,
      targetCohortId,
      delayDays,
      reactions: selected.cohorts,
      targetUptake: selected.targetUptake,
      targetEffect: selected.effectIfActed,
      selectedVariantId: selected.variantId,
      selectedVariant: selected.variant,
      recommendedVariantId: recommended.variantId,
      recommendedVariant: recommended.variant,
      recommendationReason: `${recommended.variant.name} has the highest expected avoided contacts for ${targetCohort.name} in this synthetic scenario.`,
      variantComparison: reactions.map(({ variantId: id, variantName, targetUptake: uptake, effectIfActed, avoidedContacts, pctContactsAvoided }) => ({ id, variantName, uptake, effectIfActed, avoidedContacts, pctContactsAvoided })),
      topBarriers,
      whoItWorksFor: selected.cohorts.filter((reaction) => reaction.stance === "Likely").map((reaction) => reaction.cohortName),
      whoItMayMiss: selected.cohorts.filter((reaction) => reaction.stance === "Unlikely").map((reaction) => reaction.cohortName),
      pilotValidation: { holdoutSize: "10% control group (provisional)", primaryKpi: "Blockage-related CRC contacts per eligible cohort member over 12 months" },
      synthesis: "Reach determines who can see the concept. Clear steps help people who notice it decide to act. Some cohorts remain difficult to reach digitally and may need a different channel.",
    };
  }

  function resolveConceptImpactInputs(study, override = null) {
    if (!study || !Number.isFinite(study.targetUptake) || !Number.isFinite(study.targetEffect)) {
      throw new TypeError("A concept study result with numeric target uptake and effect is required.");
    }
    if (override === null) {
      return { uptake: study.targetUptake, effect: study.targetEffect, overridden: false };
    }
    if (![override.uptake, override.effect].every((value) => Number.isFinite(value) && value >= 0 && value <= 1)) {
      throw new RangeError("Override uptake and effect must be between 0 and 1.");
    }
    return { uptake: override.uptake, effect: override.effect, overridden: true };
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

  function calculatePriorityScore(inputs = dataset.featureCards[0].priorityInputs, weights = dataset.priorityWeights) {
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    if (Math.abs(totalWeight - 1) > 1e-9) throw new RangeError("Priority weights must sum to 1.");
    return Math.round(
      (inputs.impact * weights.impact + inputs.feasibility * weights.feasibility + inputs.strategicFit * weights.strategicFit) * 100,
    );
  }

  function calculateConceptEconomics({ variantId, uptake, effect, delayDays = dataset.rules.defaultNudgeDelayDays, scaleToCustomers = null, targetCohortId = "overdue-descaler" }) {
    const variant = dataset.conceptVariants.find((item) => item.id === variantId);
    const cohort = dataset.cohorts.find((item) => item.id === targetCohortId);
    if (!variant || !cohort) throw new RangeError("Unknown concept variant or synthetic cohort.");
    const impact = simulateDescaleNudge({ uptake, effect, nudgeDelayDays: delayDays, scaleToCustomers });
    const actedCustomers = impact.assumptions.cohortCustomers * uptake;
    const kitCostEur = variant.incentive ? actedCustomers * dataset.rules.descalingKitCostEur : 0;
    return {
      variantId,
      grossRevenueProtectedEur: impact.midpoint.capsuleRevenueProtectedEur,
      actedCustomers,
      kitCostEur: Math.round(kitCostEur),
      netRevenueProtectedEur: Math.round(impact.midpoint.capsuleRevenueProtectedEur - kitCostEur),
      limitation: "Illustrative gross/net scenario using capsule retail value and a provisional kit cost; not Nespresso net revenue or a forecast.",
    };
  }

  function rankFeatureCards() {
    return dataset.featureCards.map((feature) => ({
      ...feature,
      cohort: dataset.cohorts.find((cohort) => cohort.id === feature.cohortId),
      priorityScore: calculatePriorityScore(feature.priorityInputs, dataset.priorityWeights),
    })).sort((left, right) => right.priorityScore - left.priorityScore);
  }

  function simulateDescaleNudge(options = {}) {
    const uptake = options.uptake ?? dataset.rules.defaultNudgeUptake;
    const effect = options.effect ?? dataset.rules.defaultNudgeEffect;
    const horizonMonths = options.horizonMonths ?? 12;
    const nudgeDelayDays = options.nudgeDelayDays ?? dataset.rules.defaultNudgeDelayDays;
    const startMonth = Math.max(1, Math.ceil(nudgeDelayDays / 30));
    const uncertainty = options.uncertainty ?? dataset.rules.projectionRangeFraction;
    const scaleToCustomers = options.scaleToCustomers ?? null;
    const cohort = dataset.cohorts.find((item) => item.id === "overdue-descaler");

    if (![uptake, effect, uncertainty].every((value) => Number.isFinite(value) && value >= 0 && value <= 1)) {
      throw new RangeError("Uptake, effect, and uncertainty must be between 0 and 1.");
    }
    if (!Number.isInteger(horizonMonths) || horizonMonths < 1 || horizonMonths > 36) {
      throw new RangeError("Horizon must be an integer from 1 to 36 months.");
    }
    if (!Number.isInteger(nudgeDelayDays) || nudgeDelayDays < 0 || nudgeDelayDays > horizonMonths * 30) {
      throw new RangeError("Nudge delay must fall inside the simulation horizon.");
    }
    const cohortSize = cohortCount(cohort);
    if (scaleToCustomers !== null && (!Number.isFinite(scaleToCustomers) || scaleToCustomers < cohortSize)) {
      throw new RangeError("Scale target must be at least the cohort size.");
    }
    const referenceStartMonth = Math.max(1, Math.ceil(dataset.rules.defaultNudgeDelayDays / 30));
    const referenceActiveMonths = horizonMonths - referenceStartMonth + 1;
    const activeMonths = nudgeDelayDays >= horizonMonths * 30
      ? 0
      : Math.max(0, Math.min(horizonMonths, referenceActiveMonths - (nudgeDelayDays - dataset.rules.defaultNudgeDelayDays) / 30));
    const firstMonthWeight = Math.max(0, Math.min(1, activeMonths - (horizonMonths - startMonth)));

    const customers = scaleToCustomers ?? cohortSize;
    const scaleFactor = customers / cohortSize;
    const riskMultiplier = dataset.rules.blockageRiskMultiplier;
    const monthlyIssueRisk = cohort.baseIssueRateMonthly * riskMultiplier;
    const monthly = Array.from({ length: horizonMonths }, (_, index) => {
      const month = index + 1;
      const baselineEvents = customers * monthlyIssueRisk;
      const monthWeight = month < startMonth ? 0 : month === startMonth ? firstMonthWeight : 1;
      const nudgeActive = monthWeight > 0;
      const preventedEvents = baselineEvents * uptake * effect * monthWeight;
      const baselineContacts = baselineEvents * dataset.rules.contactsPerPreventedIssue;
      const withNudgeContacts = (baselineEvents - preventedEvents) * dataset.rules.contactsPerPreventedIssue;
      return { month, nudgeActive, baselineEvents, preventedEvents, baselineContacts, withNudgeContacts };
    });
    const preventedEvents = monthly.reduce((sum, step) => sum + step.preventedEvents, 0);
    const preventedContacts = preventedEvents * dataset.rules.contactsPerPreventedIssue;
    const baselineContacts = monthly.reduce((sum, step) => sum + step.baselineContacts, 0);
    const pctBlockageContactsAvoided = baselineContacts ? (preventedContacts / baselineContacts) * 100 : 0;
    const lapsesAvoided = preventedContacts * dataset.rules.incrementalLapseRiskAfterUnresolvedContact;
    const lapseDeltaPercentagePoints = (lapsesAvoided / customers) * 100;
    const capsuleVolumeProtected = lapsesAvoided * cohort.monthlyCapsules * dataset.rules.retainedCapsulesMonths;
    const capsuleRevenueProtectedEur = capsuleVolumeProtected * dataset.rules.illustrativeCapsulePriceEur;
    const midpoint = {
      crcContactsAvoided: Math.round(preventedContacts),
      baselineBlockageContacts: Math.round(baselineContacts),
      pctBlockageContactsAvoided: Number(pctBlockageContactsAvoided.toFixed(2)),
      lapseRateDeltaPercentagePoints: Number(lapseDeltaPercentagePoints.toFixed(2)),
      capsuleVolumeProtected: Math.round(capsuleVolumeProtected),
      capsuleRevenueProtectedEur: Math.round(capsuleRevenueProtectedEur),
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
      nudgeDelayDays,
      nudgeStartMonth: startMonth,
      monthly: monthly.map((step) => ({
        month: step.month,
        nudgeActive: step.nudgeActive,
        baselineContacts: Number(step.baselineContacts.toFixed(1)),
        withNudgeContacts: Number(step.withNudgeContacts.toFixed(1)),
      })),
      midpoint,
      ranges: {
        crcContactsAvoided: range(midpoint.crcContactsAvoided),
        lapseRateDeltaPercentagePoints: {
          low: Number((midpoint.lapseRateDeltaPercentagePoints * (1 - uncertainty)).toFixed(2)),
          high: Number((midpoint.lapseRateDeltaPercentagePoints * (1 + uncertainty)).toFixed(2)),
        },
        capsuleVolumeProtected: range(midpoint.capsuleVolumeProtected),
        capsuleRevenueProtectedEur: {
          low: Math.round(capsuleVolumeProtected * (1 - uncertainty) * dataset.rules.capsulePriceRangeEur.low),
          high: Math.round(capsuleVolumeProtected * (1 + uncertainty) * dataset.rules.capsulePriceRangeEur.high),
        },
        pctBlockageContactsAvoided: {
          low: Number((pctBlockageContactsAvoided * (1 - uncertainty)).toFixed(2)),
          high: Number((pctBlockageContactsAvoided * (1 + uncertainty)).toFixed(2)),
        },
      },
      assumptions: {
        cohortCustomers: customers,
        sourceCohortCustomers: cohortSize,
        scaleFactor,
        monthlyBaseIssueRisk: cohort.baseIssueRateMonthly,
        ignoredDescaleAlertDays: dataset.rules.ignoredDescaleAlertDays,
        nudgeDelayDays,
        blockageRiskMultiplier: riskMultiplier,
        monthlyIssueRiskAfterMultiplier: Number(monthlyIssueRisk.toFixed(4)),
        uptake,
        effect,
        contactsPerPreventedIssue: dataset.rules.contactsPerPreventedIssue,
        incrementalLapseRiskAfterUnresolvedContact: dataset.rules.incrementalLapseRiskAfterUnresolvedContact,
        monthlyCapsules: cohort.monthlyCapsules,
        retainedCapsulesMonths: dataset.rules.retainedCapsulesMonths,
        illustrativeCapsulePriceEur: dataset.rules.illustrativeCapsulePriceEur,
        capsulePriceRangeEur: dataset.rules.capsulePriceRangeEur,
        annualCapsuleSpendSanityCheckEur: Number((cohort.monthlyCapsules * 12 * dataset.rules.illustrativeCapsulePriceEur).toFixed(2)),
        uncertaintyFraction: uncertainty,
      },
      limitation: "Illustrative cohort-level scenario. Synthetic scenario assumptions are not causal evidence or a forecast of client outcomes.",
    };
  }

  return {
    dataset,
    cohortCount,
    summarizeCohorts,
    subscriptionByCohort,
    lapseComparison,
    answerCohortPanel,
    answerPersonaQuestion,
    rankIssues,
    calculatePriorityScore,
    rankFeatureCards,
    runConceptStudy,
    resolveConceptImpactInputs,
    calculateConceptEconomics,
    simulateDescaleNudge,
  };
});