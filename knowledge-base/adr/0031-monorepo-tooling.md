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
[Changesets](https://github.com/changesets/changesets), [beachball](https://github.com/microsoft/beachball) and [auto](https://github.com/intuit/auto) are tools to manage versioning in multi-package repositories, which is compatible with the alternatives above.

## Criteria

Following tasks are currently done by lerna and need to be replaced if lerna will be removed:

- ~~Hoist dependencies~~ yarn workspaces
- Run tasks in all / some packages
- Release new version for packages

## Decision

### Changesets

`yarn changeset init` fails with

```
internal/modules/cjs/loader.js:1102
      throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
      ^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /cloud-sdk/node_modules/trim-newlines/index.js
require() of ES modules is not supported.
require() of /cloud-sdk/node_modules/trim-newlines/index.js from /cloud-sdk/node_modules/@changesets/cli/node_modules/meow/index.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
Instead rename /cloud-sdk/node_modules/trim-newlines/index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from /cloud-sdk/node_modules/trim-newlines/package.json.
```

I was unable to find a simple guide to solve this and there were alternatives.
This meant that I did not consider Changesets any further.

### Nx + ?

### Turborepo + Beachball + ?

Caveats:

- If util scripts like `replace-common-readme.ts` are changed, there may be a wrong cache hit.
  The cache can be ignored with `--force`.
- By default, Turborepo will run scripts for downstream dependencies (e.g. test packages), but not for upstream dependencies (e.g. odata-common).
  `--no-deps` ignores downstream and `--include-dependencies` adds upstream dependencies.
- Turborepo does not handle releasing in any form. A separate library like Changesets, Lerna, or Changesets is needed.

Benefits:

- Performance of scripts is increased dramatically through parallelization and caching.
- `turbo.json` makes it possible to understand dependencies of scripts.
  - There are still improvements possible to the changes in the PR like generating test services before testing (and using the cache to avoid slowing it down).
- It is easier to run scripts for all packages, simplifying the generate and readme scripts.

## Consequences

What becomes easier or more difficult to do because of this change?
