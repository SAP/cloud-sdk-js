# SAP Cloud SDK for JavaScript Version 3 Upgrade Guide <!-- omit from toc -->

The purpose of this document is to collect information on Cloud SDK version 2 to version 3 migration information.
It should include information on all steps a user needs to take when updating the SDK version from 2 to 3.

This document should be written in a style which addresses the consumer of the SDK.
It will eventually end up in the SDK docs portal and release notes for version 3.

Please add you items below when creating a change which will involve manual tasks for the user when performing the upgrade.
Add sections to the document as you see fit.

<!-- Everything below this line should be written in the style of end user documentation. If you need to add hints for SDK developers, to that above. -->

# How to Upgrade to Version 3 of the SAP Cloud SDK for JavaScript <!-- omit from toc -->

This document will guide you through the steps necessary to upgrade to version 3 of the SAP Cloud SDK. Depending on your project, some steps might not be applicable. The To-Do list is:

- [Update Your Project Dependencies](#update-your-project-dependencies)
- [Update to Node 18 or Newer](#update-to-node-18-or-newer)
- [Replace Removed Functionality](#replace-removed-functionality)
- [Switch to Middlewares for Timeouts](#switch-to-middlewares-for-timeouts)
- [Update Transpilation Options in OData Client Generator](#update-transpilation-options-in-odata-client-generator)
- [Use Service Function instead of API Constructor](#use-service-function-instead-of-api-constructor)
- [Adjust Operation Names Starting With `_` in Generated OData Clients](#adjust-operation-names-starting-with-_-in-generated-odata-clients)

## Update Your Project Dependencies

Search for occurrences of `@sap-cloud-sdk/[some module]` in your `package.json` files.
Replace the version numbers with `^3`.
Depending on if you're using `npm` or `yarn`, run `npm install` or `yarn` in the directories of your `package.json` files to update the `package-lock.json` or `yarn.lock` file.

Running your tests or deploying your application might fail at this point in time if you need to adapt to any breaking changes.
We recommend updating your applications in one commit or pull request and making sure everything still works using your existing test suite.

### Important Dependency Updates <!-- omit from toc -->

The [axios HTTP client](https://github.com/axios/axios) has been updated from version 0.27 to 1.2.

## Update to Node 18 or Newer

All SAP Cloud SDK for JavaScript libraries now support node 18 (LTS) as the **minimum** node version.
If you are using a node version older than 18, update your runtime environment to a newer version.
Note, that the transpilation target of the SDK changed from `es2019` to `es2021`.

## Replace Removed Functionality

Most of the removed functionality had been deprecated in version 2, so ideally they are not used anymore.
The following sub-sections describe affected modules, functions and interfaces with instructions on how to replace them.

### Package `@sap-cloud-sdk/http-client` <!-- omit from toc -->

- The `executeHttpRequest()` function overload, that accepted `HttpRequestConfigWithOrigin` as a parameter, is removed. Use `executeHttpRequestWithOrigin()` instead.

### Package `@sap-cloud-sdk/util` <!-- omit from toc -->

- The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface. There is no replacement.
- The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`.

### Package `@sap-cloud-sdk/connectivity` <!-- omit from toc -->

- The generic type parameter `JwtKeysT` in `JwtKeyMapping` is now narrowed to extend `string`.

### Package `@sap-cloud-sdk/odata-common` <!-- omit from toc -->

- When creating entities with the `fromJson()` method, the `_customFields` property is no longer considered. Add custom properties as root level properties in your object instead.

Old example, not working anymore:

```json
{
  "_customFields": {
    "myCustomField": "myCustomValue"
  }
}
```

New example:

```json
{
  "myCustomField": "myCustomValue"
}
```

- "Content-type" HTTP headers cannot be passed as a string in the constructor of `ODataRequestConfig` anymore. Instead pass an object with "content-type" as a key and the header value as a value, e.g. `{ 'content-type': 'some-value' }` to the constructor.

## Switch to Middlewares for Timeouts

The `timeout()` method was removed from the request builder and the `timeout` option was removed from the `executeHttpRequest()` function.
If you want to set a timeout for a request use the new timeout middleware:

```ts
import { timeout } from '@sap-cloud-sdk/resilience';

executeHttpRequest(myDestination, {
  method: 'get',
  middleware: [timeout()]
});

myRequestBuilder.getAll().middleware([timeout()]).execute(myDestination);
```

You find a detailed guide on the general [middleware concept](https://sap.github.io/cloud-sdk/docs/js/v3/features/middleware) and the [resilience middlewares](https://sap.github.io/cloud-sdk/docs/js/v3/guides/resilience) in particular on the documentation portal.

## Update Transpilation Options in OData Client Generator

By default, the OData generator will only generate TypeScript code.
The `generateJs` option has been replaced with the `transpile` option.
To generate JavaScript code, enable transpilation using the `transpile` option.

A new option, `tsconfig`, can be used to either pass a custom `tsconfig.json` configuration file or use a default config from the SDK.
This flag should be used together with `transpile`.

## Use Service Function instead of API Constructor

You should use the [service function](https://sap.github.io/cloud-sdk/docs/js/features/odata/execute-request#general-request-structure) to get an instance of your API object:

```ts
import { myEntityService } from './outputDir/my-service';

const { myEntityApi } = myEntityService();
return myEntityApi.requestBuilder().getAll().execute(destination);
```

This way a getter initializes references to navigation properties of the API.
If you call the API constructor directly like:

```ts
const myEntityApi = new MyEntityApi();
```

the navigation properties are not correctly initialized leading to potential errors.
To avoid this unintended usage of the constructor the visibility was changed to `private`.
If you used the constructor directly change your code to use the service function e.g. `myEntityService()` in the example above.

## Adjust Operation Names Starting With `_` in Generated OData Clients

Rules for naming OData operations (actions or functions) when generating clients have changed slightly.
If an operation begins with an underscore symbol(`_`), it is removed in the generated client code.

To adjust the names for unbound operations, search in `function-import.ts` and `action-import.ts` files in your generated client code for operations starting with `_`.
Similarly, to adjust the names of bound operations of an entity, search in the respective entity's `.ts` file, e.g., `BusinessPartner.ts`.
