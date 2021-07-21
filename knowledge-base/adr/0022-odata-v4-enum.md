## Title

Handle Enum Type of OData V4

## Status

accepted

## Context

The [Enum type](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752568) of the OData V4 can specify the type of enum values, where the following types are possible:

- `Edm.Byte`
- `Edm.SByte`
- `Edm.Int16`
- `Edm.Int32`
- `Edm.Int64`

### Parsing

When parsing the metadata to our VDM TS model, we have to find proper data types for the 5 underlying types listed above.
For `Edm.Int64`, we use `bignumber.js` in the SDK, as the built-in `number` type does not fit the range of `Edm.Int64`.
For other 4 potential types, we can use `number` without any issues.

### Generating Enum Types

The TS Enum type can only use `number` or `string` as the type of an entry.
Therefore, as a workaround, `string` is the only one possible TS data type in the case of `Edm.Int64`.
The generated Enum types should then look like the examples below:

```ts
// "Edm.Int32"
enum EnumNumber {
  MEMBER_ONE = 1,
  MEMBER_TWO = 2
}
// "Edm.Int64"
enum EnumString {
  MEMBER_ONE = '99999999999999999999',
  MEMBER_TWO = '88888888888888888888'
}
```

### Building Filters

When building filters on the enum field (e.g. for `EnumField eq 'MEMBER_ONE'`), the user interface should look like:

```ts
TestEntity.ENUM_FIELD.equal(EnumNumber.MEMBER_ONE);
```

- For the `EnumNumber`, we can use `EnumNumber[EnumNumber.MEMBER_ONE]` to get the key string `MEMBER`.
- For the `EnumString`, we iterate all the key value pair for finding the key, as `EnumString[EnumString.MEMBER_ONE]` has compilation errors.
  However, none of the above works, if the values are not unique, which is the case in terms of OData specification in general.

## Decision

As the value of the Enum type is not useful, and we even cannot find any use cases, the following information are parsed in the generator, but are only generated as part of the js doc:

- underlying type
- value of enum entries

The potential use cases about Enum type are:

- Filter: `/People?$filter=Gender eq 'Female'`
- Response entity: `{"Gender": "Female"}`

## Consequences

- When there are real use cases about underlying types and values, it becomes easier to implement them as we parse these information to our VDM models.
