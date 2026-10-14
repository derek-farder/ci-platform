# ICC Synthetic Scenario Assumptions

Version `0.4` · Internal concept · Dataset ID `nespresso-aotp-synthetic`

## Scope and provenance

The scenario is based on the user-supplied **Nespresso ICC: Art of the Possible Demo Brief (v0.1)**. It contains no Nespresso customer data and no live integration. “Digital twin” is not used as the product term here: the demo uses synthetic personas and synthetic customer cohorts.

The population size of 10,000 is a calculation basis. The implementation does not materialize 10,000 customer records or the brief's proposed 24-month event-level tables. The 24-month history label is illustrative; the current demo dataset is cohort-level aggregate data for a clickable scenario.

The market codes in the fixture (CH, FR, US) are examples from the brief, not a selected or validated market mix. No market-specific pricing, product availability, currency, or claims are modeled.

## Cohorts

| Cohort | Share | Fixture count | Brief-grounded profile |
| --- | ---: | ---: | --- |
| Setup Sam | 15% | 1,500 | First-time connected Vertuo Pop/Next owner; pairing and capsule-recognition friction |
| Overdue Descaler | 30% | 3,000 | Vertuo owner of 1–3 years; about 2 cups/day; ignored alert and flow/blockage signals |
| Connected Enthusiast | 15% | 1,500 | App-active subscriber; push-responsive; rarely contacts CRC |
| Silent Struggler | 25% | 2,500 | Gift recipient or older machine; low registration/app use; possible quiet capsule decline |
| Susie Serial Reactivator | 15% | 1,500 | Returned after 90+ day lapse; unresolved machine issue is a bridge hypothesis |

Shares are fabricated scenario inputs from the brief, not measured audience proportions. Counts are derived by multiplying these shares by 10,000.

## Concept-study engagement inputs

The following attributes were supplied in the v0.3 demo brief and remain provisional until calibrated against first-party data. In v0.4 the funnel stages are labelled discover (reach), understand (notice), and complete (act), and the brief's incentive lift is no longer used because no variant carries an offer:

| Cohort | App reach | Email reach | Notice | Base act | Clarity lift |
| --- | ---: | ---: | ---: | ---: | ---: |
| Overdue Descaler | 0.55 | 0.70 | 0.65 | 0.30 | 0.50 |
| Setup Sam | 0.45 | 0.80 | 0.75 | 0.40 | 0.60 |
| Connected Enthusiast | 0.90 | 0.75 | 0.85 | 0.55 | 0.20 |
| Silent Struggler | 0.10 | 0.25 | 0.40 | 0.20 | 0.30 |
| Susie Serial Reactivator | 0.40 | 0.60 | 0.60 | 0.30 | 0.30 |

Concept variants are provisional experience changes, not campaigns or offers: A · Clearer alert (in-app alert, no guided steps, 0.20 risk reduction if completed); B · Guided in-app descaling (in-app guide, 2-minute steps, 0.32); C · Proactive check-in (in-app guide plus email check-in, 2-minute steps, 0.40). Stance cutoffs are Likely ≥0.30, Maybe ≥0.15, and Unlikely below 0.15; these are demo conventions, not calibrated behavioral thresholds.

**Persona variations (added in v0.4, provisional).** Each cohort is scored as three variations to show that people in one cohort answer differently: Tech-confident (30% weight; reach ×1.2, notice ×1.1, act ×1.15), Time-poor (45%; ×1.0, ×0.9, ×0.95), and Skeptical (25%; ×0.9, ×0.85, ×0.7). Reach and notice are capped at 1 and act at 0.95. Cohort completion and funnel stages are the weighted mean across variations; the stance split is the weight share of variations in each stance. Weights, multipliers, and lens phrases are demo-authored, not measured segments.

**CX metrics (added in v0.4, provisional).** NPS was named by the client team; Customer Effort Score and direct repurchase rate were added as related CX measures and should be confirmed with them. Synthetic NPS baselines: Setup Sam 18, Overdue Descaler 24, Connected Enthusiast 52, Silent Struggler 6, Susie Serial Reactivator 10. These replace the v0.3 provisional subscription shares and were not supplied by Nespresso.

## Source facts and added fixture inputs

The brief supplies the cohort shares and planted scenario patterns: ignored descale alert over 60 days maps to a 3–4× blockage-contact risk range; unresolved CRC contact maps to 2× 90-day lapse risk; pairing failure in week one maps to 40% never connecting the app; blockage voice has the highest AHT; pairing chat has the highest repeat rate. For Setup Sam specifically, the brief separately states 20% never pair the app. The 20% Setup Sam share and 40% conditional pairing-failure rate have different denominators and must not be conflated. These are demo assumptions, not Nespresso findings or causal evidence.

The following numbers were added only to make the prototype calculable. They are provisional, not provided or validated by Nespresso:

- Issue contact counts, preventability, and relative NPS-impact coefficients in [`../nespresso-data.js`](../nespresso-data.js) (v0.4 reuses the v0.3 retention-impact values as NPS impact). Customer Effort Scores on a 1–7 scale: blockage 5.8, pairing 5.4, descaling guidance 4.9, capsule recognition 4.6, first brew 4.2.
- NPS shift rule: each prevented issue event would otherwise have moved `0.5` of an owner to detractor, so NPS shift = prevented events × 0.5 ÷ cohort customers × 100. Direct repurchase change equals avoided lapses ÷ cohort customers × 100.
- Cohort monthly base issue rates and monthly capsule volumes.
- Midpoint blockage multiplier `3.5×`, default nudge uptake `42%`, and effect size `32%`.
- `1.08` contacts per prevented issue event; incremental lapse risk of `6%` per avoided contact; and six retained months of capsule volume per avoided lapse.
- Nudge delay of 75 days after an ignored descale alert, default uptake of 42%, and issue-risk reduction of 32% if acted.
- A simple `±12%` sensitivity band. This is not a statistical confidence interval.
- Resolved-contact lapse rate of 8%; the unresolved-contact scenario applies the brief's 2× multiplier to produce 16%. These are illustrative chart values.
- Capsule price midpoint `€0.65`, with a price sensitivity range of `€0.50–€0.85`, sourced from the attached user-provided note: “Blended Vertuo retail list price per capsule, France 2026, midpoint across Espresso (~€0.44–0.55) through Mug (~€0.69–0.95) sizes, per third-party price guides (graindexpert.fr, May 2026). US retail is roughly $1.10–1.50 per capsule. Not Nespresso net revenue: excludes subscription and volume discounts and market mix. Replace with Nespresso's actual average selling price when available.” This source/price note is not an official Nespresso price list and is not market-specific analysis for this demo.
- The Overdue Descaler profile says “about 2 cups daily” to align with the existing 54 capsules/month input. At €0.65 this yields `54 × 12 × €0.65 = €421.20` illustrative retail value per customer-year. This is a sanity check, not revenue recognized by Nespresso.
- Capsule value is shown only as secondary business context; the v0.3 descaling kit cost and net-value calculation were removed with the incentive variant.
- Feature-card priority scores and effort/data-needed labels for four demo backlog items (v0.4 renames “Silent Struggler re-engagement” to “Proactive help for unregistered owners” with the same inputs), using the shared provisional weights below.
- AWS source-system names and statuses in the “Your data” bridge. These are examples for discussion, not confirmed integrations.
- Provisional Feature Card scoring weights of 40% impact, 30% feasibility, and 30% strategic fit, plus input scores. The Nessy Chapter 1 fit and rubric require client validation.
- Synthetic population metadata and demo-authored knowledge article titles. Knowledge content is not Nespresso intellectual property.

## Simulation rule

For each month, baseline expected issue events are:

`cohort_count × monthly_base_issue_risk × blockage_risk_multiplier`

The nudge delay is relative to the alert being ignored, not a day on the simulation calendar. At 75 days, the monthly roll-forward begins in month 3. For each month from the start month, expected avoided issue events are:

`baseline_events × nudge_uptake × issue_risk_reduction_if_acted`

Monthly contact lines are calculated from the same baseline events and contact multiplier, with the nudge effect applied after the selected delay. The headline percentage is avoided contacts divided by the baseline blockage contacts across the full 12-month period. The scale switch multiplies each cohort result linearly to 100,000; this is illustrative scale-up, not an assumed Nespresso population. Capsule value applies the midpoint price to protected capsule volume. The midpoint is deterministic; the range combines the simple ±12% scenario band with the €0.50–€0.85 price range. It does not represent uncertainty estimated from observations.

## Pillar-preview and backlog inputs

- The NPS chart uses the provisional synthetic NPS baselines above.
- The “Staying with Nespresso” chart shows 92% vs. 84% direct repurchase, the complement of the 8% resolved-contact and 16% unresolved-contact lapse rates from the 2× scenario assumption.
- The cross-cohort panel reuses each cohort's persona response and generates only a qualitative synthesis; it does not generate metrics.
- Four Feature Cards use impact / feasibility / strategic-fit inputs and weights of 40% / 30% / 30%. The v0.2 demo inputs are: blockage agent assist `0.91/0.62/0.85`; descaling guide `0.86/0.72/0.80`; pairing assistant `0.78/0.82/0.78`; proactive help for unregistered owners `0.70/0.68/0.72`. Scores are rounded to integers and are provisional, not a validated Nessy prioritization model.
- Quarterly roadmap lanes and placements are illustrative sequencing, not approved commitments or estimates.
- The data bridge source system labels and “Needed / Available?” statuses are unconfirmed examples.
- Concept completion is deterministic per persona variation: app-only `reach = appReach`; with email check-in `reach = 1 − (1 − appReach)(1 − emailReach)`; `act = min(0.95, baseAct × (1 + clarityLift × guidedSteps))`; `expectedCompletion = reach × notice × act`, then weighted across variations. Main barrier is the largest loss across reach, notice, and act. Persona text is scripted by cohort/stance/barrier and cannot supply numbers.
- The study's computed completion and risk reduction pass unchanged into the 12-month impact calculation. The recommended variant is the one with the highest simulated NPS shift.
- No live LLM is used. A production researcher agent and synthesizer agent (for example, Bedrock/AgentCore in the client AWS sandbox) could generate grounded reactions and synthesis; deterministic analytics must remain the source of numeric outputs.

## Display language

- **Synthetic dataset baseline:** a statistic calculated from the fabricated fixture.
- **Simulated:** output from the rule-based what-if model.
- **Illustrative persona voice:** fictional role-play grounded in displayed cohort signals; not a quote or statistic.
- The interface uses one small type badge per output plus the shared “Assumptions & method” drawer. “Synthetic baseline” identifies fixture-derived values; no Nespresso first-party observed data is present.

## Open decisions

Choose market/language and Amazon Quick vs. custom UI; confirm source systems and availability; replace the provisional Nessy Chapter 1 scoring rubric; confirm capsule average selling price and subscription/lapse metrics with Nespresso; and replace the interim theme with the official brand kit and logo before anything leaves the internal session.