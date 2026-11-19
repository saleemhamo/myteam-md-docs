---
layout: guide
title: "Secrets and 1Password"
description: "Connection planning; no live vault access yet."
nav_order: 8
source_references: true
permalink: /guides/secrets.html
---

# Secrets setup (current status)

MyTeam does not connect to any secrets provider yet. This page describes what
exists today, what is deliberately deferred, and why. See
[credentials-and-access.md](https://github.com/saleemhamo/myteam-md/blob/main/docs/credentials-and-access.md) for the access model and
[setup.md](setup.html) for general setup.

## What works today

- The offline demo and the `init` / `doctor` flow work with no secrets provider.
- `src/connections.mjs` offers a small planning API. It is **library-only**
  until the CLI owner integrates it; no command reads or writes a plan yet.
- No live integration exists. Nothing calls a vault, spawns a process, or
  touches the network.

## Rules

- Never enter a secret value in chat, in MyTeam configuration, or in the MyTeam UI.
  Enter credentials only in the human-controlled provider interface.
- A plan holds a provider name and an opaque connection ID, nothing else.
- The connection ID is an administrator-chosen label (`^[a-z][a-z0-9-]{0,63}$`).
  It refers to a future, protected, admin-side mapping. It grants no access
  and must not be a token, vault URI, hostname, or path.
- Validation checks shape only. It cannot stop someone typing sensitive text
  into an allowed field, so keep labels boring.

## Plan format

No provider:

```json
{ "schemaVersion": 1, "provider": "none", "connectionId": null }
```

Planned 1Password connection (synthetic example):

```json
{ "schemaVersion": 1, "provider": "1password", "connectionId": "example-team-a" }
```

## API

```js
import { validateConnectionPlan, connectionReadiness } from './src/connections.mjs';
```

- `validateConnectionPlan(plan)` returns an array of constant error strings
  (empty when valid). Errors never echo input keys or values.
- `connectionReadiness(plan)` returns `status` of `invalid`, `not-configured`,
  or `planned`. `ready` is **always `false`**, because no isolation boundary
  has been verified. The connection ID is never returned, and input cannot
  self-attest readiness or isolation.

Run the focused tests:

```sh
node --test test/connections.test.mjs
```

## Why nothing is live: provider facts (checked 2026-11-19)

Our requirement is that the agent never holds the secret value. Vendor
documentation is input to our evaluation, not our verification.

- **Local Environment mounts are not isolation.** With the standard
  coding-agent setup, the agent can still read the mounted secrets. We do not
  treat the Environments MCP or agent plugin as secret isolation.
  <https://www.1password.dev/security-for-ai>
- **`op run` is not isolation.** It places real secret values in the child
  process environment; output masking does not protect against
  agent-controlled code. <https://www.1password.dev/cli/reference/commands/run>
- **OpenShell integration (beta) is the closest existing boundary.** Secrets go
  to an OpenShell gateway for a bounded TTL; sandboxed agents see placeholders
  and the gateway substitutes values only for approved destinations. Read-only
  profiles are supported. It needs the 1Password desktop app (Mac or Linux), an
  OpenShell gateway, and a supported agent.
  <https://www.1password.dev/environments/nvidia-openshell.md>
- **Credential Broker (public preview)** is a 1Password Business OIDC workflow
  integration. It is a different thing from local agent operation isolation
  and is not our default personal setup.
  <https://www.1password.dev/brokered-access>

## Decision

- **Use:** an existing 1Password vault, if the administrator chooses that provider.
- **Adapt:** evaluate the OpenShell beta boundary before building a bespoke broker.
- **Defer:** all live credentials until a boundary is verified by us.
- **Keep:** a provider-neutral core so an OS credential store or OpenBao can be
  added later.

## Future gated pilot (human-owned, not started)

Before any real credential is used, a human-run pilot with synthetic canaries
only must test:

- destination restrictions (which alone are not repository authorization);
- repository and operation scope;
- TTL expiry and revocation;
- access attempts from an unauthorized workspace;
- exposure through process, filesystem, environment, and output, including
  reflection of substituted values;
- the actual supported Claude and Codex runtimes.

This page intentionally gives no provisioning or account commands: none have
been tested here. Until the pilot passes, `connectionReadiness` keeps
reporting `ready: false`.
