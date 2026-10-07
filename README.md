# Customer Intelligence Demo

A responsive, clickable prototype for a generic customer-intelligence workflow. All personas, evidence, findings, and outcomes are fictional and directional.

## Run locally

```sh
python3 -m http.server 4173
```

Open [http://localhost:4173](http://localhost:4173).

## Prototype scope

The prototype covers overview, personas, conversations, studies, journeys, activation, and the learning loop. Actions use deterministic in-memory fixtures so the demo can be replayed with **Reset demo**.

No API or live model integration is wired. The blueprint defers API specifications; when endpoints are ready, each section can replace its fixture reads with a section-level adapter while preserving the shared persona, study, journey, activation, and learning IDs shown in the prototype.