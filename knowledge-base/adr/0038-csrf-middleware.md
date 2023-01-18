## Status

accepted

### Structure of the Code Before Cahnge

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

Currently, the middleware is only added to the `executeFn()` to the target system.
For the fetch request it is not considered.
Note that any kind of resilience entering via the middleware is not considered.

### General Improvement I - Make Arguments Adjustable

The CSRF token revealed a problem.
Currently, the middleware contains the function `fn` with no way to change the parameters:

```ts
{
    fn: () => Promise<ReturnType>,
    context: Context
}
```

With the CSRF token you would like to change the arguments of the axios request (add the token) without rebuilding the full `fn`.
Note that the `fn` may contain already middleware layers from before.
Same is true for the expiring access tokens from a destination cache.

An idea could be, to add the argument type and a reference to the `fn`:

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
Currently, the CSRF token fails gracefully, and we continue this means we may have unnecessary calls.
If the default is off, one should really fail.

## CSRF as one Middleware Layer

Do the CSRF token fetching in a middleware:

```ts
executeHttpRequest({
  methods: 'POST',
  middleware: [csrf(), timeout(), circuitBreaker(), retry()]
});
```

The `csrf()` middleware will fetch the token and add it to the `fn` before it is executed:

```ts
function csrf() {
  return (fn: Function<HttpResponse, HttpRequest>, context: Context) => {
    return async () => {
      const csrfToken = await getCsrfToken(context);
      fn.arg.heades['x-csrf-token'] = csrfToken;
      return fn();
    };
  };
}
```

Note that the order of middlewares is crucial.
Middlewares are added from left to right to `fn()` and execution is then from right to left.
The initial function `fn()` is added for illustration here:

```ts
// retry around everything
// timeout for fn and csrf together
// cb blocking fn and csrf
executeWithMiddleware([fn(), csrf(), timeout(), circuitBreaker(), retry()])();

// like above but timeout only for fn(), no timeout for the csrf call
executeWithMiddleware([fn(), timeout(), csrf(), circuitBreaker(), retry()])();

// csrf() completely outside the resilience
executeWithMiddleware([fn(), timeout(), circuitBreaker(), retry(), csrf()])();
```

Note that the csrf requests are not recorded in the circuit breaker history.
A dedicated timeout or retry is not possible as well.
To allow this you would need to pass a dedicated middleware to it `csrf([timeout(),circuitBreaker()])`
We could offer a default middleware including `csrf()` which does nothing for `GET` requests:

```ts
const defaultMiddleware = ([
  timeout(),
  circuitBreaker(),
  csrf([timeout(), circuitBreaker()])
] = [...resilience(), csrf(resilience())]);
```

This means:

- dedicated timeout for the actual request and csrf fetching
- circuit breaker instance based on destination URL will record actual request and csrf fetching
- retry is not enabled per default

In case a user need something different they can pass their own `csrf()` middleware to adjust the method or `URL`.

## Migration Discussion

- Too late in version 3 development to change the CSRF default behavior.
- Deprecate `skipCsrfTokenFetchion()` in version 3 and remove it in version 4.
- In version 4 per default no CSRF if fetched and you need to include the `csrf()` middleware.
- Under the hood we could rewrite the code to use middlewares for csrf.

==========TO BE REMOVED after marikas comments ========

## Solutions

### Remove CSRF and Provide Convenience Methods

Provide an external method and tell people to use this:

```ts
const csrfToken = publicGetTokenMethod(desitntion);
myApi.create(payload).customHeaders({ csrfToken }).execute(desitntion);
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
  csrfMiddleware: [] //only visible for changing request
});
```

Pros:

- no problem with on per default
- clear separation
- people can influence CSRF token fetching via middleware

Cons:

- need to set up things twice
- gives CSRF too much attention
