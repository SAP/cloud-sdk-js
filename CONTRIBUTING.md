# Contributing

Thank you for taking your time to contribute to the SAP Cloud SDK!

Please make sure, that you are familiar with our [style guide](./STYLEGUIDE.md).

## Project Structure

This project containes multiple packages, that are managed using [lerna](https://github.com/lerna/lerna) and [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Productive packages are located in the [`packages`](./packages) directory, test packages are located in the [`test-packages`](./test-packages) directory.
All dependencies that are used in more than one of the packages are hoisted into the root project. Dependencies, that occur only once and binaries will be placed in the node_modules of that specific package. Some of the packages are interdependent, therefore `yarn install` won't work from within those packages. Run `yarn install` in the root directory instead.

## Testing

All (new) functionality shall be covered by tests.

In order to run all tests, execute:

```bash
$ yarn test
```

This will run unit tests for all our packages as well as integration tests and type tests. You can run those individually as described in the following.

### Unit Tests

Unit tests shall test specific modules of a package, units that are tested for behavior.
You can run all unit tests by executing:

```bash
$ yarn test:unit
```

To run unit tests for a specific package add the workspace name to the command. For the core package this would be:

```bash
$ yarn @sap-cloud-sdk/core run test
```

### Integration Tests

Integration tests shall test how modules behave in combination. The integration tests are located in [`test-packages/integration-tests`](./test-packages/integration-tests).

To run the integration tests, execute:

```bash
$ yarn test:integration
```

### Type Tests

As this project is written in TypeScript, it shall be consumable by other TypeScript projects. We use `dtslint` to test that our resulting API meets our expectations.
The type tests are located at [`test-packages/type-tests`](./test-packages/type-tests).

To run the integration tests, execute:

```bash
$ yarn test:type
```

### Test Services

To simplify testing we are using tests services. The specifications for those can be found in [`test-resources`](./test-resources).
They are used from different tests on different levels.
The service specifications are directly used by the unit tests of the `generator`.
From the specifications, we generate two OData clients.
First, we generate type script sources, that are generated into the test-utils of the `core`, where we replace all references to the `@sap-cloud-sdk/core` with a reference to the local sources. The resulting test service is used in the unit tests of the `core` package.
Second, we generate a transpiled version of a non-modified OData client based on the specifications, that is located at [`test-packages/test-services`](./test-packages/test-services). This is used in the integration tests and type tests.

If you need to extend the existing services, run the following to regenerate the OData clients.

```bash
$ yarn generate:test-services
```

### End to End (E2E) tests

The E2E are the most realistic tests included in this repo and run on each pull request.
There are also nightly tests executed on the internal jenkins - see the internal repo for more details on these.
These are also called E2E tests but are not meant here.

The E2E tests are based on a locally running server providing an OData interface using [CAP](https://cap.cloud.sap/docs/) and a REST interface using OpenAPI.
This server is used by the E2E tests located at [test-packages/e2e-tests](./test-packages/e2e-tests).
**Attention** The imports in the E2E tests use the root packages e.g. `@sap-cloud-sdk/core` to mimic the way a customer would use it.
So if you made code changes in one of the packages you need to run `yarn compile` to make the changes take effect.

For manual E2E to a real remote system we have also some tests agains the [TripPin service](https://www.odata.org/blog/trippin-new-odata-v4-sample-service/) which is the standard OData V4 sample service.
Since the remote service is not really stable we commented out the tests under [test-packages/e2e-tests/test/TripPin](./test-packages/e2e-tests/test/TripPin) but for manual testing they can be useful.

## Linting

To fix all linting issues, run:

```bash
$ yarn lint:fix
```

## How to contribute

When contributing to this repository, please first discuss the changes you wish to make through an issue, email, or any other method with the owners of this repository.

Please note, that we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

Once you are ready to make a change, please test it appropriately, create a pull request and describe your change in the pull request. The owners of the repository will review your changes as soon as possible.

## Developer Certificate of Origin (DCO)

Due to legal reasons, contributors will be asked to accept a DCO before they submit the first pull request to this project. This happens in an automated fashion during the submission process. SAP uses [the standard DCO text of the Linux Foundation](https://developercertificate.org/).

## Release Process

Information on the release process can be found in the [release documentation](./knowledge-base/how-tos/release.md).
