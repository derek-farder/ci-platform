# Repository guidance

- Keep the generic prototype available when adding client or industry scenarios.
- Refer to this demo's actors as synthetic personas or synthetic cohorts; do not call them digital twins.
- Keep synthetic dataset baselines, simulated outputs, and illustrative persona voice visibly distinct.
- Do not present planted scenario rules, fixture values, or generated prose as real client research or causal evidence.
- Cite the source brief for supplied facts and document every provisional fixture value in the scenario assumptions file.
- Keep quantitative calculations in deterministic analytics functions, not in persona-response generation.
- Do not add client data, production endpoints, brand assets, live inference, or external write-back without explicit approval.
- Preserve tenant, dataset, scenario, cohort, and version identifiers at future API boundaries; never mix client context or cached outputs.
- Run the focused Node tests with `node --test tests/nespresso-data.test.js` after changing the synthetic analytics module.