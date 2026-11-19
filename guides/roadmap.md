---
layout: guide
title: "Roadmap"
description: "Delivery phases and the evidence behind them."
nav_order: 4
source_references: true
permalink: /guides/roadmap.html
---

# Roadmap

MyTeam.md starts with a private workspace and grows into a visible, accountable engineering team. Each phase has an outcome and an acceptance gate. Progress depends on demonstrated readiness, not a promised launch date.

**Current phase: R0 — local setup with experimental previews.** The terminal wizard and setup-plugin exports work locally. A synthetic UI previews onboarding and team views; live workspace integration and automated workflows remain planned. The primary intended onboarding experience starts inside the selected Claude or Codex project through MyTeam. See [plugin-led onboarding and autonomy](https://github.com/saleemhamo/myteam-md/blob/main/docs/plugin-onboarding-and-autonomy.md).

**Prepared version:** `0.1.0-alpha.1`. No alpha release or npm package has been published.

[Try setup](setup.html) · [UI preview](ui-preview.html) · [Setup plugins](plugins.html) · [UI and visuals](https://github.com/saleemhamo/myteam-md/blob/main/docs/ui-and-visuals.md) · [Operating process and readiness](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md)

## R0 Setup alpha

**In progress.** Make the first setup experience easy to install, understand and verify.

- Create a private workspace with a readable team definition and runtime preferences.
- Validate it with `doctor`; package a tested archive and prepare a draft release.
- Complete the owner's plugin-led setup trial from the native Projects section; verify actual invocation, compatible core setup, cancellation and repeat onboarding. Keep the terminal route tested as a support path.

Screen mapping and visual prototypes can begin alongside this phase. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r0-setup-alpha).

## R1 Team visibility

**Planned.** See who owns the work and what the available evidence says.

- Onboard from the selected native project, read its approved context, and bind exact sessions to durable engineer identities across supported hosts.
- Deliver the team roster, Backlog.md board, activity views and relationship graphs.
- Show skills, owned PRs/MRs, review obligations, recorded planning and a manual on-call roster.

The workspace must remain useful with one provider, several providers or manual bindings. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r1-team-visibility-alpha).

## R2 Controlled delivery

**Planned.** Move work through a checked engineering process.

- Autonomously plan, assign, continue and hand off authorized tasks within the workspace's recorded action policy and budgets; escalate decisions and exceptions.
- Require reproduction or evaluation, appropriate tests and independent review before delivery.
- Explain missing evidence and blocked gates in the UI; dispatch bounded work within granted permissions.

Reuse supported native project coordination and compare existing orchestration tools before building an equivalent engine. Prove one bounded autonomous delivery flow before broadening execution. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r2-controlled-delivery-alpha).

## R3 Connected intake

**Planned.** Bring approved service events into the team's workflow.

- Prove the isolated credential boundary, starting with one read-only code-host connection.
- Link enrolled Slack messages, issues and CI failures to canonical tasks.
- Run on-call triage in shadow mode, with source health, deduplication and recovery visible.

External replies and autonomous repairs remain disabled until separately granted and verified. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r3-connected-intake-pilot).

## R4 Operational beta

**Planned.** Operate on-call with clear ownership and a tested fallback.

- Rotate a primary and backup; make handoffs, response deadlines and escalation visible.
- Route failures to their owners and allow bounded responses within workspace policy.
- Provide an incident timeline, automation health, pause controls and recovery procedures.

Coverage depends on a running service and an agreed human escalation path. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r4-operational-beta).

## R5 Supported stable release

**Planned.** Make the supported experience dependable to install, upgrade and operate.

- Validate the declared platform, runtime and integration support matrix.
- Establish compatibility, migration, backup and recovery policies.
- Verify accessibility, themes, responsive layouts and performance against agreed criteria.

Stable release follows reviewed evidence and the maintainer's release decision. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r5-supported-stable-release).

## Design and rollout

UI work runs through the phases: prototype and shared components, then team visibility, workflow controls, connected intake and incident operations. The [UI plan](https://github.com/saleemhamo/myteam-md/blob/main/docs/ui-and-visuals.md) defines screens, states and visual acceptance. Existing local dashboard work remains an optional integration while its redistribution rights are unresolved.

Roll out through synthetic teams, the owner's setup trial, one private team, shadow integrations and a limited active pilot. The [rollout plan](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#pilot-and-rollout) defines evidence and recovery conditions. A public alpha may cover only the proven early phases; it does not imply automated on-call is ready.

For exact tags, draft assets and publication boundaries, use the [release policy](https://github.com/saleemhamo/myteam-md/blob/main/docs/releases.md). Licensing and public distribution remain separate release decisions.
