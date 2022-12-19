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

|     Option      | On target<br/>avail/default | On BTP<br/>avail/default |   Remarks   |
| :-------------: | :-------------------------: | :----------------------: | :---------: |
| circuit breaker |            ❌/❌            |          ✅/✅           | via options |
|     timeout     |            ✅/✅            |          ✅/✅           | via options |
|      retry      |            ❌/❌            |          ❌/❌           |    n.a.     |

Tab: Situation in version 2.

## Decision

- Rate limit and bulk limit we will not be done -> no user request.
- We will implement an [extendable middleware approach](#api) to add resilience to the target system.
- Per default there is no (resilience) middleware.
- There is circuit breaker and timeout on BTP services which is on and can not be configured.
- This is a breaking change and therefore will be included in a future major version upgrade.
- All resilience related options (timeout, circuit breaker) are removed in version 3.
- We consider adding a retry for one destination service find by name -> can be introduced after version 3

|     Option      | On target<br/>avail/default | On BTP<br/>avail/default |                      Remarks                       |
| :-------------: | :-------------------------: | :----------------------: | :------------------------------------------------: |
| circuit breaker |            ❌/❌            |          ✅/✅           |                     no options                     |
|     timeout     |            ❌/❌            |          ✅/✅           |                     no options                     |
|      retry      |            ❌/❌            |          ✅/❌           | no options <br/> only for destination find by name |
|   middleware    |            ✅/❌            |          ❌/❌           |               default no middleware                |

Tab: Situation in version 3 after the middle ware was introduced.

## Consequences

The user has the option to switch-on resilience with very basic options.
We simplify our code base by removing all resilience related options.
We introduce a middleware approach for which users can provide their own implementations.
This is not limited to resilience.
We provide resilience implementation and will use this pattern also for the BTP default.

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

In our code, we will pass a middleware array and wrap it around the HTTP call at the very end:

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
  retry?: boolean | number; // default false if true 3 tries
  timeout?: boolean | number; // default true 10 sec
  circuitBreaker?: boolean; // default true
};

const [timeout, circuitBreaker] = resilience();
const [timeout, circuitBreaker, retry] = resilience({ retry: true });
const [timeout, retry] = resilience({ circuitBreaker: false, retry: true });
```

Decisions on options and internal implementation 15th December:

- Options on circuit breaker (CB) are dangerous => we do not consider in first version.
  Since a CB records some state you run into a timing issue: What if options change after the instance is there?
  Options per request are particularly problematic but also global setters are no guarantee.
  Even if you say: Only allow setting options if there is no recorded state in the CB, you could start to see warnings when your system gets more load.
- Only Retry option is number of retires. This makes alignment with CB options possible.
- We will not consider 400-499 HTTP status codes for retry and CB.
  These codes indicate a situation where a retry is pointless and also the system is healthy and does not need CB protection.
- We will use the `destination.url`.
- A cache middleware is considered useful but not done in the first version.
- The `executeWithMiddlewares` function remains internal in first version, and we wait for customer demand.

### Adjusting/Replacing Provided Implementations

Assume a user wants to create a specific timeout for non BTP services.
This is done the follwing way:

```ts
const [timeout, circuitBreaker] = resilience();
function myTimeout(inOut: MiddlewareInOut) {
  const wrapped = (args: any[]) =>
    exitChain
      ? fn(args)
      : Promise.race([fn(args), timeoutPromise<T>(longerTimeout)]); //custom super long timeout
  return {
    fn: wrapped,
    context,
    exitChain
  };
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
