# SDK 2.0 Development
This document is an internal agreement for the SDK 2.0 development including the following topics:
- the test coverage of the 2.0 branch
- the process of committing to both `2.0` and `main` branches
- the traceability notes about breaking changes
- the release of `beta` versions and the `release candidate`s
- the communication channel for collecting feedback after Beta

## Test coverage
### Agreement?
The same test coverage as the `main` build of the SDK core. 

### Background
The complete test coverage of the current SDK contains the following:
- [tests](https://github.com/SAP/cloud-sdk-js/blob/main/.github/workflows/build.yml#L12) in the SDK core repo
- [checks](https://github.com/SAP/cloud-sdk-js/blob/main/.github/workflows/build.yml#L38) in the SDK core repo
- nightly VDM e2e tests
- nightly generator e2e tests

## Process of committing to both `2.0` and `main` branches
### Agreement?
In general, during 2.0 development, we should avoid committing to both branches to avoid additional efforts.
The tables below shows a rough guidance based on the priority and complexity.

#### Should we commit to both branches for this `feature`?

| |prio:low|prio:mid|prio:high|
|---|---|---|---|
|complexity:high| no, won't do | no, won't do | _no, will only release in 2.0_ |
|complexity:mid| no, won't do | _no, will only release in 2.0_ | **yes, merge both** |
|complexity:low| no, won't do | **yes, merge both** | **yes, merge both** |

#### Should we commit to both branches for this `bug`?

| |prio:low|prio:mid|prio:high|
|---|---|---|---|
|complexity:high| no, won't do | no, won't do | _discuss_ |
|complexity:mid| no, won't do | _discuss_ | **yes, merge both** |
|complexity:low| no, won't do | **yes, merge both** | **yes, merge both** |

:white_check_mark: : yes, merge both
:x: : no, won't do
:speech_balloon: : discuss

### Process
The steps below describe how to determine, whether we should commit to both branches for a specific ticket.

1. Define the priority and complexity of the ticket and see whether you can find the answer in the table above.
1. If yes, then go ahead.
1. If no, make a case by case discussion.

### Hint
When merging to two branches, make sure using `squash merge` for the first PR, then either apply a `git cherry pick` or manual merge based on the **single** commit.

## Traceability notes about breaking changes
### Agreement?
Create a 2.0 breaking change doc with the following categories:
- [function does not exist] when deleting a function, meaning users should switch to another function or find their own solution.
- [switch to a different package] when moving a function to a new package, meaning users should change the import statement. 
- [function signature changed] when changing the parameters/return value, meaning users have to update their function calls.
- [implementation changed] when the signature keeps the same but implementation details changed, meaning users should use these functions with cautions.

## Release `Beta` and `Release candidate`
### Agreement?
Always use `beta` as the tag for `beta` release and `release candidate`s.
- `2.0.0-beta.0` (tag: `beta`), `2.0.0-beta.1` (tag: `beta`)...
- `2.0.0-rc.0` (tag: `beta`), `2.0.0-rc.1` (tag: `beta`)...
The release pipeline can be simplified with one input (version id).

## Communication channel for collecting feedback after Beta
### Agreement?
TBD

## Reference
[npm tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag#purpose)

