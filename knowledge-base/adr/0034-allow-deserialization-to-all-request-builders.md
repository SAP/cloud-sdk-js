# Allow Deserialization to All Request Builders

This ADR is about deserialization for all request builders

## Status
investigating the possibility

## Context
Generally request bilders take one argument `destination` but only action/function imports request builder takes an additional argument `deataAccessor()` to change a responce data structure like below.

This is a response of `GetAttachmentCount` in the cloud s/4 service `API_CV_ATTACHMENT_SRV`
```
{
  "d": {
    "GetAttachmentCount": {
      "AttachmentCount": 0
    }
  }
}
```
In this case, a user wants a value of `AttachmentCount` but it's wrapped by another object `GetAttachmentCount`.

The `dataAccessor()` can change the structure to what a user want
```
const request = functionImports
    .getAttachmentCount({param})
    .execute(destination, data => data.d.GetAttachmentCount
```
then retuns
```
{
  "d": {
    "AttachmentCount": 0
  }
}
```

current implementation
```
#action-function-import-request-builder-base.ts

async execute(
  destination: DestinationOrFetchOptions,
  dataAccessor?: (data: any) => any
): Promise<ReturnT> {
  return this.executeRaw(destination).then(response => {
    const data = dataAccessor
      ? { d: dataAccessor(response.data) }
      : response.data;
    return this.responseTransformer(data);
  });
}
```

## Discussion
Some other request builders also should have the `dataAcccessor()`. However multiple implementation options are there.

#### **Q1. the `dataAccessor()` should be in the `exexute()` function parameter as optional or separeted as another function?**

**option 1** - palce the `dataAccessor()` in the `execute()` as same as a current implementation. (currently it is only implemented in action/function import request builder.) User call the function like
```
const request = functionImports
    .getAttachmentCount({param})
    .execute(destination, data => data.d.GetAttachmentCount)
```
- pros: same as current functionality
- cons: complicated. other methods `set`, `skip` or `selct` are separeted. why only the `dataAccessor()` is included?

**option 2** - separated as another function. User call the function like (disscuss about how to separete later!)
```
const request = functionImports
    .getAttachmentCount({param})
    .dataAccessor(data => data.d.GetAttachmentCount)
    .execute(destination)
```
- pros: keep `execure()` simple.
- cons: current one will be deprecated. both are needed. old one will be removed in fure version(breaking change)?

#### **Q2-1. If it should be included, how?**

**option 1**: create another parant class like `MethodRequestBuilderWithDataAccessor`
(see below all request builder list)

```
#action-function-import-request-builder-base.ts

export abstract class ActionFunctionImportRequestBuilderBase<...>
  extends MethodRequestBuilderWithDataAccessor<...> {
  ...
  async execute(
    destination: DestinationOrFetchOptions,
    this.dataAccessor?
  ): Promise<ReturnT> {
    return this.executeRaw(destination).then(response => {
      const data = dataAccessor
        ? { d: dataAccessor(response.data) }
        : response.data;
      return this.responseTransformer(data);
    });
  }
}
```

**option 2**: add the `dataAccessor()` into each request builders repeatedly
```
#action-function-import-request-builder-base.ts

async execute(
  destination: DestinationOrFetchOptions,
  dataAccessor?: (data: any) => any
): Promise<ReturnT> {
  return this.executeRaw(destination).then(response => {
    const data = dataAccessor
      ? { d: dataAccessor(response.data) }
      : response.data;
    return this.responseTransformer(data);
  });
}

#get-all-request-builder-base.ts

async execute(
    destination: DestinationOrFetchOptions,
    dataAccessor?: (data: any) => any
  ): Promise<EntityT[]> {
    return this.executeRaw(destination).then(response => {
      const data = dataAccessor
        ? { d: dataAccessor(response.data) }
        : response.data;

      return this.dataAccessor
        .getCollectionResult(data) 
        .map(json =>
          this.entityDeserializer.deserializeEntity(
            json,
            this._entityApi,
            response.headers
          )
        )
    });
```

#### **Q2-2. If it should be separated, how?**

**option 1**: create another parent class like `MethodRequestBuilderWithDataAccessor` to separete it. can user call like.

```
const request = functionImports
    .getAttachmentCount({param})
    .dataAccessor(data => data.d.GetAttachmentCount)
    .execute(destination)
```

the `dataAccessor()` will be in parent class like
```
#request-builder-base.ts

export abstract class MethodRequestBuilderWithDataAccessor<...> {
  ...
  dataAccessor(...){...}
  ...
}
```
- pros: no-duplication
- cons: more complicated inhelitance

**options** 2: dataAccessor methods are implemented in each child classes.
- pros: not comlicated inheritance, simple
- cons: co-duplication

## Target Request Builders

Which request builders should have the `dataAccessor()` or not?

- packages/odata-common/src/request-builder/batch/batch-request-builder.ts
- packages/odata-common/src/request-builder/action-function-import-request-builder-base.ts
- packages/odata-common/src/request-builder/count-request-builder.ts
- packages/odata-common/src/request-builder/create-request-builder-base.ts
- packages/odata-common/src/request-builder/delete-request-builder-base.ts
- packages/odata-common/src/request-builder/get-all-request-builder-base.ts
- packages/odata-common/src/request-builder/get-by-key-request-builder-base.ts
- packages/odata-common/src/request-builder/update-request-builder-base.ts
- packages/openapi/src/openapi-request-builder.ts


## Decision
TBD
(dataAccessor should be changed to more explisit name)

## Appendix


### Useful links

- [Ticket](https://github.com/SAP/cloud-sdk-backlog/issues/698)
- [Original Ticket](https://github.com/SAP/cloud-sdk-backlog/issues/73)
- [Original issue](https://github.com/SAP/cloud-sdk-js/issues/682)
- [Mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)

dataAccessor need  to be change a name