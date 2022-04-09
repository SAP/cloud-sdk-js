## Test results

t1 297MB 188MB
t2 342MB 227MB
t3 342MB 227MB

## Assumption of This research

### Memory usage comparison

When compare the memory usage between SDK v1 and SDK v2, we should either execute `ts` script or `js` script for both versions to keep minimal differences.
In fact, this test shows most of the cases, executing `ts` scripts consumes roughly 10-20% more memory than `js`.

### Data of scientific research

For every test, it was executed about 5 times, we chose the highest memory usage.

### Memory areas

In this research, only heap memory is considered.

## Alternative tools for debugging memory

- WebStorm `analyze V8 heap`
- node module `node-memwatch-new`
