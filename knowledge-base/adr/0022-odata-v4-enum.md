## Title

Handle Enum Type of OData V4

## Status

accepted

## Background
Here are some examples when Enum type is used:

- Filter: `/People?$filter=Gender eq 'Female'`
- Response entity: `{"Gender": "Female"}`

## Context

The [Enum type](http://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part3-csdl/odata-v4.0-errata03-os-part3-csdl-complete.html#_Toc453752568) of OData V4 can specify the type of enum values, where the following types are possible:

- `Edm.Byte`
- `Edm.SByte`
- `Edm.Int16`
- `Edm.Int32`
- `Edm.Int64`

We need to save all the enum related information specified in the metadata in the client including:
- enum name
- enum underlying type (by default `Edm.Int32`)
- enum keys
- enum values (optional) 

## Alternatives

### Option A (not chosen due to the TS Enum type limit)
The generated Enum type contains information below:
- enum name
- enum underlying type
- enum keys
- enum values

#### Parsing

When parsing the metadata to our VDM TS model, we have to find proper data types for the 5 underlying types listed above.
For `Edm.Int64`, we use `bignumber.js` or `string` in the SDK, as the built-in `number` type does not fit the range of `Edm.Int64`.
For other 4 potential types, we can use `number` without any issues.

#### Generating Enum Types

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

#### Building Filters

When building filters on the enum field (e.g. for `EnumField eq 'MEMBER_ONE'`), the user interface should look like:

```ts
TestEntity.ENUM_FIELD.equal(EnumNumber.MEMBER_ONE);
```

- For the `EnumNumber`, we can use `EnumNumber[EnumNumber.MEMBER_ONE]` to get the key string `MEMBER`.
- For the `EnumString`, we iterate all the key value pair for finding the key, as `EnumString[EnumString.MEMBER_ONE]` has compilation errors.

#### Problem
However, none of the above works, if the values are not unique, which is the case in terms of OData specification in general.

### Option B (similar to C)
The generated Enum type contains the information below:
- enum name
- enum keys
The documentation covers the following:
- enum underlying type
- enum values

#### Parsing
The same as the Option A, so we have all the information in the VDM model.

#### Generating Enum Types

```ts
/**
 * The underlying type of this enum is Edm.Int32
 * The value of the enum entries are:
 * NOT_FOUND: 404
 * INTERNAL_ERROR: 500
 */
export enum TestEnumType {
  NOT_FOUND,
  INTERNAL_ERROR
}
// which is equivilant to the one below
export enum TestEnumType {
  NOT_FOUND = 0,
  INTERNAL_ERROR = 1
}
```

#### Building Filters
Below are the examples when building filters on the enum field.
```ts
TestEntity.ENUM_FIELD.equal(TestEnumType.NOT_FOUND);
TestEntity.ENUM_FIELD.equal(0);
```

### Option C (chosen)
Similar to Option C, it has additional string based enum values.

#### Generating Enum Types

```ts
/**
 * The underlying type of this enum is Edm.Int32
 * The value of the enum entries are:
 * NOT_FOUND: 404
 * INTERNAL_ERROR: 500
 */
export enum TestEnumType {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}
```

#### Building Filters
Below are the examples when building filters on the enum field.
```ts
TestEntity.ENUM_FIELD.equal(TestEnumType.NOT_FOUND);
TestEntity.ENUM_FIELD.equal('NOT_FOUND');
```

#### Comparison between Option B and C
The only one difference in terms of the API is that:
- for B, `TestEntity.ENUM_FIELD.equal(0);` is possible in addition to providing an enum entry,
- for C, `TestEntity.ENUM_FIELD.equal('Member1');` is valid.

Using C, as `string` type is better than `number` type (index) in terms of readability, because for example, there is no relation between `0` and `TestEnumType.NOT_FOUND`.

## Decision

As the value of the Enum type is not useful, and we even cannot find any use cases, the following information are parsed in the generator, but are only generated as part of the API documentation:

- underlying type
- value of enum entries

## Consequences

- When there are real use cases about underlying types and values, it becomes easier to implement them as we parse these information to our VDM models.
