# (De-)Serialization

We decided to replace the current (de-)serialization approach to allow users some flexibility in how their data is handled.
This is especially interesting for date time serialization (see [ADR](015-date-time-handling.md)).
We have to make some decisions with regards to the API design, as the current design does not accomodate for all cases, especially when the static parts of an entity are needed.

In the following `customDeserializers` are a set of functions that contain functionality for (de-)serialization and determine the type of the returned entities as described in the [date time handling ADR](015-date-time-handling.md).

## Current API

The API, as it was initially intended.

### Request builders

Requestbuilders work out of the box and can easily use the intended API to return correctly typed data:

```ts
const entity: SomeEntity<typeof customDeserializers> = await SomeEntity.requestBuilder(customDeserializers).execute(...);
```

### Entity builders

Entity builder are not problematic either, but slighly less convenient, because users would have to pass the deserializers twice for linked entities.

```ts
const entity: SomeEntity<typeof customDeserializers> = SomeEntity.builder(
  customDeserializers
)
  .linkedEntity(SomeLinkedEntity.builder(customDeserializers).build())
  .build();
```

### Filters

Filters need the static API of an entity.
This cannot be changed by simply applying generics, therefore filters could only be imlpemented by passing `customDeserializers` to every filter.
The same applies to filters on linked entities.
This is inconvenient.

```ts
SomeEntity.requestBuilder(customDeserializers)
  .filter(SomeEntity.SOME_PROP.equals(customDeserializers, 'value')) // inconvenient
  .execute(...);
```

### Filter functions

Filter functions are very similar to filters.
We currently don't take the EDM type into consideration (except for one specific case for dates), therefore with the current design it is semantically not necessary nor possible to use custom serialization.

```ts
SomeEntity.requestBuilder(customDeserializers)
  .filter(filterfunctions.endswith(SomeEntity.SOME_PROP, 'suffix')) // the edm type of the property is irrelevant for serialization
  .execute(...);
```

### Complex types

Complex types are quite straight forward as there is no use of the static API. Filters and entity building work out of the box.

### Function imports

TBD

## New API

The idea of the new API is, to remove the need of static properties.
This can be done, by separating the static API from the entity and creating a separate data structure for the static API (which in turn isn't static anymore).
The API should handle all information that are not related to a specific entity.

### EntityApi

fit

### Request builders

Requestbuilders work out of the box and can easily use the intended API to return correctly typed data:

```ts
const entity: SomeEntity<typeof customDeserializers> = await SomeEntity.requestBuilder(customDeserializers).execute(...);
```

### Entity builders

Entity builder are not problematic either, but slighly less convenient, because users would have to pass the deserializers twice for linked entities.

```ts
const entity: SomeEntity<typeof customDeserializers> = SomeEntity.builder(
  customDeserializers
)
  .linkedEntity(SomeLinkedEntity.builder(customDeserializers).build())
  .build();
```

### Filters

Filters need the static API of an entity.
This cannot be changed by simply applying generics, therefore filters could only be imlpemented by passing `customDeserializers` to every filter.
The same applies to filters on linked entities.
This is inconvenient.

```ts
SomeEntity.requestBuilder(customDeserializers)
  .filter(SomeEntity.SOME_PROP.equals(customDeserializers, 'value')) // inconvenient
  .execute(...);
```

### Filter functions

Filter functions are very similar to filters.
We currently don't take the EDM type into consideration (except for one specific case for dates), therefore with the current design it is semantically not necessary nor possible to use custom serialization.

```ts
SomeEntity.requestBuilder(customDeserializers)
  .filter(filterfunctions.endswith(SomeEntity.SOME_PROP, 'suffix')) // the edm type of the property is irrelevant for serialization
  .execute(...);
```

### Complex types

Complex types are quite straight forward as there is no use of the static API. Filters and entity building work out of the box.
