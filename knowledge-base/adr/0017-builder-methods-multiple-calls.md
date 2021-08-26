# More Structure in Error Object

## Status

decided

## Context

In the request builder you can currently call methods like `filter` and `top` multiple times.
In this document we discuss possibilities to unify this the behavior when this is done.

## Options

We could decide on each method for a behavior or we make it the same for all methods.
Potentials options are:

### Option A: Last Call Counts

This means the previous value is replaced e.g. `top(5).filter().top(3)` will use 3.
This is the case for many of the builder methods but not for all.

Pros:

- Easy to implement

Cons:

- Sometimes counter intuitive e.g. `withCustomHeaders` I would rather expect to add the headers to the existing ones.

### Option B: Merge Values

This means the values are accumulated e.g. `withCustomHeader(A).filter.withCustomHeader(B)` will contain the headers from `A` abd `B`.

Pros:

- Easy to implement

Cons:

- Sometimes unclear what happens with duplicates, how are elements combined `and` or `or` for filters number for `top`.

### Option C: Block Multiple Calls

This means a method is not available after it has been called once.
The obvious way to achieve this would be classes`TopHasBeenCalled` in which the `top` method is not present.
Then if you call `skip` afterwards you would return `TopSkipHasBeenCalled` which does not include `top` and `skip`.
This means **N!** different classes for `N` builder methods ([see Classes namespace](./0017-code-snippets.ts)).

You can also try to pass the information on the invoked methods via generics ([see Generic namespace](./0017-code-snippets.ts)).
Here I was only able to get a blocker when the method is called the second time e.g. `.top(5).skip(3).top(3)` will return never so you can not execute the call.
However, this is a weaker user experience.

Pros:

- Clear from a user perspective

Cons:

- Clutters the code.
- An existing builder can not be reused if you need to change the value.

## Decision

We decided to use option `A` and `B` depending on the methods.
For the OData related options we will use option `A`.
For configuration related builder methods we will use the verbs `add` or `set` to make clear if it is option `A` or `B`.

The relevant builder methods (the one containing arguments) are listed in the table below including the decision on the option:

| class                           | methods                                                                                                                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| request-builder-base            | withCustomHeader ( refactor to addCustomHeaders B)<br>withCustomQueryParameters (refactor to addCustomQueryParameters B)<br>withCustomServicePath (A rename to setCustomServicePath) |
| get-all-request-builder-base    | select (A) <br>orderBy (A) <br>top (A) <br>skip (A)                                                                                                                                  |
| get-all-request-builder-v2/v4   | filter (A)<br>expand(v4)                                                                                                                                                             |
| get-by-key-request-builder-base | select (A refactoring move to base)                                                                                                                                                  |
| get-by-key-request-builder-v4   | expand(A)                                                                                                                                                                            |
| delete-request-builder-v2/v4    | setVersionIdentifier (A)                                                                                                                                                             |
| update-request-builder-base     | requiredFields (refactor setRequiredFields A)<br>ignoredFields (refactor setRequiredFields A)<br>withCustomVersionIdentifier (refactor align with setVersionIdentifier A)            |

## Consequences

API will be aligned and we will potentially move away from the builder API to a more JS like option.
