# SAP Cloud SDK for JavaScript Version 3 Upgrade Guide

The purpose of this document is to collect information on Cloud SDK version 2 to version 3 migration information.
It should include information on all steps a user needs to take when updating the SDK version from 2 to 3.

This document should be written in a style which addresses the consumer of the SDK.
It will eventually end up in the SDK docs portal and release notes for version 3.

Please add you items below when creating a change which will involve manual tasks for the user when performing the upgrade.
Add sections to the document as you see fit.

<!-- Everything below this line should be written in the style of enduser documentation. If you need to add hints for SDK developers, to that above. -->

# How to upgrade to version 3 of the SAP Cloud SDK for JavaScript

## Overview

This document will guide you through the steps necessary to upgrade to version 3 of the SAP Cloud SDK. Depending on your project, some steps might not be applicable. The To-Do list is:

- [Update your project dependencies](#update-your-project-dependencies)
- [Important Dependency Updates](#important-dependency-updates)
- [Support Node 18](#support-node-18)
- [Update EcmaScript Runtime](#update-ecmascript-runtime)
- [Adjust operation names in generated clients](#adjust-operation-names-in-odata-generated-clients)
- [Check for removed deprecated functions and replace them if required](#check-for-removed-deprecated-functions-and-replace-them-if-required)
- [Replace Timeout](#timeout)

### Update your project dependencies

Search for occurrences of `@sap-cloud-sdk/[some module]` in your `package.json` files.
Replace the version numbers with `^3`.
Depending on if you're using `npm` or `yarn`, run `npm install` or `yarn` in the directories of your `package.json` files to update the `package-lock.json` or `yarn.lock` file.

Running your tests or deploying your application might fail at this point in time if you need to adapt to any breaking changes.
We recommend updating your applications in one commit or pull request and making sure everything still works using your existing test suite.

### Important Dependency Updates

The [axios HTTP client](https://github.com/axios/axios) has been updated from version 0.27 to 1.2.

### Support Node 18
Node 18 is the current long term support (LTS) version. 
Previous node versions will reach their end of life within the next year (see [node.js release schedule](https://github.com/nodejs/Release#release-schedule)). 
Therefore, all SAP Cloud SDK for JavaScript libraries will switch to node 18 as the **minimum** supported node version.
If you run an older (<18) node version, please update to a newer version.
You can find a list of breaking changes in the news section of the node.js [website](https://nodejs.org/en/blog/).

### Update EcmaScript Runtime

We changed the compilation target of our source code from `es2019` to `es2021`.
Depending on your configuration this may lead to compilation errors (TypeScript) or runtime errors in (JavaScript).

### Adjust Operation Names in OData Generated Clients

Rules for naming of OData operations (actions or functions) in the generated client have been changed.
This applies to bound and unbound operations.
If an operation begins with an `underscore` symbol, the `_` will be removed from the resulting generated client code.
To adjust the names, search in `function-import.ts` and `action-import.ts` files in your generated client code for any operation starting with `_`.
Similarly, to adjust the names of bound operations of an entity, search in the respective entity's `.ts` file, e.g., `TestEntity.ts`.

### Check for removed deprecated functions and replace them if required

While the SAP Cloud SDK maintains backwards compatibility within a major version where possible, a new major release breaks compatibility where required to simplify the programming interface.
Most of the removed functions had been deprecated before, so ideally they are not used anymore.
The following sub-sections describe affected modules, functions and interfaces with instructions on how to replace them.

#### Package `@sap-cloud-sdk/http-client`

The overload, that accepted `HttpRequestConfigWithOrigin` as a parameter, is removed and replaced by the function `executeHttpRequestWithOrigin`.

#### Package `@sap-cloud-sdk/util`

The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface.

The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`.

#### Package `@sap-cloud-sdk/connectivity`

The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings.

#### Package `@sap-cloud-sdk/odata-common`

##### `fromJson` function

Setting custom fields in `fromJson` through the `_customFields` property has been removed.
Add custom properties to your JSON object instead.

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

##### `ODataRequestConfig` class

The constructor of `ODataRequestConfig` was changed so that the third parameter cannot be a `string` anymore.
Passing in a string which was then interpreted as the value for the `Content-Type` HTTP header was deprecated.
The type of the parameter is now `Record<string, any>`, and if only want to set the `Content-Type` HTTP header you can do so by passing `{'content-type': 'some-value'}` to the constructor.

<!-- TODO: This is only meant as an example for sections in the upgrade guide. Improve this section and add new sections as you see fit.

### Generator CLI

The SAP Cloud SDK includes two "generator" cli applications for OData and for OpenAPI clients.
For historic reasons the command-line arguments of both applications were different in cases where this does not make sense.
In version 3, the arguments are aligned and deprecated arguments have been removed.
Please see (insert link here) for the current documentation on the cli arguments.
-->

### Timeout 

The `timeout()` method was removed from the request builder and the `timeout` option was removed from the `executeHttpRequest()` function. 
If you want to set a timeout for a request use the new timeout middleware:

```ts
import { timeout} from '@sap-cloud-sdk/resilience'

 executeHttpRequest(myDestination, {
          method: 'get',          
          middleware: [timeout()]
        })

myRequestBuilder
    .getAll()
    .middleware([timeout()])
    .execute(myDestination);
```
<!-- TODO v3 put better link when documentation is done -->
A detailed guide on the middleware concept is presented on the [documentation portal](https://sap.github.io/cloud-sdk/docs/js/overview).

