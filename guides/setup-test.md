---
layout: guide
title: "Your first setup test"
description: "Try the preview and check its boundaries."
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

There is no board window or agent dispatch after setup yet. That is the next product work, not a setup failure. Do not test credential brokering: it is not implemented and the wizard does not accept secrets.

## Feedback to bring back

Report your operating system, `node --version`, MyTeam version, source/archive route, runtime choice, the step that felt unclear, and the expected versus actual result. Include the error text if useful. Redact private paths, team context, and account details; do not paste credentials or your full workspace profile.

Useful questions: Was it clear where the files went? Did the preview give enough confidence? Was it obvious that these were role definitions rather than running engineers? Did the doctor warnings make the next step clear?

## Automated developer checks

From the source checkout:

```sh
npm test
```

Tests use Node's built-in runner and disposable synthetic directories. They check every runtime preset, piped wizard answers, mixed assignments, preview/cancellation/EOF, overwrite refusal, project preservation, invalid profile bindings, independent workspaces, and diagnostic failures. Test-created directories are removed. The local archive is separately installed into an isolated prefix and exercised through the installed binary before handoff; no registry publication or provider execution is part of that check.
