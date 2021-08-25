# Naming of generated APIs, operations, properties and query parameters (OpenAPI generator)

## Status

decided

## Context

The OpenAPI generator has to generate names for APIs, their operations and schemas.
We initially used the file name to generate an API name, but found that for bigger APIs this is would result in very complex APIs, therefore we need a more sensible default.
In addition API owners whish to be able to customize names of APIs and operations.
To follow naming conventions in JavaScript/TypeScript we planned on formatting API names as pascal case, operation names as camel case and property and parameter names as camel case.
For properties and parameters we would have to resolve the original names to use them in the requests.
We found that for most cases this is straight forward, but there are corner cases that require a different/more complex architecture.

### Issues with properties and parameters

Given the following two types and their original properties, if those were used in combination, e. g. `allOf`, there is no possibility to set both values.

```ts
type A {
  someProperty: string; // original name: 'some_property`
}

type A {
  someProperty: string; // original name: 'some-property`
}
```

This could be solved by making names unique throughout the whole service.
However this again would lead to less convenient names, e.g. `name`, `name1`, `name2`.

## Decisions

### API naming

APIs are named based on the first tag, if there are any.
If there is no tag, a "default" tag is used.
To allow customizing of APIs, we introduced the `x-sap-cloud-sdk-api-name` extension, which takes precedence over the default name generation.
This extension can be set on on multiple levels:

- operation, causing this operation to be treated as part of the given API.
- path, causing all operations under this path to be treated as part of the given API.
- document root, causing all operations in the document to be treated as part of the given API.

All names are transformed to pascal case (`SomeApi`).
API names are formed by appending an "Api" suffix.
If the original name ends with an "api" suffix (case independent), the original suffix is removed prior to appending "Api".
Examples:

- `my-api` => `MyApi`
- `my` => `MyApi`
- `my-api-api` => `MyApiApi`

### Operation naming

Operations are named based on their given `operationId`.
If no `operationId` is given the name is parsed from the method and the path under which the operation occurred.
Example:

- path: `entity/{id}`
- method: `get`
- resulting name: `getEntityById`
  Users can set specific operation names using the `x-sap-cloud-sdk-operation-name` extension.
  This extension can be set on the operation only.
  Names will be transformed to camel case, duplicate names will cause generation to fail.

### Property and query parameter naming

Keep the names as provided per the specification.
No camel case renaming is done to avoid the original name corner cases discussed above.

## Consequences

As the OpenAPI generator has not been released yet, we can safely change the naming strategies.

### API naming

Every service can now generate more than one API.
APIs have a sensible default, while only the first tag is considered.
This is the same behavior users might know from the Java-based OpenAPI generator (OpenAPI Tools).
Users can also define custom APIs, but have to keep in mind that those names are formatted.

### Operation naming

Operation names have a sensible default and can be customized.
Users have to keep in mind that names will be formatted.

### Property and query parameter naming

Names are as found in the original specification, so no confusion can be caused.
There is no additional complexity in the code.
Generated interface-like types can have non-camel case keys, which might seem unconventional in JavaScript/TypeScript.
However, this data represents request and response bodies as well as query parameters, where the original casing is appropriate.
