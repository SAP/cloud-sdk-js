---
id: sdk-connectivity-http-client
title: Use the HttpClient accessor to configure requests to remote services
hide_title: false
hide_table_of_contents: false
sidebar_label: HttpClient
description: This article describes how the SAP Cloud SDK for Java can be used to prepare instances of HttpClient. This class enables connections to other systems and services like S/4HANA or SAP Cloud Platform services.
keywords:
- sap
- cloud
- sdk
- destination
- java
- connectivity
- http
---

The SAP Cloud SDK offers basic functionality that helps with connecting to other systems and services like S/4HANA Cloud or OnPremise edition.
The SDK leverages the existing API of `HttpClient` and applies conveniently managed properties, e.g. according to a specific destination configuration.

In the following paragraphs the `HttpClientAccessor` API and its usage will be described.

## General Usage

In general an `HttpClient` can be instantiated through the `HttpClientAcessor`.
The SAP Cloud SDK itself uses the accessor class for all iternal requests as well.

```java
HttpClient client = HttpClientAccessor.getHttpClient();
```

If the goal is to create a client with properties according to a specific destination, it can be provided as argument:

```java
HttpDestination destination = DestinationAccess.getDestination("my-destination").asHttp();
HttpClient client = HttpClientAccessor.getHttpClient(destination);
```

When using a destination, the configured destination URL will be used as base path for the subsequent requests for `client`.

:::note
Please note that similar to other Accessor based APIs, the SAP Cloud SDK offers additional methods with "try" prefix to allow for optional VAVR-enhanced API access.
:::

## Customization

When the properties of `HttpClient` are not working for the application, e.g. timeout is too short or too long, then the generation can be customized.
Please find the `HttpClientFactory` interface and the provided implementation `DefaultHttpClientFactory`.
They offer a similar method `createHttpClient` with optional destination argument:

```java
HttpClientFactory factory = new DefaultHttpClientFactory();

HttpClient genericClient = factory.createHttpClient();
HttpClient destinationClient = factory.createHttpClient(destination);
```

The `DefaultHttpClientFactory` type offers a static builder, to enable custom properties for:
- `timeoutMilliseconds`
- `maxConnectionsPerRoute`
- `maxConnectionsTotal`

```java
HttpClientFactory customFactory = DefaultHttpClientFactory.builder()
  .timeoutMilliseconds(60000)
  .maxConnectionsPerRoute(100)
  .maxConnectionsTotal(200)
  .build();
```

When inheriting from `DefaultHttpClientFactory` it's possible to provide even deeper customization:
```java
DefaultHttpClientFactory customFactory = new DefaultHttpClientFactory() {
  @Override
  protected RequestConfig.Builder getRequestConfigBuilder( HttpDestinationProperties destination ) {
    return super.getRequestConfigBuilder(destination)
      .setProxy(new HttpHost("proxy", 8080, "http"));
  }
  @Override
  protected HttpClientBuilder getHttpClientBuilder( HttpDestinationProperties destination ) {
    return super.getHttpClientBuilder(destination)
      .setUserAgent("SDK");
  }
};
```
It is possible to take advantage of calls to `super` - or use your own objects directly.
This inheritance enables custom implementation for the following methods:
- `getHttpClientBuilder`
- `getRequestConfigBuilder`
- `getSocketConfigBuilder`
- `getConnectionManager`


## Overriding default behavior

Now that the customization of the HTTP client factory is available, the default behavior for the accessor can be adjusted very easily:

```java
HttpClientFactory factory = new MyCustomHttpClientFactory();
HttpClientAccessor.setHttpClientFactory(factory);
```
From now on the custom factory will be used for every explicit and implicit HTTP request running through the Cloud SDK.
