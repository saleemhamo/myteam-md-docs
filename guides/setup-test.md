---
layout: guide
title: "Your first setup test"
description: "Try the preview and check its boundaries."
nav_order: 2
source_references: true
permalink: /guides/setup-test.html
---

# Your first setup test

Use the [setup guide](setup.html) to run from source or install the local archive. Start with a synthetic demo. This test needs no private project, account, token, or installed agent.

## Happy path

1. Run `node bin/myteam.mjs --version` from the source checkout. Expect `0.1.0-alpha.1`. For the installed archive, use its full `myteam` binary path instead.
2. Run `node bin/myteam.mjs init`. Choose demo, your own team name, manual, and a new private workspace directory.
3. Read the preview. It should name exactly the workspace, synthetic project, and three roles you expect. Enter `yes`.
4. Open the generated `MYTEAM.md` and `workspace.json`. Verify your name and choices. The document should explain how to add product context and that agents are not running.
5. Run `node bin/myteam.mjs doctor --workspace` followed by your quoted directory. Expect a valid setup with explicit warnings about features not yet connected.

## Boundaries to try

| Test | Expected result |
| --- | --- |
| Start setup again with that same workspace | Refused; your existing files remain unchanged |
| Choose a new directory but press Enter at confirmation | Cancelled; that directory is not created |
| Run `init --demo --workspace NEW_DIRECTORY --dry-run` | A plan is shown; no files are created |
| Use a new directory with `codex`, `claude`, or `mixed` | All three engineers are configured; a missing provider does not prevent setup |
| Choose mixed mode | Each role can select either provider independently |
| In a new project-mode workspace, select a disposable project and context file | References are saved; original contents and repository instructions stay unchanged |
| Delete that disposable context file, then run `doctor` | It reports a failed context reference and exits nonzero |

The companion UI can show saved onboarding or a synthetic tour; a live task board and agent dispatch are not connected yet. That is the next product work, not a setup failure. Do not test credential brokering: it is not implemented and the wizard does not accept secrets.

## Optional plugin export

The plugin export command prepares a native folder without installing it. Preview the destination first, then try both formats in new directories:

```sh
node bin/myteam.mjs plugin --runtime claude --output .local/plugins/claude --dry-run
node bin/myteam.mjs plugin --runtime codex --output .local/plugins/codex --dry-run
```

Confirm previews create nothing. Repeat without `--dry-run`, decline the export, and confirm the destination remains absent. Export with `--yes`; inspect the native manifest/version and shared skill, then verify a second export to the same directory is refused without changes. No provider should start and no settings should change.

Native lifecycle checks are separate; see the scoped [validation record](https://github.com/saleemhamo/myteam-md/blob/main/docs/plugin-validation.md). For further host acceptance: record host/plugin/CLI versions, explicitly authorize loading or installation, verify discovery and invocation from an unrelated project directory with spaces in paths, preview/cancel/create/check, then update and remove using the host. Keep the workspace outside plugin caches. Confirm removal retains the workspace, existing repository instructions, personal skills and independent CLI. Missing or mismatched CLI should yield an actionable setup step rather than an implicit download. A configured skill is not evidence of invocation or adherence.

## Feedback to bring back

Report your operating system, `node --version`, MyTeam version, source/archive route, runtime choice, the step that felt unclear, and the expected versus actual result. Include the error text if useful. Redact private paths, team context, and account details; do not paste credentials or your full workspace profile.

Useful questions: Was it clear where the files went? Did the preview give enough confidence? Was it obvious that these were role definitions rather than running engineers? Did the doctor warnings make the next step clear?

## Automated developer checks

From the source checkout:

```sh
npm test
```

Tests use Node's built-in runner and disposable synthetic directories. They check every runtime preset, piped wizard answers, mixed assignments, preview/cancellation/EOF, overwrite refusal, project preservation, invalid profile bindings, independent workspaces, and diagnostic failures. Test-created directories are removed. The local archive is separately installed into an isolated prefix and exercised through the installed binary before handoff; no registry publication or provider execution is part of that check.

## Saved onboarding trial

After the terminal checks, follow the [onboarding record trial](ui-preview.html#validation-contract) to save a source-linked report through the CLI, refresh the read-only UI, reload it, and reject a stale update. No credentials or real provider sessions are needed. This exercises local continuity, not native project provisioning or delivery execution.

## Project and chat continuity

Use the [record-and-resume example](https://github.com/saleemhamo/myteam-md/blob/main/docs/host-integration.md#record-and-resume-a-chat) with a synthetic manual workspace. Read evidence, save a brief, record its coordinator and restart the CLI. Resume must return the same brief with `verification: user-supplied`. An unknown chat returns no brief; a different project is rejected. Retire the old reference and add a new one, then verify the old chat no longer resumes.

Open the UI with the complete reference group. Confirm the recorded owner stays fixed while browsing another teammate, and that copying a prompt sends nothing. Retire the selected reference while the UI is open; refresh must show an unavailable/stale state, never sample success. Run the same route from an offline installed archive to verify the server and assets are included.

## Plugin-led project trial

With a matching trusted core and loaded native plugin, ask: “Onboard this project at /path/to/synthetic-project.” Ada should create private storage, inspect selected evidence, save what she learned and propose the team before asking for the remaining decisions. You should not need to edit JSON, choose a workspace ID or copy a transcript. Follow [folder-led entry](https://github.com/saleemhamo/myteam-md/blob/main/docs/host-integration.md#folder-led-first-run-and-fresh-chat-resume) for commands and custom-storage recovery.

Check the actual experience, not just that a skill is installed:

- Select or provide the folder once. Ada should discover the stack, setup, tests, standards and product clues without asking you to restate readable files. Unverified conclusions must be labeled.
- Confirm the internal UI shows **Choose folder → Ada investigates → Review findings → Team ready**, learned context and the remaining readiness conditions. It should update after a saved checkpoint without a page reload.
- Expect a small batch of genuinely missing decisions through the host's native question form when available, or one concise batch in chat otherwise. Existing answers must not be asked again. A timeout or preselected choice is not an answer.
- Expand a finding, let a checkpoint refresh, and confirm the expanded detail and keyboard focus remain usable. Unchanged refreshes should not rebuild the page.
- Resume with partial answers. Confirm saved findings and answers survive, only unresolved decisions remain, and the team stays a proposal until its working agreement is confirmed.
- Verify that an unanswered blocking question, conflicting fact or pending/failed check keeps **Team ready** incomplete. Ready means onboarding is agreed; it must not claim workers are running or the product is deployable.

Run the interactive question-form check separately in each host. Deterministic tests and a Codex trial do not prove Claude's interactive behavior, or the reverse.

In a fresh chat, ask to resume the same project as coordinator, then as a saved teammate. Confirm the same workspace/revision, correct role and clearly labeled **Selected role** in the companion. It must not claim a verified native identity, assigned work or running team. Unknown member, wrong project and incompatible runtime should fail with recovery guidance. Sources and provider settings must remain unchanged. A custom `--store` or `--workspace` remains explicit; only the default location is rediscovered automatically.

Record native model invocation separately from deterministic CLI tests. The current host-specific results and unresolved gates are in [plugin validation](https://github.com/saleemhamo/myteam-md/blob/main/docs/plugin-validation.md).
