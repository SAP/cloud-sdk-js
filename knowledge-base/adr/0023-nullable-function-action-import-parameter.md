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

The generator should consider this properties and make the types accordingly and make nullable parameters as:

```ts
{
nullableParameter?: string | null
}
```

For return types in v4 the type should be `T | null` where `T` is return type.
The generator did not consider the property corretly which was reported in [this issue](https://github.com/SAP/cloud-sdk-js/issues/1439)

## Alternatives

### Option A

Since the [default value](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752529) for `Nullable` is true this is a potential breaking change.
However, it is also fixing a bug.

## Decision

Accepted, because `string` typed parameter is better than `number` typed, when building filters.

## Consequences

- When there are real use cases about underlying types and values, it becomes easier to implement them as we parse these information to our VDM models.
