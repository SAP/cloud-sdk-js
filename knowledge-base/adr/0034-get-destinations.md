# Get All Destinations API

## Status

approved

## Context

Our users would like to get all destinations for an account using the SDK and it would be nice to expose this with a proper interface. 

The `getAllDestinations()` function should be similiar to our `getDestination()` function which has the following API:

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

We decided to implement the function which only gets all destinations from the destination service, as it will fulfill most user stories. We can still implement the other functions on-demand.

```ts
export async function getAllDestinationsFromDestinationService(
  options: DestinationOptions
): Promise<Destination[] | null>
```

This function should throw a warning if one of the destinations is incomplete/compromised.

If our users have feature requests for the other look-up functions, e.g. `searchEnvVariablesForDestination` etc., we shall implement them on-demand.

If we end up implementing every look-up function to get all destinations, we are to implement the parent function and deprecate and remove the predecessors functions.

## Consequences

Our users get access to a function returning all destinations from the destination service.

# Appendix

Below are other potential candidates we considered.

### Option 1

Rewrite existing- or create new look-up functions which return all destinations, instead of a specific one.
This would result in relatively expensive calls and requires alot of rework.
However it would provide the users with an API that is consistent with `getDestination()`.

```ts
export async function getAllDestinations(
  options: DestinationOptions & DestinationForServiceBindingOptions
): Promise<Destination[] | null> {
  const destinations = searchEnvVariablesForAllDestinations(options).concat(
            (await searchRegisteredAllDestinations(options)),
            (await searchServiceBindingForAllDestinations(options)),
            (await getAllDestinationsFromDestinationService(options))
        );
  return destinations;
}
```

### Option 2

Only get all destinations from the destinations service, as this will be by far the most common use case.
Would require the least amount of effort, but wouldn't cover potential corner cases.

```ts
export async function getAllDestinationsFromDestinationService(
  options: DestinationOptions
): Promise<Destination[] | null>
```

### Options 3

Similar to Option 1, but offer the possibility to toggle on/off certain look-ups.
Would take the most effort and increase code complexity, but gives the user more options. 

```ts
interface DestinationLookupOptions extends DestinationOptions {
    searchEnvVariablesForDestinations?: boolean,
    searchRegisteredDestinations?: boolean,
    searchServiceBindingForDestinations?: boolean,
    getDestinationFromDestinationServices?: boolean
}

export async function getAllDestinations(
  options: DestinationLookupOptions & DestinationForServiceBindingOptions
): Promise<Destination[] | null> {
  const destinations = searchEnvVariablesForAllDestinations(options).concat(
            (await searchRegisteredAllDestinations(options)),
            (await searchServiceBindingForAllDestinations(options)),
            (await getAllDestinationFromDestinationService(options))
        );
  return destinations;
}
```