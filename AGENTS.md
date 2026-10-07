# Repository guidance

- Keep the generic prototype available when adding client or industry scenarios.
- Refer to this demo's actors as synthetic personas or synthetic cohorts; do not call them digital twins.
- Keep synthetic dataset baselines, simulated outputs, and illustrative persona voice visibly distinct.
- Apply one small type badge per output and keep explanations in a shared “Assumptions & method” drawer; avoid repeating caveat banners on every page.
- Do not present planted scenario rules, fixture values, or generated prose as real client research or causal evidence.
- Cite the source brief for supplied facts and document every provisional fixture value in the scenario assumptions file.
- Keep quantitative calculations in deterministic analytics functions, not in persona-response generation.
- Do not add client data, production endpoints, brand assets, live inference, or external write-back without explicit approval.
- Preserve tenant, dataset, scenario, cohort, and version identifiers at future API boundaries; never mix client context or cached outputs.
- Keep each client-specific page, data, styles, tests, and documentation under `clients/<client>/`; reuse generic shell assets through relative paths rather than copying them.
- Run the focused ICC tests with `node --test clients/nespresso/tests/nespresso-data.test.js` after changing its synthetic analytics module.