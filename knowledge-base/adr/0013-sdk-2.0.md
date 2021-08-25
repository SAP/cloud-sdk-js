# Action plan for Version 2.0 of the SAP Cloud SDK

We want to prepare the release of a major version update. The following points need to be considered for this:

## Remove all deprecated functionality from public api (#after)

- Make sure to not remove deprecated functionality where the api should only be hidden

## Export only api relevant functionality to the root (#after, prep steps before)

- Find a way to make clear what is public facing api and what is not (#before)
- Investigate what should be private and deprecate it as soon as possible (#before)

# Replace connectivity with functionality from @sap/xssec (or other SAP libraries) (#before)

- And deprecate old functionality

## Separate core into multiple npm packages (#after, prep steps before)

- `@sap-cloud-sdk/odata-common`
- `@sap-cloud-sdk/odata-v2`
- `@sap-cloud-sdk/odata-v4`
- `@sap-cloud-sdk/connectivity`
- `@sap-cloud-sdk/http-client`
  If needed maybe also `@sap-cloud-sdk/core` but hopefully not needed.
- Sort packages into separate directories beforehand (#before)
  - Mimic packages (without package.json and co) in the core directory
  - Circular dependencies - make sure that there are only imports from the whole module, e. g.
    In odata-v2 package, if I want to import X from http-client import it from `http-client` not `http-client/X`
- The connectivity package currently has only the cf scope. If at some point we add other systems (e. g. kyma) this will be added here.

### Package dependencies (#after, conceptually #before)

The packages above should rely on one another like this (dependant -> dependency):

- `@sap-cloud-sdk/odata-v2` -> `@sap-cloud-sdk/odata-common`
- `@sap-cloud-sdk/odata-v4` -> `@sap-cloud-sdk/odata-common`
- `@sap-cloud-sdk/odata-common` -> `@sap-cloud-sdk/connectivity`
- `@sap-cloud-sdk/odata-common` -> `@sap-cloud-sdk/http-client`
- `@sap-cloud-sdk/http-client` -> `@sap-cloud-sdk/connectivity`

### Other related activities (#after)

Rename all functionality with V2/V4 suffix, e. g.:
`GetAllRequestBuilderV2` -> `GetAllRequestBuilder`(`@sap-cloud-sdk/odata-v2`)
`GetAllRequestBuilderV4` -> `GetAllRequestBuilder`(`@sap-cloud-sdk/odata-v4`)
`GetAllRequestBuilderBase` -> `GetAllRequestBuilder`(`@sap-cloud-sdk/odata-common`)

- We can already rename `GetAllRequestBuilderV2` -> `GetAllRequestBuilder`, etc. by exporting files like this `export {GetAllRequestBuilder as GetAllRequestBuilderV2}` (#before)

## Make core a peer dependency (#after) - (revised decision)

We decided to not make the "core" (or common) a peer dependency

- This will probably not be `core` anymore, but `odata-vX`
- A user would have to install `@sap/cloud-sdk-vdm-vy-service` and `@sap-cloud-sdk/odata-vX`.
- Consider whether user should install a different package, e. g. odata-common -> more convenient also if you want to use `and`

## Get rid of the aggregator package (#before)

- There is no use case for this (https://www.npmjs.com/package/@sap/cloud-sdk-vdm)?
- Instead provide a way for people to discover available services

## Get rid of moment (#after)

- Consider whether it is possible have two implementations internally (#before)

## Improve filtering of root entity based on navigation properties

## Other ideas

- What about a generic vdm?
  - Release vdm using EDMX files + generic VDM (we don't do that)
- Is it possible to rename VDM to @sap-cloud-sdk-vdm/xy-service / @sap-cloud-sdk/vdm-xy-service (investigate - decide which version)
- Should we have a shared eslint rule set for contributions / demo projects? @sap-cloud-sdk/eslint-config

## Timeline

- #before: do it in 2020
- #after: do it in 2021Q1
- Beta version in 2021Q1

## Benefits for the customer

- Slimmer packages
  - Smaller packages
  - Slimmer API
- More flexibility
  - Choice of serializers

## TBD

## Benefits for SDK team

## Other API improvements?

## Final moment replacement decision
