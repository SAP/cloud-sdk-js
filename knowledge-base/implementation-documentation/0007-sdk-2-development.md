# SDK 2.0 Development

This document is an agreement for the SDK 2.0 development including the following topics:

- the test coverage of the `2.0` branch
- the process of committing to both `2.0` and `main` branches
- the traceability notes about breaking changes
- the release of `beta` versions and the `release candidate`s
- the release of every commit on `2.0` branch
- the communication channel for collecting feedback after `beta` release

## Test coverage

### Agreement

The same test coverage as the `main` build of the SDK core.
Create a follow up for the pipelines.

### Background

The complete test coverage of the current SDK contains the following:

- [tests](https://github.com/SAP/cloud-sdk-js/blob/main/.github/workflows/build.yml#L12) in the SDK core repo
- [checks](https://github.com/SAP/cloud-sdk-js/blob/main/.github/workflows/build.yml#L38) in the SDK core repo
- nightly VDM e2e tests
- nightly generator e2e tests

## Process of committing to both `2.0` and `main` branches

### Agreement

In general, during 2.0 development, we should not commit to both branches for avoiding additional maintenance efforts.

The tables below shows a rough guidance based on the priority and complexity.

#### Should we commit to both branches for this `feature`?

|                 | prio:low | prio:mid                  | prio:high          |
| --------------- | -------- | ------------------------- | ------------------ |
| complexity:high | :x:      | :warning::x:              | :speech_balloon:   |
| complexity:mid  | :x:      | :warning::speech_balloon: | :white_check_mark: |
| complexity:low  | :x:      | :white_check_mark:        | :white_check_mark: |

#### Should we commit to both branches for this `bug`?

|                 | prio:low | prio:mid                | prio:high          |
| --------------- | -------- | ----------------------- | ------------------ |
| complexity:high | :x:      | :warning::construction: | :speech_balloon:   |
| complexity:mid  | :x:      | :warning::construction: | :white_check_mark: |
| complexity:low  | :x:      | :white_check_mark:      | :white_check_mark: |

- :white_check_mark: : Yes, merge both
- :x: : No, won't work on this thicket
- :speech_balloon: : Discuss, case by case
- :construction: : No, the changes will only be committed on `2.0` branch
- :warning: : Warning, we treat features and bugs differently

### Process

The steps below describe how to determine, whether we should commit to both branches for a specific ticket.

1. Define the priority and complexity of the ticket and see whether you can find the answer in the table above.
1. If yes, then go ahead.
1. If no, make a case by case discussion.

### Hint

Consider the following steps:

1. when merging to two branches, make sure using `squash merge` for the first PR on the `main` branch.
1. try to apply a `git cherry pick`
1. manual merge based on the **single** commit by `squash merge`.

## Traceability notes about breaking changes

### Agreement

Create a 2.0 breaking change doc (`CHANGELOG-v2.md`) with the following categories:

- `function removed` when deleting a function, meaning users should switch to another function or find their own solution.
- `function moved` when moving a function to a new package, meaning users should change the import statement.
- `signature changed` when changing the parameters/return value, meaning users have to update their function calls.
- `implementation changed` when the signature keeps the same but implementation details changed, meaning users should use these functions with cautions.

## Release `beta` and `release candidate`

### Agreement

Always use `beta` as the tag for `beta` release AND `release candidates`.

- `2.0.0-beta.0` (tag: `beta`), `2.0.0-beta.1` (tag: `beta`)...
- `2.0.0-rc.0` (tag: `beta`), `2.0.0-rc.1` (tag: `beta`)...

For `beta` and `rc`, we'll create a pre-release on the github like the `main` branch.
Use the example above for versioning without timestamps.

## Release a version for every commit on `2.0`

### Agreement

We can use another tag like `next` (e.g., `2.0.0-next.0`), which is similar to the `canary` tag used by the `main` branch.
Automation is needed. (Create follow-ups).

Create a follow up.

### Lerna command example

```
lerna publish --canary major --no-push --no-git-tag-version --dist-tag next --force-publish --preid "next" -y
```

### Which sdk version should I use

| tag name | version example               | description                                                                          |
| -------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `latest` | `1.50.0`, `2.0.0`             | the latest stable version for production                                             |
| `canary` | `1.50.1-20211012062552.0`     | the latest status that reflects the `main` branch for testing before stable versions |
| `beta`   | `2.0.0-beta.0`, `2.0.0-rc.0`  | the latest `beta` or `release candidate` versions                                    |
| `next`   | `2.0.0-20211012091004-next.0` | the latest status that reflects the `2.0` branch for testing 2.0 development         |

## Communication channel for collecting feedback after Beta

### Agreement

Use the [GitHub Discussions](https://github.com/SAP/cloud-sdk-js/discussions/1518) as communication channel, which should be mentioned in the post install.
Create a follow-up for e.g., sending initial emails.

## Reference

[npm tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag#purpose)
