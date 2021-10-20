# Custom Header Handling

## Status

accepted

## Context

Currently, the custom header handling is scattered and lead [functional](https://github.com/SAP/cloud-sdk-backlog/issues/404) or [logging](https://github.com/SAP/cloud-sdk-backlog/issues/74) issues.
This ADR discusses possible solutions and if it should be implemented in version 1.0 and/or 2.0.
There are three sources of headers:
- Custom headers set by the `addCustomHeaders()` on the [odata-request-config.ts](../../packages/core/src/odata-common/request/odata-delete-request-config.ts) or [openapi-request-builder.ts](../../packages/core/src/openapi/openapi-request-builder.ts) 
- Destination related header. These come in two falvors:
  - Auth tokens for the target system and proxy from the destination service [buildAuthorizationHeaders](../../packages/connectivity/src/scp-cf/authorization-header.ts)
  - Based on d destination properties set by the user (see [getAdditionalHeadersAndQueryParameters](../../packages/connectivity/src/scp-cf/destination/destination.ts). 
- SDK related headers (only OData) found in the `headers()` method in the [odata-request.ts](../../packages/core/src/odata-common/request/odata-request.ts).

## Clean Solution

The optimal solution would be:
- The `execute()` method of [odata-request.ts](../../packages/core/src/odata-common/request/odata-request.ts) and [openapi-request-builder.ts](../../packages/core/src/openapi/openapi-request-builder.ts) take the [HttpRequestConfig](../../packages/http-client/src/http-client-types.ts) as input
This object has a `headers` property in which all headers go. 
This should be changed to make the custom and sdk header distinguishable (see XXX).
- The `HttpRequestConfig` goes down to the final `execute()` in the [http-client.ts](../../packages/http-client/src/http-client.ts).
- The two destination related headers are merged together by the `buildHttpRequest()` in the [http-client.ts](../../packages/http-client/src/http-client.ts).
The`DestinationHttpRequestConfig` should be adjusted to make the property and service related header distinguishable (see XXX). 
- In the final execute the merge of the headers should be done:
  - Merge header with priority: CustomHeader > DestinationHeader (Properties) > DestinationHeader (Service) > SdkHeader.
  - Ignore casing in the header merging.
  - Keep the original casing from object with the higher priority.
- All the logic for combining and picking headers is done in the last part before execution.

### How to make headers distinguishable

We have twice the same problem in the `HttpRequestConfig` and `DestinationHttpRequestConfig`. 
Both contain a single `header` property typed `Record<string,any>` which contains two sources.
- **Option A**: Keep the single property but use a `HeaderValueObject` containing the value but also information on the origin.
- **Option B**: Add a property `headerCustom`, `headerProperties`  to hold different headers.

## Non Breaking

Since the type of the Header was `any` or a new property is an extension, it is possible to acheive it without a breaking change.
However, in the whole [authentication-header.ts]((../../packages/connectivity/src/scp-cf/authorization-header.ts))

## Decision

What is the change that we're proposing and/or doing?

## Consequences

What becomes easier or more difficult to do because of this change?
