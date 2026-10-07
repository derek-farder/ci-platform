const demo = window.nespressoDemo;
const state = { view: "overview", pillar: "machine", query: "issues", cohort: "overdue-descaler", voiceQuestion: "Why did you leave descaling for later?", voiceAnswer: null, added: false, uptake: 42, effect: 32, role: "Innovation Manager" };
const app = document.querySelector("#icc-app");
const pages = { overview: "Overview", ask: "Ask", cohort: "Cohorts", simulation: "What-if simulation", feature: "Feature Card", preview: "Pillar previews" };
let toastTimer;

function icon(name) { return `<i data-lucide="${name}" aria-hidden="true"></i>`; }
function format(value) { return new Intl.NumberFormat("en-US").format(value); }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function badge(text) { return `<span class="badge dark">${text}</span>`; }
function shellHead(kicker, title, sub, actions = "") {
  return `<div class="icc-head"><div><div class="icc-kicker"><i></i>${kicker}</div><h1 class="icc-title">${title}</h1><p class="icc-subtitle">${sub}</p></div>${actions ? `<div class="icc-head-actions">${actions}</div>` : ""}</div>`;
}
function syntheticBanner(text = "All records and calculated baselines in this demo are fabricated. They are not Nespresso customer data or findings.") {
  return `<div class="synthetic-banner">${icon("flask-conical")}<span><b>SYNTHETIC DATASET</b> · ${text}</span></div>`;
}
function cardHead(title, sub, right = "") {
  return `<div class="icc-card-head"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${right}</div>`;
}
function actionButton(text, action, primary = false, symbol = "") {
  return `<button class="button ${primary ? "primary" : ""}" data-icc-action="${action}">${symbol ? icon(symbol) : ""}${text}</button>`;
}
function getCohort(id = state.cohort) { return demo.dataset.cohorts.find((cohort) => cohort.id === id); }

function pillarSwitcher() {
  return `<div class="pillars"><button class="pillar ${state.pillar === "machine" ? "active" : ""}" data-pillar="machine"><b>Machine Assistance</b><span>Live demo path</span></button><button class="pillar preview ${state.pillar === "subscription" ? "active" : ""}" data-pillar="subscription"><b>Subscription</b><span>Preview</span></button><button class="pillar preview ${state.pillar === "loyalty" ? "active" : ""}" data-pillar="loyalty"><b>Loyalty</b><span>Preview</span></button></div>`;
}

function overview() {
  const cohorts = demo.summarizeCohorts();
  const topIssue = demo.rankIssues()[0];
  const roleContext = {
    "Innovation Manager": "Find an evidence-backed opportunity to take to leadership.",
    "CRC Agent, Tier 1": "See which contact drivers may be preventable and what support could be tested.",
    "Market Leader": "Assess potential impact, assumptions, and the data needed before a pilot.",
  }[state.role];
  return `${shellHead("INNOVATION COMMAND CENTER · INTERNAL CONCEPT", "Test the idea before building it.", `${roleContext} Ask a business question, explore a synthetic cohort, and test an intervention.`)}<p class="data-note" style="margin:-11px 0 12px">Audience lens only · does not represent role-based access or permissions.</p>
    ${syntheticBanner("10,000-customer calculation basis · cohort aggregates, not materialized individuals · market mix is not selected or validated.")}
    ${pillarSwitcher()}
    <div class="icc-stats"><article class="icc-stat"><div class="icc-stat-label"><span>Synthetic population</span>${icon("users-round")}</div><div class="icc-stat-value">${format(demo.dataset.customerCount)}</div><div class="icc-stat-note">Records in fixture · v${demo.dataset.version}</div></article><article class="icc-stat"><div class="icc-stat-label"><span>Cohorts</span>${icon("layers-2")}</div><div class="icc-stat-value">${cohorts.length}</div><div class="icc-stat-note">Share totals 100% · illustrative</div></article><article class="icc-stat"><div class="icc-stat-label"><span>Top preventable issue</span>${icon("wrench")}</div><div class="icc-stat-value">${format(topIssue.contacts)}</div><div class="icc-stat-note">${topIssue.name} · synthetic contacts</div></article><article class="icc-stat"><div class="icc-stat-label"><span>Simulation horizon</span>${icon("calendar-range")}</div><div class="icc-stat-value">12 mo</div><div class="icc-stat-note">Rule-based · assumptions visible</div></article></div>
    <div class="icc-columns"><div><section class="icc-card">${cardHead("A five-moment demo", "A repeatable path from question to prioritized feature.", badge("5–7 MIN"))}<div class="icc-steps"><div class="icc-step active"><i>1</i>Ask</div><div class="icc-step"><i>2</i>Meet cohort</div><div class="icc-step"><i>3</i>Test idea</div><div class="icc-step"><i>4</i>Decide</div><div class="icc-step"><i>5</i>Zoom out</div></div><div class="icc-callout"><span class="icc-callout-icon">${icon("messages-square")}</span><div class="icc-callout-copy"><b>Which machine issues drive the most CRC contacts, and which are preventable?</b><p>Start with a synthetic dataset answer. Every metric on the next screen has an explicit denominator and synthetic label.</p></div>${actionButton("Ask the question", "go-ask", true, "arrow-right")}</div></section>
    <section class="icc-card">${cardHead("Synthetic cohort mix", "Illustrative shares from the supplied demo brief.", `<button class="text-link" data-icc-view="cohort">Explore cohorts ${icon("arrow-right")}</button>`)}<div class="cohort-list">${cohorts.map((cohort) => `<div class="cohort-row"><button data-cohort="${cohort.id}">${cohort.name}</button><span class="cohort-bar"><i style="width:${cohort.share * 100}%"></i></span><span>${cohort.share * 100}%</span></div>`).join("")}</div><p class="data-note">Shares are synthetic inputs, not measured customer segments. Counts are rounded from a 10,000-customer calculation basis; individual records are not materialized.</p></section></div>
    <aside><section class="icc-card">${cardHead("Machine Assistance", "Selected demo pillar", badge("ACTIVE"))}<div class="icc-callout-copy"><b>Overdue descaling is the lead scenario.</b><p style="margin:0;color:#77837a;font-size:10px;line-height:1.55">The fixture plants a relationship between alerts ignored for more than 60 days and blockage contacts. The scenario rule is not a causal finding.</p></div><div style="margin-top:12px">${actionButton("Inspect Overdue Descalers", "go-cohort", false, "arrow-right")}</div></section><section class="icc-card">${cardHead("Demo boundaries", "What this click-through does and does not do")}${["No Nespresso customer data","No live integrations or production inference","No campaign launch or consumer-facing flow","Subscription and Loyalty are previews only"].map((line) => `<div class="cohort-profile"><span>BOUNDARY</span><b>${line}</b></div>`).join("")}</section></aside></div>`;
}

function answerBody() {
  const ranked = demo.rankIssues();
  if (state.query === "issues") return `<h2 class="answer-title">Blockage / flow issues rank highest on the synthetic priority proxy.</h2><p class="answer-copy">The proxy is contact volume × preventability × illustrative retention impact. It prioritizes where a test may be useful; it does not estimate a causal effect.</p><div class="issue-chart" role="img" aria-label="Synthetic contact counts by issue reason">${ranked.map((issue) => `<div class="issue-bar-row"><span>${issue.name}</span><i><b style="width:${(issue.contacts / ranked[0].contacts) * 100}%"></b></i><strong>${format(issue.contacts)}</strong></div>`).join("")}</div><div class="data-source">Source: synthetic fixture v${demo.dataset.version} · scenario assumptions register</div><div style="overflow-x:auto;margin-top:10px"><table class="issues-table"><thead><tr><th>Rank / reason</th><th>Contacts*</th><th>Preventable*</th><th>Retention impact*</th><th>Priority proxy</th></tr></thead><tbody>${ranked.map((issue, index) => `<tr><td>${index + 1}. ${issue.name}</td><td>${format(issue.contacts)}</td><td>${Math.round(issue.preventability * 100)}%</td><td>${Math.round(issue.retentionImpact * 100)}%</td><td>${format(Math.round(issue.priorityScore))}</td></tr>`).join("")}</tbody></table></div><p class="data-note">*Fabricated fixture values. Priority proxy has no unit and should not be read as a predicted outcome.</p>`;
  const content = {
    prevent: ["Predict before it breaks", "The Overdue Descaler cohort is the scenario lead: the fixture marks alerts ignored beyond 60 days, flow-rate drops, and later blockage contacts. The planted rule applies a 3.5× midpoint risk multiplier (3–4× scenario range); it is an assumption for the what-if, not a validated predictor."],
    setup: ["First-time setup friction", `Setup Sam represents 15% of this synthetic population. The brief states ${Math.round(demo.dataset.rules.setupSamNeverPairsAppRate * 100)}% of this cohort never pair the app; separately, the planted pattern says ${Math.round(demo.dataset.rules.weekOnePairingFailureAppNonConnection * 100)}% of owners with a week-one pairing failure never connect. Those percentages have different denominators and must not be conflated.`],
    deflect: ["CRC deflection candidates", "Demo-authored troubleshooting topics cover descaling, pairing, and flow changes. The fixture identifies candidate contact types for a self-serve test; it does not claim that any share of CRC contacts can be deflected."],
    assist: ["Agent-assist opportunity", "In this fixture, blockage voice contacts have the highest illustrative average handle time (18.6 min), while pairing chats have the highest repeat rate (28%). These values are planted synthetic scenario inputs, not Nespresso operating metrics."],
  }[state.query];
  return `<h2 class="answer-title">${content[0]}</h2><p class="answer-copy">${content[1]}</p><div class="assumption-list"><div class="assumption"><span>Evidence class</span><b>SYNTHETIC BRIEF INPUT</b></div><div class="assumption"><span>Dataset version</span><b>${demo.dataset.id} · v${demo.dataset.version}</b></div></div>`;
}

function ask() {
  const questions = [
    ["issues", "Top preventable issues"],
    ["prevent", "Predict before it breaks"],
    ["setup", "First-time setup friction"],
    ["deflect", "CRC deflection"],
    ["assist", "Agent assist"],
  ];
  return `${shellHead("MOMENT 1 · ASK", "Start with a business question.", "A deterministic answer over the synthetic fixture, with its inputs and limits in view.")}${syntheticBanner("Counts and rates on this page are calculated from fabricated scenario fixtures; they are not customer observations.")}<section class="icc-card">${cardHead("Question starters", "Five Machine Assistance questions from the brief.")}<div class="question-list">${questions.map(([id, label]) => `<button class="question-chip ${state.query === id ? "active" : ""}" data-query="${id}">${label}</button>`).join("")}</div><div style="padding-top:13px;border-top:1px solid #edf0ed">${state.query === "issues" ? `<div class="icc-kicker"><i></i>SYNTHETIC DATASET BASELINE</div>` : `<div class="icc-kicker"><i></i>SCENARIO ANSWER · SYNTHETIC</div>`}<div style="margin-top:10px">${answerBody()}</div></div><div style="display:flex;justify-content:flex-end;margin-top:14px">${actionButton("Meet the Overdue Descaler cohort", "go-cohort", true, "arrow-right")}</div></section>`;
}

function cohortPage() {
  const cohort = getCohort();
  const members = demo.cohortCount(cohort);
  const voice = state.voiceAnswer || demo.answerPersonaQuestion(cohort.id, state.voiceQuestion);
  return `${shellHead("MOMENT 2 · MEET THE COHORT", "A useful segment, not a real customer list.", "Inspect the signals behind Overdue Descalers, then hear one clearly labeled synthetic persona voice.")}${syntheticBanner("Cohort profile and illustrative member voice are fabricated from the supplied brief.")}<div class="cohort-grid">${demo.summarizeCohorts().map((item) => `<button class="cohort-card ${item.id === cohort.id ? "selected" : ""}" data-cohort="${item.id}"><h3>${item.name}</h3><p>${item.profile}</p><span class="cohort-card-foot"><span>${Math.round(item.share * 100)}% SHARE</span><span>${format(item.count)} SYNTHETIC RECORDS</span></span></button>`).join("")}</div>
    <div class="cohort-detail"><section class="icc-card">${cardHead(cohort.name, `${Math.round(cohort.share * 100)}% illustrative share · ${format(members)} records in fixture`, badge("SYNTHETIC COHORT"))}<div class="cohort-profile"><span>PROFILE</span><b>${cohort.profile}</b></div><div class="cohort-profile"><span>KEY SIGNALS</span><b><span class="signal-list">${cohort.signals.map((signal) => `<span class="signal-chip">${signal}</span>`).join("")}</span></b></div><div class="cohort-profile"><span>DEMO QUESTION</span><b>Which low-effort, timely support might prevent a later blockage contact?</b></div><div class="cohort-profile"><span>LINKED RULE</span><b>Descale alert ignored &gt;${demo.dataset.rules.ignoredDescaleAlertDays} days → ${demo.dataset.rules.blockageRiskMultiplier}× synthetic blockage-risk multiplier.</b></div><div class="data-note">Risk multiplier is planted for this scenario; it is not an observed Nespresso relationship.</div></section>
    <section class="icc-card"><div class="icc-card-head"><div><h2>Talk to a synthetic persona</h2><p>Role-play grounded in the cohort signals shown here.</p></div>${badge("NOT A STAT")}</div><div class="voice-card"><span class="icc-kicker"><i></i>${cohort.name.toUpperCase()} · ILLUSTRATIVE VOICE</span>${state.voiceAnswer ? `<div class="voice-question">${escapeHTML(state.voiceQuestion)}</div>` : ""}<blockquote>“${escapeHTML(voice.text)}”</blockquote><div class="voice-cite">${voice.evidence.length ? `Grounded in fixture signals: ${voice.evidence.join(" · ")}.` : "No cohort evidence supports this response."} ${voice.limitation}</div></div><form class="persona-chat" data-persona-form><label for="persona-question">Ask this synthetic persona</label><div><input id="persona-question" name="question" value="${escapeHTML(state.voiceQuestion)}" /><button class="button primary" type="submit">Ask ${icon("arrow-up")}</button></div><div class="persona-prompts"><button type="button" data-persona-prompt="What made you leave descaling for later?">Why later?</button><button type="button" data-persona-prompt="What kind of reminder would be useful?">What reminder helps?</button><button type="button" data-persona-prompt="What is your favorite music?">Out-of-scope check</button></div></form><div style="display:flex;justify-content:flex-end;margin-top:12px">${actionButton("Test a day-75 app nudge", "go-simulation", true, "arrow-right")}</div></section></div>`;
}

function simulationPage() {
  const simulation = demo.simulateDescaleNudge({ uptake: state.uptake / 100, effect: state.effect / 100, horizonMonths: 12, nudgeStartDay: 75 });
  const baselineEvents = simulation.monthly.map((step) => step.baselineIssueEvents);
  const maxEvents = Math.max(...baselineEvents);
  const bars = simulation.monthly.map((step) => `<div class="month-bar ${step.nudgeActive ? "active" : ""}" title="Month ${step.month}: ${step.avoidedIssueEvents} avoided issue events"><i style="height:${Math.max(6, (step.avoidedIssueEvents / maxEvents) * 100)}%"></i><span>${step.month}</span></div>`).join("");
  return `${shellHead("MOMENT 3 · TEST AN IDEA", "Run an explainable what-if.", "A rule-based cohort scenario, rolled forward month by month. Change uptake and effect size to test assumptions.")}${syntheticBanner("Projection is a scenario calculation over fabricated inputs, not a forecast or measured intervention effect.")}<div class="icc-columns"><div><section class="icc-card">${cardHead("Day-75 app nudge · 2-minute descaling tutorial", "Cohort: Overdue Descaler · horizon: 12 months", badge("SIMULATED"))}<form data-simulation-form><div class="control-grid"><div class="control"><label for="uptake"><span>Nudge uptake</span><output id="uptake-value">${state.uptake}%</output></label><input id="uptake" name="uptake" type="range" min="0" max="100" step="1" value="${state.uptake}" /></div><div class="control"><label for="effect"><span>Issue-risk reduction if acted</span><output id="effect-value">${state.effect}%</output></label><input id="effect" name="effect" type="range" min="0" max="60" step="1" value="${state.effect}" /></div></div><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:11px"><span class="data-note" style="margin:0">Nudge sent on day 75 · ${simulation.assumptions.ignoredDescaleAlertDays}+ day alert</span><button class="button primary" type="submit">Update simulation ${icon("refresh-cw")}</button></div></form><div class="simulation-results"><div class="simulation-metric"><span>CRC contacts avoided*</span><strong>${format(simulation.midpoint.crcContactsAvoided)}</strong><small>range ${format(simulation.ranges.crcContactsAvoided.low)}–${format(simulation.ranges.crcContactsAvoided.high)}</small></div><div class="simulation-metric"><span>Lapse rate change*</span><strong>−${simulation.midpoint.lapseRateDeltaPercentagePoints.toFixed(2)} pp</strong><small>range −${simulation.ranges.lapseRateDeltaPercentagePoints.high.toFixed(2)} to −${simulation.ranges.lapseRateDeltaPercentagePoints.low.toFixed(2)} pp</small></div><div class="simulation-metric"><span>Capsule volume protected*</span><strong>${format(simulation.midpoint.capsuleVolumeProtected)}</strong><small>range ${format(simulation.ranges.capsuleVolumeProtected.low)}–${format(simulation.ranges.capsuleVolumeProtected.high)}</small></div></div><div class="data-note">*Simulated midpoint and illustrative ±${Math.round(simulation.assumptions.uncertaintyFraction * 100)}% sensitivity range. Range is a simple scenario band, not a statistical confidence interval.</div></section>
    <section class="icc-card">${cardHead("Monthly roll-forward", "The nudge begins in month 3 (day 75). Bars show avoided issue events per month.", `<span class="synthetic-label">SIMULATED</span>`)}<div class="monthly-bars" role="img" aria-label="12-month simulated issue-event reductions, beginning in month three">${bars}</div><div style="display:flex;justify-content:space-between;color:#929c95;font:8px var(--mono)"><span>NUDGE NOT SENT</span><span>NUDGE ACTIVE</span></div></section></div>
    <aside><section class="icc-card">${cardHead("Assumptions in this run", "Editable inputs are separated from planted scenario rules.")}<div class="assumption-list"><div class="assumption"><span>Overdue cohort size</span><b>${format(simulation.assumptions.cohortCustomers)}</b></div><div class="assumption"><span>Monthly base issue risk</span><b>${(simulation.assumptions.monthlyBaseIssueRisk * 100).toFixed(1)}%</b></div><div class="assumption"><span>Risk multiplier after 60d</span><b>${simulation.assumptions.blockageRiskMultiplier}×</b></div><div class="assumption"><span>Uptake × effect</span><b>${state.uptake}% × ${state.effect}%</b></div><div class="assumption"><span>Unresolved CRC → lapse</span><b>${demo.dataset.rules.unresolvedCrcLapseMultiplier}× risk</b></div><div class="assumption"><span>Range method</span><b>±${Math.round(simulation.assumptions.uncertaintyFraction * 100)}%</b></div></div><p class="data-note">Capsule volume uses ${cohortCapsules()} per month for ${demo.dataset.rules.retainedCapsulesMonths} retained months per avoided lapse. This is a transparent scenario assumption.</p></section><section class="icc-card">${cardHead("Rule sketch", "No black-box inference")}<p class="answer-copy">Monthly issue risk = cohort base rate × planted risk multiplier. Expected avoided events = baseline events × nudge uptake × effect. The simulator applies this independently to each month in the selected horizon.</p><div style="margin-top:12px">${actionButton("Turn result into a Feature Card", "go-feature", true, "arrow-right")}</div></section></aside></div>`;
}

function cohortCapsules() { return demo.dataset.cohorts.find((cohort) => cohort.id === "overdue-descaler").monthlyCapsules; }

function featurePage() {
  const feature = demo.dataset.featureCard;
  const cohort = demo.dataset.cohorts.find((item) => item.id === feature.cohortId);
  const simulation = demo.simulateDescaleNudge({ uptake: state.uptake / 100, effect: state.effect / 100 });
  const score = demo.calculatePriorityScore();
  return `${shellHead("MOMENT 4 · DECIDE", "A ranked feature candidate, not just an insight.", "This card connects the synthetic evidence and simulated impact to a next-step product discussion.", actionButton("Back to what-if", "go-simulation", false, "arrow-left"))}${syntheticBanner("Candidate is for discussion only. Nessy fit and priority weights are provisional pending client alignment.")}<article class="feature-card"><div class="feature-top"><div>${badge("FEATURE CANDIDATE · RANK 1") }<h2>${feature.title}</h2><p>Machine Assistance · ${cohort.name} · internal concept</p></div><div class="priority-score"><strong>${score}</strong><span>PROVISIONAL / 100</span></div></div><div class="feature-fields"><div class="feature-field"><span>Problem</span><p>${feature.problem}</p></div><div class="feature-field"><span>Target cohort</span><b>${cohort.name} · ${Math.round(cohort.share * 100)}% synthetic share</b></div><div class="feature-field wide"><span>Evidence · synthetic dataset baseline</span><p>${demo.dataset.rules.blockageRiskMultiplier}× midpoint rule for blockage risk after a descale alert is ignored beyond ${demo.dataset.rules.ignoredDescaleAlertDays} days; the brief's scenario range is 3–4×. Signals: ignored alerts, flow-rate drops, and later blockage contacts. Planted relationship; not causal evidence.</p></div><div class="feature-field"><span>Simulated impact · ${simulation.horizonMonths} months</span><b>${format(simulation.midpoint.crcContactsAvoided)} fewer CRC contacts (range ${format(simulation.ranges.crcContactsAvoided.low)}–${format(simulation.ranges.crcContactsAvoided.high)}); −${simulation.midpoint.lapseRateDeltaPercentagePoints.toFixed(2)} pp lapse; ${format(simulation.midpoint.capsuleVolumeProtected)} capsules protected.</b></div><div class="feature-field"><span>Persona voice · illustrative only</span><p>“${cohort.response}”<br /><small>Grounded in synthetic cohort signals; not a customer quote.</small></p></div><div class="feature-field"><span>CRC impact</span><b>Potential reduction in preventable blockage contacts and associated voice AHT; validate with a controlled pilot.</b></div><div class="feature-field"><span>Production data needed</span><b>${feature.productionDataNeeded}</b></div><div class="feature-field"><span>Nessy Chapter 1 fit</span><b>${feature.nessyFit}</b><p>${feature.priorityNote}</p></div><div class="feature-field"><span>Priority scoring</span><b>Impact 40% · feasibility 30% · strategic fit 30%</b><p>Inputs are provisional; rubric not approved.</p></div></div><div class="feature-footer"><span class="data-note" style="margin:0">Not a committed roadmap item · no backlog integration in this demo.</span><button class="button ${state.added ? "" : "primary"}" data-icc-action="add-feature" ${state.added ? "disabled" : ""}>${state.added ? "Added to demo backlog" : "Add to ranked demo backlog"} ${icon(state.added ? "check" : "list-plus")}</button></div></article><div style="display:flex;justify-content:flex-end;margin-top:13px">${actionButton("Zoom out to pillar previews", "go-preview", false, "arrow-right")}</div>`;
}

function preview() {
  const previews = {
    subscription: {
      name: "Subscription",
      question: "Which machine owners in this synthetic population never subscribe, and what trigger might help?",
      answer: "Preview only: compare the Connected Enthusiast and Silent Struggler synthetic cohorts, then test whether setup completion or service resolution precedes subscription interest. No subscription-trigger effect is quantified in this demo.",
    },
    loyalty: {
      name: "Loyalty",
      question: "Do unresolved machine issues appear before lapse in this synthetic scenario?",
      answer: `Preview only: the planted scenario rule sets ${demo.dataset.rules.unresolvedCrcLapseMultiplier}× lapse risk after an unresolved CRC contact. This is an illustrative relationship for a future test, not measured loyalty behavior or causal evidence.`,
    },
  }[state.pillar === "machine" ? "subscription" : state.pillar];
  return `${shellHead("MOMENT 5 · ZOOM OUT", "One command center, more than one question.", "Machine Assistance is the live walkthrough. Subscription and Loyalty remain lightweight previews.")}${pillarSwitcher()}<section class="preview-card"><div class="icc-kicker"><i></i>${previews.name.toUpperCase()} · PREVIEW</div><h2 style="margin-top:9px">A question to take into the next pillar.</h2><div class="preview-question">${previews.question}</div><p class="preview-answer">${previews.answer}</p><div class="data-note">This preview contains one canned question and answer. It is not a live analysis or a roadmap commitment.</div></section><section class="icc-card" style="margin-top:12px">${cardHead("Machine Assistance · live demo path", "Return to the ranked Feature Card and synthetic scenario.", actionButton("Open Feature Card", "go-feature", true, "arrow-right"))}<p class="answer-copy">The current demo path ends with a discussion candidate for Nessy Chapter 1. Confirm scoring and backlog/roadmap destination with the meeting owner.</p></section>`;
}

function render() {
  document.title = `${pages[state.view]} | Innovation Command Center`;
  document.querySelector("#icc-crumb").textContent = pages[state.view];
  document.querySelector("#icc-role").value = state.role;
  document.querySelectorAll("[data-icc-view]").forEach((button) => button.classList.toggle("active", button.dataset.iccView === state.view));
  const renderers = { overview, ask, cohort: cohortPage, simulation: simulationPage, feature: featurePage, preview };
  app.innerHTML = renderers[state.view]();
  clarifyAggregateCountLabels();
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
}

function clarifyAggregateCountLabels() {
  if (state.view === "overview") {
    const population = app.querySelector(".icc-stat");
    population.querySelector(".icc-stat-label span").textContent = "Synthetic population basis";
    population.querySelector(".icc-stat-note").textContent = `Cohort-count basis · v${demo.dataset.version}`;
    const note = [...app.querySelectorAll(".data-note")].find((element) => element.textContent.includes("10,000-record fixture"));
    if (note) note.textContent = "Cohort counts are rounded from a 10,000-customer calculation basis; individual records are not materialized.";
  }
  if (state.view === "cohort") {
    app.querySelectorAll(".cohort-card").forEach((card) => {
      const cohort = demo.dataset.cohorts.find((item) => item.id === card.dataset.cohort);
      card.querySelector(".cohort-card-foot span:last-child").textContent = `${format(demo.cohortCount(cohort))} COUNT BASIS`;
    });
    const countNote = app.querySelector(".cohort-detail > .icc-card .icc-card-head p");
    if (countNote) countNote.textContent = `${Math.round(getCohort().share * 100)}% illustrative share · ${format(demo.cohortCount(getCohort()))} count basis`;
  }
}

function navigate(view) {
  if (!pages[view]) return;
  state.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toast(message) {
  const element = document.querySelector("#icc-toast");
  element.textContent = message;
  element.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => element.classList.remove("visible"), 2600);
}

document.addEventListener("click", (event) => {
  const view = event.target.closest("[data-icc-view]");
  const action = event.target.closest("[data-icc-action]");
  const cohort = event.target.closest("[data-cohort]");
  const query = event.target.closest("[data-query]");
  const pillar = event.target.closest("[data-pillar]");
  if (view) { navigate(view.dataset.iccView); return; }
  if (cohort) { state.cohort = cohort.dataset.cohort; state.voiceQuestion = "Why did you leave descaling for later?"; state.voiceAnswer = null; navigate("cohort"); return; }
  if (query) { state.query = query.dataset.query; render(); return; }
  const personaPrompt = event.target.closest("[data-persona-prompt]");
  if (personaPrompt) {
    document.querySelector("#persona-question").value = personaPrompt.dataset.personaPrompt;
    return;
  }
  if (pillar) {
    state.pillar = pillar.dataset.pillar;
    if (state.pillar !== "machine") navigate("preview");
    else navigate("overview");
    return;
  }
  if (!action) return;
  const actions = {
    "go-ask": () => navigate("ask"),
    "go-cohort": () => navigate("cohort"),
    "go-simulation": () => navigate("simulation"),
    "go-feature": () => navigate("feature"),
    "go-preview": () => { state.pillar = "subscription"; navigate("preview"); },
    "add-feature": () => { state.added = true; render(); toast("Feature added to this demo's ranked backlog."); },
    "reset-demo": () => {
      Object.assign(state, { view: "overview", pillar: "machine", query: "issues", cohort: "overdue-descaler", voice: false, added: false, uptake: 42, effect: 32 });
      render();
      toast("ICC demo reset to its starting state.");
    },
  };
  actions[action.dataset.iccAction]?.();
});

document.addEventListener("input", (event) => {
  if (event.target.id === "uptake") document.querySelector("#uptake-value").textContent = `${event.target.value}%`;
  if (event.target.id === "effect") document.querySelector("#effect-value").textContent = `${event.target.value}%`;
});

document.querySelector("#icc-role").addEventListener("change", (event) => {
  state.role = event.target.value;
  render();
});

document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-persona-form]")) {
    event.preventDefault();
    state.voiceQuestion = new FormData(event.target).get("question") || "What made you leave descaling for later?";
    state.voiceAnswer = demo.answerPersonaQuestion(state.cohort, state.voiceQuestion);
    render();
    return;
  }
  if (!event.target.matches("[data-simulation-form]")) return;
  event.preventDefault();
  const values = new FormData(event.target);
  state.uptake = Number(values.get("uptake"));
  state.effect = Number(values.get("effect"));
  render();
});

render();