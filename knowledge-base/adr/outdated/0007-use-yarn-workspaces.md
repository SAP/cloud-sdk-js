# Use Yarn Workspaces rather than lerna with npm

## Status

**superseded**

We introduced turbo repo to handle the packages [ADR#0032](../0032-monorepo-tooling.md)

## Context

Lerna guidance on how to use the `bootstrap` command with or without hoisting and the resulting `package-lock.json`s is sparse.
Calling `lerna bootstrap --hoist` changes the root `package-lock.json`, calling `lerna bootstrap` created `package-lock.json`s in the packages, that do not contain references to other local packages and are therefore incorrect in terms of standard npm.
Therefore tools like dependabot cannot handle these files.
Generally, there is quite some confusion about how lerna handles the package-locks, when they are updated and how to make them work with other tools.
Further, because `lerna bootstrap --hoist` changes the root `package-lock.json` we are not using hoisting to ensure we respect the `build once` principle.
Therefore, we currently don't benefit from hoisting.

## Decision

Use yarn workspaces with hoisting.

## Consequences

Yarn supposedly has better performance than npm.
Yarn's concept of workspaces and lerna packages are designed to work together.
`yarn install` "bootstraps" the packages.
Combined with the `--frozen-lockfile` flag, the `yarn.lock` will not be overwritten.
These concepts are quite straight forward and should reduce confusion.
As there is only one lock file created by yarn directly, the expectation is, that external tools (e. g. dependabot) will be able to parse it.
The team has to adjust to the new commands and different behavior of yarn in some places.
Some commands are more verbose (e. g. `npm ci` vs `yarn --frozen-lockfile`), others are more strict (e. g. `npm install` by default does not fail for wrong engines, i. e. node versions, yarn needs a flag to ignore wrong engines, `yarn --ignore-engines`).
