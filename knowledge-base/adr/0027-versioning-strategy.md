# Versioning Strategy SDK

## Status

accepted

## Context

The SDK has two parts:

- The API independent parts contained in this repository from now on referred to as `core`.
- The typed clients for each OData and openApi from now on referred to as `clients`.

The versioning for these two parts is not necessarily the same.
In this document we discuss the versioning strategy for core and client.

## Decision Core

The core has multiple packages e.g. `generator`,`openapi-generator`, `util`, etc..
Currently, we use the same version for all parts and a new release increases the version on all packages.
We will keep this approach because:

- It is very simple to have a fixed version for all packages.
  No need to monitor which packages have been changes to which extent.
- It is easy to use/install the SDK, because all SDK parts have the same version.
- It is done the same way by other monorepos like [nest](https://github.com/nestjs/nest) or [angular](https://github.com/angular/angular).

The drawback of having new version without changes is taken into account for the simplicity.

## Decision Clients

For the clients the situation is much less coupled than for core.
Some services will update every two weeks (workflow) other every year (SAP S/4HANA OnPremise).
We will do versioning in the following way:

- Major versions of clients aligns with major version of core.
- Core versions are not fixed in the clients -> installation updates core to latest.
- Pipeline generates the clients and detects changes.
- A change in the clients relates to a minor version increase.
- Pipeline runs every two weeks and publishes only the changed clients with increased minor version.
- Errors on the client layer are rare and in such a case we trigger a bump of all affected clients.

This approach challenges the current release practice to a higher degree of automation.

## Consequences

The core will have fixed version.
The clients will have loose version.
