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
| circuit breaker |    ❌     |   ✅   |      n.a.      |  enabled   |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |
|      retry      |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |

## Decision

### SDK vs. User

There are two standpoints:
- User needs to implement it
- SDK implements it

Arguments in the discussion
- flexible middle ware approach implemented by the user more flexible
- You could make mistakes: multi-tenant circuit breaker or retry if breaker is open
- Configuration on a per request wanted

## Decision

- Rate limit and bulk limit we will not do since -> no user request.
- Step 1: Circuit breaker is added and made tenant aware 
- Step 2: Retry is added and excluded if circuit breaker is open.
- Default for circuit breaker is on.
- Defalt for retry is off since this seems a bigger behavior change


|     Option      | On target | On BTP | Default target | Default BTP | Remarks |
| :-------------: | :-------: | :----: | :------------: | :---------: | --- |
| circuit breaker |    ✅     |   ✅   |    enabled     |   enabled   | tenant aware |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |  |
|      retry      |    ✅     |   ✅   |    disabled    |   disabled  | no retry: circuit breaker open and 401,403 |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     | |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     | |

- For retry, we would use [async retry](https://www.npmjs.com/package/async-retry).
- For circuit breaker we would use [opossum](https://www.npmjs.com/package/opossum)

This determines the options.
The API:

```ts
myApi
  .getAll()   
  .timeout(20) //deprecate 
  .resilienc({
      timeout: 10,
      circuitBreaker: true,   // CircuitBreakerOptions | undefined | true
      retry: true             // RetryOptions | undefined | true
  })
  .execute({ 
      enableCircuitBreaker: true, timeout: 10, //deprecate
      destinationName: 'my-dest'
  });
executeHttpRequest({
    enableCircuitBreaker: true, timeout: 10, //deprecate
    destinationName: 'my-dest'
  },
  {
   resilience: {
     timeout: 10,
     circuitBreaker: true,  // CircuitBreakerOptions | undefined | true
     retry: true            // RetryOptions | undefined | true
   }
  }
);
```
```ts
myApi
  .getAll()   
  .middleware(resilience())
  .execute({ 
      destinationName: 'my-dest'
  });
myApi
  .getAll()   
  .middleware(resilience({
    circuitBreaker: false,
    timeout: 1
  }))
  .execute({ 
      destinationName: 'my-dest'
  });  
  
  
interface Foo {
  middleware: async <T>(fn: Promise<T>, context?: any) => Promise<T>
}
```
The `RetryOptions` and `CircuitBreakerOptions` could be used to overwrite the default values.
If you pass `true`,this will enable the resilience option with the default values.

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
