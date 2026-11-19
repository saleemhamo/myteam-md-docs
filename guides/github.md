---
layout: guide
title: "GitHub observations"
description: "Offline observation logic and the remaining live integration work."
nav_order: 8
source_references: true
permalink: /guides/github.html
---

# GitHub observations

The [GitHub module](https://github.com/saleemhamo/myteam-md/blob/main/src/github.mjs) observes explicitly mapped pull requests through an injected transport. It normalizes PR state and commit status/check evidence without posting reviews, changing GitHub, inferring ownership, persisting data, or polling. Its [fixture tests](https://github.com/saleemhamo/myteam-md/blob/main/test/github.test.mjs) run offline with Node 22 or newer:

```sh
node --test test/github.test.mjs
```

This increment supplies the observation logic and transport contract. It does not supply a live GitHub transport, connect an account, implement credential isolation, or perform business-context reviews. Repository-wide memory and cross-repository review reasoning remain future work.

## Callable interface

`observeGitHubPullRequests({ selection, engineerIds, mappings, transport, now })` returns a snapshot. `now` optionally supplies a Date for deterministic tests. The function does not read workspace files or change their schema; the caller can derive `engineerIds` from its declared engineers.

- `selection` requires exactly `host`, `account`, `owner`, and `repository`. No defaults are inherited from environment variables or global GitHub CLI identity. This increment supports only `github.com`; enterprise hosts require a separately reviewed destination policy.
- `engineerIds` declares the workspace's known engineer IDs. Each mapping contains exactly `engineerId` and a positive integer `pullRequestNumber`. Map at most 100 distinct PRs per call. A PR has one registered engineer in this initial slice; other responsibilities can be modeled later.
- Ownership is the supplied mapping. PR authors, shared service accounts, branches, and agent activity cannot establish engineer identity. These inputs are references, not authorization grants or authenticated caller identities.
- Multiple repositories use separate calls with explicit selections and mappings. The caller maintains their workspace association. Each selection and mapping is copied before any asynchronous work.

This example is entirely synthetic. Run its contents as an ES module from the repository root, for example with `node --input-type=module` and standard input:

```js
import { observeGitHubPullRequests } from './src/github.mjs';

const selection = {
  host: 'github.com', account: 'demo-reader',
  owner: 'example-team', repository: 'demo-product',
};
const headSha = 'a'.repeat(40);
const transport = {
  async getIdentity() { return { host: 'github.com', login: 'demo-reader' }; },
  async getPullRequest({ pullRequestNumber }) {
    return {
      number: pullRequestNumber, state: 'open', merged: false, draft: false,
      base: { repo: { full_name: 'example-team/demo-product' } }, head: { sha: headSha },
    };
  },
  async getCombinedStatus() {
    return { sha: headSha, state: 'pending', total_count: 0, statuses: [] };
  },
  async getCheckRuns() {
    return { total_count: 1, check_runs: [
      { head_sha: headSha, status: 'completed', conclusion: 'success' },
    ] };
  },
};
const snapshot = await observeGitHubPullRequests({
  selection, engineerIds: ['engineer', 'qa'],
  mappings: [{ engineerId: 'engineer', pullRequestNumber: 7 }], transport,
});
console.log(snapshot.observations[0].status.state); // success, from synthetic evidence
```

The synthetic identity is deliberately a fixture. A live adapter must establish identity from the selected authenticated service; returning the requested account and host without verification would defeat the check.

## Transport contract

Supply trusted code exposing these named operations. The module sends frozen argument objects. There is no generic authenticated request, subprocess/command runner, credential getter, or built-in HTTP client.

| Operation | Arguments | Response |
| --- | --- | --- |
| `getIdentity` | `host`, `account` | Actual authenticated `{ host, login }` |
| `getPullRequest` | All selection fields plus `pullRequestNumber` | GitHub REST PR object |
| `getCombinedStatus` | All selection fields plus observed `sha` | Combined status object with `sha`, `state`, `total_count`, `statuses` |
| `getCheckRuns` | All selection fields plus observed `sha` | Check-runs object with `total_count`, `check_runs` |

The prospective REST reads are [get a PR](https://docs.github.com/en/rest/pulls/pulls#get-a-pull-request), [combined commit status](https://docs.github.com/en/rest/commits/statuses#get-the-combined-status-for-a-specific-reference), [check runs](https://docs.github.com/en/rest/checks/runs#list-check-runs-for-a-git-reference), and the authenticated-user endpoint for identity. Transport methods return parsed response objects, not an SDK response envelope. For status/check lists the transport must preserve `total_count` and collect the latest contexts/runs across pages; incomplete lists are explicitly partial.

Identity is checked before every protected read. A mismatched account/host or failed identity read blocks further protected reads for that observation call. A failed PR read does not silently substitute another account, repo, branch, or PR. Status/check requests use the validated PR's head SHA in the selected base repository, including for fork PRs. Unavailable fork-commit evidence remains unavailable.

The trusted transport must ensure that each authenticated request uses the verified bound account and an active repository/operation grant; `getIdentity` checks alone do not enforce that binding. The transport also owns request deadlines and cancellation. This module guarantees neither a request timeout nor OS/process permission isolation.

## Snapshot meaning

Snapshots contain `schemaVersion: 1`, `provider: 'github'`, the nonsecret selection, `observedAt`, overall `coverage`, and `observations`. The timestamp records when observation began. Each observation carries PR number, reconstructed URL, registered engineer ID, PR coverage/state/draft/head SHA, and a status summary. `state` is `open`, `closed`, `merged`, or `unknown`; draft status and CI evidence are independent.

The status summary combines legacy commit statuses and check runs. Each source reports `coverage`, `state`, `observedCount`, and `totalCount`; unavailable sources include only a fixed error code. Both sources must be complete and contain some successful evidence for aggregate `success`. Known failure takes precedence, pending is never success, and neutral/skipped checks do not themselves prove passing. Empty sources produce `unknown` when neither source has evidence. A complete empty source does not prevent the other complete source from supplying evidence. Incomplete or failed reads cannot produce aggregate success, while an observed failure remains visible.

Coverage means evidence availability, not correctness or merge permission. It is `complete`, `partial`, or `unavailable`; an empty mapping list has `not-configured` coverage and performs no reads. There are no retained last-known results. A snapshot describes the inspected SHA, not a guarantee that the PR still has that head at display time. Unknown coverage must not become zero pending PRs, a successful build, a completed task, or an approval.

Output excludes raw titles, bodies, user objects, URLs, status descriptions, check names, headers, transport exception messages, and arbitrary response fields. Failures use `IDENTITY_UNAVAILABLE`, `IDENTITY_MISMATCH`, `READ_UNAVAILABLE`, `INVALID_RESPONSE`, or `NOT_READ` without raw cause/error payloads. Invalid configuration throws static messages before transport use. Selection and engineer IDs are nonsecret inputs; never put credentials in them. These allowlists reduce accidental reflection and are not proof that a malicious transport or an agent running as the same OS user cannot access credentials.

## Next live increment

Integrate through the connection owner's approved transport and grants rather than invoking global `gh` from this module. A transport must:

1. Bind a selected account and approved GitHub destination outside agent-controlled arguments. In the maintainer checkout, any CLI-based candidate must follow [the repository-local account workflow](https://github.com/saleemhamo/myteam-md/blob/main/docs/git-accounts.md), including `git gh`; never fall back to global/work identity, change account state, or read/display auth stores.
2. Enforce authenticated workspace/caller identity and repository/operation grants for every read, including revocation and retries. Freeze or otherwise bind credential selection between identity verification and the protected request. The check in this module alone cannot close that race or establish authorization.
3. Pin the effective host and refuse credential forwarding through redirects or arbitrary destinations. Support only the four named reads and their fixed routes; return parsed allowlisted data without auth headers, credential values, or raw diagnostic dumps. No secrets belong in argv, snapshots, fixtures, or logs.
4. Validate identity, grant denial, revocation, pagination, fork SHA availability, locked-vault behavior, and output handling with synthetic canaries before connecting a live account. Assess the vault and runtime isolation under [credentials and access](https://github.com/saleemhamo/myteam-md/blob/main/docs/credentials-and-access.md); choosing a vault or separate process does not establish isolation.

These requirements are pending integration work. CLI/UI wiring, an actual vault adapter, live GitHub observations, GitLab, review posting, merge blocking, and business-context memory are not implemented by this module.
