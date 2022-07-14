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
- Step 1: Circuit breaker will be part of the resilience middleware and will be tenant aware.
- Step 2: Retry will be part of the resilience middleware and disabled if the circuit breaker is open.
- Step 3 (Optional): Make resilience globally configurable for all requests.
  Do this on demand or after customer feedback.
- By default the circuit breaker is enabled.
- By default retry is disabled since this is a bigger change of the previous behavior

|     Option      | On target | On BTP | Default target | Default BTP | Remarks                                                    |
| :-------------: | :-------: | :----: | :------------: | :---------: | ---------------------------------------------------------- |
| circuit breaker |    ✅     |   ✅   |    enabled     |   enabled   | tenant aware                                               |
|     timeout     |    ✅     |   ✅   |    enabled     |   enabled   |                                                            |
|      retry      |    ✅     |   ✅   |    disabled    |  disabled   | no retry: circuit breaker open, response status 401 or 403 |
|   rate limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                                            |
|   bulk limit    |    ❌     |   ❌   |      n.a.      |    n.a.     |                                                            |

## Consequences

The user has the option to switch-on and adjust resilience.
If options are not sufficient, custom implementations can be used.

## Implementation Details

### Options

Defaults:

- For retry, we will use [async retry](https://www.npmjs.com/package/async-retry)
- For circuit breaker, we will use [opossum](https://www.npmjs.com/package/opossum)

This determines the possible options you can set.
The `RetryOptions` and `CircuitBreakerOptions` could be used to overwrite the default values.
We will introduce a context passed to the resilience implementation to give information on the context: 

```ts
type RequestContext ={
    url:string,
    headers?: Record<string,string>
    jwt?:string
    method: 'GET'| 'POST' | 'DELTE'
    ...
}
```
The same object is also used to determine and adjust the options
```ts
import { StringValue } from 'ms';
type RetryOptions = 'disabled' | AsyncRetryLibOptions;
type CircuitBreakerOptions = 'disabled'| Omit<OpsosumLibOptions,'timeout'>; //timout is not hanlded by opossum
type TimeoutOptions = 'disabled' | number


interface OpsosumLibOptions {
  timeout?: StringValue | false | undefined; // default 10sec
  errorThresholdPercentage?: number | undefined; // default 50
  volumeThreshold?: number | undefined; // default 10
  resetTimeout?: number | undefined; // default 30000
  isolationStragtegy?: IsolationStrategy; // default tenant
}

interface AsyncRetryLibOptions {
  retries?: number; // default 10
  factor?: number; // default  2.
  minTimeout?: StringValue; // default 1000 ms. See https://github.com/vercel/ms
  maxTimeout?: StringValue; // default Infinity. See https://github.com/vercel/ms
  randomize?: boolean; // default true.
  onRetry: (e: Error) => {}; // default undefined
}

// in the resilience call:
type ResilienceMiddleWareOptions = {
  timeout: (context:RequestContext)=>TimeoutOptions
  retry:  (context:RequestContext)=>RetryOptions
  circuitBreaker: (context:RequestContext)=>CircuitBreakerOptions  
};
```

The explicit way to define the default situation with 10sec timeout, circuit breaker for BTP and retry switched off would be:

```ts
defaultResilienceOptions: ResilienceMiddleWareOptions = {
  timeout: (context:RequestContext)=>1000,
  retry: (context:RequestContext)=>'disabled',
  circuitBreaker: circuitBreakerOnForBTP
};

function circuitBreakerOnForBTP(context:RequestContext):CircuitBreakerOptions{
    if(context.url.includes(btpDomain)){
        return defaultCircuitBreakerOptions
    }
    return 'disabled'
}
```

The default will change in version 3.0 to:

```ts
defaultResilienceOptions: ResilienceMiddleWareOptions = {
  timeout: (context:RequestContext)=>1000,
  retry: (context:RequestContext)=>defaultRetryOptions,
  circuitBreaker: (context:RequestContext)=>defaultCircuitBreakerOptions
};
```
We can provide sophisticated methods if asked for. For example switching on return only for non BTP requests:

```ts
function retryForTarget(context:RequestContext):RetryOptions{
    if(context.url.endsWith(btpDomain)){
        return 'disabled'
    }
    return defaultRetryOptions
}
```

A `disabled` method for convenience could be nice:
```ts
function disabled(context:RequestContext):'disabled'{
    return 'disabled'
}
```

### API

- Assumes that some resilience is switched on per default and our approach considers this.
- An optional `id` is passed to the `middleware` method.
- The `id` will give us the flexibility to add and manage additional middlewares in the future.
- You can find some rough PoC examples [here](0031-resilience.js)

```ts
myApi
  .getAll()
  .middleware(resilience({ circuitBreaker: ()=>'disabled' }), id)
  .execute({ destinationName: 'my-dest' });

executeHttpRequest({
          destinationName: 'my-dest'
        },
        {
          resilience: resilience({ timeout: ()=>123 })
        }
);

type MiddlewareInOut<T> = {
  fn: () => Promise<T>,
  exitChain: boolean,
  context?: RequestContext
}

type Middleware<T> = <T>(options:MiddlewareInOut) => MiddlewareInOut;
```

Implementation Idea: It could make sense to model the resilience internally as multiple middle wares:
```ts
function resilience(){
    const resilienceSteps:MiddleWare[] = [circuitBreaker,timeout,retry]
    return (
            options:MiddlewareInOut
    )=>{
      resilienceSteps.asynPipe( options)               
    }
}
```

Implementation Idea: It could make sense to introduce a `cache` middleware later the resilience, triggering an early chain exit.

### Parameter Passing

We will extend the `HttpRequestOptions` with the resilience related options and pass these around:

```ts

function executeHttpRequest<T extends HttpRequestConfigWithOrigin>(
  destination: DestinationOrFetchOptions,
  requestConfig: T,
  options?: HttpRequestOptions
){
    //implementation
}

type HttpRequestOptions = {
    csrfTokenFetching:boolean,
    resilience: ResilienceOptions
}
```

If methods do http request they will get the additional option. For example the getDestination or serviceToken methods:

```ts
function getDestination(
    options: DestinationFetchOptions & DestinationForServiceBindingOptions,
httpRequestOptions?: HttpRequestOptions
){
  //implementation
}

function serviceToken(  service: string | Service,        
                        options?: OldOptions & {resilience: ResilienceOptions}){
  //implementation
}
```

### Use Cases

Use Case A :

- User wants to adjust options of resilience.
- `id` is omitted and options are passed to middleware call.
- The default resilience middleware function contains a `id` property with content `sdkResilience`.
- This property identifies the middleware as `resilience` and replaces the default with the one with options.
- The options are extended - the example below would add retry and set a different timeout

```ts
resilience({
  timeout: ()=>123,
  retry: ()=>({...defaultOptions,retires:3})
});
```

With the funciton also complicated conditions are possible see `retryForTarget` above.

Use Case B:

- User wants to switch off resilience
- User passes the relevant options:

```ts
resilience({
  retry: retryForTarget,
  circuitBreaker: ()=>'disabled'
});
```

Use Case C:

- User needs to replace the resilience implementation because options depending on request config are not enough
- A custom method is passed
- `sdkResilience` is passed as id in the `.middleware()` method
- The implementation of the SDK is omitted and the provided one is used instead

```ts
myApi.getAll().middleware(myCustomResilience, 'sdkResilience').execute({
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
  .middleware(customHandler1)
  .middleware(customHandler2)
  .execute({
    destinationName: 'my-dest'
  });
```

Pro:

- Flexible
- Let the user include also other middleware

Contra:

- Most implementation effort

### Setting Resilience Globally

Up to know, we discussed the configuration on a per-request basis.
In practice, it could be desirable to enable resilience globally for all requests.

- Per request config overrules global config
- Some global state (list) holds the given option
- Implementation checks if global config is present and uses them in the request

```ts
//Variant A
function globalResilience(options: ResilienceOptions) {}

//Variant B
function globalResilience(middleWare: Middleware) {}

//Variant C
function globalResilience(middleWare: Middleware, id: string) {}

function clearGlobalResilience(id?: string) {}
```

### Deprecation Period

We will have a deprecation period for the old options.
If both options are given then new one should win.

```ts
myApi
  .getAll()
  .timeout(456)                //deprecated      
  .middleware(resilience({ circuitBreaker: ()=>'disabled',timeout:()=>123 }), id)
  .execute({ destinationName: 'my-dest',
    timeout:456,                //deprecated      
    disableCiruitBreaker:true   //deprecated      
  });

//user 123 as timeout and circuit breaker of

executeHttpRequest({
          destinationName: 'my-dest'
        },
        {
          timeout: 456,  
          resilience: resilience({ timeout: ()=>123 })
        }
);

//use 123 as timeout
```


In the intermediate period where options can be given via the old and new you have to evaluate:

```ts
import {defaultResilienceBTPServices} from "@sap-cloud-sdk/connectivity/dist/scp-cf";

function getClientCredentialsToken(service: string | Service,
                                   userJwt?: string | JwtPayload,
                                   options?: ResilienceOptions & { resilience: ResilienceMiddleWareOptions }) {
    
   const timeout = options.resilience.timeout || options.timeout ? () => options.timeout : defaultResilienceOptions.timeout
}


```
