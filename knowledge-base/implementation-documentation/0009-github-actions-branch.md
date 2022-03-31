# GitHub Actions Branch Management

This document shows how we manage workflow files for version 1 and version 2 SDK.
The idea is to maintain everything on the default branch, but there are some exceptions.

## Trigger

Depending on the type of trigger, we handle workflow files differently.

### PR Commits and Push

When the pipeline is triggered by a new commit to a PR or by pushing to branches, the workflow file should be located on the target branch instead of the default branch.
Check a partial example below:

```
on:
  pull_request: ~
  push:
    branches: ['1.0-main']
```

The whole pipeline can be found [here](https://github.com/SAP/cloud-sdk-js/blob/1.0-main/.github/workflows/1.0-build.yml#L4).

### Workflow Dispatch

When using the `workflow dispatch`, we can choose a target branch, so we maintain the workflow file on different branches.
Check a partial example below:

```
on:
  workflow_dispatch:
    inputs:
      bump:
        description: Version bump to be used. Can either be 'patch' or 'minor'.
        required: false
        default: 'minor'
```

The whole pipeline can be found [here](https://github.com/SAP/cloud-sdk-js/blob/1.0-main/.github/workflows/bump.yml)

### Publish a new release

When clicking "publish" for a new github release (see release [doc](https://github.com/SAP/cloud-sdk-js/blob/main/knowledge-base/how-tos/0001-release.md#how-to-trigger-a-release)), branch information is completely independent, so we maintain on the default branch.
Check a partial example below:

```
on:
  release:
    types: [published]
```

The whole pipeline can be found [here](https://github.com/SAP/cloud-sdk-js/blob/main/.github/workflows/release.yml)
