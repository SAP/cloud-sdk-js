## Status

accepted

### Structure of the Code Before Change

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

### General Improvement - Disable Fetch CSRF by Default

Not all systems require a CSRF token.
We follow also the trend of optional functionality not being enabled by default, like cache.
If the default is off, the execution can also stop if the token fetching fails.
Currently, this is silently ignored and the request to the target system is executed anyhow.

What should also change is the default implementation of the CSRF token fetching.
Currently, when the CSRF token fetching fails, the SDK retries the fetch with an adjusted URL.
This means we may have unnecessary HTTP requests if the adjusted URL is the right one.
The provided middleware will only do one call and people can set the URL and method as they need.

## CSRF as one Middleware Layer

Do the CSRF token fetching in a middleware.
In version 3 the `csrf()` middleware is added per default so this illustrates just the

```ts
executeWithMiddleware([csrf(), timeout(), circuitBreaker(), retry()], {
  context,
  fn: axiosRequest,
  fnArgument: axiosPostRequestConfit
});
```

The `csrf()` middleware will fetch the token and add it to the `fn` before it is executed:

```ts
function csrf() {
  return (
    fn: Function<HttpResponse, HttpRequest>,
    context: HttpRequestContext
  ) => {
    return async () => {
      const csrfToken = await getCsrfToken(context);
      fn.arg.headers['x-csrf-token'] = csrfToken;
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
executeWithMiddleware([fn(), csrf(), timeout(), circuitBreaker(), retry()]);

// like above but timeout only for fn(), no timeout for the csrf call
executeWithMiddleware([fn(), timeout(), csrf(), circuitBreaker(), retry()]);

// csrf() completely outside the resilience
executeWithMiddleware([fn(), timeout(), circuitBreaker(), retry(), csrf()]);
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
- Deprecate `fetchCsrfToken` and `skipCsrfTokenFetching` in version 3 and remove it in version 4.
- In version 4 per default no CSRF if fetched and you need to include the `csrf()` middleware.
- Under the hood we could rewrite the code to use middlewares for csrf.