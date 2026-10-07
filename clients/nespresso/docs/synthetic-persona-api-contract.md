# Synthetic Persona and Analytics API Boundary

Status: proposed contract for future integration. This prototype uses local deterministic functions; it does not call these APIs.

## Responsibility boundaries

Keep numeric aggregation and scenario simulation separate from persona-language generation:

- **Cohort analytics** computes counts, rates, ranking, and cited synthetic dataset aggregates.
- **Synthetic persona response** produces qualitative role-play grounded only in a supplied cohort profile and evidence bundle.
- **Panel synthesis** summarizes individual synthetic responses and their cited evidence; it does not invent or recalculate cohort metrics.
- **Study orchestration** selects a defined set of stimuli and measures, invokes the appropriate tasks, and returns a structured comparison.
- **What-if simulation** executes explicit rule-based calculations and returns monthly steps, assumptions, and ranges.
- **Feature Card assembly** combines references and outputs from the preceding operations. It does not create new evidence or imply backlog write-back.

The 1:1, panel, and study flows can reuse one persona/evidence foundation and shared context. Their task-specific agents must not be treated as interchangeable, and analytics must not be delegated to free-form persona generation.

## Common request context

Every future request should bind to authenticated server-side tenant/workspace scope and include:

```json
{
  "dataset": { "id": "nespresso-aotp-synthetic", "version": "0.1" },
  "scenario": { "id": "machine-assistance", "version": "0.1" },
  "locale": "und",
  "cohortIds": ["overdue-descaler"],
  "task": "persona.response",
  "inputs": {}
}
```

`locale: und` means not selected. Do not infer a target market from the example market codes in the demo brief. Tenant identity is derived from authentication, not trusted from a request body.

## Task-specific inputs

- `analytics.cohort-query`: approved filters, metric IDs, denominator definitions, and time window.
- `persona.response`: cohort ID, question, and evidence references; return qualitative language only.
- `persona.panel`: cohort/persona IDs, prompt, stimulus IDs, and synthesis instructions.
- `study.run`: decision, cohort IDs, versioned stimuli, measures, and comparison rule.
- `simulation.run`: rule-set version, cohort, horizon, intervention timing, uptake, effect-size assumption, and sensitivity method.
- `feature-card.assemble`: linked analytics and simulation result IDs, problem, production-data gaps, provisional fit rubric ID, and scoring weights.

## Response envelope

Every response should return a trace ID, task and output status, dataset/scenario versions, result, evidence references, provenance class, confidence method where relevant, assumptions, and limitations. For example:

```json
{
  "traceId": "trace-demo-0001",
  "task": "simulation.run",
  "status": "simulated",
  "dataset": { "id": "nespresso-aotp-synthetic", "version": "0.1" },
  "scenario": { "id": "machine-assistance", "version": "0.1" },
  "provenance": { "class": "synthetic-scenario", "sourceIds": ["brief-pattern-descale-60d"] },
  "result": { "monthly": [], "midpoint": {}, "range": {} },
  "assumptions": [],
  "limitations": ["Illustrative scenario; not a forecast of client outcomes."]
}
```

Use distinct status/provenance vocabulary: `synthetic-baseline`, `simulated`, and `illustrative-persona-voice`. Do not label fabricated fixture outputs as `observed`. A persona response must include evidence references or state that it cannot answer from the available cohort context.

## Validation and isolation gates

- Validate schema and dataset/scenario/cohort IDs before retrieval or generation.
- Reject unknown, stale, unauthorized, or cross-tenant references; enforce scope in storage, retrieval, vector search, cache keys, logs, and agent context.
- Verify every persona evidence reference belongs to the current dataset/scenario and is permitted for the task.
- Keep generated language from changing numeric results; calculate numbers in analytics/simulation code and test that invariant.
- Validate provenance, assumptions, confidence meaning, and limitations before returning output.
- Apply client privacy, retention, claims, and content policies before any future external integration.
- Contract-test 1:1, panel, study, analytics, simulation, and Feature Card tasks independently; add explicit cross-tenant negative tests before production use.