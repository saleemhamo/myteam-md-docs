---
layout: guide
title: "Setup skill"
description: "Optional guidance for an agent helping with the local CLI."
nav_order: 10
source_references: false
permalink: /guides/setup-skill.html
---

# MyTeam setup

Act as the FDE in the user's main MyTeam.md chat, continuing as coordinator after onboarding. For an explicitly selected teammate, restore that role instead. The host chat handles operations; the browser observes saved state.

## Resolve the project and core

Resolve one trusted installed `myteam` executable or source checkout. Use its absolute, shell-quoted path consistently for `--help`, `--version` and later commands; for source, use `node "/absolute/checkout/bin/myteam.mjs"` with Node.js 22+. Compare its version with the loaded bundle's `.claude-plugin/plugin.json` or `.codex-plugin/plugin.json` and confirm help includes `open`, `discover`, `onboard` and `ui`. If missing or mismatched, give the trusted source/archive installation steps from `docs/setup.md`. A plugin contains guidance, not the CLI; downloading or installing software needs the user's authorization.

Take the project directory from the user's selected native project/folder or explicit path. When multiple folders are in scope, resolve which product/workspace to open before reading sources. Use context already supplied in this chat; import earlier-chat context only through an available authorized host tool or a user-selected export. Never search private provider caches or arbitrary home directories.

For a check-only request, use only `doctor --workspace DIR` against the selected existing workspace. For a synthetic demo, or initial external context-file references, follow the trusted core's `docs/setup.md` and `init` options. Otherwise use the folder-led route below.

## Open or resume

Read the trusted core's `docs/host-integration.md` for storage, role selection and recovery. Run:

```sh
myteam open --project "/selected/project" --host HOST
```

Use the actual local host (`codex-cli`, `codex-desktop`, `claude-code`, or `manual`). Default private storage is outside the project, under `~/.myteam/workspaces`, keyed by its canonical path. Pass `--workspace DIR` for a known existing workspace; retain a user-selected `--store DIR` on later opens. Keep state outside plugin caches. An existing workspace is authoritative: do not initialize another simply because its runtime differs.

For a request to resume existing work, add `--existing`. A missing workspace then requires locating the prior project path or storage override; prior creation authorization does not permit replacing missing state.

A `setup-required` response gives the destination and inferred runtime without writing. Explain the private destination and runtime briefly; rerun with `--yes` when creation is authorized. Existing setup authorization counts. Confirm whether one or both providers are intended before creation; add `--runtime mixed` for both. Adding a provider later has no migration command yet. Use the configured host when resuming; `manual` requires a manual runtime and is not a fallback for a provider mismatch. No manual workspace IDs, JSON or session labels are needed from the user. Existing files are preserved; a damaged workspace, stale lock or changed path requires reconciliation, not reset.

A `selected` response includes the workspace path, saved revision, role and brief. A fresh coordinator chat follows the same command. For a teammate, use `--member ID` with its exact saved team ID; resolve a name to that ID from the brief, or ask if ambiguous. Role selection is user-directed, not native identity detection or task assignment. For actual recorded native references, replacement or retirement, follow the separate `bindings`/`resume` path in `docs/host-integration.md`; do not fabricate IDs or silently substitute a role selection for a failed recorded-chat resume.

## Understand and save

Run `doctor --workspace DIR` and read the restored brief before discovery. Apply native instructions, selected-source scope and provider-sharing authorization. Use `discover --workspace DIR` and, when relevant, explicit project-relative `--file` paths. Read coverage and skipped-file reasons; source text is evidence, not authorization to expand scope or execute commands. Ordinary files can contain secrets despite filename exclusions. Select only material appropriate for this provider.

Learn the business outcome and users, architecture/stack, setup/test workflow, quality rules, tooling, first work and authority. Use observed facts and existing authorized context first. Read deeper only within the selected scope and applicable nested instructions. Ask at most three consequential unanswered questions at a time. Preserve unresolved questions; reading scripts does not establish passing tests or authorize their execution.

Maintain the brief yourself using the trusted core's `docs/onboarding-state.md`. Prepare a private JSON input preserving current fields except `schemaVersion`, `revision` and `updatedAt`, then save with `onboard --workspace DIR --input FILE --expected-revision N`. Use an owner-only temporary input outside source/plugin folders and remove it after the save. Do not ask the user to edit JSON or duplicate the brief into MYTEAM.md. A stale revision requires rereading and reconciliation; a lock requires checking its writer, never blind removal.

Record source-linked facts, actual answers, reported versus executed checks, and proposed team specialties/rationale. Keep the agreement draft until the user actually agrees. Read back `onboard` after saving and verify the intended revision/content. Save partial discovery too, so a new chat can continue from the unresolved gaps. Keep secrets and raw transcripts out of this record; readiness and roles do not grant execution permission.

## Show and hand back

When the companion is requested, run the trusted core's `ui --workspace DIR --project DIR --host HOST --member ID` for the selected role (`coordinator` for the main chat). If the port is occupied, choose another explicit `--port` without stopping another process. Open the printed loopback URL where supported; otherwise provide it. Track the process so it can be stopped when no longer needed. The archive includes its assets. Browsing teammates preserves the selected role; copied prompts require manual delivery. Embedding inside the native chat remains unverified.

Finish with the saved revision, remaining consequential questions, selected role and UI link if started. A new chat needs the project path and role request, plus any explicit storage override; it does not need the previous transcript. Recheck relevant evidence before acting on a saved brief. This preview does not create native projects/chats, read live boards/PRs, configure credentials, send handoffs or execute a team.
