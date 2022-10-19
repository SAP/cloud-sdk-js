## Status

decided

## Context

In OData it is possible to send batch requests with multiple changesets, and reference the results of those requests among each other.

There are three use cases, where requests can be referenced within one batch request:

1. Reference returned entities
2. Reference returned eTags
3. Reference returned values

This ADR will focus on referencing returned entities (1.) only (see appendix for comments on 2. and 3.).

### OData Syntax

Referencing only works in batch requests.
For example, you can create an entity in one changeset and then create other entities as child of this entity in a second request, this is how you would reference the first request result in the second (in pseudo batch format):

```
# 1. request - create business partner
----------
Content-ID: 1 # "1" is the id of the request (note: this is in the header of the changeset multipart request, not the actual request)
POST /service/A_BusinessPartner
{ body }
----------

# 2. request - create business partner address as child of the previously created business partner
----------
POST $1/A_BusinessPartnerAddress # "$1" references the result of the request before.
{ body }
----------
```

### Current State

Currently, it is not possible to reference other requests within batch. The three following single requests cannot be combined in batch as they would require references to the `newBusinessParter`.

```ts
/* request 1 */
const createRequest = businessPartnerApi
   .requestBuilder()
   .create(businessPartner);

const newBusinessPartner = await createRequest.execute(...);

/* request 2 - create as child of with reference to newly created business partner */
const asChildOfRequest = businessPartnerAddressApi
.requestBuilder()
.create(address)
.asChildOf(newBusinessPartner, businessPartnerApi.schema.TO_BUSINESS_PARTNER_ADDRESS);

const newChildAddress = await asChildOfRequest.execute(...);

/* request 3 - bound function with reference to newly created business partner => let's assume there is a bound function in businessPartner */
const actionRequest = newBusinessPartner.getNumOfAddresses();

const numOfAddresses = await actionRequest.execute(...);
```

### Proposal

Requests that can return entities, should allow creating objects, that act as references to an entity.
Those requests are:

- get by key
- create
- update
- bound/unbound functions/actions

Delete and get all probably does not make sense for this.

API (`getBatchReference()`):

```ts
/* extend request type with getBatchReference() method */
interface CreateRequestBuilder<EntityT> {
  ...
  getBatchReference(): BatchReference
}

interface BatchReference {
  id: string;
}
```

> Note that users should also be able to set the batch reference (see [Repeatability](#repeatability)).
> This reference can be used as a parameter in other requests instead an entity. This includes:

- createAsChildOf
- delete
- update
- unbound functions/actions with entity parameters

However, this will not work for bound functions, as they rely on the physical existence of an entity.

To solve this we should have a new method on the entity builder, that allows building an entity based on a reference only.

API (`fromBatchReference()`):

```ts
interface EntityBuilder<EntityT> {
   ...
   fromBatchReference(ref: BatchReference): EntityT
}
```

#### Example

This is the same example as described in the current state, only with batch.

```ts
/* request 1 */
const createRequest = businessPartnerApi
  .requestBuilder()
  .create(businessPartner);

/* reference to newly created business partner */
const businessPartnerRef = createRequest.getBatchReference();

/* request 2 - create as child of with reference to newly created business partner */
const asChildOfRequest = businessPartnerAddressApi
  .requestBuilder()
  .create(address)
  .asChildOf(
    businessPartnerRef,
    businessPartnerApi.schema.TO_BUSINESS_PARTNER_ADDRESS
  );

/* request 3 - bound function with reference to newly created business partner => let's assume there is a bound function in businessPartner */
const functionRequest = businessPartnerApi.entityBuilder
  .fromBatchReference(businessPartnerRef)
  .doSomething();

const batchResponse = await batch(
  changeset(createRequest, asChildOfRequest, functionRequest)
).execute(...);
```

### Consequences

Referencing batch becomes possible. The batch references are simple objects, which require wrapping for bound functions. The entity created from the entity builder could be confused with an actual entity.

### Appendix

#### Repeatability

Currently the request ID (content-id of the batch request headers) is created on `execute()`. This would yield a new request ID on every request execution. The ID would neither be available nor reusable for sharing with other requests.
In the future this should happen when instantiating a request. Users should be able to overwrite this request id.

API (`setBatchId()`):

```ts
interface CreateRequestBuilder<EntityT> {
  ...
  setBatchId(id: string): void;
}
```
