# Customer Intelligence Demos

This repo contains two responsive, static prototypes: a generic customer-intelligence flow and an Innovation Command Center scenario using synthetic personas/cohorts. All scenario records, metrics, evidence, and persona voices are fictional and illustrative.

## Run locally

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

- [Generic customer-intelligence demo](http://localhost:4173/index.html)
- [Innovation Command Center synthetic demo](http://localhost:4173/clients/nespresso/nespresso.html)

## Prototype scope

The generic prototype covers overview, personas, conversations, studies, journeys, activation, and the learning loop. Actions use deterministic in-memory fixtures.

The ICC demo opens with three advisor paths and presents five synthetic cohorts, a rule-based 12-month scenario, a ranked feature backlog and one-year roadmap, calculated Subscription/Loyalty previews, a cross-cohort panel, and a first-party data bridge. Its page, data, styles, tests, and client documentation live under `clients/nespresso/`; the interim brand guide and logo-pending status are documented there.

No API, live model, Nespresso data, external campaign action, or production integration is wired. The dataset module runs locally in the browser and Node; its 10,000-customer figure is a cohort-count basis, not 10,000 materialized customer records. See [the scenario assumptions](clients/nespresso/docs/scenario-assumptions.md) before presenting any output. See [clients/README.md](clients/README.md) for the client-pack structure.