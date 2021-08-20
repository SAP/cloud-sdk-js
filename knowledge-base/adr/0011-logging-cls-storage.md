# Logging request specific information

We got the [request](https://github.com/SAP/cloud-sdk-js/issues/484) of logging context specific information like tenant.
This imposes the problem how to distribute this information around.
The information contains:

- Stuff from the JWT (tenant, user)
- Potential custom information set on the request builder by the user.

## Option A - Passing it around

One one potential way would be to include this information along all methods and pass it around.
This is in practice a pain but would be possible as optional parameter.
But the stack gets enormous:
execute,build,useOrFetchDestination,getDestination,getDestinationFromDestinationService,DestinationFromServiceRetriever
and you would have to go over all the changes and add it

Pros:

- works on all node versions
- performance will not be affected

Cons:

- a lot of code changes/work
- code gets cluttered

## Options B - Using some Continuation local storage

Since node is a single thread server you need an alternative to the concept of `thread local storage` (TLS).
In the node world this is the continuation local storage concept.
This concept of continuation local storage was mainly implemented by this [npm package](https://www.npmjs.com/package/continuation-local-storage).
Since there has been no update since 3 years it is claimed that the thing simply works by I would not have a good feeling to introduce it.
However, in the `async_hooks` node package there is an alternative available since version 13 called [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage).

The idea is always the same: You have a storage context attached to your chain of function you can write and read from at any point in the chain.

Pros:

- no cluttering of the code
- change only in builder and logger

Cons:

- works only for node 13 and higher
- performance not great for async/await see [here](https://itnext.io/one-node-js-cls-api-to-rule-them-all-1670ac66a9e8)
- API not really stable yet

## Conclusion:

- Try option B answer after the question below have been answered I see no blocker.
- Definitely a switch to turn it off due to performance implication.

## Questions:

### How Does the Rest of The Community Do it?

Two findings from Artem were:

- [Open telemetry](https://github.com/open-telemetry/opentelemetry-js) This configures a tracer system which will receive traces from your app.
  If you use this one, you still need to store/pass the context. Setting the log level [dynamically](./dynamic-log-levels.md) does not seem to be possible([related issue](https://github.com/open-telemetry/opentelemetry-js/issues/578)).
- [CLS-rtracer](https://github.com/puzpuzpuz/cls-rtracer) adds some nice automation to the CLS approach, if you know which framework you are using e.g. `express`.
  Since we do not know this in the SDK we do not get really much from it.
- [Dynatrace](https://www.dynatrace.com/support/help/technology-support/cloud-platforms/cloud-foundry/) has default support for CF on SCP and is a tracer.
  We should also consider tracer support via the SDK in the future.

### What are the supported node version on CF

I have checked via `cf buildpacks` that nodejs buildpack with version `1.7.25` is available.
The available [node version](https://github.com/cloudfoundry/nodejs-buildpack/releases/tag/v1.7.25) for this tag are 10,12,14.
They can be specified via the [engines.npm](https://docs.cloudfoundry.org/buildpacks/node/index.html) attribute in the package.json

### Older node version support

I have checked and found out that they did a [backport](https://github.com/nodejs/node/pull/32318) of `AsyncLocalStorage` for version 12.
For node 10 it is really not there. An easy way to ensure compatibility with node 10 would be:

```ts
const AsyncLocalStorage1 = require('async_hooks')
export const instance = AsyncLocalStorage1?.AsyncLocalStorage ? new AsyncLocalStorage1.AsyncLocalStorage():undefined

//The instance.run executes the function call asynchronously and does not return anything.
//To get the result one could wrap it like this.
new Promise<TestEntity[]>(resolve => {
  if(instance) {
    instance.run({ data: i }, async () => {
      const result = await requestBuilder.execute(defaultDestination)
      resolve(result)
    })
  }else{
   requestBuilder.execute(defaultDestination).then(result=>resolve(result))
  }
})
}

//The lookup works on the central instance of the storage
if(instance) {
  const data = instance.getStore()
  if (data?.data === 42) {
    console.log("I found 42")
  }
}
```

### Work on frontend

The import should not return anything in the frontend and the code should be ignored.

### Performance test

In order to measure performance the following test has been done.
A fixed number of `TestEntity.requestBuilder().getAll()` request are executed in parallel using a mocked response.
The time is measured for all promises when finished.

|       Case        | node version | number requests |  time | variance |
| :---------------: | :----------: | :-------------: | ----: | -------: |
|     No Change     |      14      |     10.000      | 2.964 |    0.465 |
| Wrapped no lookup |      14      |     10.000      | 3.634 |    0.520 |
|    One lookup     |      14      |     10.000      | 3.674 |    0.515 |
|   Three lookups   |      14      |     10.000      | 3.686 |    0.453 |

So we see around 20% increase by the lookup.
The number of calls seems not to matter.
For node 12 and node 13 a out of memory exception was created even without the wrapping.
So the number was reduced:

|     Case      | node version | number requests |  time | variance |
| :-----------: | :----------: | :-------------: | ----: | -------: |
| Three lookups |      12      |      5.000      | 2.089 |    0.314 |
| Three lookups |      13      |      5.000      | 2.128 |    0.326 |
| Three lookups |      14      |      5.000      | 1.684 |    0.219 |
|   No Change   |      12      |      5.000      | 1.411 |    0.201 |
|   No Change   |      13      |      5.000      | 1.429 |    0.248 |
|   No Change   |      14      |      5.000      | 1.378 |    0.191 |

#### Summary

- Node implementation has become more efficient in general. Can handle more requests in 14 compared to 13 and 12.
- The time increase for node 14 is approx 20% if we use the CLS.
- For node 12 an 13 the effect is stronger 40% increase.
- Per default I would switch the wrapping which decreases performance off.
  Then there are two ways to switch it on:
  - Via a env variable temporarily
  - Via an `enableTenantLogging` method on the logger util permanently for all loggers and also for some log context and packages.
