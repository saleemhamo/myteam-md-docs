---
layout: guide
title: "Setup plugins"
description: "Export optional Claude Code and Codex setup guidance."
nav_order: 6
source_references: true
permalink: /guides/plugins.html
---

# Local setup plugins

MyTeam can export a native Claude Code or Codex setup-plugin folder from the source checkout or a locally built CLI archive. This is a local packaging preview, not a marketplace listing or a tested native installation. The human CLI remains usable without either provider.

## Export shared setup guidance

With Node.js 22+, run from the trusted MyTeam checkout:

```sh
node bin/myteam.mjs plugin --runtime claude --output .local/plugins/claude --dry-run
node bin/myteam.mjs plugin --runtime claude --output .local/plugins/claude --yes
node bin/myteam.mjs plugin --runtime codex --output .local/plugins/codex --dry-run
node bin/myteam.mjs plugin --runtime codex --output .local/plugins/codex --yes
```

Each destination must be new. Omit `--yes` and `--dry-run` to review the files and answer the final export question. Declining or reaching end-of-input creates nothing. Export never changes provider settings or downloads, installs, or starts a provider. Directories request POSIX `0700` and files `0600`; this is not encryption or process isolation.

The generated folder contains only:

```text
my-plugin/
  .claude-plugin/plugin.json       # Claude format, or .codex-plugin/plugin.json
  skills/myteam-setup/SKILL.md
```

The manifest version comes from the CLI's `package.json`. Both formats copy the same original [setup skill](setup-skill.html) byte-for-byte. No CLI executable, hooks, agents, MCP servers, private workspace data or credentials are bundled. The export module is [plugins/export.mjs](https://github.com/saleemhamo/myteam-md/blob/main/plugins/export.mjs).

Use a separately trusted MyTeam CLI/source checkout matching the plugin version. A missing CLI is an explicit setup step using the [setup guide](setup.html); installing a plugin does not authorize fetching a registry package. The package remains private and unpublished.

## Native loading is a separate action

For a future authorized Claude trial, its installed CLI supports a session-local plugin directory:

```sh
claude --plugin-dir "/absolute/path/to/exported/claude"
```

The skill is exposed under the plugin namespace, for example `/myteam:myteam-setup`. This command starts Claude and is not run by MyTeam. For Codex, add the exported folder to a reviewed local marketplace using the host's native flow, then install through its plugin browser. This preview does not create that marketplace or edit any provider configuration. Do not assume Claude's `--plugin-dir` flag works in Codex.

See [Claude plugin loading](https://code.claude.com/docs/en/plugins) and [Codex packaging/local marketplaces](https://developers.openai.com/plugins/build/plugins). Help and manifest checks establish only the checks actually run; native discovery, invocation, permissions, update and removal still require their own trials on exact host versions. Codex's IDE extension is not a supported plugin surface; explicitly supplied skill guidance remains a fallback. [Codex surfaces](https://learn.chatgpt.com/docs/plugins)

## Private workspace and permissions

Run setup through the same preview/create/doctor sequence as the human CLI. `manual`, `claude`, `codex`, and `mixed` describe team runtime preferences; an exported package's format does not restrict that choice or require a second provider. Creating three role records does not start three agents.

For an existing workspace check, the skill runs only `doctor --workspace`. Keep durable private workspaces outside plugin folders and caches. Preserve native repository instructions and personal skills. `MYTEAM.md` remains explicit context rather than an automatically loaded instruction file. The CLI records absolute references; moving a project or demo workspace can break them.

Updating a plugin means exporting the reviewed new version to a new folder and using the host's native update/loading flow. Export does not replace an installed bundle. Disabling or removing a plugin must preserve separately stored workspaces and the independent CLI. Native settings, caches and connected-service authorization have their own removal behavior; no MyTeam uninstall command deletes them.

Service-connection and 1Password planning are separate from setup-plugin export. This plugin requests no service credentials or connection grants. Follow the [credential design](https://github.com/saleemhamo/myteam-md/blob/main/docs/credentials-and-access.md) before enabling authenticated operations; native plugins do not establish its required isolation boundary.

## Validation and later work

The source tests cover manifest/version/content, cancellation, invalid options, permissions, source preservation and existing/racing destinations. They do not prove an agent follows the skill. Use the [hands-on checklist](setup-test.html#optional-plugin-export) to record native trials separately.

The local CLI archive includes `plugins/export.mjs` and this guide. Release validation checks the explicit package payload and exports both native formats through an offline installation of that archive. After local installation, use `myteam plugin` with the same arguments shown above. No registry publication or native provider lifecycle verification is implied.

The provider-neutral workspace core remains the source of team identity and ownership, with Backlog.md planned as canonical task storage. R1 may add bounded read-only MCP access after snapshots exist. Agent dispatch, continuous coverage and credential brokering remain separate roadmap increments. This follows the shared-content/thin-manifest lesson in [prior art](https://github.com/saleemhamo/myteam-md/blob/main/docs/prior-art.md), rather than adding a new orchestration engine.
