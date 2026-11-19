---
layout: guide
title: "Try the terminal setup"
description: "Create and check a private demo workspace."
nav_order: 1
permalink: /guides/setup.html
---

# Try the terminal setup

This is a working **local setup preview**, version `0.1.0-alpha.1`. It creates a private workspace and a three-member starter team. The source checkout can also export optional native setup-plugin folders. It does not yet launch agents, read a board, observe sessions, install skills, or connect to GitHub/GitLab. No credentials or model calls are needed.

The package is not published on npm. Use the source checkout or build the local npm archive below. The package is marked `private: true`; a public release and license are still pending.

## Requirements

- Node.js **22 or newer**. Check with `node --version`.
- A terminal and a new directory in which to store your private workspace.
- npm only if you want to build/install the local archive. There are no third-party runtime dependencies.

The commands below use a macOS/Linux shell. Windows has not been validated for this preview. Codex, Claude Code, Backlog.md, Git, and provider sign-in are not prerequisites for demo setup. Provider selection records a preference; it does not install or authorize that provider.

## First run from the source checkout

Open a terminal in the MyTeam repository, then run:

```sh
node bin/myteam.mjs init
```

No `npm install` is required. The wizard asks:

| Prompt | Recommended first test |
| --- | --- |
| Demo or project | `demo`, containing only a synthetic reading-list product |
| Team name | Any name, for example `My demo team` |
| Runtime | `manual` to test without installed agents; `codex`, `claude`, and `mixed` are also valid |
| New private workspace | Accept the default `~/.myteam/workspaces/first-team`, or choose another new directory |
| Per-role runtime, for mixed mode | Choose Codex or Claude independently for lead, engineer, and QA |
| Review the paths and team, then create | Type `yes` to create; Enter defaults to `no` |

An existing directory is refused, even if empty. Declining confirmation or reaching end-of-input at a prompt creates no workspace. Use a new name for each test; setup does not reset or migrate existing data. If the process is interrupted while writing after confirmation, inspect any incomplete workspace and choose a new directory before retrying.

Check the result, using the exact directory you selected:

```sh
node bin/myteam.mjs doctor --workspace "$HOME/.myteam/workspaces/first-team"
```

Expected: `Setup is valid.` Warnings about the board, session observation, skill integration, and agent execution are expected because those capabilities are not available yet. A missing optional provider executable is also a warning. A missing project or selected context file is a failure and exits with status 1. Finding a provider on `PATH` checks only its location, not its sign-in or functionality.

## What you get

```text
first-team/
  .gitignore
  workspace.json
  MYTEAM.md
  demo-project/README.md     # demo mode only
```

`workspace.json` records a workspace ID, name, selected paths, runtime instances, and three stable engineer IDs: `lead`, `engineer`, and `qa`. Roles are technical lead, software engineer, and QA engineer. In mixed mode, noninteractive defaults assign lead and engineer to Codex and QA to Claude; the wizard lets you change each choice. These are configured responsibilities, not three running agents.

`MYTEAM.md` is a starter team document. Edit its purpose and working agreements after setup. Neither Codex nor Claude automatically loads this proposed convention; explicitly provide the document when beginning work. Repository-native instructions remain authoritative. Editing this document does not update the JSON profile, and this preview has no team-editing UI or synchronizer.

Selected context paths are checked without reading their contents. A real project is referenced without copying or editing its existing files. Choose workspace storage outside the project and board for separate storage; if you explicitly choose a directory inside either, setup creates its new files there. An optional Backlog project directory is recorded but its board format and tasks are not read or validated. The preview does not create a competing task store. Session and skill lists remain empty, with no claims about skills loaded or used.

References are saved as absolute paths. Moving a workspace, project, or context file does not update them automatically. Restore the original location or initialize a new workspace with the intended references. In particular, moving a demo workspace breaks its saved references to the synthetic project inside it.

Generated directories request owner-only permissions (`0700`) and files request `0600` on POSIX systems. The generated `.gitignore` ignores workspace contents, helping prevent accidental commits. These measures are not encryption, a vault, or an isolation boundary from programs running as you. Store no credentials here. Workspace paths and team documents may contain private context; share them deliberately.

## Preview or repeat without prompts

From the source checkout, preview a new demo directory:

```sh
node bin/myteam.mjs init --demo --runtime mixed \
  --workspace "$HOME/.myteam/workspaces/demo-two" --dry-run
```

Run the same command replacing `--dry-run` with `--yes` to create it. `--yes` skips questions; choose it only when the supplied paths and options are intentional. Use `--help` for every supported option.

For your own project, run `init`, choose `project`, and provide an existing project directory. You can optionally select a context file and an existing Backlog project directory. To select multiple context files, use repeated `--context` flags with `--project` and `--workspace`; preview with `--dry-run` first. Shell-quote paths containing spaces. The workspace must be new; the project and selected references must already exist. Symlinked project, context, and board paths are resolved to their targets, shown in the preview, and saved as those resolved paths. Changing an input symlink later does not change the saved selection. Missing targets and wrong file types are rejected.

## Install the local package instead

Build an archive from the source checkout:

```sh
mkdir -p .local/packages
npm pack --ignore-scripts --pack-destination .local/packages
```

The output is `.local/packages/myteam-md-cli-0.1.0-alpha.1.tgz`. This command creates a local archive; it does not publish anything. Install that archive into a dedicated location, without `sudo` or a global npm configuration change:

```sh
npm install --global --prefix "$HOME/.local/share/myteam-preview" \
  --offline --ignore-scripts --no-audit --no-fund \
  ./.local/packages/myteam-md-cli-0.1.0-alpha.1.tgz
"$HOME/.local/share/myteam-preview/bin/myteam" --version
"$HOME/.local/share/myteam-preview/bin/myteam" init
```

Use the same full binary path for `doctor`. These archive/install steps need no registry credentials or network access. Setup itself makes no network calls. You do not need to edit `PATH`; a future public package may offer a shorter installation flow.

To update the preview, build the next version and install its exact archive into the same dedicated prefix. This replaces CLI files, not your private workspaces. There is no automatic workspace migration; an unsupported schema causes a clear error.

To uninstall only the CLI:

```sh
npm uninstall --global --prefix "$HOME/.local/share/myteam-preview" \
  --offline --ignore-scripts --no-audit --no-fund @myteam-md/cli
```

Private workspaces remain where you created them. Review and remove unwanted demo directories yourself; uninstall does not delete team data.

## Optional setup skill

The archive and source include [myteam-setup](setup-skill.html), a small, original instruction file for agents assisting with this same CLI. No skill is required for the human wizard. It is bundled, not automatically installed or loaded into either provider. You can give an agent the file explicitly, or follow the [optional plugin-export checklist](setup-test.html#optional-plugin-export) to prepare a Claude/Codex folder for a separately authorized native trial. Export works from source and the locally built CLI archive. It does not install the plugin or verify native loading.

The skill resolves a trusted CLI/version independently of the current directory. For a new workspace it runs a preview, creates only the selected workspace, then checks it; for an existing-workspace check it runs only `doctor`. Private workspaces belong outside replaceable plugin caches. It does not install provider tools, change agent settings, add credentials, or launch team members. A successful setup is not evidence that a skill was invoked in a later engineering session.

## Why this shape

The setup design adapts the local initializer pattern described by [Backlog.md](https://github.com/MrLesk/Backlog.md) and keeps agent guidance optional, as illustrated by [BMad's installation approach](https://github.com/bmad-code-org/BMAD-METHOD). [Paperclip](https://github.com/paperclipai/paperclip) also provides a package-based onboarding entry point; its orchestration server is beyond this increment. These are documentation-based lessons reviewed on 2026-11-19, not results from installing those projects. No upstream implementation or skill was copied.

We build only the small workspace initializer now because it can validate provider-neutral configuration before committing to an execution platform. Backlog.md remains the planned task store. Acceptance evidence for this decision is the synthetic setup, cancellation, reference-preservation, and isolation tests in `test/setup.test.mjs`; full board and runtime integrations still need their own acceptance checks.

Follow the [hands-on test checklist](setup-test.html) to report what works or feels unclear.
