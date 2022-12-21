# Actions

This directory contains code for GitHub Actions that are used in this repo's workflow.

The actions are built with yarn like the rest of this repo.

To build / update the actions, run this inside the action's directory:

```
yarn
yarn run all
```

This will compile, lint and package the actions.

Changes in the `dist` folder need to be committed to the git repository as this is the code which is being run by GitHub.

The configuration of the actions is loosely based on [GitHub's template repo for TypeScript actions](https://github.com/actions/typescript-action).
