# Resilience Options in the SAP Cloud SDK for JavaScript

## Status

proposed

## Context

### Overview on Request Types

If a user uses the typed clients or the `executeHttpRequest()` method, the SDK creates a different requests.
In order to discuss the different resilience options it is good to list these requests first.
The term `target system` is used for the system defined in the destination.

- XSUAA (BTP service) to fetch a service token
- destiantaion service (BTP service) to fetch the destination
- CSRF token request to the target system for non-read requests
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
- flexible middleware approach implemented by the user more flexible
- You could make mistakes: multi-tenant circuit breaker or retry if breaker is open
- Configuration on a per request wanted

## Decision

- Rate limit and bulk limit we will not do since -> no user request.
- Step 1: Circuit breaker is added and made tenant aware 
- Step 2: Retry is added and excluded if circuit breaker is open.
- Step 3 (Optional): Make resilience globally configurable for all requests.
Do this on demand or after customer feedback.
- Default for circuit breaker is on.
- Default for retry is off since this seems a bigger behavior change

|     Option      | On target | On BTP | Default target | Default BTP | Remarks |
| :-------------: | :-------: | :----: | :------------: | :---------: | --- |
| circuit breaker |    ✅     |   ✅   |    enabled     |   enabled   | tenant aware |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |  |
|      retry      |    ✅     |   ✅   |    disabled    |   disabled  | no retry: circuit breaker open and 401,403 |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     | |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     | |


### Options

The `RetryOptions` and `CircuitBreakerOptions` could be used to overwrite the default values.
If you pass `true`,this will enable the resilience option with the default values.

```ts
type RetryOptions = undefined | true | AsynRetryLibOptions
type CircuitBreakerOptions = undefined | true | OpssumLibOption

interface OpssumLibOption = {
    timeout?: number | false | undefined; //default 10000
    errorThresholdPercentage?: number | undefined; //default 50
    volumeThreshold?: number | undefined; // default 10
    resetTimeout?: number | undefined; //default 30000
    isolationStragtegy?: IsolationStrategy //default tenant
};

interface AsynRetryLibOptions = {
    retries?: number //default 10
    factor?: number // default  2.
    minTimeout?: number  // default 1000 ms.
    maxTimeout?: number  // default Infinity.
    randomize?: boolean // default true.
    onRetry: (e:Error)=>{} // default undefined
}
```

### Variant A - Opinionated

- We pick an implementation and only provide options
- For retry, we would use [async retry](https://www.npmjs.com/package/async-retry)
- For circuit breaker we would use [opossum](https://www.npmjs.com/package/opossum)

This determines the options.
The API would look like:

```ts
myApi
  .getAll()   
  .timeout(20) //deprecate 
  .resilience({
      timeout: 123,          // undefined | number | {BTP:number, target: number }
      circuitBreaker: true,  // RetryOptions | {BTP: RetryOptions, target: RetryOptions }
      retry: true            // CircuitBreakerOptions | {BTP: CircuitBreakerOptions, target: CircuitBreakerOptions }
  })    
  .execute({ 
      enableCircuitBreaker: true, //deprecate 
      timeout: 10, //deprecate
      destinationName: 'my-dest'
  });
executeHttpRequest({
    enableCircuitBreaker: true, //deprecate 
    timeout: 10, //deprecate
    destinationName: 'my-dest'
  },
  {
  resilience: {
       timeout: 123,          // undefined | number | {BTP:number, target: number }
       circuitBreaker: true,  // RetryOptions | {BTP: boolen|RetryOptions, target: RetryOptions }
       retry: true            // CircuitBreakerOptions | {BTP: CircuitBreakerOptions, target: CircuitBreakerOptions }
   }
  }
);
```

Pro:
- Easy to use
- Defaults non-breaking not an issue
- TypeScript shows options

Contra:
- No custom implementation
- We have to make assumption on reasonable behavior

### Variant B - Middleware (Default off)

- Users can pass a function taking a `Promise<T>` and returning a `Promise<T>`. 
This function will be executed around the http calls (BTP and target) system
- We provide a sample implementation `resilience()` for easy consumption
- Assumes all resilience is switched of per default

```ts
myApi
  .getAll()   
  .middleware(resilience()) //use all default value
  .execute({ 
      destinationName: 'my-dest'
  });

myApi
  .getAll()   
  .middleware(resilience({
      timeout: 123,          // undefined | number | {BTP:number, target: number }
      circuitBreaker: true,  // RetryOptions | {BTP: RetryOptions, target: RetryOptions }
      retry: true            // CircuitBreakerOptions | {BTP: CircuitBreakerOptions, target: CircuitBreakerOptions }
  }))
  .execute({ 
      destinationName: 'my-dest'
  });

Parameters<middleware> = [async <T>(fn: Promise<T>, context?: 'BTP'|'TARGET') => Promise<T>]

```

Pro:
- Easy to use
- Flexible 

Contra:
- TypeScript shows options
- We have to make assumption on reasonable behavior
- All resilience off is a behavioral change which could be seen as breaking

### Variant C - Middleware (Named)

- Similar to variant B
- Assumes that  some resilience is switched on per default and our approach needs to consider this
- An optional `id` is passed to the `middleware` method.

```ts
myApi
  .getAll()   
  .middleware(resilience(),id)                                         
  .execute({ 
      destinationName: 'my-dest'
  });

Parameters<middleware> = [async <T>(fn: Promise<T>, context?: 'BTP'|'target') => Promise<T>,string]
```

Use Case A:
- User wants just to switch on resilience and use default (circuit breaker and timeout)
- Id is omitted and `resilice()` default function is passed to middleware call
- Our function object contains a property `resilice().id`  set to `sdkResilience` to indicate it is a SDK resilience middleware and replace default resilience
- XXXXXX should this do something different to the default?? XXXX

Use Case B:
- User wants to switch on resilience and adjust the options
- Id is omitted and options are passed to middleware call
- The options are extended - the example below would add retry and set a different timeout  (circuit breaker remains)
```ts
resilience({          
      timeout: 123,
      retry: {retries: 3}
  })
```

Use Case C:
- User needs to replace the resilience implementation because options do not do the trick
- A custom method is passed
- `sdkResilience`  is passed as id in the `.middleware()` method or the custom method needs the property `id` set to be `sdkResilience`
- If done the implementation of the SDK is omitted and the provided one is used instead

Use Case D:
- User wants to add non resilience middleware or extend the existing one
- id is omitted
- method with custom implementation is passed and executed in order
```ts
myApi
  .getAll()   
  .middleware(resilience({retry:true})) //switch on retry using default implementation 
  .middleware(customHanlder1)
  .middleware(customHanlder2)
    .execute({ 
      destinationName: 'my-dest'
  });
```

### Global Switch

Up to know we discussed configuration on a per-request basis.
In practice, it could be desirable to enable resilience globally for all requests.

- Request config overrules global one
- Some global state holds the given option
- Implementation check is global config is present and uses them in the request

```ts
//Variant A
globalResilience(options)

//Variant B 
globalResilience(middleWare : <T>(fn: Promise<T>, context?: any) => Promise<T>)

//Variant C
globalResilience(middleWare : <T>(fn: Promise<T>, context?: any) => Promise<T>,id:string)
)


```

## Consequences

The consumer has the option to switch on:

- retries for calls to the target system
- circuit breaker for calls to the target system
