# Decision on Monorepo Tooling

## Status

Accepted

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

### Nx

Caveats:

- Even stricter cyclic dependecy check (peerDeps considered for cycle) which is a problem for our test setup at the moment.
- No globbing for packages [yet](https://github.com/nrwl/nx/pull/9701) in the CLI (there may be a workaround with nx-tags, which you can maintain in the individual `package.json`).
- More dependencies (33) than turbo (12) and bigger size (2.2MB vs 36KB).
- Implemented in JS which can be slower than Go (according to nx it's only 40ms startup delay, but execution may also be a few percentage points slower).
- Most benefits only possible when adding `project.json` in addition to `nx.json`.

Benefits:

- Nice graph visualization of the packages `nx graph`.
- Allows distributed execution (e.g. run tasks in cloud), but it is questionable if this is allowed for us.

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
- Turborepo will detect and fail if there are cycles in the package dependency graph.
  - This is currently the case and needs to be worked around by using peerDeps in our test packages. It would be better if we fix this in the future.
- Significantly less downloads (164k weekly) than `nx` (1.4M weekly)

Benefits:

- Performance of scripts is increased dramatically through parallelization and caching (PR checks turbo 6min vs lerna 9min, PR tests turbo 2-3min vs lerna ~5min)
- `turbo.json` makes it possible to understand dependencies of scripts.
  - There are still improvements possible to the changes in the PR like generating test services before testing (and using the cache to avoid slowing it down).
- It is easier to run scripts for all packages, simplifying the generate and readme scripts.
- Tests will not fail because some other action (`yarn compile` or `yarn generate`) was not run before executing tests
- Good documentation is available and there is a helpful community.
- There is active development backed by a committed third party (Vercel).
- [Powerful filters](https://turborepo.org/docs/features/filtering) allow us to run commands in all relevant packages.

### Changesets

Caveats:

- Need to maintain changeset files (instead of `CHANGELOG.md`).
- We need special permission to use the bot and need to verify if we can use the action. We could work around this, but this is extra effort.
- Our current versioning strategy means we have fixed versions for all packages.
  Changesets would support linked versions, which would avoid meaningless version increases for our packages.
  We should reconsider our versioning policy given this new opportunity.
- It maintains one `CHANGELOG.md` per package, but allows custom changelog formatting.
- When creating a changeset, affected packages need to be selected.
  This adds some extra effort.
  - There is a "changed packages" selection, that makes it easy to select all packages that were touched since the last changeset.

<img width="560" alt="changeset console output" src="https://user-images.githubusercontent.com/26565533/164425056-581e4cd6-6863-4d8c-b78f-c13ceabf3b23.png">

Benefits:

- Documentation is good but contains many TODOs.
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

Release pipeline SHOULD work, but is not tested as of 21st of April and some adjustments should be expected.

## Decision

Use turborepo and changesets to replace lerna.
Existance of a new changesets for every PR is not checked by a CI check, but rather part of the PR template checklist.

## Consequences

### Changelog

- Changelog needs to be maintained via the `yarn changeset` CLI instead of manually writing in the `CHANGELOG.md`.
- Each package will have its own `CHANGELOG.md` which will be generated by Changesets.
- Review of changelog files may be a bit more cumbersome due to it being split into multiple files. Alternatively it can be done during each PR.

### Adjusting scripts

- Scripts and their dependencies need to be maintained in the `turbo.json` file.
- Errors in this config may lead to unexpected behavior.

### Calling scripts in a workspace

- As dependencies between scripts may only be considered when using `turbo run SCRIPT --filter=my-package`, we should avoid using `yarn workspace mypackage SCRIPT`.

### Finding errors

- As scripts are executed in parallel, it may be slightly harder to find error logs (though it still should be fairly easy).
  - Run with `--concurrency=1` for a serial/in-band execution

### Caching in CI

- Restoring files from cache can change the file mode (to 100755 instead of the "normal" 100644) which can lead to failures in the compare script for the generated services (rerun should solve this).

## Follow Ups

- Be more strict when importing shared code from outside the package (= `test-resources`) => this hides (cyclic) dependencies and limits potential for caching
