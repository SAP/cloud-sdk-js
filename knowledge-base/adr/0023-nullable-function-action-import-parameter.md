## Title

Consider `Nullable` property on function import parameters and return types

## Status

accepted

## Background

For oData v2 and v4 the function import parameter may contain the nullable property e.g.

```XML
<Function Name="TestFunctionImportNullableTest">
<Parameter Name="NullableExplicit" Type="Edm.String" Nullable="true" />
</Function>
```

In addition for oData v4 the return type is a also not just a string on the `<Function>` tag but a proper lines beeing nullable:

```XML
<Function Name="TestFunctionImportNullableTest">
  <ReturnType Type="Collection(Edm.String)" Nullable="false"/>
</Function>
```

## Context

The generator should generate nullable properties for "Nullable" parameters:

```ts
{
nullableParameter?: string | null
}
```

For return types in v4 the type should be `T | null` where `T` is return type.

## Alternatives

### Option A

Since the [default value](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752529) for `Nullable` is true this is a potential breaking change.
However, it is also fixing a bug.

We implemented the following for v2 and v4:

- In the edmx-parser.ts the default value of `Nullable="true"` is set for all parameters of function and action imports.
- This is passed to the `edmx-to-vdm.ts` and cast to boolean.

The default value is also set for the return type for oData v4.

## Decision

Accepted, because `string` typed parameter is better than `number` typed, when building filters.

## Consequences

- When there are real use cases about underlying types and values, it becomes easier to implement them as we parse these information to our VDM models.
