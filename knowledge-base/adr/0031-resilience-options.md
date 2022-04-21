# Resilience Options in the SAP Cloud SDK for JavaScript

## Status

accepted

## Context

### Overview on Request Types

If a user uses the typed clients or the `executeHttpRequest()` method, the SDK creates various requests.
In order to discuss the different resilience options, it is good to list these requests first.
The term `target system` is used for the system defined in the destination.

- BTP service requests:
  - XSUAA (BTP service) to fetch a service token
  - Destination service (BTP service) to fetch the destination
- Target system requests:
  - CSRF token request to the target system for non-read requests
  - actual request to the target system

### Status Quo

We have two interfaces considering resilience:

```ts
export interface ResilienceOptions {
  enableCircuitBreaker?: boolean;
  timeout?: number;
}

export interface HttpRequestConfigBase {
  timeout?: number | false | undefined;
}
```

- The `ResilienceOptions` are applied to the BTP service calls. They contain a circuit breaker and timeout.
- The timeout in the `HttpRequestConfigBase` is for all http calls to the target system and passed to axios.

The settings are passed in the following way:

```js
myApi.getAll().timeout(20).execute({ enableCircuitBreaker: true, timeout: 10 });
executeHttpRequest(
  { enableCircuitBreaker: true, timeout: 10 },
  { timeout: 20 }
);
```

So we have something for circuit breaker and timeout.

|     Option      | On target | On BTP | Default target | Default BTP |
| :-------------: | :-------: | :----: | :------------: | :---------: |
| circuit breaker |    ❌     |   ✅   |      n.a.      |   enabled   |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |
|      retry      |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |

## Decision

- Rate limit and bulk limit we will not be done -> no user request.
- We will implement an [extendable middleware approach]('#variant-c').
- Step 1: Circuit breaker will be part of the resilience middleware and will be tenant aware.
- Step 2:Retry will be part of the resilience middleware and disabled if circuit breaker is open.
- Step 3 (Optional): Make resilience globally configurable for all requests.
  Do this on demand or after customer feedback.
- By default the circuit breaker is enabled.
- By default retry is disabled since this is a bigger change of the previous behavior

|     Option      | On target | On BTP | Default target | Default BTP | Remarks                                    |
| :-------------: | :-------: | :----: | :------------: | :---------: | ------------------------------------------ |
| circuit breaker |    ✅     |   ✅   |    enabled     |   enabled   | tenant aware                               |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |                                            |
|      retry      |    ✅     |   ✅   |    disabled    |  disabled   | no retry: circuit breaker open and 401,403 |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                            |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                            |

## Consequences

The user has the option to switch-on and adjust resilience.
If options are not sufficient, custom implementations can be used.

## Implementation Details

### Options

Defaults:

- For retry, we will use [async retry](https://www.npmjs.com/package/async-retry)
- For circuit breaker we will use [opossum](https://www.npmjs.com/package/opossum)

This determines the possible options you can set.
The `RetryOptions` and `CircuitBreakerOptions` could be used to overwrite the default values.
If you pass `true`, this will enable the resilience option with the default values.
If you pass `false`, this will disable the resilience option.

```ts
type RetryOptions = undefined | true | false | AsynRetryLibOptions;
type CircuitBreakerOptions = undefined | true | false | OpssumLibOption;
type TimeoutOptions = undefined | number | { service: number; target: number };

interface OpssumLibOption {
  timeout?: number | false | undefined; // default 10000
  errorThresholdPercentage?: number | undefined; // default 50
  volumeThreshold?: number | undefined; // default 10
  resetTimeout?: number | undefined; // default 30000
  isolationStragtegy?: IsolationStrategy; // default tenant
}

interface AsynRetryLibOptions {
  retries?: number; // default 10
  factor?: number; // default  2.
  minTimeout?: number; // default 1000 ms.
  maxTimeout?: number; // default Infinity.
  randomize?: boolean; // default true.
  onRetry: (e: Error) => {}; // default undefined
}

// in the resiliece call:
type ResilienceOptions = {
  timeout: undefined | number;
  retry: RetryOptions | { service: RetryOptions; target: RetryOptions };
  circuitBreaker:
    | CircuitBreakerOptions
    | { service: CircuitBreakerOptions; target: CircuitBreakerOptions };
};
```

The term `service` indicates the calls to the SAP BTP services and the `target` to the requests to the system in the destination.
The default situation with 10sec timeout, circuit breaker on and retry switched off would be:

```ts
defaultResilienceOptions = {
  timeout: 10000,
  retry: false,
  circuitBreaker: true
};
```

### Variant A - Opinionated

We pick an implementation and only provide options.
The API would look like:

```ts
myApi
  .getAll()
  .timeout(20) // deprecate
  .resilience({...}) // ResilieceOptions
  .execute({
      enableCircuitBreaker: true, // deprecate
      timeout: 10, // deprecate
      destinationName: 'my-dest'
  });
executeHttpRequest({
      destinationName: 'my-dest'
    },
    {
      resilience: {...} // ResilieceOptions
    }
);
```

Pro:

- Easy to use
- Defaults non-breaking
- TypeScript shows options

Contra:

- No custom implementation
- We have to make assumption on reasonable behavior

### Variant B - Middleware (Default off)

- Users can pass a function taking a function with arguments and returning a `Promise<T>`.
- For example the input could be the `http-request` function with arguments and the return the promise of `http-client`
- We provide a sample implementation `resilience()` for easy consumption
- Assumes all resilience is switched off per default

```ts
myApi
  .getAll()
  .middleware(resilience({ retry: 3 }))
  .execute({ destinationName: 'my-dest' });

type Middleware<T> = <T>(
  fn: () => Promise<T>,
  context?: 'service' | 'target'
) => Promise<T>;
```

Pro:

- Easy to use
- Flexible
- TypeScript shows options

Contra:

- Extension of existing resilience not possible

### Variant C - Middleware (Named)<a name="variant-c" />

- Similar to variant B
- Assumes that some resilience is switched on per default and our approach considers this.
- An optional `id` is passed to the `middleware` method.
- The `id` will give us the flexibility to add and manage additional middlewares in the future.

```ts
myApi
  .getAll()
  .middleware(resilience({ circuitBreaker: false }), id)
  .execute({ destinationName: 'my-dest' });

type Middleware<T> = <T>(
  fn: () => Promise<T>,
  context?: 'service' | 'target'
) => Promise<T>;
```

Use Case A :

- User wants to adjust options of resilience.
- `id` is omitted and options are passed to middleware call.
- The default resilience middleware function contains a `id` property with content `sdkResilience`.
- This property identifies the middleware as resilience and replace the default with the one with options.
- The options are extended - the example below would add retry and set a different timeout

```ts
resilience({
  timeout: 123,
  retry: { retries: 3 }
});
```

Use Case B:

- User wants to switch off resilience.
- User passes the relevant options:

```ts
resilience({
  retry: false,
  circuitBreaker: false
});
```

Use Case C:

- User needs to replace the resilience implementation because options are not enough
- A custom method is passed
- `sdkResilience` is passed as id in the `.middleware()` method
- The implementation of the SDK is omitted and the provided one is used instead

```ts
myApi.getAll().middleware(myCustomRelisience, 'sdkResilience').execute({
  destinationName: 'my-dest'
});
```

- This approach can also be used to switch off resilience by providing the identity function.

Use Case D:

- User wants to add non resilience middleware or extend the existing one with additional steps
- `id` is omitted and SDK sets some value
- Methods with custom implementation are passed and executed in order

```ts
myApi
  .getAll()
  .middleware(resilience({ retry: true })) // switch on retry using default implementation
  .middleware(customHanlder1)
  .middleware(customHanlder2)
  .execute({
    destinationName: 'my-dest'
  });
```

Pro:

- Flexible
- Let the user include also other middleware

Contra:

- Most implementation effort

### Global Switch

Up to know we discussed configuration on a per-request basis.
In practice, it could be desirable to enable resilience globally for all requests.

- Per request config overrules global config
- Some global state (list) holds the given option
- Implementation check is global config is present and uses them in the request

```ts
//Variant A
function globalResilience(options: ResilienceOptions) {}

//Variant B
function globalResilience(middleWare: Middleware) {}

//Variant C
function globalResilience(middleWare: Middleware, id: string) {}

function clearGlobalResilience(id?: string) {}
```
