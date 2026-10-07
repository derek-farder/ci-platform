# Nespresso ICC Interim Brand Guide

**Status:** Interim theme for the internal concept demo. Approved by Derek Farder for demo use on 2026-10-07. Replace with Nespresso's official brand kit before anything leaves the internal working session. Official logo asset is pending.

## Direction

Use restrained heritage premium codes: black, white, warm cream, sand, and a sparing gold/bronze accent. Pillar colors may appear in charts and pillar surfaces only. Keep copy calm, precise, and short; avoid consumer-facing coffee vocabulary in analytics labels.

The theme tokens live in [`../nespresso-brand.css`](../nespresso-brand.css). The client stylesheets must reference those tokens and contain no raw hex values. Answer states use separate `.badge-observed`, `.badge-simulated`, and `.badge-persona` treatments. UI text minimum is 11px; verify contrast to WCAG AA.

## Logo and approval

Do not recreate or approximate the Nespresso wordmark. Until official files and usage rules arrive from Vincent's team, show a 160 × 28px `.brand-logo-slot` that says “Nespresso logo — pending official asset.” Do not add campaign images or ambassador likenesses. The header remains marked “Internal concept.”

This approval covers an internally presented prototype only. It does not imply Nespresso endorsement or approval for external distribution. Confirm broader presentation approval, official logo usage, market/language, and whether heritage or Vertuo World styling is preferred before external use.

## Typography and layout

Use Jost for display, DM Sans for UI, and DM Mono for IDs and type badges. Headings should be light-to-medium weight; labels use bronze with restrained tracking. Keep cards sharp (2px radius), backgrounds mostly cream/white, and chrome black. Minimum text size is 11px.

## Answer type colors

- Observed: slate blue (`--nx-observed`).
- Simulated: roasted amber (`--nx-simulated`).
- Persona voice: green (`--nx-persona`).
- At-risk: brick (`--nx-alert`).

Use a single type badge on each output and a shared “Assumptions & method” drawer for caveats; avoid repeating disclaimers on every page.

## Source confidence

The palette is an interim interpretation of public brand-aggregator sources, not an official brand specification. Replace it with the official kit when received. The custom Nespresso Lucas typeface is not to be sourced or imitated; Jost is the approved open substitute for this demo.

## Interim token reference

| Group | Tokens | Intended use |
| --- | --- | --- |
| Core | `--nx-black`, `--nx-ink`, `--nx-white`, `--nx-cream`, `--nx-sand`, `--nx-muted` | Chrome, text, canvas, cards, dividers, secondary copy |
| Accent | `--nx-gold`, `--nx-gold-deep`, `--nx-gold-light`, `--nx-bronze` | Active marker, key numbers, dark-surface accent, kickers |
| Output type | `--nx-observed`, `--nx-simulated`, `--nx-persona`, `--nx-alert` | Distinct evidence badges and at-risk state |
| Pillar | `--nx-pillar-machine`, `--nx-pillar-subscription`, `--nx-pillar-loyalty`, `--nx-pillar-conversational`, `--nx-pillar-farm` | Charts and pillar-specific surfaces only |

The concrete values are defined in `nespresso-brand.css`. Public aggregators are medium-to-low confidence; gold is intended for the active marker, key numbers, or larger text, not small text on cream. Check all text/background pairs against WCAG AA after any token change.

## Supplied source references

- Zecraft, “Nespresso typeface”: https://www.zecraft.com/fonts/nespresso/
- Brandfetch, Nespresso brand colors: https://brandfetch.com/nespresso.com
- Eggradients, Nespresso colors: https://www.eggradients.com/palette/nespresso-colors
- Creative Moment, Nespresso repositioning (April 2026): https://www.creativemoment.co/from-clooney-to-dua-lipa-nespresso-brews-a-smart-repositioning
- Adweek, Nespresso’s new visual world (April 2026): https://www.adweek.com/creativity/nespressos-gen-z-glow-up-dua-lipa-iced-drinks-and-a-bold-new-visual-world/

These references inform the interim direction only; none supersedes an official Nespresso brand kit or approval from the client team.
