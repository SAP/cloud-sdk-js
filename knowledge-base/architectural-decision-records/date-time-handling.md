# Date and Time handling in the SDK

## Status

decided

## Context

Currently we are using moment.js for handling date and time related types in the SDK. Unfortunately moment is quite big in size and the project itself recommends to not use it for new projects: https://momentjs.com/docs/#/-project-status/recommendations/.
We are considering to move to the future JS native Date library [Temporal](https://github.com/tc39/proposal-temporal).
It proposes abstractions for all types that we need to handle OData:

* `Edm.DateTimeOffset` (v2 / v4) -> `Temporal.ZonedDateTime`
* `Edm.DateTime` (v2) -> `Temporal.DateTime`
* `Edm.Time` (v2) -> `Temporal.Time`
* `Edm.Date` (v4) -> `Temporal.Date`
* `Edm.Duration` (v4) -> `Temporal.Duration`
* `Edm.TimeOfDay` (v4) -> `Temporal.Time`

This is a Stage 2 proposal at the time being and will most likely reach stage 3 in 2020 still, there is no official timeline as to when stage 4 will be reached and when this is planned to become a standard.

## Decision

Allow to configure different serializers / deserializers for dates, but maybe even for all field types. We will provide adapters for moment, string and Temporal serialization and swich the default implementation from moment to either string or Temporal depending on the state of the proposal at the time of switching.

Further it should be possible to switch the adapters globally.

Exemplary code snippet (API not yet decided):
```ts
const bupa = await BusinessPartner.requestBuilder().getAll().execute(destination)

bupa.date // Moment

const bupa = await BusinessPartner.requestBuilder().getAll().transform({
  "Edm.DateTime": temporalMiddleware.dateTime
}).execute(destination)

bupa.date // Temporal
```


## Consequences

This will allow users to easily switch implementation to what they see best fit for their use case and it will even allow them to write their own transformers. We have to consider, that at the moment `moment` does not handle times for example, while temporal does, therefore transformation needs to be handled separately for those cases. Also, url and payload serialization differ, while they are quite similar, therefore this approach needs to always consider two transformers for url and payload serialization.

## Alternative solutions

### Migrate to a different library first
Declined because this would mean that we introduce breaking changes twice.

### Accept stage 3 proposal risk
Declined as we think it is too risky and potentially too early for users to adopt it through the SDK. Stage 3 proposals have been downgraded to stage 2 in the past.

### Wait for Temporal to reach stage 4
Declined, as we are planning to release a version 2 of the SDK in the first half of 2021 and it is unlikely this would fit our timeplan unless we keep the old implementation until a version 3.

### Implement SDK Date wrapper that abstracts different libraries
Declined, because this would probably mean quite high implementation effort and is not flexible enough.
