---
layout: guide
title: "UI preview"
description: "Observe saved onboarding or explore a synthetic team."
nav_order: 5
source_references: true
permalink: /guides/ui-preview.html
---

# Local UI

A read-only browser view alongside the main **MyTeam.md** chat. The chat handles onboarding as the FDE and remains the coordinating conversation. The browser shows saved reports and allows navigation, inspection, refresh and copying a targeted prompt. Product changes go through the chat; there is no browser write endpoint or embedded chat composer.

## Run

From this source checkout, with Node.js 22 or newer:

```sh
node ui/server.mjs --workspace /path/to/private-workspace --port 4318
```

Use a workspace created through [setup](setup.html). Open the printed `127.0.0.1` address. Without `--workspace`, the server shows a separate synthetic tour. The default port is 4317; choose another if it is already in use. `MYTEAM_UI_PORT` also sets the port. Ctrl+C stops the server.

The local CLI archive now includes the UI server and assets: run its `myteam ui --workspace DIR` command. See [project/chat entry](https://github.com/saleemhamo/myteam-md/blob/main/docs/host-integration.md#the-companion-ui) for recorded coordinator and engineer references. No dependency installation, credentials or model calls are needed to observe the local view.

## What the view means

- **Studio:** proposed/recorded engineers, current outcome, what needs attention and next steps; inspect an engineer without launching it.
- **Project:** reported business/system facts, sources, uncertainty and open questions.
- **Work:** illustrative plans and delivery evidence in demo mode; a local workspace shows the missing board/agent connections honestly.
- **Setup:** recorded setup reports, runtime preferences and unavailable integrations.

The [onboarding CLI](https://github.com/saleemhamo/myteam-md/blob/main/docs/onboarding-state.md) writes the private record. Refresh reads its latest revision. Reload resumes the same saved context; no form must be filled again. A copied prompt has not been sent: paste it into MyTeam.md. Its target project and workspace stay explicit.

A team profile is not a live session. Reported checks are not rerun by refreshing. Record update time and view fetch time are distinct; neither proves source freshness. Costs, estimated completion, PRs, live activity, grants and connected accounts remain unavailable unless a future supported adapter supplies evidence. The demo labels sample engineers/work and never represents them as live integration results.

## Local boundary

The server binds to loopback and serves an explicit asset allowlist plus `GET`/`HEAD /api/workspace`. Other methods, arbitrary paths, cross-origin API requests and host-name mismatches are rejected. A workspace identity is pinned at startup; a corrupt or replaced workspace fails closed. The browser may retain only the same workspace's last valid snapshot, visibly stale; it never substitutes demo data for a failed local load.

The server reads the private setup profile, onboarding record and optional exact chat-reference record. Selected source directories, context documents, credentials and provider caches are not scanned. Keep secrets out of the plain-text reports; this is not a credential vault, sandbox or authenticated multiuser service. Nothing writes to Backlog.md, starts workers or dispatches native chat messages.

## Validation contract

Run `npm test` for the record, CLI, UI state and real HTTP server checks. Relevant cases include persistence, stale/concurrent writes, wrong workspace identity, malformed/oversized input, no browser mutation methods, no secret/source-file response, safe text rendering, unavailable/stale data, selection and prompt targeting. UI visual checks must cover desktop and narrow screens, keyboard focus, no page overflow and clear demo/local labels. Passing these tests does not establish screen-reader conformance, native plugin invocation, live connectors or autonomous delivery.

Manual trial:

1. Create a private demo workspace through the CLI, then start the server bound to it.
2. Confirm the initial view reports a starter proposal and no running engineers.
3. Read `onboard`, save one authorized fact/outcome update with its current revision, and refresh the browser.
4. Confirm the new record survives reload and remains targeted to the same workspace.
5. Try a stale CLI revision; the previous saved record must remain unchanged.
6. Navigate all four views, inspect an engineer, copy a prompt and verify it has not been sent.
7. Make only a disposable test record invalid; refresh must show unavailable or visibly stale state, never a sample substitution. Restore it afterward.
8. Check keyboard use and 320px/mobile layout. The synthetic tour should remain clearly labeled separately.

The [journey plan](https://github.com/saleemhamo/myteam-md/blob/main/docs/team-journeys.md) and [visual direction](visual-direction.html) own the product and design rationale. Complete workspace discovery, task integration and delivery evidence remain later work.
