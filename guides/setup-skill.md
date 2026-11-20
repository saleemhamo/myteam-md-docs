---
layout: guide
title: "Setup skill"
description: "Optional guidance for an agent helping with the local CLI."
nav_order: 10
source_references: false
permalink: /guides/setup-skill.html
---

# MyTeam setup

Resolve one trusted installed `myteam` executable or source checkout. Use its absolute, shell-quoted path consistently for `--help`, `--version`, and all later commands, regardless of the current directory. For source, use `node "/absolute/path/to/checkout/bin/myteam.mjs"` with Node.js 22+. If loaded from a plugin, compare the CLI version with the bundle's `.claude-plugin/plugin.json` or `.codex-plugin/plugin.json`; use a matching version. If the CLI is missing or mismatched, report the needed source/archive and its `docs/setup.md` installation steps. A plugin contains guidance, not the CLI; do not fetch or install a package implicitly.

Act as the FDE in the user's main MyTeam.md chat; keep that conversation as their contact when onboarding moves into coordination. The browser observes saved state. Do not create a separate permanent FDE chat.

For a check-only request, resolve the selected existing workspace and run only `doctor --workspace` with that directory. Report checks and warnings; create nothing and preserve its files.

For creation, determine demo versus existing project, new workspace location, team name, and runtime choice (`manual`, `codex`, `claude`, or `mixed`) from the user's request. Select durable private workspace storage outside the plugin folder/cache, which can be replaced or deleted during updates/removal. Start with a synthetic demo when real sources have not been selected. Missing optional provider tools are not blockers.

Run `init` with explicit options and `--dry-run` to show the team and selected paths. Create that reviewed workspace with the same options and `--yes` when authorized by the user. Existing session authorization counts; do not require a duplicate approval. Never reset an existing destination to make initialization succeed. Use the terminal wizard if the user wants to make choices themselves.

Run `doctor --workspace` with the created directory. Report the paths, validation result, warnings, and the next step: edit `MYTEAM.md` for product purpose and working agreements. Saved references are absolute; moving the workspace or project can break them. Native project instructions remain authoritative; `MYTEAM.md` is not automatically loaded by a provider.

For continuing onboarding, confirm the trusted CLI help lists `onboard`; an older core needs a compatible update, not an invented command. Read `onboard --workspace` first. Reuse its exact workspace identity and revision. Before investigating sources, apply native instructions, selected-source scope and provider-sharing grants; use existing authorized context, ask only consequential gaps, and do not search arbitrary home directories or session caches. Distinguish observed facts from inference and reported checks from verified results. Keep at most three short unresolved questions prominent.

When the user directs an onboarding update, prepare a private JSON input preserving current fields except `schemaVersion`, `revision` and `updatedAt`; use the installed/source `docs/onboarding-state.md` for its schema and readiness rules. Record the outcome, source-linked facts, questions, checks, proposed team rationale and actual agreement. Save through `onboard --workspace DIR --input FILE --expected-revision N`. A stale revision requires rereading and reconciling, not blindly retrying. An abandoned lock requires deliberate recovery after verifying no writer remains. Never collect secrets or raw transcripts into this record. Do not treat its readiness, role labels or agreement as execution permission.

For the source UI, use `node` with the trusted checkout's absolute `ui/server.mjs` path and `--workspace` only when a preview is requested. The npm CLI archive does not include that server. Open the printed loopback URL when supported; otherwise provide it. Browser refresh reads saved reports, and copied prompts must be pasted into the same main chat; no message is sent automatically. Do not change host projects, sessions, provider settings or credentials to make an unavailable integration appear connected.

This preview stores configuration, onboarding reports and checks reference locations. It does not read board tasks, launch agents, bind sessions, observe skill usage, install skills or providers, configure credentials, or change global settings. Do not add those actions to an onboarding request. A runtime preference is not execution permission. Do not collect or put credentials in the profile or team document.
