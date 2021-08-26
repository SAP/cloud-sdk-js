# Proxy Settings

Until version 1.15.1, requests created by the SDK did not work if proxy environment variables were set.
The reason for this was a wrong parsing of the environment variables by the underlying Axios http-client.

Even if this would have been fixed, we can not rely on the axios client handling the proxy,
because in case of On-Premise connectivity we have to use the connectivity service proxy and not any other one.

## Implementation

We extended the existing implementation for the on-Premise connectivity proxy.
The starting point is the destination which contains a `ProxyConfiguration` object.
How this object is filled is discussed in the next sections.
From the destination the proxy configs finds its way into the actual request in the `odata-request.ts` via two points:

1. In the `AxiosRequestConfig.httpAgent` as the HttpAgent is a proxy agent containing the protocol, host and port of the proxy.
2. In the `AxiosRequestConfig.headers` of the request containing the proxy auth headers.

Besides the `odata-request.ts` the proxy needs to be considered at two more places:

- In the `csrf-token-header.ts` a request is built to fetch the CSRF token in case of write requests and the same as done like in the OData request.
- In the `destination-service.ts` a request to the destination service is made. Here the proxy needs to be ignored completely.

Note, that the explicit proxy config of the AxiosRequestConfig is set to false `buildAxiosConfig()`:

```typescript
export function buildAxiosConfig(
  parameter: AxiosParameter
): AxiosRequestConfig {
  const result: AxiosRequestConfig = parameter;
  return { ...result, proxy: false, ...parameter.httpAgentConfig };
}
```

This ensures that the Axios client does not consider the proxy environment variables once more,
since it is entering via agent and header as explained above..

## Environment variables

There are three variables considered for the proxy configuration:

1. `http_proxy`
2. `https_proxy`
3. `no_proxy`

The first two follow the pattern `protocol://user:password@host:port` where protocol, user:password and port are optional.
Note: If you want to use parsing relevant characters like `/:@` for user and password you have to [percent-encode](https://en.wikipedia.org/wiki/Percent-encoding) these characters.

The `no_proxy` environment variables contains a comma separated list of URLs.
If a destination URL matches one of the elements in the list, no proxy settings will be used.
For the `no_proxy` no wildcards like `*` are considered.

## Evaluation Flow

In the `destination-accessor.ts` the following flow is used to build the proxy configuration:

1. If the destination proxy type is `onPremise` the proxy settings from the connectivity service are taken
2. The protocol of the destination is evaluated [default: https]
3. The http_proxy or https_proxy variables depending on 2. are checked
4. If a host can be extracted from the environment variable this is used to build the proxy. [default-protocol: http, default-port: 80 or 443 depending on protocol]
5. If the host can not be extracted no proxy is used.

How the config finds its way to the request is discussed in the section [Implementation](#Implementation)
