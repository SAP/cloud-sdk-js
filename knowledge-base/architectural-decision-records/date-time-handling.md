# Date and Time handling in the SDK

## Status

proposed

## Context

Currently we are using moment.js for handling date and time related types in the SDK. Unfortunately moment is quite big in size and the project itself recommends to not use it for new projects: https://momentjs.com/docs/#/-project-status/recommendations/.

## Decision A

We should move to the future JS native Date library [Temporal](https://github.com/tc39/proposal-temporal).
It proposes abstractions for all types that we need to handle OData:

* `Edm.DateTimeOffset` (v2 / v4) -> `Temporal.ZonedDateTime`
* `Edm.DateTime` (v2) -> `Temporal.DateTime`
* `Edm.Time` (v2) -> `Temporal.Time`
* `Edm.Date` (v4) -> `Temporal.Date`
* `Edm.Duration` (v4) -> `Temporal.Duration`
* `Edm.TimeOfDay` (v4) -> `Temporal.Time`

## Consequences A

What becomes easier or more difficult to do because of this change?

## Decision B

## Consequences B

What becomes easier or more difficult to do because of this change?

