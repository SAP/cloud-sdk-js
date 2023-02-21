# Title

## Status

ACCEPTED

## Context

The current request builder APIs are not able to handle some odata requests like:

- query navigation properties `GET /People('scottketchum')/Friends`
- getting "raw value" of a property `/People('scottketchum')/$value`

## Decision

- Implement A for now as a powerful workaround.
- Proposal B/C/variant will be a `2.0` task, where it seems C might be the winner and we might review the decision later as they close to each other.

## Consequences

- The navigation properties query can be handled by using A.
- We have a plan for new APIs in `2.0`.
  When the time has come to implement it we will decide on the concrete API syntax.

## Background

### How to build a OData request by using the SDK

So far, the SDK user can build a request with the pattern like:

```ts
People.requestBuilder().someOperation(params); // getAll(), getByKey(...keys), create(entity), update(entity), delete(entity | ...keys)
```

which then generates url like below that has only **ONE** level:

```
/basePath/People // getAll(), create, update, delete(entity)
/basePath/People(1) // getByKey, delete(key)
```

### Exception: `asChildOf`

The API `asChildOf` is designed for generating a URL that contains **TWO** levels (entity + navigation property).
The code snippet below:

```ts
Friends.requestBuilder().create(newFriend).asChildOf(
  person, // for getting the key
  People.Friends
);
```

will generate url like:

```
/People(personKey)/Friends
```

This is a bit confusing, because the order of the ts code is from navigation property to parent entity, while being reversed in the generated URL.
As a workaround, it might be still fine to keep the same API structure.

### Problem

There are still lots of OData requests that are not supported by the SDK:

1. [high prio] `GET /People('scottketchum')/Friends` for querying navigation properties (1-to-1 and 1-to-many), requested by users
2. [high prio] `GET /People('scottketchum')/Friends('russellwhyte')`, for querying 1-to-many navigation properties with keys.
3. [high prio] `GET /People('russellwhyte')/BestFriend/BestFriend/BestFriend`, infinite links
4. [high prio] `GET /People('scottketchum')/Friends('russellwhyte')/BestFriend`, similar case with 1-to-many navigation properties
5. [medium prio] `GET /People('scottketchum')/$value`, requested by users and used for fetching the spec files with ["APIContent service"](https://github.tools.sap/cloudsdk/cloud-sdk-api-mirror/blob/main/fetch-spec-from-api-hub/http-calls.ts#L136) ([odata doc](https://www.odata.org/getting-started/basic-tutorial/))
6. [low prio] `GET /People('scottketchum')/Friends/$count`, count the number of friend.
7. [low prio] `GET /People('scottketchum')/FirstName`, similar to the navigation properties

### Focus

We will focus on the problems 1-4 for now and might consider rough ideas for 5-7 with extension.

## Alternatives

### Proposal A (Consider as separate task as it might be used as workaround for all cases)

A new API

```
People.reqeustBuilder()
  .getByKey(key)
  .appendPath('/$value')
  // .appendPath('/Friends')
  // .appendPath("/Friends('russellwhyte')")
  // .appendPath('/BestFriend/BestFriend/BestFriend')
  // .appendPath('/Friends/$count')
  // .appendPath('/BestFriend', 'BestFriend')
```

#### Pros and cons:

##### Pros:

- As custom function (like custom header), it might be useful for **ALL** unsupported functions.
- One API for **ALL** cases, including not listed edge cases.
- Quick win.

##### Cons:

- This is a workaround.
- Not typed

#### Decision:

At least, implement it as a separate task so we have a workaround for custom URL.

### Proposal B

```ts
// Problem 1
// /People('russellwhyte')/Friends
TripPinService.entity(People, 'russellwhyte') // single item can continue linking
  .navigationProp(People.Friends)
  .buildGetRequest() //xxxRequestBuilder, which can be called by single item/multi items and others
  .customHeaders(headers)
  .execute(destination);
```

```ts
// Problem 2,3,4
// /People('russellwhyte')/Friends('scottketchum')/BestFriend/BestFriend
TripPinService.entity(People, 'russellwhyte') // single item can continue linking
  .navigationProp(People.Friends, 'scottketchum') // single item can continue linking
  .navigationProp(People.BestFriend) // single item can continue linking
  .navigationProp(People.BestFriend); // single item can continue linking
```

#### Pros and cons:

##### Pros:

- Better fluent API (compared to `asChildOf`) with builder pattern.
- Can be extended for supporting problem 5-7.
- Typed.

##### Cons:

- Lots of effort to build the new structure, which seems to be a `2.0` task.

### Proposal C

Basically, the same idea but with different API in terms of reaching single items.(e.g., "getByKey" and 1-to-1 navigation properties)

```ts
// Problem 1
// /People('russellwhyte')/Friends
TripPinService.entity(People) // multi item can call "key" to become a single item
  .key('russellwhyte') // single item can continue linking
  .navigationProp(People.Friends);
```

```ts
// Problem 2,3,4
// /People('russellwhyte')/Friends('scottketchum')/BestFriend/BestFriend
TripPinService.entity(People) // multi item can call "key" to become a single item
  .key('russellwhyte') // single item can continue linking
  .navigationProp(People.Friends) // multi item can call "key" to become a single item
  .key('scottketchum') // single item can continue linking
  .navigationProp(People.BestFriend)
  .navigationProp(People.BestFriend)
  .buildGetRequest() //xxxRequestBuilder, which can be called by single item/multi items and others
  .customHeaders(headers)
  .execute(destination);
```

### Proposal C variants

```
//frank
People.requestBuilder()
  .getByKey('key') // xxxRequestBuilder
  .toFriend('abc')
  .toBestFriend()
  .toFriends()
  .getBuilder()//create

//marika
People.requestBuilder()
  .key('scottketchum')
  .navigationProp(People.BestFriend)
  .navigationProp(People.BestFriend)
  .buildGetRequest() //xxxRequestBuilder, which can be called by single item/multi items and others
  .customHeaders(headers)
  .execute(destination)
```

#### Pros and cons:

Same as `Proposal B`, but with more methods instead of overloading functions with more parameters.

### Proposal D

Use the similar API like `asChildOf`

```ts
// /People(personKey)/Friends
Friends.requestBuilder().getAll().asChildOf(person, People.Friends);
```

```ts
// /People(personKey)/Friends(friendKey)
Friends.requestBuilder().getByKey(friendKey).asChildOf(person, People.Friends);
```

#### Pros and cons:

##### Pros:

- Consistent with `asChildOf` for generating same URL.
- Medium complexity
- Typed.

##### Cons:

- Cannot be extended for supporting problem 5-7, so we need to find solution for them.
- The ugly API `asChildOf` is used with additional use cases.
  - Different order: `Entity -> NavigationProp` (url) V.S. `NavigationProp -> Entity` (API usage)

#### Decision:

Not chosen due to the lack of extension and confusing API.

### previous docs

Find related discussion [here](../implementation-documentation/api-improvements.md)

## Follow-ups

### asChildOf()

It should be deprecated and migrate to the new API structure, when B or C is implemented.
