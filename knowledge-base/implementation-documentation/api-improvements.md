# Potential API improvements

This document contains some ideas for API changes, that would be a breaking change and would result in a major version upgrade.


## Filtering root elements based on 1-1 relationships

### Current API
```ts
BusinessPartner.requestBuilder().getAll()
  .filter(
    BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.filter(
      BusinessPartnerAddress.CITY.equals('Berlin')
    )
  )
```
### Issues

The inner filter is quite confusing, because `filter` implies that we are filtering the Address here, while it is actually filtering the business partner.

### Alternatives

`filterBy`

```ts
BusinessPartner.requestBuilder().getAll()
  .filter(
    BusinessPartner.TO_BUSINESS_PARTNER_ADDRESS.filterBy(
      BusinessPartnerAddress.CITY.equals('Berlin')
    )
  )
```

flatten filters

```ts
BusinessPartner.requestBuilder().getAll()
  .filter(
    BusinessPartner.TO_SINGLE_LINK.CITY.equals('Berlin'),
    BusinessPartner.TO_SINGLE_LINK.STATE.equals('Berlin'),
    any(BusinessPartner.TO_MULTI_LINK.CITY.equals('Berlin'))
  )
```
Concerns:
* Matter of taste - not clearly better.
* Longer for "deep" paths.
* Not straight forward to implement. (Further investigation needed.)

## Seperate Entity(Set) API and entity

### Current API
```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder().getAll().execute(destination);
```

### Issues
The entity is a god-like element here. Separating could clean up.

### Alternatives

Split entity and api
```ts
const buPa: BusinessPartner = await BusinessPartnerApi.getAll()
  .filter(BusinessPartner.FIRST_NAME.equals('Peter'))
  .execute(destination);
```
* Could fix circular dependencies.
* Could be implemented as a non-breaking change initially by deprecating the old `BusinessPartner.requestBuilder()` methods and delegate to the new `BusinessPartnerApi`.
* Realistic for 2.0.


Split entity instance, api, and "helpers" (schema)
```ts
const buPa: BusinessPartner = await BusinessPartnerApi.getAll()
  .filter(BusinessPartnerSchema.FIRST_NAME.equals('Peter'))
  .execute(destination);
```
* Cleaner separation between responsibilities.
* Importing three things is quite complex. 
This could be avoided by using the function style filtering as discussed below.
* Could be implemented as a non-breaking change initially.
* Optionally call BusinessPartner => BusinessPartnerEntity.
* Realistic for 2.0, but only useful if we consider function style filtering (at any point).

## Function style filtering

### Current API
```ts
BusinessPartner.requestBuilder().getAll()
  .filter(BusinessPartner.FIRST_NAME.equals('Peter'))
```

### Issues
This is more a matter of taste.
To get closer to the look and feel of native JavaScript, instead of passing filters to `.filter` it might be nicer to allow functions.

### Alternatives

Using a function:
```ts
BusinessPartner.requestBuilder().getAll()
  .filter(bupa => bupa.FIRST_NAME.equals('Peter'))
```
* We are only using static variables here. This is not clear anymore and might be more confusing than before.
* Makes more sense when the schema is split from entity and api.
* The examples below could be non-breaking changes done sequentially over time.
We would keep the original way to filter, deprecate it and allow for the new function in addition.

Futher examples (and options):
```ts
BusinessPartner.requestBuilder().getAll()
  .filter((bupa, { and }) => and(
    bupa.FIRST_NAME.equals('Peter')
  ))
```

```ts
BusinessPartner.requestBuilder().getAll()
  .filter((bupa, { and, equals }) => and(
    equals(bupa.FIRST_NAME, 'Peter')
  ))
```

Using a JavaScript function:
```ts
BusinessPartner.requestBuilder().getAll()
  .filter(buPa => buPa.FIRST_NAME === 'Peter' && buPa.LAST_NAME === 'Pan')
```
* Difficult to implement.
* Not realistic for 2.0, but maybe later.

## Get rid of `execute`

### Current API
```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder().getAll().execute(destination);
```

### Issues

### Alternatives

```ts
const buPa: BusinessPartner = await BusinessPartnerApi(destination).getAll({
  filter: ...,
  select: ...,
  top: ...
});
```
* Not realistic for 2.0, but maybe later.

## Batch

### Current API

```ts
// type BatchResponse = WriteResponses | ReadResponse | ErrorResponse
const responses: BatchResponse[] = await batch( // The name batch response implies that this is the whole response of a batch, while it is a subresponse here
  getAllRequestBuilder,
  changeset(
    createRequestBuilder,
    deleteRequestBuilder,
    updateRequestBuilder
  )
).execute(destination);

if (responses.every(response => response.isSucces())) { // Why is isSuccess a function?
  const bupas = (responses[0] as ReadResponse).as(BusinessPartner) // It is unfortunate that I have to cast
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
* Change isSuccess() to isSuccess
* Rename WriteResponses to ChangesetResponse

Investigation needed:
* Root level types with 10 arguements (generics) for batch and changeset
* If possible map incoming requests to responses (x-request-id, content-id, message-id headers?)


## Execute raw

### Current API
```ts
const buPa: BusinessPartner = await BusinessPartner.requestBuilder().getAll().execute(destination);
```

### Issues

### Alternatives

```ts
const buPa: Response<BusinessPartner> = await BusinessPartner.requestBuilder().getAll().executeRaw(destination);
```

```ts
const [buPa, req, res]: [BusinessPartner, Request, Response] = await BusinessPartner.requestBuilder().getAll().execute(destination);
```

```ts
const [buPa, req, res]: [BusinessPartner, Request, Response] = await BusinessPartner.requestBuilder().getAll().executeRaw(destination);
const buPa: BusinessPartner = await BusinessPartner.requestBuilder().getAll().execute(destination);
```
