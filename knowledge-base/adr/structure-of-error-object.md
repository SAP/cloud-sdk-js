# More Structure in Error Object

## Status

proposed

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
    statucCode:number
    message: string;    
}
```
This ADR decides the way to improve the situation for the customer.

## Options

### Option A: Extending the Error Interface/Object

We could extend the Error object: 

```typescript
class HttpError extends Error{
  constructor(...args) {
    super(...args); 
    this.name = "HttpError"; 
  }
}
```
and return a more concrete Error in the `errorWithCause` method.
There is a `isAxiosError` to detect HTTP errors [see here](https://github.com/axios/axios/pull/1419)

Pros:
- Typed information specific to error: Http, IO, ...
- Detailed information like HttpStatus etc can be accessed easily.

Cons:
- Not very JavaScripty
- We need to find the right type in the `errorWithCause` -> big exception mapper factory
- The consumer needs some kind of "down cast" to find the actual error type returned (catch blocks, instanceof check)
This becomes even more problematic since there are no `throws declaration` possible.

### Option B: Include the Root cause error Message 

We could at least include  a `root` property to the error:

```typescript
interface ErrorWithRoot {
    name: string;
    message: string;
    stack?: string;
    rootMessage?:string   
}
```

the variable `rootMessage` would contain `Request failed with status code 400` in the example above.

Pros:
- You can access the root message  quickly
- No inheritance

Cons:
- No structured information on the kind of error
- A check if the property is there is needed

### Option C: Make the RequestBuilder non-throwy

In the API discussion [ADR](https://github.com/SAP/cloud-sdk-js/pull/709) we discussed a change to include more request and response data:

```typescript
const [buPa, req, res]: [BusinessPartner, Request, Response] = await BusinessPartner.requestBuilder().getAll().executeRaw(destination);
```

One could include a `httpNoThrow` flag to the `execute` methods. 
If switched on the request builder will not throw HTTP related error but include them in the return. 

```typescript
const [buPa, httpError]: [BusinessPartner, Request, Response] = await BusinessPartner.requestBuilder().httpNoThrow().getAll().execute(destination);
```

The `httpError` object contains information on  HTTP errors appearing during the request. 

Pros:
- Information on Http Errors typed
- No casting needed 

Cons:
- Errors are handled differently (Http vs. deserializing errors for example).

### Option D: Introduce `failible` return types

A pattern I found [here](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9) is a failable type:
```typescript
type Failable<ResultType, ErrorType=Error> = {
  isError: true;
  error: ErrorType;
} | {
  isError: false;
  value: ResultType;
}
``` 

Introducing such a types is a bit like a throw declaration and you can list the exception which are appearing.

```typescript
function execute():Failable<BusinessPartner,AxiosError| ParseError | Error>
```

Nothe that his also goes a bit in the direction of checked exceptions but you have union types and can define type aliases which avoid that you have to change a zillion files you add one more error cause.

Pros:
- Error handling strongly typed
- Errors are clearly handled by return not catch

Cons:
- People are not used to this pattern but expect to catch stuff
- The customer needs to check the possible types (down cast problem from above)
- Breaking API change


## Decision

To be discussed

## Consequences

What becomes easier or more difficult to do because of this change?
