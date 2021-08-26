# Error Handling (in Asynchronous Scenarios)

Here's the best practices of error handling (in asynchronous scenarios):

- ALWAYS use `Error` objects, as they automatically capture their context in the program (i.e. stacktrace)
- consequently, NEVER throw or reject literals or plain objects
- in the utils package (`@sap-cloud-sdk/util`) there's a class `ErrorWithCause` that "concatenates" errors, e.g.:

```
Error: Failed to fetch instance destinations. Unable to parse the JWT in Authorization Header.
  at Object.errorWithCause (/Users/d069022/repos/sdk-js/packages/util/src/error.ts:13:20)
  at /Users/d069022/repos/sdk-js/packages/core/src/scp-cf/destination-service.ts:42:36
  at processTicksAndRejections (internal/process/next_tick.js:81:5)
  at runNextTicks (internal/process/next_tick.js:51:3)
  at processImmediate (timers.js:611:7)
Caused by: Error: Request failed with status code 400
  at createError (/Users/d069022/repos/sdk-js/node_modules/axios/lib/core/createError.js:16:15)
  at settle (/Users/d069022/repos/sdk-js/node_modules/axios/lib/core/settle.js:18:12)
  at IncomingMessage.handleStreamEnd (/Users/d069022/repos/sdk-js/node_modules/axios/lib/adapters/http.js:201:11)
  at IncomingMessage.emit (events.js:197:13)
  at endReadableNT (_stream_readable.js:1132:12)
  at processTicksAndRejections (internal/process/next_tick.js:76:17)
  at runNextTicks (internal/process/next_tick.js:51:3)
  at processImmediate (timers.js:611:7)
```

- using `await` without `try/catch` is fine. In fact, the following two functions behave equivalently:

```ts
function goGetIt() {
  return axios
    .get('https://example.com')
    .then(resp => resp.data)
    .catch(error => Promise.reject(new Error('Oh no! :(')));
}

async function goGetIt2() {
  let resp;
  try {
    resp = await axios.get('https://example.com');
  } catch (error) {
    throw new Error('Oh no! :(');
  }
  return resp.data;
}
```

- => throwing in an async function is equivalent to `Promise.reject`
- while it's possible to extend `Error` to introduce custom fields (e.g. `statusCode`) or something, it's impossible to communicate this to consumers (as long as we still use `Promise`)
  - side note: Other people draw the conclusion to not throw errors then and instead to have return types like `string | SomethingSomethingDangerZoneError`. I disagree, but that's a separate discussion.
