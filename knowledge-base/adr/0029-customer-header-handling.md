# Custom Header Handling

## Status

accepted

## Context

Currently, the header/parameter handling is scattered and leads [functional](https://github.com/SAP/cloud-sdk-backlog/issues/404) or [logging](https://github.com/SAP/cloud-sdk-backlog/issues/74) or [encoding](https://github.com/SAP/cloud-sdk-js/issues/1737) issues.
This ADR discusses possible solutions and if it should be implemented in version 1.0 and/or 2.0.
There are three sources of headers:

1. Custom headers set by the `addCustomHeaders()` on the [odata-request-config.ts](../../packages/core/src/odata-common/request/odata-delete-request-config.ts) or [openapi-request-builder.ts](../../packages/core/src/openapi/openapi-request-builder.ts)
2. Destination related headers. These come in two flavors:
   1. Auth tokens for the target system and proxy headers from the destination and connectivity service [buildAuthorizationHeaders](../../packages/connectivity/src/scp-cf/authorization-header.ts)
   2. Based on destination properties set by the user (see [getAdditionalHeadersAndQueryParameters](../../packages/connectivity/src/scp-cf/destination/destination.ts).
3. SDK related headers like `eTag` (only OData) found in the `headers()` method in the [odata-request.ts](../../packages/core/src/odata-common/request/odata-request.ts).

The problem is also present to a smaller extent for query parameters, which can come from:

1. A [custom setting](../../packages/core/src/odata-common/request/odata-request.ts) on request
2. [Sestination properties](../../packages/connectivity/src/scp-cf/destination/destination.ts)
3. Queries like get byt key i.e the SDK.

## Solution Header and Parameter

The root problem is that the header object is `Record<string,any>` and once we collect headers on the way it is not clear where they come from.
We have to keep track on the header origin to enforce the right priority.
A cleaner solution could be:

- The `execute()` method of [odata-request.ts](../../packages/core/src/odata-common/request/odata-request.ts) and [openapi-request-builder.ts](../../packages/core/src/openapi/openapi-request-builder.ts) take the [HttpRequestConfig](../../packages/http-client/src/http-client-types.ts) as input.
  This object has a `headers` property in which all headers go.
  This should be changed to make the custom and SDK headers distinguishable (see section below for details).
- The two destination related headers are currently merged together by the `buildHttpRequest()` in the [http-client.ts](../../packages/http-client/src/http-client.ts).
  The resulting `DestinationHttpRequestConfig` should be adjusted to make property and service related headers distinguishable (see section below for details).
- The `HttpRequestConfig` and `DestinationHttpRequestConfig` go down to the final `execute()` in the [http-client.ts](../../packages/http-client/src/http-client.ts).

These two objects contain all the headers and parameters and the rest of the http request config.
Merge the two in the following way shortly before the execution:

- Merge header with priority:
  `CustomHeader > DestinationHeader (Properties) > DestinationHeader (Service) > SdkHeader.`
- Merge parameter with priority: `CustomParameter > DestinationParameter > SdkParameter.`
- Merge on structured object means: Ignore casing for the keys and keep the original casing from object with the highest priority.
  The `mergeLeftIgnoreCase()` method should do the trick.
- For the parameters do encoding, only on the SDK headers, the others are controlled by the user.
- Merge the remaining parts (not header, not parameter) of `getAxiosConfigWithDefaults()`, `HttpRequestConfig` and `DestinationHttpRequestConfig`.
- The priority for this flat merge of the rest is: HttpRequestConfig > DestinationHttpRequestConfig > getAxiosConfigWithDefaults()
- Use the resulting request config to execute the request.

Note: In the `execute()` method the CSRF token header is also filled.
This header should consider as SdkHeader from an origin.

### How to make headers distinguishable

We have the same problem in both the `HttpRequestConfig` and `DestinationHttpRequestConfig`.
Both contain a single `header` property typed `Record<string,any>` or `Record<string,string>` which contains two sources of headers.

- **Option A**: Keep the single property but use a `HeaderValueObject` containing the value but also information on the origin.
- **Option B**: Add a property `headerSDK` and `headerProperties` to hold different headers.

We would like to keep the SDK internals in option A from the user:

```ts
interface HeaderValueObject {
    value:string
    origin:'Custom'|'DestinationProperty'|'Destination'|'SDK'
}

//Parameters are handled analogously and are skipped in the methods to be shorted.
interface ParameterValueObject {
    value:string
    origin:'Custom'|'DestinationProperty'|'SDK'
}

interface ConfigPublic{
    headers:Record<string,string>
    parameters:Record<string,string>
}

/**
 * @internal
 */
interface ConfigInternal{
    headers:Record<string,HeaderValueObject>
    parameters:Record<string,ParameterValueObject>
}

/**
 * We use this method so the origin of headers is clear. Will be exported but not on root level.
 * @internal
 */
export function executeHttpRequestInternal(config:ConfigInternal){
    ...
}

/**
 * This method is for direct customer use -> provided headers are custom and have high prio.
 */
export function executeHttpRequest(config:ConfigPublic){
    const withObject = headerObjectWithOriginCustom(config) ///
    executeHttpRequestInternal(withObject)
}
```

## Breaking Changes

We investigate the risk of breaking changes:

- Changing the type of the `header` property from `string|any` to something more structured i.e. `string|HeaderValueObject` is possible (Option A).
- Extending the interface with new properties is possible - the custom ones remain where they are (Option B).
- Removing the optional `customHeader` argument for the methods in [authentication-header.ts](<(../../packages/connectivity/src/scp-cf/authorization-header.ts)>) is not possible.
- There is a risk of intrinsic behavior changes.

## Decision

- We see this as a version 2 feature.
- We implement **option A** with the public and private method.

## Consequences

The header and parameter handling is clear and the merging of the headers is done shortly before request execution.
