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
2. [Destination properties](../../packages/connectivity/src/scp-cf/destination/destination.ts)
3. Queries like get by key i.e the SDK.

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

#### Option A

Keep the single property but use a `HttpRequestConfigWithOrigin` containing the value but also information on the origin.

#### Option B

Add a property `headerSDK` and `headerProperties` to hold different headers.

#### Decision

Use option A and have two different APIs for external users and SDK (also CAP) developers.

```ts
// Parameters and headers use a new type `OriginOptions` that contains the origin information.
export type HttpRequestConfigWithOrigin = HttpRequestConfigBase & {
  params?: OriginOptions;
  headers?: OriginOptions;
};
export interface OriginOptions {
  requestConfig?: Record<string, any>;
  custom?: Record<string, any>;
}

// This is the request config type for "normal" users, and it is compatible with the v1 SDK.
export type HttpRequestConfig = HttpRequestConfigBase & {
  params?: Record<string, any>;
  headers?: Record<string, any>;
};

/**
 * The SDK developers and CAP use this method so the origin of headers is clear.
 * @internal
 */
export function executeHttpRequestWithOrigin(config: HttpRequestConfigWithOrigin) {
    ...
}

/**
 * This method is for direct customer use, where provided headers are custom and have high prio.
 */
export function executeHttpRequest(config: HttpRequestConfig){
    const withOrigin = buildHttpRequestConfigWithOrigin(config)
    executeHttpRequestWithOrigin(withOrigin)
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
- If [bug reporter](https://answers.sap.com/questions/13500887/on-premise-connectivity-to-rest-service-with-api-k.html) response we can do a small hotfix if needed.
- We decide to implement the option **B** including a public and internal function.

## Consequences

- [Direct users] There are no breaking changes, so upgrading to version 2 should be smooth.
- [SDK/CAP developers] A new API `executeHttpRequestWithOrigin` is created, so headers with different origins can be defined.
