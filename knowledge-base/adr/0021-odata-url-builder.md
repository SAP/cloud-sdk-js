# Title
Status: proposed

Decision: ??

## Background
### How to build a OData request by using the SDK
So far, the SDK user can build a request with the pattern like:
``` ts
People.reqeustBuilder()
  .someOperation(params) // getAll(), getByKey(...keys), create(entity), update(entity), delete(entity | ...keys)
```
which then generates url like below that has only **ONE** level:
```
/servicePath/People // getAll(), create, update, delete(entity)
/servicePath/People(1) // getByKey, delete(key)
```

### Exception: `asChildOf`
The API `asChildOf` is designed for generating a URL that contains **TWO** levels (entity + navigation property).
The code snippet below:
``` ts
Friends.requestBuilder()
  .create(newFriend)
  .asChildOf( 
    person, // for getting the key
    People.Friends
)
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
  .appendUrl('$value')
  // .appendUrl('Friends')
  // .appendUrl("Friends('russellwhyte')")
  // .appendUrl('/BestFriend/BestFriend/BestFriend')
  // .appendUrl('/Friends/$count')
```
#### Pros and cons:
##### Pros:
- As custom function (like custom header), it might be useful for **ALL** unsupported functions.
- One API for **ALL** cases, including not listed edge cases.
- Quick win.
##### Cons:
- This is a workaround.
- Not typed

### Proposal B
```ts
// Problem 1
// /People('russellwhyte')/Friends
TripPinService
  .entity(People, 'russellwhyte') // single item can continue linking
  .navigationProp(People.Friends)
  .buildGetRequest() //xxxRequestBuilder, which can be called by single item/multi items and others
  .customHeaders(headers)
  .execute(destination)
```
```ts
// Problem 2,3,4
// /People('russellwhyte')/Friends('scottketchum')/BestFriend/BestFriend
TripPinService
  .entity(People, 'russellwhyte') // single item can continue linking
  .navigationProp(People.Friends, 'scottketchum') // single item can continue linking
  .navigationProp(People.BestFriend) // single item can continue linking
  .navigationProp(People.BestFriend) // single item can continue linking
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
TripPinService
  .entity(People) // multi item can call "key" to become a single item
  .key('russellwhyte') // single item can continue linking
  .navigationProp(People.Friends)
```
```ts
// Problem 2,3,4
// /People('russellwhyte')/Friends('scottketchum')/BestFriend/BestFriend
TripPinService
  .entity(People) // multi item can call "key" to become a single item
  .key('russellwhyte') // single item can continue linking
  .navigationProp(People.Friends) // multi item can call "key" to become a single item
  .key('scottketchum') // single item can continue linking
  .navigationProp(People.BestFriend)
  .navigationProp(People.BestFriend)
```
#### Pros and cons:
Same as `Proposal B`, but with method instead of overloading functions with more parameters.

### Proposal D
Use the similar API like `asChildOf`
``` ts
// /People(personKey)/Friends
Friends.requestBuilder()
  .getAll()
  .asChildOf( 
    person, 
    People.Friends
)
```
``` ts
// /People(personKey)/Friends(friendKey)
Friends.requestBuilder()
  .getByKey(friendKey)
  .asChildOf( 
    person, 
    People.Friends
)
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

## Follow-ups

### asChildOf()
It should be deprecated and migrate to the new API structure, when B or C wins.

AC:
- [ ] create a follow up as `2.0` item
