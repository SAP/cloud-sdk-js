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
- [Check for removed deprecated functions and replace them if required](#check-for-removed-deprecated-functions-and-replace-them-if-required)

### Update your project dependencies

Search for occurrences of `@sap-cloud-sdk/[some module]` in your `package.json` files.
Replace the version numbers with `^3`.
Depending on if you're using `npm` or `yarn`, run `npm install` or `yarn` in the directories of your `package.json` files to update the `package-lock.json` or `yarn.lock` file.

Running your tests or deploying your application might fail at this point in time if you need to adapt to any breaking changes.
We recommend updating your applications in one commit or pull request and making sure everything still works using your existing test suite.

### Check for removed deprecated functions and replace them if required

While the SAP Cloud SDK maintains backwards compatibility within a major version where possible, a new major release breaks compatibility where required to simplify the programming interface.
Most of the removed functions had been deprecated before, so ideally they are not used anymore.
The following sub-sections describe affected modules, functions and interfaces with instructions on how to replace them.

#### HTTP Client

The overload, that accepted `HttpRequestConfigWithOrigin` as a parameter, is removed and replaced by the function `executeHttpRequestWithOrigin`.

#### Logger

The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface.

#### Array Utils

The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`.

#### JWT

The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings.

#### OData

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

<!-- TODO: This is only meant as an example for sections in the upgrade guide. Improve this section and add new sections as you see fit.

### Generator CLI

The SAP Cloud SDK includes two "generator" cli applications for OData and for OpenAPI clients.
For historic reasons the command-line arguments of both applications were different in cases where this does not make sense.
In version 3, the arguments are aligned and deprecated arguments have been removed.
Please see (insert link here) for the current documentation on the cli arguments.
-->
