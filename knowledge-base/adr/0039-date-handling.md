# Date Handling

## Status

decided

## Context

Currently the SAP Cloud SDK uses moment.js to handle dates.
As this library is no longer maintained, it is time to replace it with something different.

### moment.js Motivation

Originally we decided to go with moment.js because the native JS Date object does not support timezone offsets.
It is not possible to retrieve the original timezone offset from a JS Date object.
Therefore (de-)serialization cannot be lossless with the plain JS Date.

### Affected Code

This only affects the OData generator and the generated clients.

### Requirements

- must have: lossless serialization round-trip
- should have: advanced date handling like comparison, formatting, timezone transformation, etc.
- nice to have: native JS

## Decision

Use Temporal, see option A

## Consequences

This cannot be achieved without breaking changes and will result in a major version update.

# Appendix

## Option A - Temporal.js

Good news!
[Temporal](https://github.com/tc39/ecma262/pull/3759) has become a stage 4 proposal as of March 11th ([see the 9 year journey](https://bloomberg.github.io/js-blog/post/temporal/)).
This is the obvious candidate, given that Temporal is now officially becoming part of ES2026 and Node.js v26 and it is [available through TS 6](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0-rc/#new-types-for-temporal) already.

For a quick win, we can already recommend usage of the temporal de-serializers as of today.

- fulfills all requirements from above
- higher maintenance effort

## Option B - Plain String

We discussed this option many times: Instead of deserializing the data in the Cloud SDK, leave it to users instead.
If we do this for dates, for consistency we should also do this for big numbers (bignumber.js).

- less convenient for users
- lower maintenance effort
- potentially more flexibility for users as they get the plain data as is

## Option C - Hybrid

Do option B by default, but provide a middleware that allows users to deserialize to Temporal Dates as well.

- highest level of flexibility
- implementation might be very complex

## Notes

For options A and B I suggest to remove the whole (de-)serializers concept ([ADR 15](./outdated/0015-date-time-handling.md)).
Although the flexibility is a plus, it makes everything harder to consume and maintain.
Also, there is little proof, that this is used by anyone, given that I am not aware of any user issues with regards to this and the [download numbers of the temporal de-serializers package](https://www.npmjs.com/package/@sap-cloud-sdk/temporal-de-serializers).
