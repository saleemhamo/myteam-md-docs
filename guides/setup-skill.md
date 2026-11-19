---
layout: guide
title: "Setup skill"
description: "Optional guidance for an agent helping with the local CLI."
permalink: /guides/setup-skill.html
---

# MyTeam setup

Use the same initializer as the human terminal wizard. First locate the trusted source checkout or installed `myteam` binary and read its `--help`. The source command is `node bin/myteam.mjs`; do not assume a registry package exists.

Determine demo versus existing project, new workspace location, team name, and runtime choice (`manual`, `codex`, `claude`, or `mixed`) from the user's request. Start with a synthetic demo when real sources have not been selected. Missing optional provider tools are not blockers.

Run `init` with explicit options and `--dry-run` to show the team and selected paths. Create that reviewed workspace with the same options and `--yes` when authorized by the user. Existing session authorization counts; do not require a duplicate approval. Never reset an existing destination to make initialization succeed. Use the terminal wizard if the user wants to make choices themselves.

Run `doctor --workspace` with the created directory. Report the paths, validation result, warnings, and the next step: edit `MYTEAM.md` for product purpose and working agreements. Native project instructions remain authoritative; this document is not automatically loaded by a provider.

This preview stores configuration and checks reference locations. It does not read board tasks, launch agents, bind sessions, observe skill usage, install skills or providers, configure credentials, or change global settings. Do not add those actions to an onboarding request. A runtime preference is not execution permission. Do not collect or put credentials in the profile or team document.
