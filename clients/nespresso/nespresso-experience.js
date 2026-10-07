const demo = window.nespressoDemo;
const initialState = {
  view: "doors",
  door: null,
  pillar: "machine",
  query: "issues",
  question: "What should the ICC help decide?",
  cohort: "overdue-descaler",
  voiceQuestion: "Why did you leave descaling for later?",
  voiceAnswer: null,
  uptake: 42,
  effect: 32,
  delayDays: 75,
  scaleToCustomers: 3000,
  backlogItems: [],
  panelQuestion: "What would make support easier?",
};
const state = { ...initialState, backlogItems: [] };
const app = document.querySelector("#icc-app");
const pages = { doors: "Choose a decision", ask: "Ask", cohort: "Cohorts", simulation: "What-if", backlog: "Ranked backlog", zoom: "Zoom out", data: "Your data" };
let toastTimer;

function icon(name) { return `<i data-lucide="${name}" aria-hidden="true"></i>`; }
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function number(value) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value); }
function euro(value) { return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value); }
function answerBadge(type, label = "") {
  const cls = { observed: "badge-observed", simulated: "badge-simulated", persona: "badge-persona" }[type];
  return `<button class="type-badge ${cls}" type="button" data-assumptions aria-label="${label || type} output. Open assumptions and method">${type === "persona" ? icon("quote") : `<i></i>`}${label || type}</button>`;
}
function shellHead(kicker, title, subtitle, actions = "") {
  return `<div class="icc-head"><div><div class="icc-kicker"><i></i>${kicker}</div><h1 class="icc-title">${title}</h1><p class="icc-subtitle">${subtitle}</p></div>${actions ? `<div class="icc-head-actions">${actions}</div>` : ""}</div>`;
}
function cardHead(title, subtitle = "", right = "") {
  return `<div class="icc-card-head"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ""}</div>${right}</div>`;
}
function actionButton(label, action, primary = false, symbol = "") {
  return `<button class="button ${primary ? "primary" : ""}" data-action="${action}">${symbol ? icon(symbol) : ""}${label}</button>`;
}
function getCohort(id = state.cohort) { return demo.dataset.cohorts.find((cohort) => cohort.id === id); }
function setView(view) {
  if (!pages[view]) return;
  state.view = view;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function assumptionDialog() {
  const dialog = document.querySelector("#assumptions-dialog");
  if (dialog && !dialog.open) dialog.showModal();
}
function toast(message) {
  const node = document.querySelector("#icc-toast");
  node.textContent = message;
  node.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("visible"), 2400);
}
function miniBar(value, max, colorClass = "") {
  return `<span class="mini-bar ${colorClass}"><i style="width:${max ? Math.max(2, value / max * 100) : 0}%"></i></span>`;
}
function pillarSwitcher() {
  return `<div class="pillars"><button class="pillar ${state.pillar === "machine" ? "active" : ""}" data-pillar="machine"><b>Machine Assistance</b></button><button class="pillar ${state.pillar === "subscription" ? "active" : ""}" data-pillar="subscription"><b>Subscription</b></button><button class="pillar ${state.pillar === "loyalty" ? "active" : ""}" data-pillar="loyalty"><b>Loyalty</b></button></div>`;
}

function doors() {
  const cards = [
    { id: "innovation", title: "Innovation Advisor", question: "Which machine issues drive the most CRC contacts, and which are preventable?", query: "issues", pillar: "machine", icon: "compass", description: "Find a preventable issue, test an intervention, and shape a ranked plan." },
    { id: "marketing", title: "Marketing Advisor", question: "Which message or offer might fit each synthetic cohort?", query: "marketing", pillar: "subscription", icon: "megaphone", description: "Explore cohort differences before developing a message or offer." },
    { id: "persona", title: "Persona Advisor", question: "Which owners may need a maintenance nudge before a blockage?", query: "prevent", pillar: "machine", icon: "users-round", description: "Start with one cohort and understand the signals behind its needs." },
  ];
  return `${shellHead("INNOVATION COMMAND CENTER · INTERNAL CONCEPT", "What do you want the ICC to help you decide?", "Choose a starting point. Each path joins the same evidence-to-action walkthrough.")}${pillarSwitcher()}<div class="door-grid">${cards.map((card) => `<button class="door-card" data-door="${card.id}" data-question="${card.question}" data-door-query="${card.query}" data-door-pillar="${card.pillar}"><span class="door-icon">${icon(card.icon)}</span><span class="door-copy"><b>${card.title}</b><small>${card.description}</small><em>START WITH A QUESTION ${icon("arrow-right")}</em></span></button>`).join("")}</div><p class="door-footnote">Synthetic personas and cohort data · internal concept</p>`;
}

const questionOptions = [
  { id: "issues", title: "Top preventable issues", prompt: "Which machine issues drive the most CRC contacts, and which are preventable?", icon: "chart-no-axes-combined" },
  { id: "prevent", title: "Predict before it breaks", prompt: "Which owners may need a maintenance nudge before a blockage?", icon: "bell-ring" },
  { id: "setup", title: "First-time setup friction", prompt: "Where do new connected owners get stuck during setup?", icon: "smartphone" },
  { id: "deflect", title: "CRC deflection", prompt: "Which contact reasons might self-serve support address?", icon: "message-circle-question" },
  { id: "assist", title: "Agent assist", prompt: "Which issue types have the longest voice handle time?", icon: "headset" },
  { id: "marketing", title: "Message / offer fit", prompt: "Which message or offer might fit each synthetic cohort?", icon: "megaphone" },
];
function resolveQuery(value) {
  const text = value.toLowerCase();
  if (/message|offer|marketing|campaign/.test(text)) return "marketing";
  if (/pair|setup|connect|first brew/.test(text)) return "setup";
  if (/agent|handle|aht|repeat|voice/.test(text)) return "assist";
  if (/self.?serve|deflect|resolve/.test(text)) return "deflect";
  if (/predict|risk|before|prevent|descal/.test(text)) return "prevent";
  return "issues";
}
function issueRows() {
  const ranked = demo.rankIssues();
  const maintenance = ranked.filter((issue) => ["blockage", "descale-guidance"].includes(issue.id));
  const other = ranked.filter((issue) => !["blockage", "descale-guidance"].includes(issue.id));
  const renderRows = (items) => items.map((issue) => `<tr><td>${ranked.indexOf(issue) + 1}. ${issue.name}</td><td>${number(issue.contacts)}</td><td>${Math.round(issue.preventability * 100)}%</td><td>${Math.round(issue.retentionImpact * 100)}%</td><td>${number(Math.round(issue.priorityScore))}</td></tr>`).join("");
  return `<tr class="group-row"><th colspan="5">Maintenance-driven contacts</th></tr>${renderRows(maintenance)}<tr class="group-row"><th colspan="5">Other contact reasons</th></tr>${renderRows(other)}`;
  return `<tr class="group-row"><th colspan="5">Maintenance-driven contacts</th></tr>${renderRows(maintenance, 0)}<tr class="group-row"><th colspan="5">Other contact reasons</th></tr>${renderRows(other, 2)}`;
}
function answerContent() {
  if (state.query === "issues") return `<h2 class="answer-title">Maintenance issues lead the relative priority score.</h2><p class="answer-copy">Ranked by contact volume, preventability, and retention impact in the demo dataset.</p><div class="issue-chart">${demo.rankIssues().map((issue) => `<div class="issue-bar-row"><span>${issue.name}</span>${miniBar(issue.contacts, demo.rankIssues()[0].contacts)}<strong>${number(issue.contacts)}</strong></div>`).join("")}</div><div class="data-source">Demo dataset · scenario v${demo.dataset.version}</div><div class="table-scroll"><table class="issues-table"><thead><tr><th>Rank / reason</th><th>Contacts</th><th>Preventable</th><th>Retention</th><th>Relative score</th></tr></thead><tbody>${issueRows()}</tbody></table></div>`;
  const answer = {
    prevent: "Overdue Descalers are the lead synthetic cohort. The scenario assumes ignored descale alerts beyond 60 days are associated with higher blockage-contact risk; validate against first-party data before acting.",
    setup: `Setup Sam is 15% of the demo population. The brief gives ${Math.round(demo.dataset.rules.setupSamNeverPairsAppRate * 100)}% of this cohort as never pairing, and separately ${Math.round(demo.dataset.rules.weekOnePairingFailureAppNonConnection * 100)}% conditional on a week-one pairing failure. The denominators differ.`,
    deflect: "Demo-authored guidance covers descaling, pairing, and flow changes. It identifies candidate self-serve topics; the demo does not estimate a deflection rate.",
    assist: "The demo dataset ranks blockage voice contacts highest for average handle time and pairing chat highest for repeats. These are scenario inputs, not operating metrics.",
    marketing: "The synthetic cohorts respond to different needs: transparent comparisons may support value-focused audiences, while new or time-poor owners may benefit from a clear next step. This is a starting hypothesis for testing, not a measured message preference.",
  }[state.query];
    return `<p class="answer-copy">${answer}</p>`;
}
function ask() {
  return `${shellHead("MOMENT 1 · ASK", "Start with a business question.", "Use a starter or ask in your own words. Results stay linked to their source type.")}${pillarSwitcher()}<section class="icc-card">${cardHead("Question starters", "Choose one question to open the answer.") }<div class="starter-grid">${questionOptions.map((item) => `<button class="starter-card ${state.query === item.id ? "selected" : ""}" data-query="${item.id}"><i>${icon(item.icon)}</i><b>${item.title}</b><span>${item.prompt}</span></button>`).join("")}</div><form class="ask-form" data-ask-form><label for="ask-question">Ask a question</label><div><input id="ask-question" name="question" value="${escapeHTML(state.question)}" placeholder="Which issues should we address first?"/><button class="button primary" type="submit">Ask ${icon("arrow-right")}</button></div></form><div class="answer-panel">${cardHead("Answer", state.query === "issues" ? "Ranked synthetic dataset baseline" : "Scenario answer", answerBadge("observed", "Observed · demo dataset"))}${answerContent()}</div><div class="flow-next">${actionButton("Meet the cohort", "go-cohort", true, "arrow-right")}</div></section>`;
}
function cohortPage() {
  const cohort = getCohort();
  const voice = state.voiceAnswer || demo.answerPersonaQuestion(cohort.id, state.voiceQuestion);
  return `${shellHead("MOMENT 2 · MEET THE COHORT", cohort.name, "Inspect the signals, then ask a synthetic persona grounded in this cohort.") }<div class="cohort-grid">${demo.summarizeCohorts().map((item) => `<button class="cohort-card ${item.id === cohort.id ? "selected" : ""}" data-cohort="${item.id}"><h3>${item.name}</h3><p>${item.profile}</p><span class="cohort-card-foot"><span>${Math.round(item.share * 100)}% SHARE</span><span>${number(item.count)} EST. COHORT</span></span></button>`).join("")}</div><div class="cohort-detail"><section class="icc-card">${cardHead(cohort.name, `${Math.round(cohort.share * 100)}% share · ${number(demo.cohortCount(cohort))} estimated members`, answerBadge("observed", "Observed · demo dataset"))}<div class="cohort-profile"><span>PROFILE</span><b>${cohort.profile}</b></div><div class="cohort-profile"><span>KEY SIGNALS</span><b><span class="signal-list">${cohort.signals.map((signal) => `<span class="signal-chip">${signal}</span>`).join("")}</span></b></div><div class="cohort-profile"><span>SCENARIO ASSUMPTION</span><b>Ignored descale alert beyond ${demo.dataset.rules.ignoredDescaleAlertDays} days → ${demo.dataset.rules.blockageRiskMultiplier}× midpoint risk multiplier.</b></div></section><section class="icc-card">${cardHead("Talk to a synthetic persona", "Qualitative role-play grounded in the displayed cohort signals.", answerBadge("persona", "Persona · illustrative"))}<div class="voice-card"><div class="voice-question">${state.voiceAnswer ? escapeHTML(state.voiceQuestion) : "Why do some owners leave the descale alert for later?"}</div><blockquote>${escapeHTML(voice.text)}</blockquote><div class="voice-cite">${voice.evidence.length ? `Signals: ${voice.evidence.join(" · ")}` : "No cohort evidence supports this response."}</div></div><form class="persona-chat" data-persona-form><label for="persona-question">Ask this synthetic persona</label><div><input id="persona-question" name="question" value="${escapeHTML(state.voiceQuestion)}"/><button class="button primary" type="submit">Ask ${icon("arrow-up")}</button></div><div class="persona-prompts"><button type="button" data-persona-prompt="What kind of reminder would be useful?">What reminder helps?</button><a href="#" data-guardrail>Test guardrail</a></div></form><div class="flow-next">${actionButton("Test a timed nudge", "go-simulation", true, "arrow-right")}</div></section></div>`;
}

function lineChart(monthly) {
  const width = 640, height = 200, padX = 22, padY = 20;
  const max = Math.max(...monthly.map((item) => item.baselineContacts)) * 1.08;
  const x = (i) => padX + i * (width - padX * 2) / (monthly.length - 1);
  const y = (v) => height - padY - v / max * (height - padY * 2);
  const baseline = monthly.map((item, i) => `${x(i)},${y(item.baselineContacts)}`).join(" ");
  const withNudge = monthly.map((item, i) => `${x(i)},${y(item.withNudgeContacts)}`).join(" ");
  const gap = [...monthly.map((item, i) => `${x(i)},${y(item.baselineContacts)}`), ...monthly.map((item, i) => `${x(monthly.length - 1 - i)},${y(monthly[monthly.length - 1 - i].withNudgeContacts)}`)].join(" ");
  return `<svg class="contact-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Monthly baseline contacts compared with simulated contacts after the nudge"><polygon points="${gap}" class="chart-gap"/><polyline points="${baseline}" class="chart-baseline"/><polyline points="${withNudge}" class="chart-intervention"/>${monthly.map((item, i) => i % 2 === 0 ? `<text x="${x(i)}" y="${height - 2}">M${item.month}</text>` : "").join("")}</svg>`;
}
function simulationPage() {
  const result = demo.simulateDescaleNudge({ uptake: state.uptake / 100, effect: state.effect / 100, nudgeDelayDays: state.delayDays, scaleToCustomers: state.scaleToCustomers });
  const cohortSize = 3000;
  const scaleLabel = state.scaleToCustomers === cohortSize ? `This cohort (${number(cohortSize)})` : `Per ${number(state.scaleToCustomers)} Overdue Descalers`;
  return `${shellHead("MOMENT 3 · TEST AN IDEA", "What could a timely nudge change?", "Compare monthly CRC contacts with and without a short descaling tutorial.")}${pillarSwitcher()}<div class="simulation-layout"><div><section class="icc-card">${cardHead("2-minute descaling tutorial", `${scaleLabel} · 12-month simulation`, answerBadge("simulated", "Simulated"))}<form data-simulation-form><div class="simulation-controls"><div class="control"><label for="delay"><span>Nudge sent N days after an ignored descale alert</span><output>${state.delayDays} days</output></label><input id="delay" data-live-range data-unit=" days" name="delay" type="range" min="0" max="180" step="1" value="${state.delayDays}"/></div><div class="control"><label for="uptake"><span>Uptake</span><output>${state.uptake}%</output></label><input id="uptake" data-live-range name="uptake" type="range" min="0" max="100" value="${state.uptake}"/></div><div class="control"><label for="effect"><span>Issue-risk reduction if acted</span><output>${state.effect}%</output></label><input id="effect" data-live-range name="effect" type="range" min="0" max="60" value="${state.effect}"/></div><label class="scale-toggle"><input type="checkbox" name="scale" ${state.scaleToCustomers > cohortSize ? "checked" : ""}/><span>This cohort (${number(cohortSize)})</span><b>↔</b><span>Per 100,000 Overdue Descalers</span><small>Linear scale-up, illustrative</small></label></div><button class="button primary" type="submit">Apply simulation ${icon("refresh-cw")}</button></form><div class="hero-outcome"><div><span>% OF THIS COHORT’S BLOCKAGE CONTACTS AVOIDED OVER 12 MONTHS</span><strong>${result.midpoint.pctBlockageContactsAvoided.toFixed(2)}%</strong><small>${number(result.midpoint.crcContactsAvoided)} of about ${number(result.midpoint.baselineBlockageContacts)} contacts</small></div><div class="hero-range">Sensitivity range<br/><b>${result.ranges.pctBlockageContactsAvoided.low.toFixed(2)}–${result.ranges.pctBlockageContactsAvoided.high.toFixed(2)}%</b></div></div><div class="revenue-outcome"><span>Illustrative capsule revenue protected</span><strong>${euro(result.midpoint.capsuleRevenueProtectedEur)}</strong><small>${euro(result.ranges.capsuleRevenueProtectedEur.low)}–${euro(result.ranges.capsuleRevenueProtectedEur.high)} sensitivity range</small></div><div class="chart-legend"><span><i class="legend-baseline"></i>Baseline monthly contacts</span><span><i class="legend-intervention"></i>With nudge</span></div><div id="sim-chart">${lineChart(result.monthly)}</div><p class="single-caveat">Illustrative simulation, not a forecast; the sensitivity band is not a statistical confidence interval.</p></section></div><aside><section class="icc-card">${cardHead("Assumptions in this run", "Open the shared drawer for full method and sources.") }<div class="assumption-list"><div class="assumption"><span>Monthly issue risk</span><b>${(result.assumptions.monthlyBaseIssueRisk * 100).toFixed(1)}%</b></div><div class="assumption"><span>Multiplier after 60 days</span><b>${result.assumptions.blockageRiskMultiplier}×</b></div><div class="assumption"><span>Uptake × effect</span><b>${state.uptake}% × ${state.effect}%</b></div><div class="assumption"><span>Capsule price midpoint</span><b>€${result.assumptions.illustrativeCapsulePriceEur.toFixed(2)}</b></div><div class="assumption"><span>54 × 12 × €0.65 / customer / year</span><b>€${result.assumptions.annualCapsuleSpendSanityCheckEur.toFixed(0)}</b></div></div><button class="text-link" data-assumptions>Assumptions & method ${icon("arrow-up-right")}</button><div class="flow-next">${actionButton("Add descaling guide to backlog", "add-selected-to-backlog", true, "arrow-right")}</div></section></aside></div>`;
}
function updateSimulationPreview(form) {
  const values = new FormData(form);
  const delayDays = Number(values.get("delay"));
  const uptake = Number(values.get("uptake"));
  const effect = Number(values.get("effect"));
  const scaleToCustomers = values.has("scale") ? 100000 : 3000;
  const result = demo.simulateDescaleNudge({ uptake: uptake / 100, effect: effect / 100, nudgeDelayDays: delayDays, scaleToCustomers });
  const scaleLabel = scaleToCustomers === 3000 ? "This cohort (3,000)" : "Per 100,000 Overdue Descalers";
  document.querySelector(".simulation-layout > div > .icc-card .icc-card-head p").textContent = `${scaleLabel} · 12-month simulation`;
  form.querySelector("#delay").closest(".control").querySelector("output").value = `${delayDays} days`;
  form.querySelector("#uptake").closest(".control").querySelector("output").value = `${uptake}%`;
  form.querySelector("#effect").closest(".control").querySelector("output").value = `${effect}%`;
  document.querySelector(".hero-outcome > div > strong").textContent = `${result.midpoint.pctBlockageContactsAvoided.toFixed(2)}%`;
  document.querySelector(".hero-outcome > div > small").textContent = `${number(result.midpoint.crcContactsAvoided)} of about ${number(result.midpoint.baselineBlockageContacts)} contacts`;
  document.querySelector(".hero-range b").textContent = `${result.ranges.pctBlockageContactsAvoided.low.toFixed(2)}–${result.ranges.pctBlockageContactsAvoided.high.toFixed(2)}%`;
  document.querySelector(".revenue-outcome strong").textContent = euro(result.midpoint.capsuleRevenueProtectedEur);
  document.querySelector(".revenue-outcome small").textContent = `${euro(result.ranges.capsuleRevenueProtectedEur.low)}–${euro(result.ranges.capsuleRevenueProtectedEur.high)} sensitivity range`;
  document.querySelector(".contact-chart").outerHTML = lineChart(result.monthly);
  state.delayDays = delayDays;
  state.uptake = uptake;
  state.effect = effect;
  state.scaleToCustomers = scaleToCustomers;
}
function roadmapItems(id) {
  if (id === "Q1") return ["Blockage agent-assist", "Descaling guide", "Pairing assistant"];
  if (id === "Q2") return ["Subscription triggers"];
  if (id === "Q3") return ["Silent Struggler re-engagement", "Loyalty bridge"];
  return ["Cross-cohort panel", "Conversational advisor"];
}
function backlogPage() {
  const features = demo.rankFeatureCards();
  return `${shellHead("MOMENT 4 · DECIDE", "A ranked innovation backlog.", "Four candidate features connect a synthetic need to the data a pilot would require.")}${pillarSwitcher()}<div class="backlog-list">${features.map((feature, index) => `<article class="backlog-card"><div class="rank">${String(index + 1).padStart(2, "0")}</div><div class="backlog-main"><div class="backlog-title"><h2>${feature.title}</h2>${answerBadge("observed", "Synthetic baseline")}</div><p>${feature.problem}</p><div class="backlog-meta"><span>${feature.cohort.name}</span><span>Nessy Ch. 1 · ${feature.nessyFit}</span><span>Effort · ${feature.effort}</span></div><div class="chip-row">${feature.dataNeeded.map((item) => `<span>${item}</span>`).join("")}</div></div><div class="backlog-score"><strong>${feature.priorityScore}</strong><small>PRIORITY / 100</small><button class="button" data-feature-add="${feature.id}">${state.backlogItems.includes(feature.id) ? "In demo backlog" : "Add to backlog"}</button></div></article>`).join("")}</div><section class="roadmap"><div class="roadmap-head"><div><div class="icc-kicker"><i></i>ILLUSTRATIVE ONE-YEAR PLAN</div><h2>From machine assistance to a broader advisor</h2></div>${answerBadge("simulated", "Illustrative roadmap")}</div><div class="roadmap-lanes">${[["Q1", "Machine Assistance pilot"], ["Q2", "Subscription"], ["Q3", "Loyalty"], ["Q4", "Conversational"]].map(([q, title]) => `<article class="roadmap-lane"><div><b>${q}</b><span>${title}</span></div><ul>${roadmapItems(q).map((item) => `<li>${item}</li>`).join("")}</ul></article>`).join("")}</div><p class="single-caveat">Illustrative sequencing for discussion; not a committed roadmap or delivery estimate.</p></section><div class="flow-next">${actionButton("Zoom out across pillars", "go-zoom", true, "arrow-right")}</div>`;
}
function barChart(items, key, label, color) {
  const max = Math.max(...items.map((item) => item[key]));
  return `<div class="computed-chart">${items.map((item) => `<div class="computed-row"><span>${item[label]}</span><i><b class="${color}" style="width:${item[key] / max * 100}%"></b></i><strong>${Math.round(item[key] * 100)}%</strong></div>`).join("")}</div>`;
}
function zoomPage() {
  const subscriptions = demo.subscriptionByCohort();
  const lapse = demo.lapseComparison();
  const lapseRows = [{ cohortName: "Resolved contact", rate: lapse.resolvedRate }, { cohortName: "Unresolved contact", rate: lapse.unresolvedRate }];
  const panel = demo.answerCohortPanel(state.panelQuestion);
  return `${shellHead("MOMENT 5 · ZOOM OUT", "One advisor across connected questions.", "Subscription and Loyalty previews use computed synthetic cohort assumptions. The panel adds qualitative perspective.")}${pillarSwitcher()}<div class="pillar-grid"><section class="icc-card">${cardHead("Subscription", "Synthetic share subscribed by cohort", answerBadge("observed", "Synthetic baseline"))}${barChart(subscriptions, "subscriptionRate", "cohortName", "subscription")}</section><section class="icc-card">${cardHead("Loyalty / reactivation", "Lapse rate after resolved vs. unresolved contact", answerBadge("observed", "Synthetic baseline"))}${barChart(lapseRows, "rate", "cohortName", "loyalty")}</section></div><section class="icc-card cross-panel">${cardHead("Cross-cohort panel", "One prompt, five grounded synthetic voices, then a short synthesis.", answerBadge("persona", "Persona · illustrative"))}<form data-panel-form><label for="panel-question">Question for the cohort panel</label><div><input id="panel-question" name="question" value="${escapeHTML(state.panelQuestion)}"/><button class="button primary" type="submit">Ask panel ${icon("arrow-right")}</button></div></form><div class="panel-responses">${panel.answers.map((answer) => `<article><b>${answer.cohortName}</b><p>${answer.text}</p><small>${answer.evidence.join(" · ")}</small></article>`).join("")}</div><div class="panel-synthesis"><b>Synthesis</b><p>${panel.synthesis}</p></div></section><div class="flow-next">${actionButton("See what it takes to use your data", "go-data", true, "arrow-right")}</div>`;
}
function dataBridge() {
  const sources = [
    ["Machine events", "Machine telemetry / connectivity platform", "Available?"],
    ["CRC contacts", "CRC CRM / contact-center platform", "Needed"],
    ["Orders", "Commerce and capsule-order platform", "Available?"],
    ["Subscriptions", "Subscription management platform", "Available?"],
    ["Nudges", "Campaign / messaging platform", "Needed"],
  ];
  return `${shellHead("NEXT · YOUR DATA", "Today: illustrative data. Next: your data, in your AWS sandbox.", "A first-party data path can replace these scenario inputs after access, quality, and governance are agreed.")}${pillarSwitcher()}<section class="icc-card">${cardHead("What a first-party pilot would need", "Source systems are examples to confirm with Nespresso IT.") }<div class="data-map">${sources.map(([table, source, status]) => `<div class="data-map-row"><b>${table}</b><span>${source}</span><em class="status-${status.toLowerCase().replace("?", "")}">${status}</em></div>`).join("")}</div><div class="validation-callout"><div><b>Validation before a forecast</b><p>Back-test: reproduce last quarter’s top CRC contact reasons before trusting a forecast.</p></div>${answerBadge("simulated", "Example validation gate")}</div><div class="validation-table-wrap"><table class="issues-table validation-table"><thead><tr><th>Example back-test</th><th>Reference period</th><th>Data status</th></tr></thead><tbody><tr><td>Top CRC contact reasons</td><td>Last quarter</td><td>Needed</td></tr><tr><td>Channel mix + repeat contacts</td><td>Last quarter</td><td>Needed</td></tr><tr><td>Blockage voice AHT</td><td>Last quarter</td><td>Needed</td></tr></tbody></table></div><div class="icc-card data-needed">${cardHead("Production data needed", "Derived from the ranked Feature Cards") }<ul>${demo.rankFeatureCards().slice(0, 3).map((feature) => `<li><b>${feature.title}</b><span>${feature.productionDataNeeded}</span></li>`).join("")}</ul></div></section><div class="flow-next">${actionButton("Return to the ranked plan", "go-backlog", true, "arrow-left")}</div>`;
}

function render() {
  document.title = `${pages[state.view]} | Innovation Command Center`;
  document.querySelector("#icc-crumb").textContent = pages[state.view];
  document.querySelectorAll("[data-icc-view]").forEach((button) => button.classList.toggle("active", button.dataset.iccView === state.view));
  const renderers = { doors, ask, cohort: cohortPage, simulation: simulationPage, backlog: backlogPage, zoom: zoomPage, data: dataBridge };
  app.innerHTML = renderers[state.view]();
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.5 } });
}

document.addEventListener("click", (event) => {
  const view = event.target.closest("[data-icc-view]");
  const action = event.target.closest("[data-action]");
  const door = event.target.closest("[data-door]");
  const cohort = event.target.closest("[data-cohort]");
  const query = event.target.closest("[data-query]");
  const pillar = event.target.closest("[data-pillar]");
  const prompt = event.target.closest("[data-persona-prompt]");
  const addFeature = event.target.closest("[data-feature-add]");
  if (event.target.closest("[data-assumptions]") || event.target.closest("[data-guardrail]")) { event.preventDefault(); assumptionDialog(); return; }
  if (view) { setView(view.dataset.iccView); return; }
  if (door) {
    state.door = door.dataset.door;
    state.question = door.dataset.question;
    state.pillar = door.dataset.doorPillar;
    state.query = door.dataset.doorQuery || resolveQuery(state.question);
    setView("ask");
    return;
  }
  if (cohort) { state.cohort = cohort.dataset.cohort; state.voiceQuestion = `What support would help with ${getCohort().name}?`; state.voiceAnswer = null; setView("cohort"); return; }
  if (query) { state.query = query.dataset.query; state.question = questionOptions.find((item) => item.id === state.query).prompt; render(); return; }
  if (pillar) { state.pillar = pillar.dataset.pillar; if (state.view === "doors") render(); else setView("zoom"); return; }
  if (prompt) { document.querySelector("#persona-question").value = prompt.dataset.personaPrompt; prompt.closest("form").requestSubmit(); return; }
  if (addFeature) { if (!state.backlogItems.includes(addFeature.dataset.featureAdd)) state.backlogItems.push(addFeature.dataset.featureAdd); setView("backlog"); return; }
  if (!action) return;
  const actions = {
    "go-ask": () => setView("ask"), "go-cohort": () => setView("cohort"),
    "go-simulation": () => setView("simulation"), "go-backlog": () => setView("backlog"),
    "go-zoom": () => setView("zoom"), "go-data": () => setView("data"),
    "reset-demo": () => { Object.assign(state, initialState, { backlogItems: [] }); render(); toast("Demo reset to the entry doors."); },
      "add-selected-to-backlog": () => { if (!state.backlogItems.includes("descale-guide")) state.backlogItems.push("descale-guide"); setView("backlog"); },
  };
  actions[action.dataset.action]?.();
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-live-range]") || event.target.matches('input[name="scale"]')) {
    updateSimulationPreview(event.target.closest("[data-simulation-form]"));
  }
});
document.addEventListener("submit", (event) => {
  if (event.target.matches("[data-ask-form]")) {
    event.preventDefault();
    state.question = new FormData(event.target).get("question");
    state.query = resolveQuery(state.question);
    render();
    return;
  }
  if (event.target.matches("[data-persona-form]")) {
    event.preventDefault();
    state.voiceQuestion = new FormData(event.target).get("question") || "What kind of reminder would be useful?";
    state.voiceAnswer = demo.answerPersonaQuestion(state.cohort, state.voiceQuestion);
    render();
    return;
  }
  if (event.target.matches("[data-panel-form]")) {
    event.preventDefault();
    state.panelQuestion = new FormData(event.target).get("question") || state.panelQuestion;
    render();
    return;
  }
  if (!event.target.matches("[data-simulation-form]")) return;
  event.preventDefault();
  const values = new FormData(event.target);
  state.delayDays = Number(values.get("delay"));
  state.uptake = Number(values.get("uptake"));
  state.effect = Number(values.get("effect"));
  state.scaleToCustomers = values.has("scale") ? 100000 : 3000;
  render();
});

const assumptionsButton = document.querySelector("#assumptions-button");
assumptionsButton?.addEventListener("click", assumptionDialog);
const internalLink = new URLSearchParams(window.location.search).get("internal") === "1";
document.querySelectorAll(".generic-link").forEach((link) => { link.hidden = !internalLink; });
render();
