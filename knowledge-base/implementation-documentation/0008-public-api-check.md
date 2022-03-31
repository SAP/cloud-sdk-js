# Public Api Check

This document explains what has been implemented in [check-public-api.ts](../../scripts/check-public-api.ts).
The implementation was motivated by the requirements given in [0028-public-api-extraction.md](../adr/0028-public-api-extraction.md).

## Idea for the Check

We maintain the API information on two levels as discussed in the ADR document:

- Via the root level `index.ts`
- Via `@internal` annotation in the code.

We develop a script which checks both ways and compares them.
Doing so we are confident that we find unintentional changes - because an unintentional change is only done in the index or annotation.

## Implementation Details

### The `index.ts` files

This is the simple part. Here we do the following:

- Check that there is exactly one `index.ts` in the root
- Check that this one index file contains no `*` exports
- Extract all exported objects for the later comparison.

### The `.d.ts` files

We added the `@internal` flag in the code, which is considered by the `stripInternal` compiler flag.
However, we do not want to strip away the types in the actual compilation:

1. We want to give also TypeScript users a way to use something non-public by navigating to the path e.g. `@sap-cloud-sdk/core/dis/some-thing`.
2. The resulting `.d.ts` are erroneous for cases in which we do not export the type used in function arguments:

```ts
//file-a.d.ts
@internal
export type InternalType ...

//file-b.d.ts
import {InternalType} from './file-a.ts'

export function publicFuntion(a:InternalType)
```

3. You would need to ensure the `dist` folder is in sync on each API check.

So we do the following to overcome the issues above:

- We do a in-memory compilation using `mock-fs` on every API check execution
- The compilation uses the `stripInternal` flag
- The resulting `.d.ts` files are parsed

### The Comparison

We compare:

- Set A: Types exported in the `index.ts`
- Set B: The (in-memory stripped) `.d.ts` files
  contain exactly the same elements.
  Pay very close attention if something is missing in the `index.ts` set, because this could indicate a breaking change.
