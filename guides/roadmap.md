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

**Current phase: R0 — local setup with experimental previews.** The terminal wizard and setup-plugin exports work locally. Saved onboarding reports and a read-only local workspace view support continuity; synthetic views illustrate later work. Live board/session integration and automated workflows remain planned. The primary intended onboarding experience starts inside the selected Claude or Codex project through MyTeam. See [plugin-led onboarding and autonomy](https://github.com/saleemhamo/myteam-md/blob/main/docs/plugin-onboarding-and-autonomy.md).

**Prepared version:** `0.1.0-alpha.1`. No alpha release or npm package has been published.

[Try setup](setup.html) · [UI preview](ui-preview.html) · [Setup plugins](plugins.html) · [UI and visuals](https://github.com/saleemhamo/myteam-md/blob/main/docs/ui-and-visuals.md) · [Operating process and readiness](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md)

The [team journeys and implementation slices](https://github.com/saleemhamo/myteam-md/blob/main/docs/team-journeys.md) connect setup, discovery, intake, sprint planning, execution, PM acceptance and learning to these phases. The main chat directs changes; the browser initially observes.

## R0 Setup alpha

**In progress.** Make the first setup experience easy to install, understand and verify.

- Continue the main MyTeam.md chat in its [FDE onboarding responsibility](https://github.com/saleemhamo/myteam-md/blob/main/docs/project-onboarding-contract.md#fde-setup-to-team-handoff) to help establish the local environment and explain setup blockers; team construction and handoff continue in R1.
- Create a private workspace with a readable team definition and runtime preferences.
- Validate it with `doctor`; package a tested archive and prepare a draft release.
- Complete the owner's plugin-led setup trial from the native Projects section; verify actual invocation, compatible core setup, cancellation and repeat onboarding. Keep the terminal route tested as a support path.

Screen mapping and visual prototypes can begin alongside this phase. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r0-setup-alpha).

## R1 Team visibility

The [implemented local entry slice](https://github.com/saleemhamo/myteam-md/blob/main/docs/host-integration.md) covers bounded file discovery, explicit chat references, fresh-process resume and the bundled read-only UI. Native invocation, automatic binding and canonical task/activity adapters remain acceptance gates.


**Planned.** See who owns the work and what the available evidence says.

- Complete the FDE journey from discovered context and verified setup to a proposed team, authorized workspace/session bindings and a durable lead handoff.
- Onboard from the selected native project, read its approved context, and bind exact sessions to durable engineer identities across supported hosts.
- Deliver the team roster, Backlog.md board, activity views and relationship graphs.
- Define and display [engineer specialties and stack context](https://github.com/saleemhamo/myteam-md/blob/main/docs/team-handbook.md#engineer-profiles-and-specialties), with coverage gaps visible and role/runtime choices kept separate.
- Show skills, owned PRs/MRs, review obligations, recorded planning and a manual on-call roster.

The workspace must remain useful with one provider, several providers or manual bindings. [Acceptance gate](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#r1-team-visibility-alpha).

## R2 Controlled delivery

**Planned.** Move work through a checked engineering process.

- Autonomously plan, assign, continue and hand off authorized tasks within the workspace's recorded action policy and budgets; escalate decisions and exceptions.
- Require reproduction or evaluation, appropriate tests and independent review before delivery.
- Match task specialty requirements to available engineers and qualified independent reviewers; record gaps, capacity and assignment rationale.
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

The [next experience increment](https://github.com/saleemhamo/myteam-md/blob/main/docs/ui-and-visuals.md#next-experience-increment) completes Figma and implementation journey by journey: existing-project onboarding and return, team/work inspection, then recovery. Validate each with an owner trial and browser evidence; adapter-dependent designs remain planned until their contracts work. The [documentation index](https://github.com/saleemhamo/myteam-md/blob/main/docs/README.md#one-authority-for-each-kind-of-information) defines the authority for plans, visual artifacts, tasks and published guidance.

Roll out through synthetic teams, the owner's setup trial, one private team, shadow integrations and a limited active pilot. The [rollout plan](https://github.com/saleemhamo/myteam-md/blob/main/docs/readiness-and-rollout.md#pilot-and-rollout) defines evidence and recovery conditions. A public alpha may cover only the proven early phases; it does not imply automated on-call is ready.

For exact tags, draft assets and publication boundaries, use the [release policy](https://github.com/saleemhamo/myteam-md/blob/main/docs/releases.md). Licensing and public distribution remain separate release decisions.
