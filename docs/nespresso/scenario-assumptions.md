# ICC Synthetic Scenario Assumptions

Version `0.1` · Internal concept · Dataset ID `nespresso-aotp-synthetic`

## Scope and provenance

The scenario is based on the user-supplied **Nespresso ICC: Art of the Possible Demo Brief (v0.1)**. It contains no Nespresso customer data and no live integration. “Digital twin” is not used as the product term here: the demo uses synthetic personas and synthetic customer cohorts.

The population size of 10,000 is a calculation basis. The implementation does not materialize 10,000 customer records or the brief's proposed 24-month event-level tables. The 24-month history label is illustrative; the current fixture is cohort-level aggregate data for a clickable scenario.

The market codes in the fixture (CH, FR, US) are examples from the brief, not a selected or validated market mix. No market-specific pricing, product availability, currency, or claims are modeled.

## Cohorts

| Cohort | Share | Fixture count | Brief-grounded profile |
| --- | ---: | ---: | --- |
| Setup Sam | 15% | 1,500 | First-time connected Vertuo Pop/Next owner; pairing and capsule-recognition friction |
| Overdue Descaler | 30% | 3,000 | Vertuo owner of 1–3 years; 2–3 cups/day; ignored alert and flow/blockage signals |
| Connected Enthusiast | 15% | 1,500 | App-active subscriber; push-responsive; rarely contacts CRC |
| Silent Struggler | 25% | 2,500 | Gift recipient or older machine; low registration/app use; possible quiet capsule decline |
| Susie Serial Reactivator | 15% | 1,500 | Returned after 90+ day lapse; unresolved machine issue is a bridge hypothesis |

Shares are fabricated scenario inputs from the brief, not measured audience proportions. Counts are derived by multiplying these shares by 10,000.

## Source facts and added fixture inputs

The brief supplies the cohort shares and planted scenario patterns: ignored descale alert over 60 days maps to a 3–4× blockage-contact risk range; unresolved CRC contact maps to 2× 90-day lapse risk; pairing failure in week one maps to 40% never connecting the app; blockage voice has the highest AHT; pairing chat has the highest repeat rate. For Setup Sam specifically, the brief separately states 20% never pair the app. The 20% Setup Sam share and 40% conditional pairing-failure rate have different denominators and must not be conflated. These are demo assumptions, not Nespresso findings or causal evidence.

The following numbers were added only to make the prototype calculable. They are not provided or validated by Nespresso:

- Issue contact counts, preventability and retention-impact coefficients in `nespresso-data.js`.
- Cohort monthly base issue rates and monthly capsule volumes.
- Midpoint blockage multiplier `3.5×`, default nudge uptake `42%`, and effect size `32%`.
- `1.08` contacts per prevented issue event; incremental lapse risk of `6%` per avoided contact; and six retained months of capsule volume per avoided lapse.
- A simple `±12%` sensitivity band. This is not a statistical confidence interval.
- Provisional Feature Card scoring weights of 40% impact, 30% feasibility, and 30% strategic fit, plus input scores. The Nessy Chapter 1 fit and rubric require client validation.
- Synthetic population metadata and demo-authored knowledge article titles. Knowledge content is not Nespresso intellectual property.

## Simulation rule

For each month, baseline expected issue events are:

`cohort_count × monthly_base_issue_risk × blockage_risk_multiplier`

Starting in month 3 (day 75), expected avoided issue events are:

`baseline_events × nudge_uptake × issue_risk_reduction_if_acted`

The displayed CRC, lapse, and capsule outcomes apply the documented fixture constants. The midpoint is a deterministic scenario output; the range applies a simple proportional sensitivity band around that midpoint. It does not represent uncertainty estimated from observations.

## Display language

- **Synthetic dataset baseline:** a statistic calculated from the fabricated fixture.
- **Simulated:** output from the rule-based what-if model.
- **Illustrative persona voice:** fictional role-play grounded in displayed cohort signals; not a quote or statistic.
- Do not label any output “observed” unless it actually comes from observed source data, which this prototype does not contain.

## Open decisions

Choose market/language; neutral ICC vs. approved client branding; Amazon Quick vs. custom UI; Feature Card backlog vs. one-year roadmap destination; and an approved Nessy Chapter 1 fit/priority rubric before representing any of these as settled.