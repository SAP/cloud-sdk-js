# Date and Time handling in the SDK

## Status

decided

## Context

Currently we are using moment.js for handling date and time related types in the SDK.
Unfortunately moment is quite big in size and the project itself recommends to not use it for new projects: https://momentjs.com/docs/#/-project-status/recommendations/.
We are considering to move to the future JS native Date library [Temporal](https://github.com/tc39/proposal-temporal).
It proposes abstractions for all types that we need to handle OData:

- `Edm.DateTimeOffset` (v2 / v4) -> `Temporal.ZonedDateTime`
- `Edm.DateTime` (v2) -> `Temporal.DateTime`
- `Edm.Time` (v2) -> `Temporal.Time`
- `Edm.Date` (v4) -> `Temporal.Date`
- `Edm.Duration` (v4) -> `Temporal.Duration`
- `Edm.TimeOfDay` (v4) -> `Temporal.Time`

This is a Stage 2 proposal at the time being and will most likely reach stage 3 in 2020 still, there is no official timeline as to when stage 4 will be reached and when this is planned to become a standard.

## Decision

Allow to configure different serializers / deserializers for dates, but maybe even for all field types.
~~We will provide adapters for moment, string and Temporal serialization and switch the default implementation from moment to either string or Temporal depending on the state of the proposal at the time of switching.~~
We will provide adapters for moment and Temporal in the initial 2.0 release.
The default implementation will be moment until Temporal has reached stage 4.
We will provide the string adapters once Temporal is part of the node standard.

Further it should be possible to switch the adapters globally.

Exemplary code snippet (API not yet decided):

```ts
const bupa = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);

bupa.date; // Moment

const bupa = await BusinessPartner.requestBuilder()
  .getAll()
  .transform({
    'Edm.DateTime': temporalMiddleware.dateTime
  })
  .execute(destination);

bupa.date; // Temporal
```

## Consequences

This will allow users to easily switch implementation to what they see best fit for their use case and it will even allow them to write their own transformers.
We have to consider, that at the moment `moment` does not handle times for example, while temporal does, therefore transformation needs to be handled separately for those cases.
Also, url and payload serialization differ, while they are quite similar, therefore this approach needs to always consider two transformers for url and payload serialization.

## Alternative solutions

### Migrate to a different library first

Declined because this would mean that we introduce breaking changes twice.

### Accept stage 3 proposal risk

Declined as we think it is too risky and potentially too early for users to adopt it through the SDK.
Stage 3 proposals have been downgraded to stage 2 in the past.

### Wait for Temporal to reach stage 4

Declined, as we are planning to release a version 2 of the SDK in the first half of 2021 and it is unlikely this would fit our timeline unless we keep the old implementation until a version 3.

### Implement SDK Date wrapper that abstracts different libraries

Declined, because this would probably mean quite high implementation effort and is not flexible enough.

## Summary of the [PoC](https://github.com/SAP/cloud-sdk-js/pull/921)

### New Api design

Instead of the original idea of creating a new function `transform`, the middleware will be passed via the existing functions as optional parameter when building an `entity` or a `requestBuilder`.
See examples below:

```ts
// Default entity builder usage
const a = TestEntity.builder().int32Property(1).build();
// Default create request
TestEntity.requestBuilder().create(a).execute();

// Transformed entity builder usage
const b = TestEntity.builder(serializers).int32Property('test').build();
// Transformed create request
TestEntity.requestBuilder(serializers).create(b).execute();
```

The middleware has a structure like below to define (de)serializers for some EDM types. In this example, only two EDM types are considered.

```ts
interface DeSerializationMiddlewareInterface<T1, T2> {
  'Edm.String'?: {
    serializer: (val: T1) => string;
    deserializer: (ori: string) => T1;
  };
  'Edm.Int32'?: {
    serializer: (val: T2) => string;
    deserializer: (ori: string) => T2;
  };
}
```

**Please note**

With the api design above, when applying it for replacing the moment lib, we will introduce multiple generic types for `Entity`, `RequestBuilder`, `TestEntity` and `TestEntityRequestBuilder`, which makes our code more complicated, but the users should not be affected.
The number of generic types depends on the number of related EDM types.
For example, for `ODataV4`, 4 EDM types (`Edm.DateTimeOffset`, `Edm.Date`, `Edm.Duration` and `Edm.TimeOfDay`) are relevant, which means it will introduce 4 generic types for all the classes mentioned above.
In the PoC example, the string/number example looks like below, where only two generic types are used for two EDM types (`Edm.String` and `Edm.Int32`):

```ts
export class TestEntityTemporal<T1 = string, T2 = number> extends EntityV4<T1, T2> implements TestEntityType<T1, T2> {
  stringProperty?: T1;
  int32Property?: T2;
  ...
}
```

### Assumption

- Request builders has the same complexity.
- Serializer has the same complexity as the Deserializer.
- The URL converter uses the serializer, so it might not be part of the middleware.
- OData V2 has the same complexity as the OData V4.
- Advanced data type like Complex/Collection type can be handled like the basic EDM type.

### Scope

As mentioned above, the PoC example only has two generic types for mapping `Edm.String` and `Edm.Int32`.

- Type tests of the entity created by the entity builder with/without the middleware.

```ts
// TestEntityTemporal<string, number>
const entity1 = TestEntityTemporal.builder().int32Property(1).build();
// TestEntityTemporal<string, string>
const entity2 = TestEntityTemporal.builder(customMiddlewareFull)
  .int32Property('1')
  .build();
```

- Type tests of the `GetAllRequestBuilder` with/without the middleware.

```ts
// TestEntityGetAllRequestBuilder<TestEntityTemporal<string, number>, string, number>
const requestBuilder1 = await TestEntityTemporal.requestBuilder().getAll();
// TestEntityGetAllRequestBuilder<TestEntityTemporal<string, string>, string, string>
const requestBuilder2 = await TestEntityTemporal.requestBuilder(
  customMiddlewareFull
).getAll();
```

- Type tests of the return value when executing a `GetAllRequestBuilder` with/without the middleware.

```ts
// TestEntityTemporal<string, number>[]
const res1 = await TestEntityTemporal.requestBuilder()
  .getAll()
  .execute(defaultDestination);
// TestEntityTemporal<string, number>[]
const res2 = await TestEntityTemporal.requestBuilder(defaultMiddleware)
  .getAll()
  .execute(defaultDestination);
// TestEntityTemporal<string, string>[]
const res3 = await TestEntityTemporal.requestBuilder(customMiddlewareFull)
  .getAll()
  .execute(defaultDestination);
// TestEntityTemporal<string, string>[]
const res4 = await TestEntityTemporal.requestBuilder(customMiddlewarePartial)
  .getAll()
  .execute(defaultDestination);
```

- Implementation with unit tests about how custom deserializer affects the return value of the `GetAllRequestBuilder`.

### How to get rid of `moment` lib

#### Prerequisites

- The middleware pattern is implemented so the SDK supports custom (de)serializer middleware in addition to the default one.
- The `temporal` lib (or other alternatives) is ready to replace `moment` as the default (de)serializer.

#### Steps

1. Switch the default (de)serializer from `moment` to e.g., `temporal`, so our sdk core will not have `moment` as a dependency but `temporal`. (breaking change)
2. Release a new package which contains a prebuilt constants as a moment (de)serializer middleware, using `moment` as a dependency, so a user can switch the (de)serializer on demand. This allows you to use latest sdk core with `moment` instead of the default (de)serializer.

### Next steps

- Refactor the middleware structure to align with the design mentioned above
- In addition to the `GetAllRequestBuilder`, handle all kinds of the request builders.
- In addition to `deserializer`, handle `serializer` and `uri-converter`.
- In addition to `ODataV4`, handle `ODataV2`.
- In addition to basic EDM types, handle advances types like collection and complex types
- Release a new package (`@sap-cloud-sdk/date-time-temporal`/`@sap-cloud-sdk/date-time-moment`) as a middleware component, so users can consume directly.
