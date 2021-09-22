# Versioning Strategy SDK

## Status

What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?

## Context

The SDK has two parts:

- The API independent parts contained in this repository from now on referred to as `core`.
- The typed clients for each OData and openApi from now on referred to as `clients`.

The versioning for these two parts is not necessarily the same/

## Versioning Core

The core has multiple packages e.g. `generator`,`openapi-generator`, `util`, etc..
Currently, we use the same version for all parts and a new release increases the version on all packages.

Potential Flow/Rules:

- Major version bump done on all packages to align on API between packages (2.X.Y works together)
- Difference between Minor and Patch depends on content of change
- Problem A: Somehow we need to mark changed packages and only bump these on release.
- Problem B: Often the API is not extended meaning the change in package A does not require a publish in B - but it could.
- This is hard for a computer to decide.
- A easy rule could be:
  - We decide minor or patch release
  - Patch is only possible if change since last minor are small (current state)
  - We increase all changed package by patch or minor
  - We do not consider problem B.

DISCUSSION:

- Fewer updates for customers only if code change. (we will have smaller modules)
- Versions indicate real changes also good for developers
- The `package.json` in the modules need to be adjusted when bumping version individually.
- Is the worth the extra effort?

## Decision Core

What is the change that we're proposing and/or doing?

## Versioning Clients

For the clients the situation is much less coupled than for core.
In general most service will have no changes.

Potential Flow/Rules:

- Major version increase should not happen on API level - in principle.
- A major version increase in SDK is likely to change also the client API.
  Hence, we could align major version of SDK and Client.
- A patch version is also unlikely, because the API spec can not fix an issue
- So potentially every change is a minor change in a simple approximation.
- Detect a change via git diff on generated sources.
  This ensures real change detection - not a publishing date change.
- Every two weeks we could run the release pipeline, generate clients detect changes and bump version and publish if needed.

## Consequences

What becomes easier or more difficult to do because of this change?
