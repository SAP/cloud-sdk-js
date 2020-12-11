# More Structure in Error Object

## Status

proposed

## Context

In the request builder you can currently call methods like `filter` and `top` multiple times.
The methods just overwrite the previous value.
In this document we dicuss possibilities to improve this behavior.
The  builder methods are:

|class|methods|
|---|---|
|request-builder-base| witCustomerHeader<br>withCustomQueryParameters<br>withCustomServicePath
|get-all-request-builder-base|select<br>orderBy<br>top<br>skip
|get-all-request-builder-v2/v4| filter<br>expand(v4)
|get-by-key-requestbuilder-base|select|
|get-by-key-requestbuilder-v4|expand|
|create-request-builder-base|prepare (deprecated)|
|delete-request-builder-base|ignoreVersionIdentifier|
|delete-request-builder-v2/v4| setVersionIdentifier|
|update-request-builder-base| replaceWholeEntityWithPut<br>requiredFields<br>ignoredFields<br>ignoreVersionIdentifierwithCustomVersionIdentifier

## Options

We could decide on each method for a behaviour or we make it the same for all methods.

### Option A: Last Call Counts

This means the previous value is replaced e.g. `top(5).filter().top(3)` will use 3.
This is the case for many of the builder methods but not for all.

Pros:
- Easy to implement

Cons:
- Sometimes counter intuitive e.g. `withCustomHeaders` I would rather expect to add the headers to the exisinting ones

### Option B: Merge Values

This means the values are accumulated e.g. `withCustomHeader(A).filter.withCustomHeader(B)` will contain the headers from `A` abd `B`.

Pros:
- Easy to implement

Cons:
- Sometimes unclear what happens with duplicates, how are elements combined `and` or `or` for filters number for `top`.

### Option C: Block Multiple Calls

This means a method is not available after it has been called.
The obvious way to achieve this would be classes`TopHasBeenCalled` in which the `top` method is not present.
Then if you call `skip` afterwards you would return `TopSkipHasBeenCalled` which does not include `top` and `skip`.
This means **N!** different classes for `N` methods 

You can also try to pass the information on the invoked methods via generics. 
Here I was not able to get an blocker when the method is called the second time e.g. `.top(5).skip(3).top(3)` will return never so you can not execute the call.
However, this is a weaker user experience.

Pros:
- Save and clear from a user perspective

Cons:
- Clutters the code.

## Decision

We should discuss if we do the same style for all or if we handle it differently for specific methods.

## Consequences

