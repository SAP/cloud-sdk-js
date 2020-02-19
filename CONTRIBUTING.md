# Contributing
Thank you for taking your time to contribute to the SAP Cloud SDK!

## Project Structure
This project containes multiple packages, that are managed using `lerna`.  Productive packages are located in the `packages` directory, test packages are located in the `test-packages` directory.
All dependencies of the packages are hoisted into the root project. Some of the packages are interdependent, therefore `npm install` won't work from within those packages. Run `npm install` in the root directory instead.

## Testing
In order to run all tests, execute:
```sh-session
$ npm t
```

This will run unit tests for all our packages as well as integration tests and type tests. You can run those individually as described in the following.

### Unit Tests
Unit tests shall test specific modules of a package, units that are tested for behavior.
You can run all unit tests by executing:
```sh-session
$ npm run test:unit
```

To run unit tests for a specific package enter the package directory and execute the tests there:
```sh-session
$ cd packages/core
$ npm run test:unit
```

### Integration Tests
Integration tests shall test how modules behave in combination. The integration tests are located in `test-packages-integration-tests`.

To run the integration tests, execute:
```sh-session
$ npm run test:integration
```

### Type Tests
As this project is written in TypeScript, it shall be consumable by other TypeScript projects. We use `dtslint` to test that our resulting API meets our expectations.
The type tests are located at `test-packages/type-tests`.

To run the integration tests, execute:
```sh-session
$ npm run test:type
```

### Test Services
To simplify testing we are using tests services. The specifications for those can be found in `test-resources`.
They are used from different tests on different levels.
The service specifications are directly used by the unit tests of the `generator`.
From the specifications, we generate two OData clients.
First, we generate type script sources, that are generated into the test-utils of the `core`, where we replace all references to the `@sap-cloud-sdk/core` with a reference to the local sources. The resulting test service is used in the unit tests of the `core` package.
Second, we generate a transpiled version of a non-modified OData client based on the specifications, that is located at `test-packages/test-services`. This is used in the  integration tests and type tests.

If you need to extend the existing services, run the following to regenerate the OData clients.
```sh-session
$ npm run generate:test-services
```

### Debugging tests
You can run the tests in debug mode by running:
```sh-session
$ npm run test:watch-debug
```
The tests will then be executed on every change you make subsequently.

## Linting
To fix all linting issues, run:
```sh-session
$ npm run lint:fix
```

## How to contribute
When contributing to this repository, please first discuss the changes you wish to make through an issue, email, or any other method with the owners of this repository.

Please note, that we have a [code of conduct](./CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

Once you are ready to make a change, please test it appropriately, create a pull request and describe your change in the pull request. The owners of the repository will review your changes as soon as possible.
