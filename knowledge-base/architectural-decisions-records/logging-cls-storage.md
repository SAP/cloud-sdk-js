# Logging request specific informaiton

We got the [request](https://github.com/SAP/cloud-sdk/issues/484) of logging context specific information like tenant.
This imposes the problem how to distribute this information around.
The information contains:
- Stuff fromt the JWT (tenant,user)
- Potential custom information set on the request builder by the user.

## Option A - Passing it around

One one potential way would be to include this information along all methods and pass it around.
This is in practice a pain but would be possible as optional parameter.
But the stack gets enormous:
execute,build,useOrFetchDestination,getDestination,getDestinationFromDestinationService,DestinationFromServiceRetriever
and you would have to go over all the changes and add it

Pros:
- works on all node vesions
- performance will not be affected

Cons:
- a lot of code changes/work
- code gets cluttered


## Options B - Using some Continuation local storage

Since node is a single thread server you need an alternative to the concept of `thread local storage` (TLS).
In the node world this is the continuation local storage concept.
This concept of continuation local storage was mainly implemented by this [npm package](https://www.npmjs.com/package/continuation-local-storage).
Since there has been no update since 3 years it is claimed that the thing simply works by I would not have a good feeling to introduce it.
However, in the `async_hooks` node package there is an alternative availible since version 13 calles [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage).

The idea is always the same: You have a storage context attached to your chain of function you can write and read from at any point in the chain.

Pros:
- no cluttering of the code
- change only in builder and logger

Cons:
- works only for node 13 and higher
- performance not great for async/await see [here](https://itnext.io/one-node-js-cls-api-to-rule-them-all-1670ac66a9e8)
- API not really stable yet
