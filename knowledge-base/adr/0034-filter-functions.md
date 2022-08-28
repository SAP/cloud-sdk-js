# Function style filtering

## Status


## Context

In the [api improvements doc](../implementation-documentation/0005-api-improvements.md#separate-entityset-api-and-entity), we discussed splitting the entity, api and schema in order to implement function style filtering. The split of api and entity was implemented in v2. In this adr, we align on the new filter api design. 

The new filter methods will be implemented as non-breaking changes (v3 ?). The current methods will stay, but will be deprecated.

### Current API

```ts
peopleApi.requestBuilder()
  .getAll()
  .filter(
    peopleApi.schema.USER_NAME.equals('Peter'),
    peopleApi.schema.PHOTOS.filter(photoApi.schema.NAME.equals('Photo1'))
    peopleApi.schema.TO_FRIENDS.filter(
      any(
        peopleApi.schema.FIRST_NAME.equals('John'),
        peopleApi.schema.LAST_NAME.equals('Miller')
      )
    )
  );
```

Filtering a collection type field is not supported by our filters 

## Function style Filtering
The new filter methods take a callback function, input parameter being the schema of the entity and returns a list of type `Filterable`.

**Option 1: Similar to the current api**

```ts
.filter((peopleSchema) => and(
  peopleSchema.USER_NAME.equals('Peter'),
  peopleSchema.PHOTOS.filter((photo) => photo.NAME.equals('Photo1')),
  peopleSchema.TO_FRIENDS.filter((friend) => any(friend.FIRST_NAME.equals('John'))),
  peopleSchema.EMAILS.filter(e => any(e.equals('peter@example.com'))
  )
))
```
Issue remains: The inner filter is confusing, because filter implies that we are filtering the Friends/Photos/Emails here, while it is actually filtering people.


**Option 2: Without `.filter`**

```ts
.filter(({ USER_NAME, PHOTOS, TO_FRIENDS, EMAILS, ADDRESSES }) => and(
    USER_NAME.equals('Peter'),
    TO_FRIENDS.any(({ FIRST_NAME }) => and(FIRST_NAME.equals('Peter'), LAST_NAME.equals('')),
    EMAILS.any(e => e.equals('Peter')),
    ADDRESSES.any(address => address.street.equals('Peter')),
    // PHOTOS.filter(({ NAME }) => NAME.equals('Photo1'))
  )
))
```
Simplifies + shortens deep filter paths. 
Possibly rename filter to something else? 

## Decision
Based on the new filter design, collection filter in current api is implemented as:

**Option 1:** 
```ts

.filter(
  peopleSchema.EMAILS.filter(
    any(e.equals('test'))
  )
)
```
**Option 2:**
```ts

.filter(peopleSchema.EMAILS.any(e.equals('test')))
```