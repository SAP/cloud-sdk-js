# Query Parameter Encoding

## Status

accepted

## Context

In this ADR we discuss our decision on query parameter encoding.
Query parameter end up in the URI and need therefore to be `% encoded`.
There are several origins for parameters:

- Custom: Set by user on request level
- Destination: Set by user on the destination
- Internal: Set by SDK related to some input

In the [adr 0029](./0029-custome-header-handling.md) we defined the priority of the different origins but the not encoded.

## Decision

For the `execute()` method of the OData and OpenApi clients the following encoding is done:

- Custom parameters are not encoded. The motivation behind this is to give the user a way to ensure a specific value sent to the server
- Destination parameters are encoded (key and value)
- Internal parameters are encoded by the OData or OpenApi layer.
  Since the keys like $top, $select etc. do not need encoding only the values are encoded.

For the `executeHttpRequest` you can set the parameter with origin `custom` and `request`(i.e. internal lowest priority).
The following encoding is done:

- Custom parameters are not encoded. The motivation behind this is to give the user a way to ensure a specific value sent to the server
- Destination parameters are encoded (key and value)
- Internal parameters are not encoded.

If you want to adjust the encoding behavior, you can provide a `parameterEncoder` function to the `executeHttpRequest()`:

```ts
const parameterEncoder = function(input:Record<string,any>):Record<string,any>{//your implementation}
executeHttpRequest(dest,{parameterEncoder});
```

which will be applied to all parameters key and values.
The `parameterEncoder` option is only introduced for the `executeHttpRequest` because the OData related encoding spans over many places and it would be difficult to propagate a custom encoder to all places.

## Consequences

Encoding of query parameters is done and can be adjusted by user.
