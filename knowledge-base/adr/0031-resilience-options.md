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
- We will implement an [extendable middleware approach](#api).
- Per default the resilience middleware is off.
- This is a breaking change and therefore will be included in a future major version upgrade.
- All resilience related options (timeout, circuitbreaker) are deprecated in version 2.

|     Option      | On target | On BTP | Default target | Default BTP | Remarks                                                    |
| :-------------: | :-------: | :----: | :------------: | :---------: | ---------------------------------------------------------- |
| circuit breaker |    ❌     |   ❌   |    enabled     |   enabled   | tenant aware                                               |
|     timeout     |    ❌     |   ❌   |    enabled     |   enabled   |                                                            |
|      retry      |    ❌     |   ❌   |    disabled    |  disabled   | no retry: circuit breaker open, response status 401 or 403 |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                                            |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                                            |

## Consequences

The user has the option to switch-on resilience with very basic options.
We simplify our code base by removing all resilience related options.
We introduce a middleware approach for which users can provide their own implementations.
This is not limited to resilience.

## Implementation Details

### Middleware

The implementation is based on a middleware approach:

```ts
type MiddlewareInOut<T> = {
  fn: () => Promise<T>;
  exitChain: boolean;
  context?: RequestContext;
};

type Middleware<T> = <T>(options: MiddlewareInOut) => MiddlewareInOut;
```

In our code, we will pass a middleware array and wrap it around every HTTP call at the very end:

```ts
async function someHttpSdkMethod(middlewares: Middleware[]): Promise<any> {
  //return someHttpCall(someArgs)
  const context = {}; //context for this method

  return joinMiddlewares(middlewares)({
    context,
    fn: someHttpCall,
    someArgs,
    exitChain: false
  }).fn(someArgs);
}
```

The method `joinMiddlewares` joins all the function in an async pipe.
The context will be a minimal but guaranteed amount of information:

```ts
export interface Context {
  category: 'xsuaa' | 'destination' | 'user-defined';
  destination: Destination; //only url is mandatory
  tenantId: string;
  args: any[]; //arguments passed to the method
}
```

### Enable Resilience

As mentioned resilience is not switched on per default.
There are no resilience related options on the `execute` or builder methods.
Users add resilience via the middleware:

```ts
myApi
  .getAll()
  .setMiddleware(resilience({ circuitBreaker: false }))
  .execute({ destinationName: 'my-dest' });

executeHttpRequest(
  {
    destinationName: 'my-dest'
  },
  {
    middleware: resilience()
  }
);
```

### Options

The options are super basic - if you need them either create a feature request or implement it on your own:

```ts
type ResilienceOptions = {
  retry?: boolean; // default false
  timeout?: boolean; // default true
  circuitBreaker?: boolean; // default true
};

const [timeout, circuitBreaker] = resilience();
const [timeout, circuitBreaker, retry] = resilience({ retry: true });
const [timeout, retry] = resilience({ circuitBreaker: false, retry: true });
```

### Adjusting/Replacing Provided Implementations

Assume a user wants to create a specific timeout for non BTP services.
This is done the follwing way:

```ts
const [timeout, circuitBreaker] = resilience();
function myTimeout(inOut: MiddlewareInOut) {
  if (inOut.context.category === 'user-defined') {
    const wrapped = (args: any[]) =>
      exitChain
        ? fn(args)
        : Promise.race([fn(args), timeoutPromise<T>(longerTimeout)]); //custom super long timeout
    return {
      fn: wrapped,
      context,
      exitChain
    };
  }
  return timeout;
}

testApi.requestBuilder().setMiddleware([myTimeout, circuitBreaker]);
```

Since we will have methods to create the `timeout`, `circuitBreaker` and `retry` middleware, we can also export these to make extension easier:

```ts
const standardTimeout = createTimeoutMiddleware();
const standardRety = createRetryMiddleware();

const customCuircuitBreaer = (inOut: MiddlewareInOut) => {
  //some custome Code
};

testApi
  .requestBuilder()
  .setMiddleware([standardTimeout, customCuircuitBreaer, standardRety]);
```

If you want to do something completely custom you just rewrite the whole function without using the SDK implementation at all.

### Libraries

The SDK uses the following libraries to implement resilience:

- For retry, we will use [async retry](https://www.npmjs.com/package/async-retry)
- For circuit breaker, we will use [opossum](https://www.npmjs.com/package/opossum)

### Setting Resilience Globally

Up to now, we discussed the configuration on a per-request basis.
In practice, it could be desirable to enable resilience globally for all requests.

- Per request config overrules global config
- Some global state (list) holds the given option
- Implementation checks if global config is present and uses them in the request

There should be methods to:
- Set multiple middlewares globally
- Remove all globally set middlewares
- [Optional] Remove one particular global middleware by an identifier.
