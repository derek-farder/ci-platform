# Client Demo Packages

Keep client- or industry-specific pages isolated from the root generic prototype. Each package owns its entry page, presentation, fixtures, tests, and documentation; shared app-shell assets remain at the repository root and should be referenced rather than copied.

```text
clients/
  README.md
  <client>/
    <client>.html
    <client>-app.js
    <client>-data.js
    <client>.css
    docs/
    tests/
```

For example, the Innovation Command Center demo is in `clients/nespresso/`. Add another client in a sibling folder such as `clients/example-client/`, then link it from the root README or generic demo only when it is ready to share. Keep source registers, fixture assumptions, branding approvals, and client-specific API notes inside that package unless they become genuinely shared platform guidance.

Do not place real client data, credentials, production endpoints, or unapproved brand assets in demo packages. Follow the repository guidance in [`../AGENTS.md`](../AGENTS.md) and label synthetic data, simulations, and persona voice distinctly.