# More Structure in Error Object

## Status

decided

## Context

We got a request from [customer side](https://github.com/SAP/cloud-sdk-js/issues/634) that the error object we provide is insufficient.
Currently, we catch errors high in the request builder `execute` method.
When an error appears, the original exception is caught and wrapped by the `errorWithCause` method to create a new Error object.
The Error object returned from the method is the plain ES error object:

```typescript
interface Error {
  name: string;
  message: string;
  stack?: string;
}
```

In the stack property information on the root cause can be found:

```text
Create request failed!
    at Object.errorWithCause (XXX/srv/node_modules/@sap-cloud-sdk/util/dist/error.js:5:20)
    at XXX/srv/node_modules/@sap-cloud-sdk/core/dist/odata/v2/request-builder/create-request-builder.js:124:54
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at ...
Caused by:
Error: post request to https://*****_SRV failed! Personnel Number ******** : Incorrect data in ***
{"code":"***/***","message":{"lang":"en","value":"Personnel Number ******** : Incorrect data in ***"},"innererror":{"application":{"component_id":"","service_namespace":"/***/","service_id":"***","service_version":"0001"},"transactionid":"***","timestamp":"20201027150920.7447650","Error_Resolution":{"SAP_Transaction":"For backend administrators: run transaction /IWFND/ERROR_LOG on SAP Gateway hub system and search for entries with the timestamp above for more details","SAP_Note":"See SAP Note 1797736 for error analysis (https://service.sap.com/sap/support/notes/1797736)"},"errordetails":[{"code":"***/***","message":"Personnel Number ******** : Incorrect data in ***","longtext_url":"/sap/opu/odata/iwbep/message_text;o=LOCAL/","propertyref":"","severity":"error","target":""}]}}
    at Object.errorWithCause (XXX/srv/node_modules/@sap-cloud-sdk/util/dist/error.js:5:20)
    at constructError (XXX/srv/node_modules/@sap-cloud-sdk/core/dist/odata/common/request/odata-request.js:295:23)
    at XXX/srv/node_modules/@sap-cloud-sdk/core/dist/odata/common/request/odata-request.js:265:51
    at processTicksAndRejections (internal/process/task_queues.js:97:5)
    at ...
Caused by:
Error: Request failed with status code 400
    at createError (XXX/srv/node_modules/axios/lib/core/createError.js:16:15)
    at settle (XXX/srv/node_modules/axios/lib/core/settle.js:17:12)
    at IncomingMessage.handleStreamEnd (XXX/srv/node_modules/axios/lib/adapters/http.js:236:11)
    at IncomingMessage.emit (events.js:326:22)
    at endReadableNT (_stream_readable.js:1223:12)
    at processTicksAndRejections (internal/process/task_queues.js:84:21)
```

but it is totally unstructured and a pure string.
The issue raised by the customer asked to have the root cause in a more structured way like:

```typescript
interface HttpError {
  name: string;
  statusCode: number;
  message: string;
}
```

This ADR decides the way to improve the situation for the customer.

## Options

### Option A: Extending the Error interface/object

We could extend the Error object:

```typescript
class HttpError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'HttpError';
  }
}
```

and return a more concrete Error in the `errorWithCause` method.
There is a `isAxiosError` to detect HTTP errors [see here](https://github.com/axios/axios/pull/1419)

Pros:

- Typed information specific to error: Http, IO, ...
- Detailed information like HttpStatus etc can be accessed easily.

Cons:

- Not very JavaScript-like
- We need to find the right type in the `errorWithCause` -> big exception mapper factory
- The consumer needs some kind of "down cast" to find the actual error type returned (catch blocks, instanceof check)
  This becomes even more problematic since there are no `throws declaration` possible.

### Option B: Include the original error

We could include an `originalError` object which contains the original error which we want to wrap in the `ErrorWithRoot`.

```typescript
class ErrorWithRoot extends Error {
  name: string;
  message: string;
  stack?: string;
  originalError?: Error;
  get rootError(): Error | undefined {
    // recursively check if originalError is of type ErrorWithRoot and return the first non  ErrorWithRoot error in this chain.
    if (this.originalError instanceof ErrorWithRoot) {
      return this.originalError.rootError;
    }
    return this.originalError;
  }
}
```

In addition we also add a getter `rootError` which handles chained ErrorWithRoot.

Pros:

- You can access the original and root error quickly
- No inheritance

Cons:

- A check if the property is there is needed
- Also here some kind of down cast is needed by the customer to get the information on the original error.

### Option C: Make the RequestBuilder non-throwy

In the API discussion [ADR](https://github.com/SAP/cloud-sdk-js/pull/709) we discussed a change to include more request and response data:

```typescript
const [buPa, req, res]: [BusinessPartner, Request, Response] =
  await BusinessPartner.requestBuilder().getAll().executeRaw(destination);
```

One could include a `httpNoThrow` flag to the `execute` methods.
If switched on the request builder will not throw HTTP related error but include them in the return.

```typescript
const [buPa, httpError]: [BusinessPartner, HttpError] =
  await BusinessPartner.requestBuilder()
    .httpNoThrow()
    .getAll()
    .execute(destination);
```

The `httpError` object contains information on HTTP errors appearing during the request.

Pros:

- Information on Http Errors typed
- No casting needed

Cons:

- Errors are handled differently (Http vs. deserializing errors for example).

### Option D: Introduce `failable` return types

This pattern](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9) is a failable type:

```typescript
type Failable<ResultType, ErrorType = Error> =
  | {
      isError: true;
      error: ErrorType;
    }
  | {
      isError: false;
      value: ResultType;
    };
```

Introducing such types is a bit like a throw declaration and you can list the errors which are appearing.

```typescript
function execute(): Failable<BusinessPartner, AxiosError | ParseError | Error>;
```

Note that his also goes a bit in the direction of checked exceptions but you have union types and can define type aliases which avoid that you have to change a zillion files you add one more error cause.

Pros:

- Error handling strongly typed
- Errors are clearly handled by return not catch

Cons:

- People are not used to this pattern but expect to catch stuff
- The customer needs to check the possible types (down cast problem from above)
- Breaking API change

## Decision

We take option B.
Check convention on MDN how what to throw i.e. should you extend from the error object.
Also adjust the name `ErrorWithRoot` to something better.

The colleagues from exchange rate lib had problems with the [prototype chain](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#support-for-newtarget).
Just consider these kind of problems.

## Consequences

This will allow users to get the original error object as well as the root error object from the error thrown by the SDK.
