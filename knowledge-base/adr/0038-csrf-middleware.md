                                                                       ### Structure of the Code

The CSRF token handling is done in the `http-client` before the request is executed:

```ts
    //http-client.ts
  request.headers = await addCsrfTokenToHeader(destination, request, options);   

    return executeWithMiddleware(
      requestConfig.middleware,
      {
        ...
      },
      () => executeFn(request)
    );
```

Currently, the middleware is only added to the executeHttpRequest to the target system.
For the fetch request it is not considered.
Also note that the

### General Improvement I - Make Arguments Adjustable

The CSRF token revealed a problem. Currently, the middleware contains the function `fn` with no way to change the parameters:

```ts
{
    fn: () => Promise<ReturnType>,
    context: Context
}
```

With the CSRF token you would like to change the arguments of the axios request (add the token) without rebuilding the full `fn`.
Note that the `fn` may contain already middleware layers from before.
Same is true for the expiring access tokens from a destination cache.

An idea could be to not only add the return type but also the argument type and add a reference to the `fn`:

```ts
interface Function<ReturnType,ArguemntType> {

    (): Promise<ReturnType>,
    arg: ArguemntType
}

//HttpMiddleware
{
    fn: () => Function<HttpResponse,HttpRequest>,
    context: Context
}
```

### General Improvement II - Disable Fetch CSRF by Default

Not all systems require a CSRF token.
We follow also the trend of optional functionality not being enabled e.g. cache.
Currently, the CSRF token then fails gracefully and we continue this means we can have unnecessary calls.
If the default is off, one could really fail.
This makes it also possible to model such functionality via a middleware.


## Solutions

### Remove CSRF and Provide Convenience Methods

Provide an external method and tell people to use this:

```ts
const csrfToken =publicGetTokenMethod(desitntion)
myApi.create(payload).customHeaders({csrfToken}).execute(desitntion)
```

Pros:
- Flexible
- Easy to use clear spearation

Cons:
- Not the SDK vision to have a set of functions you need to assemble

### Two Separate Middlewares

We keep the two http calls and offer a way to set the middlewares for each of the requests.

```ts
executeHttpRequest({
    methods: 'POST',
    middleware: [],
    csrfMiddleware:[] //only visible for changing request
})
```

Pros:
- no problem with on per default
- clear separation
- people can influence CSRF token fetching via middleware

Cons:
- need to set up things twice
- gives CSRF too much attention

### CSRF as one Middleware layer

Do the CSRF token fetching in a middleware:

executeHttpRequest({
methods: 'POST',
middleware:  [csrf(), timeout(), circuitBreaker(), retry()],
})

Note that the order is crucial (execution from left to right):
- `[csrf(), timeout(), circuitBreaker(), retry()]` Timeout counts for both requests, open CB blocks csrf, retry includes csrf
- `[timeout(), csrf(), circuitBreaker(), retry()]` Timeout counts target request only,  open CB blocks csrf, retry includes csrf
- `[timeout(), circuitBreaker(), retry(), csrf()]` Csrf does not care about retry, CB and timeout.

Note that the csrf requests are not recorded in the circuit breaker history.
A dedicated timeout or retry is not possible as well.
To allow this you would need to pass it `csrf([timeout(),circuitBreaker()])`
We could offer a default middleware including `csrf()` which does nothing for `GET` requests:

```ts
const defaultMiddleware = [timeout(), circuitBreaker(), csrf([timeout(), circuitBreaker()]), retry()]
```

This means:
- dedicated timeout for the actual request and csrf fetching
- circuit breaker instance based on destination URL will record actual request and csrf fetching
- retry counts total failures either from actual request or csrf fethcing.


Pros:
- Elegant approach
- people can influence CSRF token fetching via middleware
- resilience can affect both calls

Cons:
- Default needs to be off
- Function argument needs to be exposed.
- Galaxy brain

## Migration Discussion

- Too late to change CSRF behavior -> keep it in version 3
- Under the hood we could rewrite the code to use middlewares for csrf.