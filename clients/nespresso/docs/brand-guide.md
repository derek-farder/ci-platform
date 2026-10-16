# Nespresso ICC Interim Brand Guide

**Status:** Interim theme for the concept demo. Approved by Derek Farder for demo use on 2026-10-07, and confirmed for client hands-on use on 2026-10-15. A user-supplied transparent logo asset is available at `../assets/brand/Nespresso_logo.png`. Replace with Nespresso's official brand kit if Vincent's team supplies one.

## Direction

Use restrained heritage premium codes: black, white, warm cream, sand, and a sparing gold/bronze accent. Pillar colors may appear in charts and pillar surfaces only. Keep copy calm, precise, and short; avoid consumer-facing coffee vocabulary in analytics labels.

The theme tokens live in [`../nespresso-brand.css`](../nespresso-brand.css). The client stylesheets must reference those tokens and contain no raw hex values. Answer states use separate `.badge-observed`, `.badge-simulated`, and `.badge-persona` treatments. UI text minimum is 11px; verify contrast to WCAG AA.

## Logo and approval

Do not recreate or approximate the Nespresso wordmark. The supplied PNG is placed as-is in a 160 × 28px white `.brand-logo-slot`; do not recolor or alter it. Replace it only with a file from the official brand kit if Vincent's team supplies one. The favicons (`favicon-32.png`, `apple-touch-icon.png` in the same folder) are the N cut from that same PNG with the rest of the wordmark removed; nothing was redrawn or recolored. Derek Farder requested them on 2026-10-16. Regenerate them from the official kit if the logo is replaced. Do not add campaign images or ambassador likenesses. The header remains marked “Concept demo.”

This approval covers sharing the concept demo with the Nespresso client team. It does not imply Nespresso endorsement. Confirm any wider distribution, market/language, and whether heritage or Vertuo World styling is preferred.

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
