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
pnpm supports [similar features](https://pnpm.io/feature-comparison) to npm and yarn.
[Changesets](https://github.com/changesets/changesets), [beachball](https://github.com/microsoft/beachball), and [auto](https://github.com/intuit/auto) are tools to manage versioning in multi-package repositories, which is compatible with the alternatives above.

## Criteria

Following tasks are currently done by lerna and need to be replaced if lerna will be removed:

- ~~Hoist dependencies~~ ➡️ yarn workspaces
- Run tasks in all / some packages ➡️ Turborepo
- Release new version for packages ➡️ Changesets

## Decision

### Turborepo

Turborepo uses a configuration file called `turbo.json` which describes dependencies between scripts ([pipelines](https://turborepo.org/docs/features/pipelines)).
It stores a cache of logs and files with `stdout`, `stderr`, `dist/**`, and `build/**` as the default.
Other cacheable output can be configured as well.

Caveats:

- If util scripts like `replace-common-readme.ts` are changed, there may be a wrong cache hit.
  The cache can be ignored with `--force` or it can likely be fixed with additional configuration.
- By default, Turborepo will run scripts for downstream dependencies (e.g. test packages), but not for upstream dependencies (e.g. odata-common).
  `--no-deps` ignores downstream and `--include-dependencies` adds upstream dependencies.
  - Think of this as "the dependencies didn't change so we don't need to run them, but we need to make sure to not break our downstream dependants"
- Turborepo does not handle releasing in any form (yet). A separate library like **Changesets**, Lerna, or Beachball is needed.
- Remote caching needs some complicated setup unless you use Vercel, which is not an option for our purposes. Without it, the CI pipeline can't benefit from the same speeds as local builds.

Benefits:

- Performance of scripts is increased dramatically through parallelization and caching (uncached: PR checks turbo 6min vs lerna 9min, PR tests turbo <2min vs lerna ~5min; even better with cache)
- `turbo.json` makes it possible to understand dependencies of scripts.
  - There are still improvements possible to the changes in the PR like generating test services before testing (and using the cache to avoid slowing it down).
- It is easier to run scripts for all packages, simplifying the generate and readme scripts.
- Good documentation is available and there is a helpful community.
- There is active development backed by a committed third party (Vercel).
- [Powerful filters](https://turborepo.org/docs/features/filtering) allow us to run commands in all relevant packages.

### Changesets

Caveats:

- Need to maintain changeset files (instead of `CHANGELOG.md`)
- We need special permission to use the bot and need to verify if we can use the action. We could work around this, but this is extra effort.
- It maintains one `CHANGELOG.md` per package, but allows custom changelog formatting.

Benefits:

- Documentation is good but contains many TODOs
- CLI is amazingly simple:
  - Create a changeset with `yarn changeset`.
  - Apply changeset with `yarn changeset version`.
  - Create release with `yarn changeset publish` or `yarn changeset publish --tag beta`.
- Each release needs to have one or more changesets.
- Changesets are merged so you could add a changeset every commit if needed.
- Changesets give space to describe [what, why, and how](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md#i-am-in-a-multi-package-repository-a-mono-repo) for every change.
- Adopted successfully in several prominent monorepo projects.
- There is active development backed by a committed third party (Atlassian).
- Independent versioning is possible.

## Consequences

What becomes easier or more difficult to do because of this change?
