# Supporting _bound_ *operations* (*actions* and *functions*) in OData client generator

## Status

accepted

## Context

In OData v4, *operations* (*actions* and *functions*) can be _bound_.
This means the operation is associated to an entity, similar to a method in object orient programming is associated with an object.

In EDMX, binding is expressed via the [`isBound` property](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/os/odata-csdl-xml-v4.01-os.html#_Toc37318905).
The property is optional, and if it is **absent** the operation is **not bound**.

A bound operation [has at least one parameter, the first parameter is always the associated entity](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/os/odata-csdl-xml-v4.01-os.html#sec_Parametereter).
The name of the parameter is not relevant.

## Decision

We will implement bound actions and functions using for OData v4 object oriented style API (Option A).

## Consequences

- Using the generated client requires different imports for bound and unbound operations
- For implementing [batch references](./0036-batch-references.md), wrapper objects need to be available for not-yet created entities

# Appendix - API Options

The following API options had been considered for calling bound actions and functions.

## Option A - Object Oriented Style

The generated entity classes get additional methods for bound actions and functions.

```typescript
const myObject = await myApi.requestBuilder().getByKey(42).execute(destination)

await myObject.boundActionWithoutParameter().execute(destination)
await myObject.boundActionWithParameter({param1: "foo", param2: "bar"}).execute(destination)

await myObject.boundFunctionWithoutParameter().execute(destination)
await myObject.boundFunctionWithParameter({param1: "foo", param2: "bar"}).execute(destination)
```

Pro:
- Familiar to developers who are used to object oriented programming
- Unambiguous which instance of `MyEntity` the call refers to

Con:
- Introduces a new "entry point" for the API, might be hard to discover for users

## Option B - Static Function Style

```typescript
await MyEntity.boundActionWithoutParameter().execute(destination)
await MyEntity.boundActionWithParameter({param1: "foo", param2: "bar"}).execute(destination)

await MyEntity.boundFunctionWithoutParameter().execute(destination)
await MyEntity.boundFunctionWithParameter({param1: "foo", param2: "bar"}).execute(destination)
```

Con:
- Unclear which instance of `MyEntity` the call refers to

## Option C - Unbound Style

This option is most similar to the existing API for using unbound actions and functions.
The only difference is that the binding parameter needs to be passed as an argument.

```typescript
const myObject = await myApi.requestBuilder().getByKey(42).execute(destination)

await actionImports.boundActionWithoutParameter({myObject}).execute(destination)
await actionImports.boundActionWithParameter({myObject, param1: "foo", param2: "bar"}).execute(destination)

await functionImports.boundFunctionWithoutParameter({myObject}).execute(destination)
await functionImports.boundFunctionWithParameter({myObject, param1: "foo", param2: "bar"}).execute(destination)
```

This syntax is closes to the EDMX-XML representation by ODdata which would read like this:

```xml
<Action Name="boundActionWithParameter" IsBound="true">
    <Parameter Name="in" Type="XYService.MyEntity"/>
    <Parameter Name="param1" Type="Edm.String"/>
    <Parameter Name="param2" Type="Edm.String"/>
    <ReturnType Type="XYService.Result"/>
</Action>
```

Pro:
- Most symmetric compared to the existing API for calling unbound actions and functions
- Closest to EDMX representation

Con:
- Might be less intuitive and less discoverable compared to option A
- Less elegant compared to option A

## References

[How to build an OData Service with Olingo V4: Part 10: Bound Actions and Functions](https://olingo.apache.org/doc/odata4/tutorials/action/tutorial_bound_action.html)

[SAP Blogs: Cheat sheet for URI patterns for calling OData actions and functions](https://blogs.sap.com/2021/08/21/cheat-sheet-for-uri-patterns-for-calling-odata-actions-and-functions/)

[OData Common Schema Definition Language (CSDL) XML Representation Version 4.01](https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/os/odata-csdl-xml-v4.01-os.html)
