## Title

Consider `Nullable` property on function import parameters and return types

## Status

accepted

## Context

This document is about nullable parameters and return types of function imports and actions.
The discussed properties apply to function and action imports for OData v4.
In OData v2 there are no action imports.
To be more compact we give the code example for the functions.

For OData v2 and v4 the function import parameter may contain the nullable property e.g.

```XML
<Function Name="TestFunctionImportNullableTest">
<Parameter Name="NullableExplicit" Type="Edm.String" Nullable="true" />
</Function>
```

The generator should generate nullable properties for "Nullable" parameters:

```ts
{
nullableParameter?: string | null
}
```

For the return type OData v2 and v4 are different:

```XML
<Function Name="FunctionImportV4">
  <ReturnType Type="Collection(Edm.String)" Nullable="false"/>
</Function>

<FunctionImport Name="FunctionImportV2" ReturnType="Edm.Boolean" m:HttpMethod="GET">
</FunctionImport>
```

Since the return type in OData v2 is just a property on the `FunctionImport` it is assumed to be not nullable.
For "Nullable" return types in v4 the type should be `T | null`.

## Consequences

Since the [default value](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752529) for `Nullable` is true this is a potential breaking change.
However, it is also fixing a bug.

We implemented the following for v2 and v4:

- In the edmx-parser.ts the default value of `Nullable="true"` is set for all parameters of function and action imports.
- This is passed to the `edmx-to-vdm.ts` and cast to boolean.

The default value is also set for the return type for OData v4.
The return type for OData v2 remains not nullable.
