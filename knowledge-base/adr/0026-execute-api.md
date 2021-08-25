# Conscious Decision on the Execute-Methods API

## Status

accepted

## Context

We have three execute methods:

1. In the OData request builders e.g. [get-all-request-builder-base.ts](https://github.com/SAP/cloud-sdk-js/blob/6c9e8fa67ffbf4e84208e4bf0c790c04550a0cc7/packages/core/src/odata-common/request-builder/get-all-request-builder-base.ts#L100)
2. In the [openapi-request-builder.ts](https://github.com/SAP/cloud-sdk-js/blob/6c9e8fa67ffbf4e84208e4bf0c790c04550a0cc7/packages/core/src/openapi/openapi-request-builder.ts#L104)
3. In the [http-client.ts](https://github.com/SAP/cloud-sdk-js/blob/6c9e8fa67ffbf4e84208e4bf0c790c04550a0cc7/packages/core/src/http-client/http-client.ts#L91)

All three entry points have in common, that they allow for a flexible destination input:

- A destination object which must contain at least an url
- A destination name and JWT to fetch the destination via the destination service

For the latter case there exist [DestinationOptions](https://github.com/SAP/cloud-sdk-js/blob/6c9e8fa67ffbf4e84208e4bf0c790c04550a0cc7/packages/core/src/connectivity/scp-cf/destination/destination-accessor.ts#L39), which change the behavior how destinations are received.
There are topics like caching, subscriber/provider first but also the `iss` option which replaces the full JWT in destination fetching.

The `DestinationOptions` are only passed to methods 1. and 2. and not to the http-client.
The execute method of the http-client uses the default `DestinationOptions`.

The code currently also contains destination fetching on multiple levels.
If you pass a destination name and JWT to the methods 1. and 2. it will fetch the destination early on.
Then it delegates the work to the execute method of the `http-client` where the destination fetch logic is skipped.

This ADR discusses multiple ways to unify and clean up the code.

## Options

### A: DestinationOptions everywhere

You include the destination options in method 1., 2. and 3.
Since we have already optional options on the `execute()` of the HTTP we must do something.
Options are:

- A combined config: request-config and destination-options: they have nothing to do with each other
- A builder pattern: `new HttpClient().withRequestConfig({}).withDestinationConfig({}).execute(destinationAndJWT)`

### B: DestinationOptions only on 1. and 2.

This is more or less the current situation.
Use the default DestinationOptions on 3. but allow for destination fetching.
Some sub-options are:

- Use a builder to set the DestinationOptions.
- Adjust the code so that the destination-fetching is only done once in the `http-client`.
  This would mean some work in the OData builder, because there destination URL and so on are used in the start.
- Adjust the code so that the destination fetching is not done on the `execute()` of the `http-client.ts`

### C: DestinationOptions Nowhere

The `execute()` does not have destination options at all.
Some sub-options are:

- Pass full destination to execute
- Remove the options from the `execute9()` method and use a `withDestinationOption()`.
  We should adjust the `execute()` method if the `withDestinationOption()` was set passing the full destination should be removed.
- Removed all arguments from the `execute()` and make a `withDestination()` or `withDestinationByName()` methods.
  In this case we should exclude the `execute()` method as long as the `withDestination()` has not been called and add a exception of JS.

## Decision

We think that this is not a big pain point currently, and we do not want to spend a lot of our limited resources on it.
Hence, we decided on the following:

- Keep the `DestinationOptions` only on OData adn OpenApi clients.
- If users ask about the options on the `http-client` we will provide a wrapper class or point towards the `getDestination()` method.
- Keep the `userOrFetchDestination()` in all three places, since the OData refactoring would be much work.

We will change one thing.
The API of the `execute()` method is:

```ts
async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
)
```

However, the `DestinationOptions` are only used if you pass a `DestinationNameAndJwt`.
Hence, we will change the API to:

```ts
async execute(
    destination: Destination | DestinationFetchOptions
)
```

Where the `DestinationFetchOptions` is an object containing all the options:

```ts
type DestinationFetchOptions ={
    destinationName: string,
    userJwt?: string,
    isolationStrategy: IsolationStrategy,
    iss: string,
    ...
}
```

We plan to do that breaking change after version 2.0.

## Consequences

Small API improvement but main flow stays the same.
One breaking change introduced in version 3.0 to make usage cleaner.
