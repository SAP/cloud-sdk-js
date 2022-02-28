# Decision on Monorepo Tooling

## Status

Proposed

## Context

We currently use npm + lerna in the internal repository and yarn + lerna in the external repository.
To allow a better release workflow (e.g. [enable independent versioning](./0027-versioning-strategy.md)), we need to make adjustments and use this opportunity to reevaluate our current setup.
Sadly, lerna seems to be recently abandoned as [there were no commits in >6 months](https://github.com/lerna/lerna/commits/main) and [the author seems to distance himself from the project](https://twitter.com/evocateur/status/1483311321860886530).

There are a number of alternatives with somewhat different functionality as compared [here](https://monorepo.tools/).
[Nx](https://nx.dev/getting-started/intro) and [TurboRepo](https://turborepo.org/docs) seem to be the [popular choice](https://2021.stateofjs.com/en-US/libraries/monorepo-tools) at the moment.
npm 7 (as well as yarn) support [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) that cover [dependency hoisting](https://github.com/npm/rfcs/discussions/284#discussioncomment-126991).
pnpm supports [similar features](https://pnpm.io/feature-comparison) as npm and yarn.
[Changesets](https://github.com/changesets/changesets) is a tool to manage versioning in multi-package repositories, which is compatible with the alternatives above.

## Decision

### Nx + ?

### Turborepo + Changesets + ?

## Consequences

What becomes easier or more difficult to do because of this change?
