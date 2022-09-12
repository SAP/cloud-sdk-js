# Potential API improvements

This document contains some ideas for API changes, that would be a breaking change and would result in a major version upgrade.

## Filtering root elements based on 1-1 relationships

**Decision** (Version 2 candidate)

- Leaning towards option 2
- Feedback from users would be helpful

### Current API

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(
    BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.filter(
      BusinessPartnerAddress.CITY.equals('Berlin')
    )
  );
```

### Issues

The inner filter is quite confusing, because `filter` implies that we are filtering the Address here, while it is actually filtering the business partner.

### Alternatives

**1. `filterBy`**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(
    BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.filterBy(
      BusinessPartnerAddress.CITY.equals('Berlin')
    )
  );
```

Cons:

- Might not really solve the issue:
  - The difference in language `filter` versus `filterBy` is quite subtle and could still be confused.
  - Potentially from the context this is not clear

**2. flatten filters**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(
    BusinessPartner.TO_SINGLE_LINK.CITY.equals('Berlin'),
    BusinessPartner.TO_SINGLE_LINK.STATE.equals('Berlin'),
    any(BusinessPartner.TO_MULTI_LINK.CITY.equals('Berlin'))
  );
```

Cons:

- Matter of taste - not clearly better.
- Longer for "deep" paths.
- Not straight forward to implement. (Further investigation needed.)

## Separate Entity(Set) API and entity

**Decision** (Version 2 decided)

- Option 1 required
- Option 2 optional, only if we do function style filtering

### Current API

```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);
```

### Issues

The entity is a god-like element here and might cause confusion. Separating could clean up.

### Alternatives

**1. Split entity and api**

```ts
const buPa: BusinessPartner = await BusinessPartnerApi.getAll()
  .filter(BusinessPartner.FIRST_NAME.equals('Peter'))
  .execute(destination);
```

- Could fix circular dependencies.
- Could be implemented as a non-breaking change initially by deprecating the old `BusinessPartner.requestBuilder()` methods and delegate to the new `BusinessPartnerApi`.
- Realistic for 2.0.

**2. Split entity instance, api, and schema**

```ts
const buPa: BusinessPartner = await BusinessPartnerApi.getAll()
  .filter(BusinessPartnerSchema.FIRST_NAME.equals('Peter'))
  .execute(destination);
```

- Could be implemented as a non-breaking change initially.
- Optionally call BusinessPartner => BusinessPartnerEntity.
- Realistic for 2.0, but only useful if we consider function style filtering (at any point).

Pros:

- Cleaner separation between responsibilities.

Cons:

- Importing three things is quite complex.
  - This could be avoided by using the function style filtering as discussed below.

## Function style filtering

**Decision** (Version 2 candidate)

- Options 1 and 2 required
- Option 3b optional

### Current API

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(BusinessPartner.FIRST_NAME.equals('Peter'));
```

### Issues

This is more a matter of taste.
To get closer to the look and feel of native JavaScript, instead of passing filters to `.filter` it might be nicer to allow functions.

### Alternatives

**1. Using a function**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(bupa => bupa.FIRST_NAME.equals('Peter'));
```

Pros:

- More "javascripty"

Cons:

- Does not make much sense without separating api and entity from schema: We are only using static variables here. This is not clear anymore and might be more confusing than before.

- The examples below could be non-breaking changes done sequentially over time.
  - We would keep the original way to filter, deprecate it and allow for the new function in addition.

**2. Further examples (and options)**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter((bupa, { and }) => and(bupa.FIRST_NAME.equals('Peter')));
```

Pros:

- Users don't have to import core anymore
- Potentially easier to find

**3a. Passing functions for comparison**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter((bupa, { and, equals }) => and(equals(bupa.FIRST_NAME, 'Peter')));
```

- Similar behavior to filter functions.

Cons:

- Not all comparison functions are available on all types, how would you know which ones you can use
  - Lose discoverability

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter((bupa, { and, expect }) =>
    and(expect(bupa.FIRST_NAME).equals('Peter'))
  );
```

- Naming of `expect` needs to be discussed further. Other options: `filter`, `f`

Pros:

- Allows discoverability
- Reduces the complexity of the schema

**4. Using JavaScript functions**

```ts
BusinessPartner.requestBuilder()
  .getAll()
  .filter(buPa => buPa.FIRST_NAME === 'Peter' && buPa.LAST_NAME === 'Pan');
```

Cons:

- Difficult to implement.
- Not realistic for 2.0, but maybe later.

## Function style filtering [Updated]

The new filter api is implemented as non-breaking change and the current methods are deprecated. Lambda filters on collection properties will be implemented as a new feature in the major version.

### Current API

```ts
peopleApi.requestBuilder()
  .getAll()
  .filter(
    //Basic
    peopleApi.schema.USER_NAME.equals('Peter'),
    // 1-to-1 navigation
    peopleApi.schema.PHOTOS.filter(photoApi.schema.NAME.equals('Photo1')),
    // 1-to-N navigation
    peopleApi.schema.TO_FRIENDS.filter(
      any(
        peopleApi.schema.FIRST_NAME.equals('John'),
        peopleApi.schema.LAST_NAME.equals('Miller')
      )
    )
  );
```
Filters on collection properties are not supported.

### Examples

**Option 1: Similar to the current api**

```ts
.filter(({ USER_NAME, PHOTOS, TO_FRIENDS, EMAILS, ADDRESSES }) => 
  and(
    USER_NAME.equals('Peter'),
    PHOTOS.filter((photo) => photo.NAME.equals('Photo1')),
    TO_FRIENDS.filter((friend) => any(friend.FIRST_NAME.equals('John'))),
    EMAILS.filter(e => any(e.equals('peter@example.com'))), // String type Collection
    ADDRESSES.filter(address => any(address.street.equals('Peter'))) // Complex type collection
  )
);
```
Issue remains: The inner `.filter` is confusing, because it implies that we are filtering the Friends/Photos/Emails here, while it is actually filtering people.

**Option 2: Without inner `.filter` on properties**

```ts
.filter(({ USER_NAME, PHOTOS, TO_FRIENDS, EMAILS, ADDRESSES }) => and(
    USER_NAME.equals('Peter'),
    PHOTOS.filter(({ NAME }) => NAME.equals('Photo1'))
    TO_FRIENDS.any(({ FIRST_NAME }) => and(FIRST_NAME.equals('Peter'), LAST_NAME.equals(''))),
    EMAILS.any(e => e.equals('Peter')), // String type Collection
    ADDRESSES.any(address => address.street.equals('Peter')) // Complex type collection
));
```
- Shorter, improved discoverability of lambda filters.
- Need to decide api for 1-1 nav property, since it has no direct filter method except `.filter`.

## Get rid of `execute`

### Current API

```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);
```

### Issues

Matter of taste.

### Alternatives

```ts
const buPa: BusinessPartner = await BusinessPartnerApi(destination).getAll({
  filter: ...,
  select: ...,
  top: ...
});
```

- Not realistic for 2.0, but maybe later.

## Batch

**Decision** (Version 2 candidate **quick wins only**)

- Implement quick wins (which contain breaking changes)
- Potentially get feedback from users on other issues (not necessarily the listed ones)

**Questions**

- Is the remote state handling a hard requirement (potential confusion for users)?
- If yes, should this also be handled the same way in batch?

### Current API

```ts
// type BatchResponse = WriteResponses | ReadResponse | ErrorResponse
const responses: BatchResponse[] = await batch(
  // The name batch response implies that this is the whole response of a batch, while it is a subresponse here
  getAllRequestBuilder,
  changeset(createRequestBuilder, deleteRequestBuilder, updateRequestBuilder)
).execute(destination);

if (responses.every(response => response.isSuccess())) {
  // Why is isSuccess a function?
  const bupas = (responses[0] as ReadResponse).as(BusinessPartner); // It is unfortunate that I have to cast
  const changeSetResponse: WriteResponses = responses[1] as WriteResponses;
  if (changeSetResponse.responses[0].httpCode !== 204) {
    const createResponse = changeSetResponse.responses[0].as!(BusinessPartner);
  }
  const deleteResponse = changeSetResponse.responses[1].as!(BusinessPartner);
}
```

### Issues

### Alternatives

Quick wins:

- Change `isSuccess()` to `isSuccess`
- Rename `WriteResponses` to `ChangesetResponse`

Investigation needed:

- Root level types with 10 arguments (generics) for `batch` and `changeset`
- If possible map incoming requests to responses (`x-request-id`, `content-id`, `message-id` headers?)

## Execute raw

**Decision** (No API changes, thus normal backlog item)

- Option 1 required, implementation of executeRaw should follow structure in option 2

### Current API

```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);
```

### Issues

This currently does not allow to access the response (or request) object, which means not having information on the HTTP code, raw response and other information, that might be relevant.

### Alternatives

**1. executeRaw**

```ts
const buPa: Response<BusinessPartner> = await BusinessPartner.requestBuilder()
  .getAll()
  .executeRaw(destination);
```

- Could be implemented without breaking change
  Pros:
- Allows usage of old `execute` to get parsed response data directly

**2. Return a response object on execute**

```ts
const {
  data: buPa,
  req,
  res
}: Response<BusinessPartner> = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);
```

- Basically Option 1, only with breaking change

**3. Return a response array on execute**

```ts
const [buPa, req, res]: [BusinessPartner, Request, Response] =
  await BusinessPartner.requestBuilder().getAll().execute(destination);
// Could also be
const [buPa] = await BusinessPartner.requestBuilder()
  .getAll()
  .execute(destination);
```

**4. Include request/response if optional parameter is true**

```ts
function execute(
  destination: Destination,
  includeReqRes = false
): BusinessPartner;
function execute(destination: Destination, includeReqRes: true): HttpResponse;
function execute(
  destination: Destination,
  includeReqRes?: boolean
): BusinessPartner | HttpResponse {
  // stuff
  if (includeReqRes) {
    return [BuPa, Req, Res];
  } else {
    return BusinessPartner;
  }
}
```
