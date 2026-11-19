---
layout: guide
title: "UI preview"
description: "Explore the synthetic local interface."
nav_order: 5
source_references: true
permalink: /guides/ui-preview.html
---

# Local UI preview

A browser walkthrough of the planned MyTeam screens using a **synthetic, in-memory** sample team. It is a design and interaction preview, not a working dashboard. The [terminal setup](setup.html) remains the only way to create a real workspace.

## Run it

Requirements: Node.js **22 or newer**. No `npm install`, dependencies or network access are needed.

From the repository root:

```sh
node ui/server.mjs
```

Open <http://127.0.0.1:4317/>. Stop the server with **Ctrl+C**.

To use another loopback port, run `node ui/server.mjs --port 4400` or set `MYTEAM_UI_PORT=4400`. The server always binds to `127.0.0.1`; the host is not configurable.

## What the preview shows

- **Onboarding, three steps.** Name the demo workspace and team (blank names cannot continue); choose a manual, Codex, Claude or mixed runtime preference and inspect the lead, engineer and QA roles (mixed mode shows and lets you change each role's assignment, starting from the CLI defaults); review the synthetic sources and roles; then enter the demo. Back keeps your entries. **Skip to demo** and **Restart onboarding** are always in the header.
- **Overview, Team, Board, Activity, Connections** for the synthetic *Reading room* project, with stable IDs (`lead`, `engineer`, `qa`; tasks `RR-101` to `RR-105`). Selecting a task opens a detail panel with owner, reviewer, review state, acceptance criteria, blockers and dependencies. Session activity for that task is listed separately and never changes board status.
- **Board** shows a fixture with four declared columns (To Do, In Progress, In Review, Done). Nothing reads or writes Backlog.md.
- **Activity** is a fixed recording of sample events, not monitoring. Subagent events are hidden by default behind a toggle. Configured reporting lines are listed separately from recorded messages, session creation and spawn events. Idle is never shown as Done.
- **Connections** states each source plainly: sample board, session observation unavailable, GitHub not connected, secret store not configured, and 1Password under consideration with no vault access or connect control. See the [credential design](https://github.com/saleemhamo/myteam-md/blob/main/docs/credentials-and-access.md).

Change and review references such as `C-14` and `R-5` are synthetic and link nowhere. Configured skills come from the fixture; observed skill use is shown as unavailable rather than zero.

## Limits and boundaries

- State lives only in the page. Reloading resets everything. Entries are not stored, sent anywhere or passed to the CLI.
- Finishing onboarding creates no files, workspace, sessions or agents and checks no tool installation.
- The page asks for no credentials or private paths and makes no external network requests: the Content Security Policy sets `connect-src 'none'` and allows scripts, styles and images from the preview origin only.
- The server answers only `GET` and `HEAD` for an explicit allowlist: `/` and `/index.html`, `/styles.css`, `/app.mjs`, `/state.mjs`, and the product-owned `/brand/tokens.css` and `/brand/wordmark.svg`. Every other path returns 404, other methods return 405, and requests whose `Host` is not the loopback address and port return 421. It never lists directories or serves other repository files.
- Light theme and one density only. Screen-reader and visual-regression checks have not been recorded for this preview.

Screen behavior and the planned integration are described in [UI and visual experience](https://github.com/saleemhamo/myteam-md/blob/main/docs/ui-and-visuals.md).

## Create a real workspace

Use the existing CLI from the repository root:

```sh
node bin/myteam.mjs init
```

It prompts for the team name, runtime and a new private directory. Follow [Try the terminal setup](setup.html) for details and the `doctor` check.

## Tests

Run the UI tests from the repository root:

```sh
node --test test/ui-state.test.mjs test/ui-server.test.mjs
```

[`test/ui-state.test.mjs`](https://github.com/saleemhamo/myteam-md/blob/main/test/ui-state.test.mjs) covers onboarding validation, back navigation, runtime assignment, skip/reset, selection preservation and fixture rules. [`test/ui-server.test.mjs`](https://github.com/saleemhamo/myteam-md/blob/main/test/ui-server.test.mjs) starts the server on an ephemeral loopback port and checks the allowlist, methods, host check, headers and local-only asset references with real HTTP requests.

## Manual UI verification

With the server running, check in a desktop browser and at a 390px-wide viewport:

1. Press **Next** with empty names: both fields show errors and focus moves to the first one. Whitespace-only names are also refused.
2. Enter names containing `<b>markup</b>`: they appear literally as text in the review step, the navigation sidebar and the Overview heading.
3. On step 2 choose **Mixed**: lead and engineer start on Codex and QA on Claude; change one role and confirm the review step reflects it. **Back** returns with entries intact.
4. Enter the demo and visit every navigation item; the current view is indicated by more than color.
5. Open a task from Board, then switch views and toggle subagent events in Activity: the same task stays selected. **Close** returns focus to the button that opened it.
6. Confirm Connections offers no connect, install or secret-entry controls.
7. Use the keyboard only: the skip link, visible focus outline and every control work. With reduced motion enabled nothing animates.
8. In developer tools, confirm the network panel shows only the allowlisted local files and no console CSP violations.
9. **Restart onboarding** returns to an empty step 1; reload does the same.

## Recorded validation

On 19 November 2026, the 19 focused Node tests passed on macOS. The local browser flow was checked at the default 1280px desktop width and at 390px and 320px widths. Required-field errors, preserved entries on Back, mixed per-role assignments, literal markup-like names, skip/reset/reload, all five views, task selection across navigation and subagent toggles, and keyboard task open/close focus were exercised. A mobile grid overflow found during that check was fixed; the onboarding stages and all five views had no page-level horizontal overflow at 320px. Browser console warnings/errors were empty in the checked flow.

These checks do not establish screen-reader or WCAG conformance, automated visual-regression coverage, live workspace integration, or real connection/credential behavior. Screenshot evidence is retained privately with the implementation handoff.
