# Release VDM for 1.0

In general, this should be avoided, because we use caret version `^1.54.0`.
Even if we publish `1.55.0` sdk core, releasing clients are not necessary.

## When releasing 1.0 VDM should happen

Only if when our generated code contains vulnerable code, we need to fix the generator and release new clients.
This should not happen, and should be treated as edge case.
When necessary, please avoid the following issue:

- when publishing new VDM for 1.0, the `latest` tag should still point to version 2. Maybe talking to the assembly team for additional information as they handle the bom PR. The worst case would be we release version 1 VDM followed by version 2 VDM, as a work around.
