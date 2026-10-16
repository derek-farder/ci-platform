const steps = [
  { id: "discover", label: "1", title: "Discover", kind: "assisted", today: "Pain points and journey touchpoints are found through manual research.", icc: "The Advisor maps pain points to touchpoints across service, machine and feedback data, showing how often each happens and how much it hurts the experience." },
  { id: "prioritize", label: "2", title: "Prioritize", kind: "assisted", today: "Data is gathered by hand to rank areas of focus.", icc: "Opportunities are ranked by expected effect on customer experience (NPS, customer effort) and cost to serve." },
  { id: "gate-explore", gate: true, title: "Gate: worth exploring?", kind: "human", today: "Judgement plus partial data.", icc: "The same gate, with an evidence summary." },
  { id: "options", label: "3", title: "Generate options", kind: "assisted", today: "One or two concepts, because testing is expensive.", icc: "Many variations, including different ways of reaching the customer." },
  { id: "panel", label: "4", title: "Synthetic panel test", kind: "new", today: "This step doesn’t exist today.", icc: "The panel reacts to every variation: appeal, ease, likely effect on NPS and effort, barriers, and who it misses. Weak options drop out here." },
  { id: "gate-prototype", gate: true, title: "Gate: worth prototyping?", kind: "human", today: "Often decided before the key questions are answered.", icc: "Decided on comparable evidence." },
  { id: "customer-test", label: "5", title: "Customer test", kind: "human", today: "About 10 customers test the prototype.", icc: "The same 10 or so customers, now focused on the top one or two options and the questions the panel couldn’t settle." },
  { id: "adjust", label: "6", title: "Adjust", kind: "human", today: "Rework after late findings.", icc: "Fewer late surprises; changes are smaller." },
  { id: "gate-go", gate: true, title: "Gate: go/no-go", kind: "human", today: "Evidence is spread across documents.", icc: "One evidence pack with confidence levels." },
  { id: "backlog", label: "7", title: "Backlog and learn", kind: "assisted", today: "Items join the backlog; learning stays in reports.", icc: "Items join with their evidence attached; live results recalibrate the panel." },
];
const kindLabels = { new: "New", assisted: "Assisted", human: "Human-led" };
const stepper = document.querySelector("#stepper");
const panel = document.querySelector("#step-panel");
const modeSwitch = document.querySelector("#mode-switch");
let selected = steps.findIndex((step) => step.id === "panel");
let withIcc = true;

function tag(kind) { return `<span class="lp-tag tag-${kind}">${kindLabels[kind]}</span>`; }

function renderStepper() {
  stepper.classList.toggle("mode-today", !withIcc);
  stepper.innerHTML = steps.map((step, index) => {
    const isSelected = index === selected;
    const missing = !withIcc && step.kind === "new";
    return `<button class="lp-step ${step.gate ? "is-gate" : ""} ${missing ? "is-missing" : ""}" role="tab" id="tab-${step.id}" aria-selected="${isSelected}" aria-controls="step-panel" tabindex="${isSelected ? 0 : -1}"><span class="lp-step-marker" aria-hidden="true">${step.gate ? "" : step.label}</span><span class="lp-step-title">${step.title}</span>${withIcc ? tag(step.kind) : ""}</button>`;
  }).join("");
  const step = steps[selected];
  panel.setAttribute("aria-labelledby", `tab-${step.id}`);
  panel.innerHTML = `<div class="lp-step-panel-head"><span>${withIcc ? "WITH THE ICC" : "TODAY"}</span>${withIcc ? tag(step.kind) : ""}</div><h3>${step.gate ? "" : `Step ${step.label} · `}${step.title}</h3><p>${withIcc ? step.icc : step.today}</p>`;
}

function select(index, focus = false) {
  selected = (index + steps.length) % steps.length;
  renderStepper();
  if (focus) stepper.querySelectorAll("[role=tab]")[selected].focus();
}

stepper.addEventListener("click", (event) => {
  const tab = event.target.closest("[role=tab]");
  if (tab) select([...stepper.children].indexOf(tab));
});
stepper.addEventListener("keydown", (event) => {
  const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
  if (event.key in moves) { event.preventDefault(); select(selected + moves[event.key], true); }
  if (event.key === "Home") { event.preventDefault(); select(0, true); }
  if (event.key === "End") { event.preventDefault(); select(steps.length - 1, true); }
});
modeSwitch.addEventListener("click", () => {
  withIcc = !withIcc;
  modeSwitch.setAttribute("aria-checked", String(withIcc));
  renderStepper();
});

document.querySelector("#print-table tbody").innerHTML = steps.map((step) => `<tr class="${step.gate ? "is-gate" : ""}"><th scope="row">${step.gate ? "◆ " : `${step.label}. `}${step.title}<br/>${tag(step.kind)}</th><td>${step.today}</td><td>${step.icc}</td></tr>`).join("");
renderStepper();

const funnels = document.querySelectorAll(".lp-funnel");
if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("lp-animate");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  funnels.forEach((funnel) => observer.observe(funnel));
}

const shareStatus = document.querySelector("#share-status");
document.querySelector("#share-page").addEventListener("click", async () => {
  const url = window.location.href.split("#")[0];
  try {
    await navigator.clipboard.writeText(url);
    shareStatus.textContent = "Link copied. Recipients will need the demo sign-in.";
  } catch {
    shareStatus.textContent = `Copy this link: ${url}`;
  }
});
document.querySelector("#print-page").addEventListener("click", () => window.print());

if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.5 } });
