# Resilience Options in the SAP Cloud SDK for JavaScript

## Status

proposed

## Context

### Overview on Request Types

If a user uses the typed clients or the `executeHttpRequest()` method, the SDK creates a different requests.
In order to discuss the different resilience options it is good to list these requests first.
The term `target system` is used for the system defined in the destination.

- XSUAA (BTP service) to fetch a service token
- Destiantaion service (BTP service) to fetch the destination
- CSRF token request to the target system for non read requests
- actual request to the target system

In the discussion we group the latter two requests to the target system with respect to resilience and the first two.

### Status Quo

We have two interfaces considering resilience:

```ts
export interface ResilienceOptions {
  enableCircuitBreaker?: boolean;
  timeout?: number;
}

export interface HttpRequestConfigBase {
    ...
    timeout?: number | false | undefined
    ...
}
```

- The `ResilienceOptions` are applied to the BTP service calls. They contain a circuitBreaker and timeout.
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
| circuit breaker |    ❌     |   ✅   |      n.a.      |  disabled   |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |
|      retry      |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |

Since we have already some config it would be strange to introduce some `decorator` based approach.
We will stick to the more native javascript version.

## Decision

- Rate limit and bulk limit are hard to achieve in node processes.
- It is meaningful to protect the BTP services with a circuit breaker.
- A retry is not meaningful for BTP, but for the target system.
- The retry should bail on 401 and 403 status codes.
- The default should be non-breaking

|     Option      | On target | On BTP | Default target | Default BTP |
| :-------------: | :-------: | :----: | :------------: | :---------: |
| circuit breaker |    ✅     |   ✅   |    disabled    |   enabled   |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |
|      retry      |    ✅     |   ❌   |    disabled    |    n.a.     |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |

- For retry, we would use [async retry](https://www.npmjs.com/package/async-retry).
- For circuit breaker we would use [opossum](https://www.npmjs.com/package/opossum)

This more or less determines the options.
The API could look like:

```ts
myApi
  .getAll()
  .timeout(20)
  .retry(retryOptions) //RetryOptions
  .circuitBreaker(breakerOptions) //CircuitBreakerOptions
  .execute({ enableCircuitBreaker: true, timeout: 10 });
executeHttpRequest(
  { enableCircuitBreaker: true, timeout: 10 },
  {
    timeout: 20,
    retryOptions, // RetryOptions | undefined | true
    breakerOptions // CircuitBreakerOptions | undefined | true
  }
);
```

The `retryOptions` and `circuitBreaker` could be used to overwrite the default values.
If you pass `true` in the `executeHttpRequest` this will enable the resilience option with the default values.

```ts
interface CircuitBreakerOptions = {
    timeout?: number | false | undefined; //default 10000
    errorThresholdPercentage?: number | undefined; //default 50
    volumeThreshold?: number | undefined; // default 10
    resetTimeout?: number | undefined; //default 30000
};

interface RetryOptions = {
    retries?: number //default 10
    factor?: number // default  2.
    minTimeout?: number  // default 1000 ms.
    maxTimeout?: number  // default Infinity.
    randomize?: boolean // default true.
    onRetry: (e:Error)=>{} // default undefined
}
```

## Consequences

The consumer has the option to switch on:

- retries for calls to the target system
- circuit breaker for calls to the target system
