---
title: On-Premise Connectivity in the SAP Cloud SDK for JavaScript
sidebar_label: On-Premise Systems
description: How to connect to SAP S/4 HANA On-Premise systems using the SAP Cloud SDK
keywords:
- sap
- cloud
- sdk
- On-Premise
- connectivity
- JavaScript
- TypeScript
---


## Why On-Premise Systems are Different ##

The crucial problem with SAP S/4HANA On-Premise systems is, that they are not exposed to the internet.
Typically, they are located within a company's internal network.
The SAP CLoud SDK has some useful features that allow you to connect to On-Premise systems.

Since this isolation would be in conjunction to modern requirements of data availability, SAP has introduced the [Cloud Connector](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/e6c7616abb5710148cfcf3e75d96d596.html?q=cloud%20connector).
The Cloud Connector works like a reverse proxy opening a connection between some white-listed service endpoints of the On-Premise system, and the connected Cloud Foundry account.
Only applications running in the connected Cloud Foundry account can access the services. 
Applications which are supposed to access On-Premise systems need a binding to the [connectivity service](https://www.cloudfoundry.org/the-foundry/sap-cloud-platform-service-connectivity/).

## Implementation Details ##

As a first step, the SDK [looks up the destination](./destination.md).
If the `Proxy Type` of the destination is `OnPremise` the SDK will try to establish a connection via the Cloud Connector.

As mentioned above, the application needs a service binding to the connectivity service.
A service binding relates to client credentials in the  `VCAP` environment variables. 
The SDK uses the client credentials and if given the tenant id of the JWT to obtain a [client credentials grant.](https://help.sap.com/viewer/8d8be6a74e4e49589a546c02ee193741/latest/en-US/f1eff1dd7907469491989b3a36e6a7c6.html)
If multiple connectivity services binding exist, the SDK uses the first entry per default.

The SDK takes the client grant to call the connectivity service and receives the host, password and authorization of the connectivity proxy.
Then the SDK creates an HTTP agent considering this proxy and the necessary `Proxy-Authorization` headers.
The proxy is the entry point to the Cloud Connector instance connected the account.
The proxy is only reachable from the Cloud Foundry space, so you cannot use that flow for applications running outside of Cloud Foundry. 
The final fetched destination containing the [proxy information](./proxy.md) will look like:

```JSON
{
url: "https://my.onPremise.System.url.com",
headers: {...},    //contains authorization headers for the SAP S/4HANA system 
proxyConfiguration?: {
  host: "connectivity.service.proxy.host"
  port: 1234
  protocol: "http"
  headers?: {
      Proxy-Authorization: "AuthHeaderForTheProxy" 
    };,
  }
}
```
and will be used by the [HTTP client](../odata/generic-http-client.md) of the SDK to execute the request.

These are the main steps the SDK does to achieve connectivity to SAP S/4 HANA On-Premise systems via the Cloud Connector.
We would like to mention two minor aspects of the SDK:
1. In case the `Authentication` property on the destination is `PrincipalPropagation` the SDK adds the `SAP-Connectivity-Authentication` header to the request.
The header contains user information included in the `JWT` and enables user propagation from the cloud application to the SAP S/4 HANA system.
2. In case the destination contains a  `LocationId` property, the SDK adds the `SAP-Connectivity-SCC-Location_ID` header to the request.
If you have multiple Cloud Connectors connected to your account, the `LocationId` defines which one of these to use for the request.
