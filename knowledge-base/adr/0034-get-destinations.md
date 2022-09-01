# ADR template by Michael Nygard

This is based on the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).

In each ADR file, write these sections:

# Get All Destinations API


## Status

TBD

## Context

Customers would like to get all destinations for an account using the SDK and it would be nice to expose this with a proper interface. 

The `getDestinations()` function should be similiar to our `getDestination()` function which has the following API:

```ts
export async function getDestination(
  options: DestinationFetchOptions & DestinationForServiceBindingOptions
): Promise<Destination | null> {
  const destination =
    searchEnvVariablesForDestination(options) ||
    (await searchRegisteredDestination(options)) ||
    (await searchServiceBindingForDestination(options)) ||
    (await getDestinationFromDestinationService(options));
  return destination;
}
```

If we were to include all of the same look-up steps, this could become quite cumbersome, as well as being relatively expensive.
Currently all functions searching for a destination only work with a single destination name, meaning we would have to either rewrite or create new functions for every single look-up process.

## Decision


### Option 1

Rewrite existing- or create new look-up functions which return all destinations, instead of a specific one.
This would result in relatively expensive calls and requires alot of rework.
However it would provide the users with an API that is consistent wiht `getDestination()`.

```ts
export async function getDestinations(
  options: DestinationOptions & DestinationForServiceBindingOptions
): Promise<Destination[] | null> {
  const destinations = searchEnvVariablesForDestinations(options).concat(
            (await searchRegisteredDestinations(options)),
            (await searchServiceBindingForDestinations(options)),
            (await getDestinationFromDestinationServices(options))
        );
  return destinations;
}
```

### Option 2

Only get all destinations from the destinations service, as this will be by far the most common use case.
Would require the least amount of effort, but wouldn't cover potential corner cases.

```ts
export async function getDestinationsFromDestinationService(
  options: DestinationOptions
): Promise<Destination[] | null>
```

### Option 3

Only offer destinatons from the destination service and environment variables.
This way we could offer easier testability and still cover the most common use case.
Would require comparably low effort, but wouldn't cover potential corner cases.

```ts
export async function getDestinations(
  options: DestinationOptions & DestinationForServiceBindingOptions
): Promise<Destination[] | null> {
  const destinations =
    searchEnvVariablesForDestinations(options) ||
    (await getDestinationsFromDestinationService(options));
  return destination;
}
```

### Options 4

Similar to Option 1, but offer the possibility to toggle on/off certain look-ups.
Would take the most effort and increase code complexity, but increase 

```ts
interface DestinationLookupOptions extends DestinationOptions {
    searchEnvVariablesForDestinations?: boolean,
    searchRegisteredDestinations?: boolean,
    searchServiceBindingForDestinations?: boolean,
    getDestinationFromDestinationServices?: boolean
}

export async function getDestinations(
  options: DestinationLookupOptions & DestinationForServiceBindingOptions
): Promise<Destination[] | null> {
  const destinations = searchEnvVariablesForDestinations(options).concat(
            (await searchRegisteredDestinations(options)),
            (await searchServiceBindingForDestinations(options)),
            (await getDestinationFromDestinationServices(options))
        );
  return destinations;
}
```

## Consequences

What becomes easier or more difficult to do because of this change?

# Appendix [Optional]

Details on the discussion leading to the decision.
Often a list of options with pros and cons including the selection implementation.

## Option A

## Option B

...