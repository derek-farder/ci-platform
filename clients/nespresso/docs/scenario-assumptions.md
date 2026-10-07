# ICC Synthetic Scenario Assumptions

Version `0.2` · Internal concept · Dataset ID `nespresso-aotp-synthetic`

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

Provisional subscription shares, added to power the chart preview: Setup Sam 12%, Overdue Descaler 34%, Connected Enthusiast 82%, Silent Struggler 8%, and Susie Serial Reactivator 21%. These were not supplied by Nespresso and must be replaced or removed when first-party data is available.

## Source facts and added fixture inputs

The brief supplies the cohort shares and planted scenario patterns: ignored descale alert over 60 days maps to a 3–4× blockage-contact risk range; unresolved CRC contact maps to 2× 90-day lapse risk; pairing failure in week one maps to 40% never connecting the app; blockage voice has the highest AHT; pairing chat has the highest repeat rate. For Setup Sam specifically, the brief separately states 20% never pair the app. The 20% Setup Sam share and 40% conditional pairing-failure rate have different denominators and must not be conflated. These are demo assumptions, not Nespresso findings or causal evidence.

The following numbers were added only to make the prototype calculable. They are provisional, not provided or validated by Nespresso:

- Issue contact counts, preventability and retention-impact coefficients in [`../nespresso-data.js`](../nespresso-data.js).
- Cohort monthly base issue rates and monthly capsule volumes.
- Midpoint blockage multiplier `3.5×`, default nudge uptake `42%`, and effect size `32%`.
- `1.08` contacts per prevented issue event; incremental lapse risk of `6%` per avoided contact; and six retained months of capsule volume per avoided lapse.
- Nudge delay of 75 days after an ignored descale alert, default uptake of 42%, and issue-risk reduction of 32% if acted.
- A simple `±12%` sensitivity band. This is not a statistical confidence interval.
- Resolved-contact lapse rate of 8%; the unresolved-contact scenario applies the brief's 2× multiplier to produce 16%. These are illustrative chart values.
- Capsule price midpoint `€0.65`, with a price sensitivity range of `€0.50–€0.85`, sourced from the attached user-provided note: “Blended Vertuo retail list price per capsule, France 2026, midpoint across Espresso (~€0.44–0.55) through Mug (~€0.69–0.95) sizes, per third-party price guides (graindexpert.fr, May 2026). US retail is roughly $1.10–1.50 per capsule. Not Nespresso net revenue: excludes subscription and volume discounts and market mix. Replace with Nespresso's actual average selling price when available.” This source/price note is not an official Nespresso price list and is not market-specific analysis for this demo.
- The Overdue Descaler profile says “about 2 cups daily” to align with the existing 54 capsules/month input. At €0.65 this yields `54 × 12 × €0.65 = €421.20` illustrative retail value per customer-year. This is a sanity check, not revenue recognized by Nespresso.
- Feature-card priority scores and effort/data-needed labels for four demo backlog items, using the shared provisional weights below.
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

- The Subscription chart uses the provisional per-cohort subscription shares above.
- The Loyalty chart uses 8% resolved-contact lapse and 16% unresolved-contact lapse, based on the 2× scenario assumption.
- The cross-cohort panel reuses each cohort's persona response and generates only a qualitative synthesis; it does not generate metrics.
- Four Feature Cards use impact / feasibility / strategic-fit inputs and weights of 40% / 30% / 30%. The v0.2 demo inputs are: blockage agent assist `0.91/0.62/0.85`; descaling guide `0.86/0.72/0.80`; pairing assistant `0.78/0.82/0.78`; Silent Struggler re-engagement `0.70/0.68/0.72`. Scores are rounded to integers and are provisional, not a validated Nessy prioritization model.
- Quarterly roadmap lanes and placements are illustrative sequencing, not approved commitments or estimates.
- The data bridge source system labels and “Needed / Available?” statuses are unconfirmed examples.

## Display language

- **Synthetic dataset baseline:** a statistic calculated from the fabricated fixture.
- **Simulated:** output from the rule-based what-if model.
- **Illustrative persona voice:** fictional role-play grounded in displayed cohort signals; not a quote or statistic.
- The interface uses one small type badge per output plus the shared “Assumptions & method” drawer. “Synthetic baseline” identifies fixture-derived values; no Nespresso first-party observed data is present.

## Open decisions

Choose market/language and Amazon Quick vs. custom UI; confirm source systems and availability; replace the provisional Nessy Chapter 1 scoring rubric; confirm capsule average selling price and subscription/lapse metrics with Nespresso; and replace the interim theme with the official brand kit and logo before anything leaves the internal session.