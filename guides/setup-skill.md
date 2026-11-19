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

For a check-only request, resolve the selected existing workspace and run only `doctor --workspace` with that directory. Report checks and warnings; create nothing and preserve its files.

For creation, determine demo versus existing project, new workspace location, team name, and runtime choice (`manual`, `codex`, `claude`, or `mixed`) from the user's request. Select durable private workspace storage outside the plugin folder/cache, which can be replaced or deleted during updates/removal. Start with a synthetic demo when real sources have not been selected. Missing optional provider tools are not blockers.

Run `init` with explicit options and `--dry-run` to show the team and selected paths. Create that reviewed workspace with the same options and `--yes` when authorized by the user. Existing session authorization counts; do not require a duplicate approval. Never reset an existing destination to make initialization succeed. Use the terminal wizard if the user wants to make choices themselves.

Run `doctor --workspace` with the created directory. Report the paths, validation result, warnings, and the next step: edit `MYTEAM.md` for product purpose and working agreements. Saved references are absolute; moving the workspace or project can break them. Native project instructions remain authoritative; `MYTEAM.md` is not automatically loaded by a provider.

This preview stores configuration and checks reference locations. It does not read board tasks, launch agents, bind sessions, observe skill usage, install skills or providers, configure credentials, or change global settings. Do not add those actions to an onboarding request. A runtime preference is not execution permission. Do not collect or put credentials in the profile or team document.
